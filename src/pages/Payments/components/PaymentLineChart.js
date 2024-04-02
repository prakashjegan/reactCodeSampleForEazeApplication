import { Card } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import {currencyList } from "../../../config/variables"

const PaymentLineChart = ({ data }) => {
   const colorItems = ["#1BBF00", "#EB5500"]
   const [xAxis, setxAxis] = useState([])
   const [currency_symbol, setcurrency_symbol] = useState("")
   const [chartItems, setchartItems] = useState()
   console.log(chartItems)
   useEffect(() => {
      console.log("Into Payment Metrics Data", data)

      if (data) {
         setcurrency_symbol(`${currencyList() === undefined ? (data?.invoiceSummary?.currency || "INR") : currencyList().find((e) => e.currency_code === data?.invoiceSummary?.currency).currency_symbol}`)
         const items = Object.entries(data.multiMetrics).map((e, index) => {
            console.log("Into Payment Metrics ", e)

            const weekData = e[1].metricPointBOs === undefined ? [0] : Object.values(e[1].metricPointBOs).map((e) => e.pointYAxisAverage / 100)
            console.log(weekData)
            return {
               name: e[0],
               value: e[1].metricPointBOs == undefined ? [0] : Object.values(e[1].metricPointBOs).map((e) => e.pointYAxisAverage / 100),
               color: colorItems[index]
            }
         })
         setxAxis(Object.entries(data.multiMetrics).map((e) => (e[1].metricPointBOs == undefined ? [] : Object.keys(e[1].metricPointBOs)))[1])
         setchartItems(items)
      }
      return () => {}
   }, [data])

   const options = {
      legend: {
         show: false,
         position: "bottom"
      },
      chart: {
         height: 350,
         type: "line",
         zoom: {
            enabled: false
         },
         background: "#fff",
         toolbar: {
            show: false
         }
      },
      dataLabels: {
         enabled: false
      },
      stroke: {
         curve: "smooth"
      },

      fill: {
         type: "gradient",
         gradient: {
            shadeIntensity: 0,
            opacityFrom: 0,
            opacityTo: 0.0,
            stops: [0, 80, 100]
         }
      },
      title: {
         text: "",
         align: "left",
         background: "#fff"
      },
      grid: {
         show: false,
         row: {
            colors: chartItems && chartItems.map((e) => e.color), // takes an array which will be repeated on columns
            opacity: 0
         }
      },
      yaxis: {
         axisBorder: {
            show: true
         },
         labels: {
            formatter: function (value) {
               // Customize the label text here
               return currency_symbol + value // Example: Prefixing with "$" and rounding to 2 decimal places
            }
         }
      },
      xaxis: {
         categories: xAxis ? xAxis : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
   }
   const series =
      chartItems &&
      chartItems.map((e) => {
         return { name: e.name, data: e.value }
      })
   // console.log(xAxis)
   //    const series = [{ name: "per", data: [6, 14, 23, 12, 11, 32, 56, 45, 55, 59] }]

   return <div className="paymentLineChart">{chartItems && <Chart options={options} series={series} type="area" height={270} width={440} />}</div>
}
export default PaymentLineChart
