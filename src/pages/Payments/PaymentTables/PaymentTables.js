import { Card } from "@mui/material"
import PaidByYouTable from "./PaidByYouTable"
import PaidToYouTable from "./PaidToYouTable"
import ApprovalByYouTable from "./ApprovalByYouTable"
import PendingForApprovalTable from "./PendingApprovalTable"
import TotalPaymentTable from "./TotalPaymentTable"
import { useEffect, useRef, useState } from "react"

const PaymentTables = () => {
   const refs = useRef({ total: null, pendingForApproval: null, paidByYou: null, paidToYou: null, approveByYou: null })
   const refreshAllTableHandler = () => {
      refs.current.total.refresh()
      refs.current.paidByYou.refresh()
      refs.current.paidToYou.refresh()
      refs.current.approveByYou.refresh()
      refs.current.pendingForApproval.refresh()
   }

   return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
         <PaidByYouTable ref={(el) => (refs.current.paidByYou = el)} refreshAllTable={refreshAllTableHandler} />
         <PaidToYouTable ref={(el) => (refs.current.paidToYou = el)} refreshAllTable={refreshAllTableHandler} />
         <ApprovalByYouTable ref={(el) => (refs.current.approveByYou = el)} refreshAllTable={refreshAllTableHandler} />
         <PendingForApprovalTable ref={(el) => (refs.current.pendingForApproval = el)} refreshAllTable={refreshAllTableHandler} />
         <TotalPaymentTable ref={(el) => (refs.current.total = el)} refreshAllTable={refreshAllTableHandler} />
      </div>
   )
}

export default PaymentTables
