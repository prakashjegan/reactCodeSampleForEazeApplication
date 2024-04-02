import { Card, CircularProgress, Input, OutlinedInput, Pagination } from "@mui/material"
import { customStyles } from "../../../utils/datatable-style"
import { dummyDataForDataTable } from "../dummyData"
import { approvalByYouColumnList } from "../utills"
import DataTable from "react-data-table-component"

import { Button } from "antd"
import { ArrowDownward, DescriptionOutlined, MessageOutlined, SaveAltOutlined } from "@mui/icons-material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ChatIcon, CheckMarkGreenIcon, CrossMarkRedIcon } from "../../../assets/icons/figmaIcons"
import metricsService from "../../../services/metricsService"
import invoiceService from "../../../services/invoiceService"
import { useNavigate } from "react-router-dom"

const ActionCell = (props) => {
   const [isApproveUpdating, setisApproveUpdating] = useState()
   const [isRejectUpdating, setisRejectUpdating] = useState()

   const updateJobStageHandler = async (data) => {
      data.stageStatus === "APPROVED" ? setisApproveUpdating(true) : setisRejectUpdating(true)
      console.log(data)
      try {
         console.log("update running")
         const j = await invoiceService.updateJobStage(data)
         await props.getData(props.currentPage)
         props.refreshAllTable()
         // console.log(j)
      } catch (error) {
         console.log(error)
      }

      setisApproveUpdating(false)
      setisRejectUpdating(false)
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
const ApprovalByYouTable = forwardRef((props, ref) => {
   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [count, setcount] = useState(0)
   const [data, setdata] = useState([])

   useImperativeHandle(ref, () => ({
      refresh() {
         // console.log("approval by you function")
         getData(currentPage)
      }
   }))

   const getData = async (pageCount) => {
      try {
         // const k = await metricsService.fetchAttribute()
         const k = JSON.parse(localStorage.getItem("fetchAttribute"))

         console.log('Fetch Attributes Data' , k)
         const j = await invoiceService.fetchJobInvoice("isSender=false&invoiceType=PARTNER_PARTNER&invoiceStatus=SENT_FOR_APPROVAL", {
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
         // console.log(j)
      } catch (error) {
         // console.log(error)
      }
   }

   const columns = [
      ...approvalByYouColumnList,

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
         maxWidth: "110px",
         cell: (row) => <ActionCell getData={getData} row={row} currentPage={currentPage} refreshAllTable={props.refreshAllTable} />
      }
   ]

   // ** Function to handle Pagination
   const handlePageChange = async (e, page) => {
      try {
         setCurrentPage(page)

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
   useEffect(() => {
      getData(1)
      return () => {}
   }, [])

   return (
      <div className="react-dataTable payment-datatable">
         <div className="payment-datatable-header">
            <h1>Pending For Approval By You</h1>
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
            // subHeader={true}
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
export default ApprovalByYouTable
