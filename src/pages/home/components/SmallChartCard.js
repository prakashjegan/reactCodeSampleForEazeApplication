import { Card } from "@mui/material"
import Chart from "react-apexcharts"
const SmallChartCard = (props) => {
   // console.log(typeof props.data.perValue)
   console.log(props)
   const options = {
      chart: {
         id: "revenue",
         toolbar: {
            show: false
         },
         sparkline: {
            enabled: true
         }
      },
      grid: {
         show: false
      },
      colors: [props.data.lineColor || "blue"],
      dataLabels: {
         enabled: false
      },
      stroke: {
         curve: "smooth",
         width: 2.5
      },
      fill: {
         type: "gradient",
         gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.5,
            opacityTo: 0.3,
            stops: [30, 100, 100]
         }
      },

      xaxis: {
         labels: {
            show: false
         },
         axisBorder: {
            show: false
         }
      },
      yaxis: {
         labels: {
            show: false
         }
      },
      tooltip: {
         x: { show: false }
      }
   }
   const series = [{ name: "value", data: props.data.series || [6, 14, 23, 12, 11, 32, 56, 45, 55, 59] }]

   return (
      <div className="smallChartCard">
         <div className="smallChartCard-header">
            <h3>{props.data.title || "Title"} </h3>
            <span style={{ color: `${props.data.perValue >= 0 ? "green" : "red"}` }}>
               {props.data.perValue ? (props.data.perValue > 0 ? "+" + props.data.perValue : props.data.perValue) : "0"} %
            </span>
         </div>
         <div className="smallChartCard-body">
            <div className="smallChartCard-subtitle">
               <h2>{props.data.value || "0"}</h2>
               <span>{props.data?.detail?.Jobs} jobs</span>
            </div>
            <div>
               <Chart options={options} series={series} type="area" height={40} width={100} />
            </div>
         </div>
      </div>
   )
}
export default SmallChartCard
