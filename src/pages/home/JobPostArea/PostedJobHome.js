import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import PostedJobCard from "../components/PostedJobCard"
import { Link , useNavigate} from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"
import jobsService from "../../../services/jobService"
import { currencyList, jobItemsAtHome } from "../../../config/variables"

const PostedJobHome = () => {
   const dummyAry = [1, 2, 3]
   const [data, setdata] = useState()

   const getData = async () => {
      try {
         const j = await jobsService.fetchJobsByDefination("current", {
            from: 0,
            size: jobItemsAtHome,
            page: 1,
            fetchLevel: "CONTRACTGROUPBO,CONTRACTBO",
            canFetchExtraAttribute: true
         })
         const updatedJobs =
            j.data.message.jobDefinitionTags &&
            j.data.message.jobDefinitionTags.map((data) => {
               return { ...data, currency_symbol: currencyList() === undefined ? (data.currency || "INR") :  currencyList().find((e) => e.currency_code === (data.currency || "INR")).currency_symbol }
            })

         j.data.message.jobDefinitionTags && setdata(updatedJobs)
      } catch (error) {
         console.log(error)
      }
   }
   // console.log(data)
   useEffect(() => {
      getData()
      return () => { }
   }, [])
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
   return (
      <div className="postedJobHome">
         <div className="jobHome-head">
            <h1>Posted Job</h1>
            <i style={{ cursor: "pointer" }} onClick={() => getData()}>
               <ReplayCircleFilledOutlined />
            </i>
         </div>

         <>
            {data &&
               data.map((e, index) => {
                  return <PostedJobCard key={index} data={e} />
               })}
         </>

         <div className="Job-foot"
            onClick={(e) => {
               handleNavChange('jobs', 'all-job-postings', "000000000000000000")
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
export default PostedJobHome
