import { Card, Input, OutlinedInput, Pagination } from "@mui/material"
import { customStyles } from "../../../utils/datatable-style"
import { dummyDataForDataTable } from "../dummyData"
import { pendingApprovalColumnList } from "../utills"
import DataTable from "react-data-table-component"

import { Button } from "antd"
import { ArrowDownward, DescriptionOutlined, MessageOutlined, SaveAltOutlined } from "@mui/icons-material"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ChatIcon, CheckMarkGreenIcon, CrossMarkRedIcon } from "../../../assets/icons/figmaIcons"
import metricsService from "../../../services/metricsService"
import invoiceService from "../../../services/invoiceService"
import { useNavigate } from "react-router-dom"

// import "react-paginate/dist/react-paginate.css"
const PendingApprovalTable = forwardRef((props, ref) => {
   const [currentPage, setCurrentPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [count, setcount] = useState(0)
   const [data, setdata] = useState([])

   useImperativeHandle(ref, () => ({
      refresh() {
         console.log("pending for approval function")
         getData(currentPage)
      }
   }))

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

   const getData = async (pageCount) => {
      try {
         // const k = await metricsService.fetchAttribute()
         const k = JSON.parse(localStorage.getItem("fetchAttribute"))

         const j = await invoiceService.fetchJobInvoice("isSender=true&invoiceType=PARTNER_PARTNER&invoiceStatus=SENT_FOR_APPROVAL", {
            from: 0,
            size: 10,
            page: pageCount,
            fetchLevel: "CONTRACTGROUPBO,CONTRACTBO, CONTRACTSTAGEBO",
            canFetchExtraAttribute: true
         })
         const updatedInvoice = j.data.message.invoices.map((e, index) => {
            return {
               ...e,
               // payerPartnerId: [...j.data.message.fetchResponse.allDataMap].find(
               //    (influencers) => influencers.partnerId === e.payerPartnerId
               // ),
               payerPartnerId : j.data.message.fetchResponse.allDataMap[e.payerPartnerId],
               no: (pageCount - 1) * 10 + index + 1
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

   const columns = [
      ...pendingApprovalColumnList,

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
         maxWidth: "90px",
         cell: (row) => (
            <div className="datatable-action-icon">
               {/* <CheckMarkGreenIcon /> */}
               {/* <CrossMarkRedIcon /> */}
               {/* <ChatIcon /> */}
               <MessageOutlined
                        onClick={(e) => {
                           console.log('Into Chat Click' , row.jobId)
                        handleNavChange('chat', 'JOB', row.jobId)
                     }
                  }
                        style={{ cursor: "pointer" , width:"40", height:"40"}}
                    />
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
            <h1>Pending For Approval </h1>
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
export default PendingApprovalTable
