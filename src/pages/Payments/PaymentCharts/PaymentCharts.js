import { Card } from "@mui/material"
import PaymentRoundChart from "../components/PaymentRoundChart"
import PaymentLineChart from "../components/PaymentLineChart"
import PaymentChartMainHeader from "../components/PaymentChartMainHeader"
import { useEffect, useState } from "react"
import metricsService from "../../../services/metricsService"

const PaymentCharts = () => {
   const [data, setdata] = useState()
   const getData = async () => {
      try {
         const j = await metricsService.fetchFinancialMetricsData({
            metricType: "COST_PER_CONVERSION",
            metricSubType: "INFLUENCER",
            breakPoint: "WEEK",
            overAllPerformanceNum: 5,
            performanceNum: 3
         })
         console.log('Into Payment Charts ', j)
         let ds = j.data.message
         if(ds.invoiceSummary.currency === "") {
            ds.invoiceSummary.currency = "INR"
         }
         setdata(ds)
         // console.log(j.data.message)
      } catch (error) {}
   }
   useEffect(() => {
      getData()
      return () => {}
   }, [])
   // console.log(data)
   return (
      <div className="paymentCharts">
         <PaymentChartMainHeader data={data} />
         <div className="paymentCharts-chartArea">
            <PaymentRoundChart data={data} />
            <PaymentLineChart data={data} />
         </div>
      </div>
   )
}

export default PaymentCharts
