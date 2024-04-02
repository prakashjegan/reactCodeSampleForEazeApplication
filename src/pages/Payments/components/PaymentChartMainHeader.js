import { useEffect, useState } from "react"
import { currencyList } from "../../../config/variables"

const PaymentChartMainHeader = (props) => {
   const [currency_symbol, setcurrency_symbol] = useState("")
   useEffect(() => {
      props.data && setcurrency_symbol(`${currencyList() === undefined ? (props?.data?.invoiceSummary?.currency || "INR") : currencyList().find((e) => e.currency_code === props?.data?.invoiceSummary?.currency).currency_symbol}`)
      return () => {}
   }, [props])

   return (
      <div className="paymentChartMainHeader">
         <div>
            <h3>Total cost</h3>
            <h1>{props.data ? `${currency_symbol} ${props?.data?.invoiceSummary?.totalCost / 100}` : "0"}</h1>
         </div>
         <div>
            <h3>Total Revenue</h3>
            <h1>{props.data ? `${currency_symbol} ${props?.data?.invoiceSummary?.totalRevenue / 100}` : "0"}</h1>
         </div>
         <div>
            <h3>Pending Payment</h3>
            <h1>{props.data ? `${currency_symbol} ${props?.data?.invoiceSummary?.pendingPayments / 100}` : "0"}</h1>
         </div>
         <div>
            <h3>Pending Receivables</h3>
            <h1>{props.data ? `${currency_symbol} ${props?.data?.invoiceSummary?.pendingReceivables / 100}` : "0"}</h1>
         </div>
      </div>
   )
}

export default PaymentChartMainHeader
