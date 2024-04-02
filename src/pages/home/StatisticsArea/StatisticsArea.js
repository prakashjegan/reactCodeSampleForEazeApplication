import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import RoundChartHome from "./RoundChartHome"
import InfluencerCard from "../components/InfluencerCard"
import SmallChartCard from "../components/SmallChartCard"
import LeftNavigation from "../../../components/sidenavigation/SideNavigation"
import metricsService from "../../../services/metricsService"
import { currencyList } from "../../../config/variables"

const StatisticsArea = () => {
   const [topInfluencers, settopInfluencers] = useState(null)
   const [smallChartItems, setsmallChartItems] = useState([
      {
         title: "Over all Performance",
         item: "You Tube",
         lineColor: "#407BFF",
         value: "view",
         perValue: null,
         series: null,
         metricType: "OVERALL_PERF_VIEW",
         breakPoint: "WEEK",
         metricSubType: ""
      },
      {
         title: "Cost per Conversion",
         item: "Event",
         lineColor: "#1BBF00",
         value: "₹",
         perValue: null,
         series: null,
         metricType: "COST_PER_CONVERSION",
         breakPoint: "WEEK",
         metricSubType: ""
      },
      {
         title: "Job Performance",
         item: "You Tube",
         lineColor: "#407BFF",
         value: "view",
         perValue: null,
         series: null,
         metricType: "OVERALL_PERF_VIEW",
         breakPoint: "WEEK",
         metricSubType: "JOB"
      },
      {
         title: "Influencer Performance",
         item: "You Tube",
         lineColor: "#B91212",
         value: "view",
         perValue: null,
         series: null,
         metricType: "OVERALL_PERF_VIEW",
         breakPoint: "WEEK",
         metricSubType: "INFLUENCER"
      }
   ])
   const getData = async () => {
      try {
         const updatedChartData = await Promise.all(
            smallChartItems.map(async (itemData) => {
               const j = await metricsService.fetchMetricsData({
                  metricType: itemData.metricType,
                  breakPoint: "WEEK",
                  metricSubType: itemData.metricSubType,
                  overAllPerformanceNum: 3,
                  performanceNum: 3
               })
               // j.data.message.partnerTags && setdata(j.data.message.partnerTags)
               const perValue = (
                  (Object.values(j.data.message.metricPointBOs).slice(-1)[0].pointYAxisAverage * 100) /
                     Object.values(j.data.message.metricPointBOs)[0].pointYAxisAverage -
                  100
               ).toFixed(2)
               // console.log(typeof perValue)
               console.log(j)
               const itemValue =
                  itemData.metricType === "COST_PER_CONVERSION"
                     ? `${j.data.message.metricSummaryData.amount} ${
                        currencyList() === undefined ? (j?.data?.message?.metricSummaryData?.currency || "INR") : currencyList().find((cur) => cur.currency_code === (j.data.message.metricSummaryData.currency || "INR")).currency_symbol
                       }`
                     : `${j.data.message.metricSummaryData.Views} views`
               if (j) {
                  return {
                     title: itemData.title,
                     item: itemData.item,
                     lineColor: itemData.lineColor,
                     value: itemValue,
                     perValue: +perValue,
                     series: Object.values(j.data.message.metricPointBOs).map((e) =>
                        itemData.metricType === "COST_PER_CONVERSION" ? e.pointYAxisAverage / 100 : e.pointYAxisAverage
                     ),
                     detail: j.data.message.metricSummaryData
                  }
               }
            })
         )
         setsmallChartItems(updatedChartData)
         // console.log(updatedChartData)
      } catch (error) {
         console.log(error)
      }
   }

   const getInfluencerLinks = async () => {
      try {
         const k = await metricsService.fetchAttribute()
         const j = await metricsService.fetchMetricsData({
            metricType: "COST_PER_CONVERSION",
            breakPoint: "DAY",
            metricSubType: "INFLUENCER",
            overAllPerformanceNum: 5,
            performanceNum: 5
         })
         if (j.data.message === undefined || k.data.message.influencers === undefined || j.data.message.topOverAllPerfInfluIds === undefined) {
            return 
         }
         const influIdsAry = Object.keys(j.data.message.topOverAllPerfInfluIds)
         // console.log(influIdsAry)
         // console.log()
         const topInfluencersByPartnerId = k.data.message.influencers.filter((e) => influIdsAry.includes(e.partnerId))
         settopInfluencers(topInfluencersByPartnerId)

         // console.log(k.data.message.influencers)
      } catch (error) {
         console.log(error)
      }
   }

   console.log(smallChartItems)
   useEffect(() => {
      getData()
      getInfluencerLinks()
      return () => {}
   }, [])

   return (
      <div className="StaticsAreaHome">
         <RoundChartHome />
         <>
            {smallChartItems.map((e, index) => {
               return <SmallChartCard key={index} data={e} />
            })}
         </>

         <InfluencerCard influencers={topInfluencers} />
         <LeftNavigation />
      </div>
   )
}
export default StatisticsArea
