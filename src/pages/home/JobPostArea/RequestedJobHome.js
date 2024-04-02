import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import RequestedJobCard from "../components/RequestedJobCard"
import { Link ,useNavigate} from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"
import jobsService from "../../../services/jobService"
import metricsService from "../../../services/metricsService"
import { currencyList, jobItemsAtHome } from "../../../config/variables"

const RequestedJobHome = () => {
   const dummyAry = [1, 2, 3]
   const [data, setdata] = useState()
   const navigate = useNavigate();
   const handleNavChange = (key, open, id) => {
      switch (key) {
         case 'onboarding':
            navigate(`/onboarding`)
            break;
         case 'invoices':
            navigate(`/invoices`)
            break;
         case 'jobs':
            navigate(`/jobs?openTab=${open}&id=${id}`)
            break;
      }
   }

   const getData = async () => {
      try {
         const k = await metricsService.fetchAttribute()
         // const k = JSON.parse(localStorage.getItem("fetchAttribute"))

         const j = await jobsService.fetchRequestedJobs({
            from: 0,
            size: jobItemsAtHome,
            page: 1,
            fetchLevel: "",
            canFetchExtraAttribute: true
         })
         console.log(k.data.message.influencers)
         const updatedRequestedJob = j.data.message.jobRequestBOs.map((job) => {
            return {
               ...job,
               partnerId: [...k.data.message.influencers, ...k.data.message.businesses].find((e) => e.partnerId === job.acceptorPartnerId),
               reviewTag: k.data.message.partnerReviewTags.find((k) => k.reviewGivenForID === job.acceptorPartnerId),
               currency_symbol: currencyList() === undefined ? (job.currency || "INR") :  currencyList().find((cur) => cur.currency_code === (job.currency || "INR")).currency_symbol
            }
         })

         j.data.message.jobRequestBOs && setdata(updatedRequestedJob)
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
      <div className="requestedJobHome">
         <div className="jobHome-head">
            <h1>Job Requested</h1>
            <i style={{ cursor: "pointer" }} onClick={() => getData()}>
               <ReplayCircleFilledOutlined />
            </i>
         </div>

         <>
            {data &&
               data.map((e, index) => {
                  return <RequestedJobCard key={index} data={e} />
               })}
         </>
         <div className="Job-foot"  onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', "000000000000000000")
            }
            }
            >
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
export default RequestedJobHome
