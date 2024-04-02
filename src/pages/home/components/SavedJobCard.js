import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import { ShareOutlined, ScheduleOutlined, FmdGoodOutlined } from "@mui/icons-material"
import { ChatIcon } from "../../../assets/icons/figmaIcons"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { currencyList } from "../../../config/variables"
import ConfirmationModal from "../../../components/generalCompontent/confirmationModal"
import { useLocation, useNavigate } from "react-router-dom";
import jobsService from "../../../services/jobService"


const SavedJobCard = (props) => {

   let data = props.data 
   console.log('Into SavedJobCard', data)
   const navigate = useNavigate();


   const handleContinueClick = ( e) => {
      console.log('handleContinueClick')
      navigate(`/post-a-job/EDIT_DEFINITION/${data.jobDefinitionId}`)

  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle user confirmation
  const handleConfirm = async () => {
    // Implement your action here (e.g., delete, send request, approve)
    // ...
    // After successful action, close the confirmation modal
    //TODO : Set is_deleted as true . in job definition.
    await jobsService.deleteJobPosting(data.jobDefinitionId)
    setShowConfirmation(false);
  };

  // Function to handle user cancel
  const handleCancel = () => {
    // Close the confirmation modal without performing any action
    setShowConfirmation(false);
  };

    // Function to handle user cancel
    const handleDeleteClick = () => {
      // Close the confirmation modal without performing any action
      setShowConfirmation(true);
    };

   return (
      <div className="savedJobCard">
         <div className="savedJobCard-header">
            <h3>{data && data.jobName}</h3>
            <div>
               <h3>{` ${(data && data.amount / 100) || "0"} ${data && data.currency_symbol}`}</h3>
               {/* <Link>
                  <ShareOutlined />
               </Link> */}
            </div>
         </div>
         <p className="savedJobCard-description">{data && data.jobDescription}</p>
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
            <Button type="primary" onClick = { (e) => handleContinueClick(e)}>Continue</Button>
            <Button primary="true" onClick = { (e) => handleDeleteClick(e)} >Remove</Button>
            {/* <Link>
               <ChatIcon />
            </Link> */}
         </div>
         <ConfirmationModal
        visible={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirmation"
        message="Are you sure you want to proceed with this Removal ?"
      />
      </div>
   )
}
export default SavedJobCard
