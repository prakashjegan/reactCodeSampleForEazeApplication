import { Card, CircularProgress, Input, Modal, OutlinedInput, Pagination } from "@mui/material"
import { customStyles } from "../../../utils/datatable-style"
import { dummyDataForDataTable } from "../dummyData"
import { paidByYouColumnList } from "../utills"
import DataTable from "react-data-table-component"

import { Button } from "antd"
import { ArrowDownward, DescriptionOutlined, InboxOutlined, SaveAltOutlined } from "@mui/icons-material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

import { message, Upload } from "antd"
import { UploadCloudIcon } from "../../../assets/icons/figmaIcons"
import invoiceService from "../../../services/invoiceService"
import metricsService from "../../../services/metricsService"
import fileUploadService from "../../../services/fileUploadService"
import axios from "axios"
import { toast } from "react-hot-toast"
const { Dragger } = Upload

const PaidByYouTable = forwardRef((props, ref) => {
   const [isUpdating, setisUpdating] = useState(false)
   const [isModelOpen, setisModelOpen] = useState(false)
   const [updateData, setupdateData] = useState({
      stageMappingId: "",
      stageStatus: "SENT_FOR_APPROVAL",
      uploadLink: ""
   })
   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [count, setcount] = useState(0)
   const [data, setdata] = useState([])
   useImperativeHandle(ref, () => ({
      refresh() {
         console.log("paid by you function")
         getData(currentPage)
      }
   }))

   const getData = async (pageCount) => {
      try {
         // const k = await metricsService.fetchAttribute()
         const k = JSON.parse(localStorage.getItem("fetchAttribute"))
         const j = await invoiceService.fetchJobInvoice("isSender=true&invoiceType=PARTNER_PARTNER&invoiceStatus=INITIATED,REJECTED", {
            from: 0,
            size: 10,
            page: pageCount,
            fetchLevel: "CONTRACTGROUPBO,CONTRACTBO, CONTRACTSTAGEBO",
            canFetchExtraAttribute: true
         })
         const updatedInvoice = j.data.message.invoices.map((e, index) => {
            return {
               ...e,
               // payeePartnerId: [...j.data.message.fetchResponse.allDataMap].find(
               //    (influencers) => influencers.partnerId === e.payeePartnerId
               // ),
               payeePartnerId : j.data.message.fetchResponse.allDataMap[e.payeePartnerId],
               no: (pageCount - 1) * 10 + index + 1
            }
         })
         setdata(updatedInvoice)
         j.data.message.count && setcount(j.data.message.count)

         // j.data.message.invoices && setdata(j.data.message.invoices)
         // console.log(k)
      } catch (error) {
         console.log(error)
      }
   }

   const updateDataHandler = async () => {
      if (updateData.uploadLink) {
         try {
            setisUpdating(true)
            const j = await invoiceService.updateJobStage(updateData)
            console.log(updateData)

            console.log(j)
            await getData()
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
            console.log(e.file)
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

   const columns = [
      ...paidByYouColumnList,

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
         cell: (row) => (
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
      }
   ]

   // ** Function to handle Pagination
   const handlePageChange = async (e, page) => {
      try {
         setCurrentPage(page)

         await getData(page)
      } catch (error) {}
   } // console.log(data)
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
            <h1>Pending Payment Paid By You</h1>
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
                  {/* <h1>Payments</h1> */}
                  {/* <OutlinedInput type="text" className="datatable-input" /> */}
               </div>
            }
         />
      </div>
   )
})
export default PaidByYouTable
