import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import Chart from "react-apexcharts"
import { Circle } from "@mui/icons-material"
import {currencyList } from "../../../config/variables"

const PaymentRoundChart = ({ data }) => {
   const colorItems = ["#1BBF00", "#EB5500"]
   const [currency_symbol, setcurrency_symbol] = useState("")
   const [chartItems, setchartItems] = useState()
   // console.log(data)
   useEffect(() => {
      if (data) {
         setcurrency_symbol(`${currencyList() === undefined ? (data?.invoiceSummary?.currency || "INR") : currencyList().find((e) => e.currency_code === data?.invoiceSummary?.currency).currency_symbol}`)
         const items = [
            { name: "Income", value: data.invoiceSummary?.totalRevenue / 100, color: colorItems[0] },
            { name: "Expenses", value: data.invoiceSummary?.totalCost / 100, color: colorItems[1] }
         ]
         const total = items.map((e) => e.value).reduce((total, item) => total + item)
         const multiplyingFactor = total > 0 ? 100 / total : 0
         console.log(items)
         setchartItems(
            items.map((e) => {
               return { ...e, perValue: Math.round(e.value * multiplyingFactor) }
            })
         )
         // const total = Object.values(data.multimetrics.Expenses.metricPointBOs)

         // const multiplyingFactor =
      }

      return () => {}
   }, [data])

   // ** Chart Options
   const options = {
      legend: {
         show: false,
         position: "bottom"
      },
      labels: chartItems && chartItems.map((e) => e.name),

      colors: chartItems && chartItems.map((e) => e.color),
      dataLabels: {
         enabled: false,
         formatter(val) {
            return `${parseInt(val)}%`
         }
      },
      plotOptions: {
         pie: {
            donut: {
               expandOnClick: false,
               size: "7%",
               labels: {
                  show: false,
                  name: {
                     fontSize: "2rem",
                     fontFamily: "Montserrat"
                  },
                  value: {
                     fontSize: "1rem",
                     fontFamily: "Montserrat",
                     formatter(val) {
                        return `${parseInt(val)}%`
                     }
                  },
                  total: {
                     show: false,
                     fontSize: "1.5rem",
                     label: "Operational",
                     formatter() {
                        return "3%"
                     }
                  }
               }
            }
         }
      },
      responsive: [
         {
            breakpoint: 992,
            options: {
               chart: {
                  height: 380
               },
               legend: {
                  position: "bottom"
               }
            }
         },
         {
            breakpoint: 576,
            options: {
               chart: {
                  height: 320
               },
               plotOptions: {
                  pie: {
                     donut: {
                        labels: {
                           show: true,
                           name: {
                              fontSize: "1.5rem"
                           },
                           value: {
                              fontSize: "1rem"
                           },
                           total: {
                              fontSize: "1.5rem"
                           }
                        }
                     }
                  }
               }
            }
         }
      ]
   }

   // ** Chart Series
   const series = chartItems && chartItems.map((e) => e.value)
   console.log()
   return (
      <div className="paymentRoundChart">
         <div className="paymentRoundChart-header">
            <h3>Total Balance</h3>
            <h1>{data ? `${currency_symbol} ${data.invoiceSummary?.balance / 100}` : "0"}</h1>
         </div>
         <div className="paymentRoundChart-chartarea">
            <div className="paymentRoundChart-chartItems">
               {chartItems &&
                  chartItems.map((e, index) => {
                     return (
                        <div key={index}>
                           <Circle style={{ color: `${e.color}` }} fontSize="small" /> <span>{`${e.name} ${e.perValue}%`}</span>
                        </div>
                     )
                  })}
            </div>
            <div className="paymentRoundChart-chart">{chartItems && <Chart options={options} series={series} type="donut" height={130} />}</div>
         </div>
      </div>
   )
}
export default PaymentRoundChart
