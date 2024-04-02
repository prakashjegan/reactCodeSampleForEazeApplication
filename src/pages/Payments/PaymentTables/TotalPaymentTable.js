import { Card, CircularProgress, Input, Modal, OutlinedInput, Pagination } from "@mui/material"
import { customStyles } from "../../../utils/datatable-style"
import { dummyDataForDataTable } from "../dummyData"
import { totalPaymentColumnList } from "../utills"
import DataTable from "react-data-table-component"

import { Button } from "antd"
import { ArrowDownward, DescriptionOutlined, MessageOutlined, SaveAltOutlined } from "@mui/icons-material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

import { message, Upload } from "antd"
import { ChatIcon, CheckMarkGreenIcon, CrossMarkRedIcon, UploadCloudIcon } from "../../../assets/icons/figmaIcons"
import invoiceService from "../../../services/invoiceService"
import metricsService from "../../../services/metricsService"
import { myPartnerId } from "../../../config/variables"
import fileUploadService from "../../../services/fileUploadService"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const { Dragger } = Upload

const ActionCell = (props) => {
   const [isApproveUpdating, setisApproveUpdating] = useState()
   const [isRejectUpdating, setisRejectUpdating] = useState()


   const navigate = useNavigate(); 
   const handleNavChange = (key, open, id) => {
      switch (key) {
         case 'onboarding':
            navigate(`/onboarding`)
            break;
         case 'invoices':
            navigate(`/invoices`)
            break;
         case 'jobs':
            navigate(`/jobs?openTab=${open}&id=${id}`)
            break;
      }
   }

   const updateJobStageHandler = async (data) => {
      data.stageStatus === "APPROVED" ? setisApproveUpdating(true) : setisRejectUpdating(true)
      // console.log(data)
      try {
         // console.log("update running")
         const j = await invoiceService.updateJobStage(data)
         // await delayTwoMinutes()
         await props.getData(props.currentPage)
         props.refreshAllTable()
         // console.log(j)
      } catch (error) {
         console.log(error)
      }

      setisApproveUpdating(false)
      setisRejectUpdating(false)
   }

   return (
      <div className="datatable-action-icon">
         {isApproveUpdating ? (
            <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />
         ) : (
            <i onClick={() => updateJobStageHandler({ stageMappingId: props.row.stageMappingId, stageStatus: "APPROVED" })}>
               <CheckMarkGreenIcon />
            </i>
         )}
         {isRejectUpdating ? (
            <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />
         ) : (
            <i
               onClick={() => {
                  console.log("clicked"), updateJobStageHandler({ stageMappingId: props.row.stageMappingId, stageStatus: "REJECTED" })
               }}
            >
               <CrossMarkRedIcon />
            </i>
         )}

         {/* <ChatIcon /> */}
         <MessageOutlined
                        onClick={(e) => {
                           //console.log('Into Chat Click' , data)
                        handleNavChange('chat', 'JOB', props.row.jobId)
                     }
                  }
                        style={{ cursor: "pointer" , width:"40", height:"40"}}
                    />
      </div>
   )
}
// import "react-paginate/dist/react-paginate.css"
const TotalPaymentTable = forwardRef((props, ref) => {
   const [isUpdating, setisUpdating] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [count, setcount] = useState(0)
   const [data, setdata] = useState([])
   const [isModelOpen, setisModelOpen] = useState(false)
   const [updateData, setupdateData] = useState({
      stageMappingId: "",
      stageStatus: "SENT_FOR_APPROVAL",
      uploadLink: ""
   })

   useImperativeHandle(ref, () => ({
      refresh() {
         // console.log("total function")
         // console.log(currentPage)
         getData(currentPage)
      }
   }))

   const getData = async (pageCount) => {
      try {
         // const k = await metricsService.fetchAttribute()
         const k = JSON.parse(localStorage.getItem("fetchAttribute"))

         const j = await invoiceService.fetchJobInvoice("invoiceType=PARTNER_PARTNER", {
            from: 0,
            size: 10,
            page: pageCount,
            fetchLevel: "CONTRACTGROUPBO,CONTRACTBO, CONTRACTSTAGEBO",
            canFetchExtraAttribute: true
         })
         const updatedInvoice = j.data.message.invoices.map((e, index) => {
            let parentTable
            if ((e.invoiceStatus === "INPROGRESS" || e.invoiceStatus === "INITIATED") && myPartnerId() === e.payerPartnerId) {
               parentTable = "pendingPaymentByYou"
            } else if ((e.invoiceStatus === "INPROGRESS" || e.invoiceStatus === "INITIATED") && myPartnerId() === e.payeePartnerId) {
               parentTable = "pendingPaymentToYou"
            } else if (e.invoiceStatus === "SENT_FOR_APPROVAL" && myPartnerId() === e.payeePartnerId) {
               parentTable = "pendingApprovalByYou"
            } else if (e.invoiceStatus === "SENT_FOR_APPROVAL" && myPartnerId() === e.payerPartnerId) {
               parentTable = "pendingApprovalByOthers"
            } else if (e.invoiceStatus === "APPROVED") {
               parentTable = "completed"
            } else if (e.invoiceStatus === "REJECTED") {
               parentTable = "rejected"
            }

            // console.log(myPartnerId())
            return {
               ...e,
               // partnerIdDetails: [...j.data.message.fetchResponse.allDataMap].find((influencers) =>
               //    myPartnerId() === e.payeePartnerId ? influencers.partnerId === e.payerPartnerId : influencers.partnerId === e.payeePartnerId
               // ),
               partnerIdDetails : j.data.message.fetchResponse.allDataMap[ myPartnerId() === e.payeePartnerId ? e.payerPartnerId : e.payeePartnerId],
               no: (pageCount - 1) * 10 + index + 1,
               parentTable
            }
         })
         setdata(updatedInvoice)
         j.data.message.count && setcount(j.data.message.count)

         // j.data.message.invoices && setdata(j.data.message.invoices)
         // console.log(j)
      } catch (error) {
         console.log(error)
      }
   }
   const updateDataHandler = async () => {
      if (updateData.uploadLink) {
         try {
            setisUpdating(true)
            const j = await invoiceService.updateJobStage(updateData)
            // console.log(updateData)

            // console.log(j)
            await getData(currentPage)
            setisModelOpen(false)
            setupdateData({
               stageMappingId: "",
               stageStatus: "SENT_FOR_APPROVAL",
               uploadLink: ""
            })
            props.refreshAllTable()
         } catch (error) {
            console.log(error)
         } finally {
         }
      } else {
         toast.error("please upload invoice first")
      }
      setisUpdating(false)
   }

   const getAWSUrl = async (e) => {
      if (e.file.status === "removed") {
         setupdateData({ ...updateData, uploadLink: "" })
      } else {
         try {
            console.log(e.file.status)
            // file.preventDefault()
            const j = await fileUploadService.gets3ConfigUrl(e.file.name, 'payments')
            console.log(j.data.message)
            const response = await axios.put(decodeURIComponent(j.data.message), e.file, {
               headers: { "Content-Type": "multipart/form-data" }
            })
            console.log(response)
            if (response.status === 200) {
               setupdateData({ ...updateData, uploadLink: decodeURIComponent(j.data.message.split("?")[0]) })

               return true || Upload.LIST_IGNORE
            }
         } catch (error) {
            console.log(error)
         }
      }
   }

   const navigate = useNavigate(); 
   const handleNavChange = (key, open, id) => {
      console.log('Into Handle Nav Changes :::' , key , open, id)
      switch (key) {
         case 'onboarding':
            navigate(`/onboarding`)
            break;
         case 'invoices':
            navigate(`/invoices`)
            break;
         case 'jobs':
            navigate(`/jobs?openTab=${open}&id=${id}`)
            break;
         case 'chat':
            navigate(`/messages?messageType=${open}&id=${id}`)
            break;
      }
   }

   const columns = [
      ...totalPaymentColumnList,

      {
         name: "Invoice",
         allowOverflow: true,
         minWidth: "50px",
         maxWidth: "90px",
         cell: (row) => (
            <div>
               {row.invoiceDocUrl && (
                  <DescriptionOutlined
                     onClick={() => window.open(row.invoiceDocUrl, "_blank", "noreferrer")}
                     style={{ color: "#3263E3", cursor: "pointer" }}
                  />
               )}

               {row.paymentDocumentUrl && (
                  <SaveAltOutlined
                     onClick={() => window.open(row.paymentDocumentUrl, "_blank", "noreferrer")}
                     style={{ color: "#3263E3", cursor: "pointer" }}
                  />
               )}
            </div>
         )
      },
      {
         name: "Action",
         allowOverflow: true,
         minWidth: "50px",
         maxWidth: "100px",
         cell: (row) => {
            if (row.parentTable === "pendingPaymentByYou") {
               return (
                  <div>
                     <Button
                        type="primary"
                        onClick={() => {
                           setisModelOpen(true), setupdateData({ ...updateData, stageMappingId: row.stageMappingId })
                        }}
                     >
                        Upload
                     </Button>
                  </div>
               )
            } else if (row.parentTable === "pendingPaymentToYou") {
               return <Button type="primary" onClick={(e) => {
                  handleNavChange('chat', 'JOB', row.jobId)
               }}> Remind</Button>
            } else if (row.parentTable === "pendingApprovalByYou") {
               return <ActionCell getData={getData} row={row} currentPage={currentPage} refreshAllTable={props.refreshAllTable} />
            } else if (row.parentTable === "pendingApprovalByOthers") {
               return (
                  <div className="datatable-action-icon">
                     {/* <CheckMarkGreenIcon /> */}
                     {/* <CrossMarkRedIcon /> */}
                     {/* <ChatIcon /> */}
                     <MessageOutlined
                        onClick={(e) => {
                           //console.log('Into Chat Click' , data)
                        handleNavChange('chat', 'JOB', row.jobId)
                     }
                  }
                        style={{ cursor: "pointer" , width:"40", height:"40"}}
                    />
                  </div>
               )
            } else if (row.parentTable === "completed") {
               return <p>Completed</p>
            } else if (row.parentTable === "rejected") {
               return <p style={{ color: "red" }}>Rejected</p>
            } else {
               return <p>error</p>
            }
         }
      }
   ]
   // ** Function to handle Pagination
   const handlePageChange = async (e, page) => {
      try {
         setCurrentPage(page)
         // console.log(typeof page)
         await getData(page)
      } catch (error) {}
   }

   // ** Custom Pagination
   const CustomPagination = (props) => {
      return (
         <div className="dataTable-footer">
            <Pagination
               count={parseInt(Math.ceil(count / 10) || 1)}
               page={currentPage}
               onChange={handlePageChange}
               variant="outlined"
               color="primary"
               shape="rounded"
            />
         </div>
      )
   }
   // console.log(data)
   useEffect(() => {
      getData(1)
      return () => {}
   }, [])

   return (
      <div className="react-dataTable payment-datatable">
         <Modal
            open={isModelOpen}
            style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center"
            }}
            className="upload-modal"
            onClose={() => {
               setisModelOpen(false),
                  setupdateData({
                     stageMappingId: "",
                     stageStatus: "SENT_FOR_APPROVAL",
                     uploadLink: ""
                  })
            }}
         >
            <div className="upload-modal-uploadArea">
               <h1>Upload Invoice</h1>
               <p>description</p>
               <Dragger
                  name="file"
                  multiple={false}
                  beforeRemove={(e) => {
                     e.preventDefault()
                  }}
                  beforeUpload={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onChange={getAWSUrl}
                  className="upload-modal-dragArea"
               >
                  <i className="">
                     <UploadCloudIcon />
                  </i>
                  <p className="">
                     Drag and drop your files here or <strong style={{ textDecoration: "underline" }}>Browse</strong>
                  </p>
               </Dragger>
               <div className="upload-modal-btn-grp">
                  <Button disabled={isUpdating} onClick={updateDataHandler} type="primary">
                     Upload &nbsp;{isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                  </Button>
                  <Button
                     primary="true"
                     onClick={() => {
                        setisModelOpen(false),
                           setupdateData({
                              stageMappingId: "",
                              stageStatus: "SENT_FOR_APPROVAL",
                              uploadLink: ""
                           })
                     }}
                  >
                     Cancel
                  </Button>
               </div>
            </div>
         </Modal>
         <div className="payment-datatable-header">
            <h1>Total Payment</h1>
         </div>
         <DataTable
            customStyles={customStyles}
            pagination
            striped
            columns={columns}
            paginationPerPage={rowsPerPage}
            className="react-dataTable"
            sortIcon={<ArrowDownward size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            data={data}
            //subHeader={true}
            subHeaderComponent={
               <div className="datatable-subHeader">
                  {/* <h1>Payments</h1>
                  <OutlinedInput type="text" className="datatable-input" /> */}
               </div>
            }
         />
      </div>
   )
})

export default TotalPaymentTable
