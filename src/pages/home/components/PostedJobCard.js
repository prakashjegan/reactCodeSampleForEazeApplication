import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import { ShareOutlined, ScheduleOutlined, FmdGoodOutlined, MessageOutlined } from "@mui/icons-material"
import { ChatIcon } from "../../../assets/icons/figmaIcons"
import { Button } from "antd"
import { Link , useNavigate} from "react-router-dom"

const PostedJobCard = ({ data }) => {
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
   return (
      <div className="postedJobCard">
         <div className="postedJobCard-header">
            <h3>{data && data.jobName}</h3>
            <div>
               <h3>{` ${(data && data.amount / 100) || "0"} ${data && data.currency_symbol}`}</h3>
               {/* <Link>
                  <ShareOutlined />
               </Link> */}
            </div>
         </div>
         <p className="postedJobCard-description">{data && data.jobDescription}</p>
         <div className="jobCard-information">
            <span>{` ${(data && data.amount / 100) || "0"} ${data && data.currency_symbol}`}</span>
            <span>
               <ScheduleOutlined />
               {`${(data && data.maxBufferPeriodInDays) || "0"} days from job post`}
            </span>
            <span>
               <FmdGoodOutlined />
               Remote
            </span>
         </div>
         <div className="jobCard-btn-grp">
            <Button style={{ flexGrow: "1" }} type="primary" onClick={(e) => {
               handleNavChange('jobs', 'all-job-postings', data.jobDefinitionId)
            }
         }
         >
               Send Request
            </Button>
            <MessageOutlined
                        onClick={(e) => {
                           console.log('Into Chat Click' , data)
                        handleNavChange('chat', 'USER_USER', data.posterPartnerId)
                     }
                  }
                        style={{ cursor: "pointer" , width:"40", height:"40"}}
                    />
            {/* <Link>
               <ChatIcon onClick={(e) => {
                  console.log('Into Chat Click' , data)
               handleNavChange('chat', 'USER_USER', data.posterPartnerId)
            }
         }></ChatIcon>
            </Link> */}
         </div>
      </div>
   )
}
export default PostedJobCard
