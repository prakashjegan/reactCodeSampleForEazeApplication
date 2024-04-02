import { Avatar, Chip } from "@mui/material"
import avatar from "../../assets/images/navbar/profile.png"
import {currencyList } from "../../config/variables"

export const paymentStatusChecker = (dateString) => {
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   const chipLabel = `${monthNames[new Date(Date.parse(dateString)).getMonth()]} ${new Date(Date.parse(dateString)).getFullYear()}`

   const oneDaySeconds = 86400
   let color
   let chipColor
   const todaySecond = new Date().getTime()
   const dateStringSecond = new Date(Date.parse(dateString)).getTime()
   // console.log()
   // console.log("run")
   const difference = dateStringSecond - todaySecond
   // console.log(difference)
   switch (true) {
      case difference <= 0:
         chipColor = "#EB5500"
         color = "#fff"
         break
      case difference <= 5 * oneDaySeconds:
         chipColor = "#3263E3"
         color = "#fff"
         break
      case difference <= 30 * oneDaySeconds:
         chipColor = "#39B37E"
         color = "#fff"
         break
      default:
         chipColor = "E8EAED"
         color = "#000"
         break
   }
   // console.log()
   return <Chip label={chipLabel} style={{ background: `${chipColor}`, color: `${color}`, height: "20px" }} />
}
paymentStatusChecker("2023-05-22T10:01:01.745275+02:00")
export const paymentStatus = {
   APPROVED: <Chip label="Approved" style={{ background: "#39B37E", color: "#fff", height: "20px" }} />,
   INITIATED: <Chip label="Pending" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />,
   PENDING: <Chip label="Pending" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />,
   SENT_FOR_APPROVAL: <Chip label="Approve" style={{ background: "#3263E3", color: "#fff", height: "20px" }} />,
   REJECTED: <Chip label="Rejected" style={{ background: "#EB5500", color: "#fff", height: "20px" }} />
}

export const paymentETAStatus = {
   "jan-2023": <Chip label="jan-2023" style={{ background: "#39B37E", color: "#fff", height: "20px" }} />,
   "feb-2023": <Chip label="feb-2023" style={{ background: "#EB5500", color: "#fff", height: "20px" }} />,
   "mar-2023": <Chip label="mar-2023" style={{ background: "#39B37E", color: "#fff", height: "20px" }} />,
   "apr-2023": <Chip label="apr-2023" style={{ background: "#EB5500", color: "#fff", height: "20px" }} />,
   "may-2023": <Chip label="may-2023" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />,
   "jun-2023": <Chip label="jun-2023" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />,
   "jul-2023": <Chip label="jul-2023" style={{ background: "#39B37E", color: "#fff", height: "20px" }} />,
   "aug-2023": <Chip label="aug-2023" style={{ background: "#EB5500", color: "#fff", height: "20px" }} />,
   "sep-2023": <Chip label="sep-2023" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />,
   "oct-2023": <Chip label="oct-2023" style={{ background: "#39B37E", color: "#fff", height: "20px" }} />,
   "nov-2023": <Chip label="nov-2023" style={{ background: "#EB5500", color: "#fff", height: "20px" }} />,
   "dec-2023": <Chip label="dec-2023" style={{ background: "#E8EAED", color: "#000", height: "20px" }} />
}
// console.log(JSON.parse(currencyList))
export const paidByYouColumnList = [
   {
      name: "No",
      sortable: true,
      minWidth: "40px",
      maxWidth: "60px",
      selector: (row) => row.no
   },
   {
      name: "Ref",
      sortable: true,
      minWidth: "230px",
      // maxWidth: "300px",
      selector: (row) => {
         return (
            <div className="datatable-avatar">
               <Avatar alt="Remy Sharp" src={row.payeePartnerId.logoLink || avatar} sx={{ width: 37, height: 37 }} />
               <div>
                  <h3>{row.payeePartnerId.partnerName}</h3>
                  <span>{row.stageName}</span>
               </div>
            </div>
         )
      }
   },
   {
      name: "Job Payment Id",
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
      selector: (row) => `#${row.jobName}`
   },
   {
      name: "Amount",
      sortable: true,
      minWidth: "50px",
      maxWidth: "100px",
      selector: (row) => `${row.amount / 100} ${currencyList() === undefined ? (row.currency || "INR") : currencyList().find((e) => e.currency_code === row.currency).currency_symbol}`
   },
   {
      name: "Payment STATUS",
      sortable: true,
      minWidth: "150px",
      maxWidth: "150px",
      selector: (row) => paymentStatusChecker(row.invoiceToDate)
   }
]

