import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import SavedJobCard from "../components/SavedJobCard"
import { Link } from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"
import jobsService from "../../../services/jobService"
import { currencyList, jobItemsAtHome } from "../../../config/variables"

const SavedJobHome = () => {
   const dummyAry = [1, 2, 3]
   const [data, setdata] = useState()

   const getData = async () => {
      try {
         const j = await jobsService.fetchJobsByDefination("saved", {
            from: 0,
            size: jobItemsAtHome,
            page: 1,
            fetchLevel: "",
            canFetchExtraAttribute: false
         })
         const updatedJobs =
            j.data.message.jobDefinitionTags &&
            j.data.message.jobDefinitionTags.map((data) => {
               return { ...data, currency_symbol: currencyList() === undefined ? (data.currency || "INR") : currencyList().find((e) => e.currency_code === (data.currency || "INR")).currency_symbol }
            })

         j.data.message.jobDefinitionTags && setdata(updatedJobs)
         // console.log(j)
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(data)
   useEffect(() => {
      getData()
      return () => {}
   }, [])
   return (
      <div className="savedJobHome">
         <div className="jobHome-head">
            <h1>Saved Job</h1>
            <i style={{ cursor: "pointer" }} onClick={() => getData()}>
               <ReplayCircleFilledOutlined />
            </i>
         </div>
         <>
            {data &&
               data.map((e, index) => {
                  return <SavedJobCard key={index} data={e} />
               })}
         </>

         <div className="Job-foot">
            {data ? (
               <>
                  <span>View All</span>
                  <Link>
                     <EastOutlined />
                  </Link>
               </>
            ) : (
               <span>No Jobs Available</span>
            )}
         </div>
      </div>
   )
}
export default SavedJobHome
