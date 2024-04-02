import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import CurrentJobCard from "../components/CurrentJobCard"
import { Link, useNavigate } from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"
import jobsService from "../../../services/jobService"
import { currencyList, jobItemsAtHome } from "../../../config/variables"

const CurrentJobHome = () => {
   const [data, setdata] = useState()

   const [counter , setCounter] = useState(0)

   const updateChange = (stage, fieldName) => {
      getData()
      setCounter(counter+1)
   }

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
         case 'chat':   
            
            //navigate(`/messages?messageType=${open}&id=${id}`)
            navigate(`/messages?messageType=${open}&id=${id}`)
            //console.log('Into Chat cases', key , open, id, `/messages?messageType=${open}&id=${id}`)

            break;
      }
   }

   const getData = async () => {
      try {
         let platformLi = []
         jobsService.fetchPlatforms().then(res => {
            console.log('Platforms ::: ' , res)
            let platforms =  res?.data?.message
            if (platforms != undefined ) {
               platforms.forEach( (plat ) => {
                  platformLi.push({value : plat.platformId , label : plat.platformName})
               })
            }
            console.log('Platforms 123123::: ' , platformLi)
            
        }).catch(err => {})

         const j = await jobsService.fetchCurrentJobs({
            from: 0,
            size: jobItemsAtHome,
            page: 1,
            fetchLevel: "",
            canFetchExtraAttribute: true
         })
         const updatedJobs =
            j.data.message.jobBOs &&
            j.data.message.jobBOs.map((data) => {
               return { ...data, currency_symbol:  currencyList() === undefined ? (data.currency || "INR") :  currencyList().find((e) => e.currency_code === (data.currency || "INR")).currency_symbol, platforms : platformLi }
            })

         j.data.message.jobBOs && setdata(updatedJobs)

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

      <div className="currentJobHome">
         <div className="jobHome-head">
            <h1>Current Job</h1>
            <i style={{ cursor: "pointer" }} onClick={() => getData()}>
               <ReplayCircleFilledOutlined />
            </i>
         </div>
         <>
            {data &&
               data.map((e, index) => {
                  return <CurrentJobCard key={index} data={e} handleUpdate={updateChange} />
               })}
         </>

         <div className="Job-foot"
         onClick={(e) => {
            handleNavChange('jobs', 'current-jobs', "000000000000000000")
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
               <span>No Jobs available</span>
            )}
         </div>
      </div>
   )
}
export default CurrentJobHome