export const paidToYouColumnList = [
   {
      name: "No",
      sortable: true,
      minWidth: "40px",
      maxWidth: "60px",
      selector: (row) => row.no
   },
   {
      name: "Ref",
      sortable: true,
      minWidth: "230px",
      maxWidth: "350px",
      selector: (row) => {
         return (
            <div className="datatable-avatar">
               <Avatar alt="Remy Sharp" src={row.payerPartnerId?.logoLink || avatar} sx={{ width: 37, height: 37 }} />
               <div>
                  <h3>{row.payerPartnerId?.partnerName}</h3>
                  <span>{row.stageName}</span>
               </div>
            </div>
         )
      }
   },
   {
      name: "Job Payment Id",
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
      selector: (row) => `#${row.jobName}`
   },
   {
      name: "Amount",
      sortable: true,
      minWidth: "50px",
      maxWidth: "100px",
      selector: (row) => `${row.amount / 100} ${currencyList() === undefined ? (row.currency || "INR") : currencyList().find((e) => e.currency_code === row.currency).currency_symbol}`
   },
   {
      name: "Payment Status",
      sortable: true,
      minWidth: "150px",
      maxWidth: "150px",
      selector: (row) => paymentStatusChecker(row.invoiceToDate)
   }
]

export const approvalByYouColumnList = [
   {
      name: "No",
      sortable: true,
      minWidth: "40px",
      maxWidth: "60px",
      selector: (row) => row.no
   },
   {
      name: "Ref",
      sortable: true,
      minWidth: "230px",
      // maxWidth: "280px",
      selector: (row) => {
         return (
            <div className="datatable-avatar">
               <Avatar alt="Remy Sharp" src={row.payeePartnerId.logoLink || avatar} sx={{ width: 37, height: 37 }} />
               <div>
                  <h3>{row.payeePartnerId.partnerName}</h3>
                  <span>{row.stageName}</span>
               </div>
            </div>
         )
      }
   },
   {
      name: "Job Payment Id",
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
      selector: (row) => `#${row.jobName}`
   },
   {
      name: "Amount",
      sortable: true,
      minWidth: "50px",
      maxWidth: "100px",
      selector: (row) => `${row.amount / 100} ${currencyList() === undefined ? (row.currency || "INR") : currencyList().find((e) => e.currency_code === row.currency).currency_symbol}`
   },
   {
      name: "Payment Status",
      sortable: true,
      minWidth: "150px",
      maxWidth: "150px",
      selector: (row) => paymentStatusChecker(row.invoiceToDate)
   }
]

export const pendingApprovalColumnList = [
   {
      name: "No",
      sortable: true,
      minWidth: "40px",
      maxWidth: "60px",
      selector: (row) => row.no
   },
   {
      name: "Ref",
      sortable: true,
      minWidth: "230px",
      // maxWidth: "300px",
      selector: (row) => {
         return (
            <div className="datatable-avatar">
               <Avatar alt="Remy Sharp" src={row.payerPartnerId?.logoLink || avatar} sx={{ width: 37, height: 37 }} />
               <div>
                  <h3>{row.payerPartnerId?.partnerName}</h3>
                  <span>{row.stageName}</span>
               </div>
            </div>
         )
      }
   },
   {
      name: "Job Payment Id",
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
      selector: (row) => `#${row.jobName}`
   },
   {
      name: "Amount",
      sortable: true,
      minWidth: "50px",
      maxWidth: "100px",
      selector: (row) => `${row.amount / 100} ${currencyList() === undefined ? (row.currency || "INR") : currencyList().find((e) => e.currency_code === row.currency).currency_symbol}`
   },
   {
      name: "Payment Status",
      sortable: true,
      minWidth: "150px",
      maxWidth: "150px",
      selector: (row) => paymentStatusChecker(row.invoiceToDate)
   }
]

export const totalPaymentColumnList = [
   {
      name: "No",
      sortable: true,
      minWidth: "40px",
      maxWidth: "60px",
      selector: (row) => row.no
   },
   {
      name: "Ref",
      sortable: true,
      minWidth: "230px",
      maxWidth: "350px",
      selector: (row) => {
         return (
            <div className="datatable-avatar">
               <Avatar alt="Remy Sharp" src={row.partnerIdDetails?.logoLink || avatar} sx={{ width: 37, height: 37 }} />
               <div>
                  <h3>{row.partnerIdDetails?.partnerName}</h3>
                  <span>{row.stageName}</span>
               </div>
            </div>
         )
      }
   },
   {
      name: "Job Payment Id",
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
      selector: (row) => `#${row.jobName}`
   },
   {
      name: "Amount",
      sortable: true,
      minWidth: "50px",
      maxWidth: "100px",
      selector: (row) => `${row.amount / 100} ${currencyList() === undefined ? (row.currency || "INR") : currencyList().find((e) => e.currency_code === row.currency).currency_symbol}`
   },
   {
      name: "Payment Status",
      sortable: true,
      minWidth: "150px",
      maxWidth: "150px",
      selector: (row) => paymentStatus[row.invoiceStatus]
   }
]



export const navigationPageNumber = {
   basicDetails: 1,
   platform: 2,
   address: 3,
   supportPerson: 4,
   kyc: 5,
   bankDetails: 6
}
