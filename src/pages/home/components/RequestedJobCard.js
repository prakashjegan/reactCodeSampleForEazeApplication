import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import { ShareOutlined, ScheduleOutlined, FmdGoodOutlined, FavoriteBorderOutlined, Favorite, MessageOutlined } from "@mui/icons-material"
import { ChatIcon } from "../../../assets/icons/figmaIcons"
import { Button } from "antd"
import { Link , useNavigate} from "react-router-dom"
import { myPartnerId } from "../../../config/variables"

const RequestedJobCard = ({ data }) => {
   const [isFav, setisFav] = useState(false)
   console.log('RequestedJobCard' , data)
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
      <div className="requestedJobCard">
         <div className="requestedJobCard-header">
            <div className="requestedJobCard-username-head">
               <h3>{data && data.jobName}</h3>
               <p>
                  {data && data?.partnerId?.partnerName}{" "}
                  <span className="requestedJobCard-username-rating">{(data && data.reviewTag && data.reviewTag.averageReviewRate / 20) || 0}</span>{" "}
                  <span className="requestedJobCard-username-jobs">({(data && data.reviewTag && data.reviewTag.totalReviews) || 0})</span>
               </p>
            </div>
            <div className="requestedJobCard-icons">
               <i onClick={() => setisFav(!isFav)}> {!isFav ? <FavoriteBorderOutlined /> : <Favorite style={{ color: "red" }} />}</i>

               {/* <Link>
                  {" "}
                  <ShareOutlined />
               </Link> */}
            </div>
         </div>

         <p className="requestedJobCard-description">{data && data.jobDescription}</p>
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
            <Button type="primary" onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', data.jobRequestId)
            }
            } >Approve</Button>
            <Button primary="true"onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', data.jobRequestId)
            }
            }>Rejected</Button>
            {/* <Link>
            <ChatIcon onClick={(e) => {
               handleNavChange('chat', 'JOB_REQUEST', data.jobRequestId)
            }
         }></ChatIcon>
            </Link> */}
            <MessageOutlined
                        onClick={(e) => {
                           console.log('Into Chat Click' , data)
                        handleNavChange('chat', 'JOB_REQUEST', data.jobRequestId)
                     }
                  }
                        style={{ cursor: "pointer" , width:"40", height:"40"}}
                    />
         </div>
      </div>
   )
}
export default RequestedJobCard
