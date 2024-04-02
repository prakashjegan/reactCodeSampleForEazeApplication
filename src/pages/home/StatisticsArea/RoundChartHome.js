import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import Chart from "react-apexcharts"
import { Circle } from "@mui/icons-material"
import metricsService from "../../../services/metricsService"

const RoundChartHome = (props) => {
   const [chartItems, setchartItems] = useState(null)
   const colorAry = ["#B91212", "#1BBF00", "#3263E3", "#EB5500", "#FFD300"]
   const getTopPlateforms = async () => {
      try {
         const j = await metricsService.fetchMetricsData({
            metricType: "OVERALL_PERF_VIEW",
            breakPoint: "WEEK",
            metricSubType: "",
            overAllPerformanceNum: 5,
            performanceNum: 5
         })
         // console.log(Object.keys(j.data.message.topOverAllPerfPlatformTypes).length)
         if (Object.keys(j.data.message.topOverAllPerfPlatformTypes).length > 0) {
            const multiplyingFactor = 100 / Object.values(j.data.message.topOverAllPerfPlatformTypes).reduce((total, item) => total + item)
            console.log(multiplyingFactor)
            const updatedPlateform = Object.entries(j.data.message.topOverAllPerfPlatformTypes).map((e, index) => {
               return { name: e[0], value: e[1], perValue: Math.round(e[1] * multiplyingFactor), color: colorAry[index] }
            })
            setchartItems(updatedPlateform)
            // settopPlateform(j.data.message.topOverAllPerfPlatformTypes)
         }
         // const sum = array.reduce((total, item) => total + item)
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(chartItems)

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
   useEffect(() => {
      getTopPlateforms()

      return () => {}
   }, [])

   return (
      <div className="roundChartHome">
         <div className="roundChartHome-chart">
            <h3>Traffic by Platform</h3>
            {chartItems && <Chart options={options} series={series} type="donut" height={180} />}
         </div>
         <div className="roundChartHome-chartItems">
            {chartItems &&
               chartItems.map((e, index) => {
                  return (
                     <div key={index}>
                        <Circle style={{ color: `${e.color}` }} fontSize="small" /> <span>{`${e.name} (${e.perValue}%)`}</span>
                     </div>
                  )
               })}
         </div>
      </div>
   )
}
export default RoundChartHome
