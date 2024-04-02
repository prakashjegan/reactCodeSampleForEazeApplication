import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import { ShareOutlined, ScheduleOutlined, FmdGoodOutlined } from "@mui/icons-material"
import { ChatIcon } from "../../../assets/icons/figmaIcons"
import { Button } from "antd"
import { Link } from "react-router-dom"
import FileUpload from "./FileUpload"
import { myPartnerId } from "../../../config/variables"
import store from "../../../config/store"


const CurrentJobCard = (props) => {

   let data = props.data
   let handleUpdate = props.handleUpdate
   console.log('CurrentJobCard : ', data)
   let currentStage = data.currentStage
   //const partnerId = store.getState()?.lovs?.partnerId;
   const partnerId = myPartnerId()
   console.log('Partner Id', partnerId)
   console.log('CurrentJobCard CurrentStage : ', currentStage)
   const [description, setDescription] = useState(currentStage?.stageUIData?.FullDescription)
   const [importantInfo, setImportantInfo] = useState(currentStage?.displayContent)
   const [commentsGiven, setCommentsGiven] = useState(currentStage?.comments)
   const [tempInvoiceLink, setTempInvoiceLink] = useState(currentStage?.tempInvoiceLink)
   let isPromocodeLink = false
   let canPerformAction = false
   let canshowJobDetails = true
   if (props.subType != undefined && (props.subType === 'JOB_DETAILS_JOB_REVIEW' || props.subType === 'JOB_DETAILS_JOB')) {
      canshowJobDetails = false
   }

   if (currentStage.actionCanPerformedBy === undefined) {
      canPerformAction = true
   } else if (currentStage.actionCanPerformedBy === partnerId) {
      canPerformAction = true
   } else if (myPartnerId() != currentStage.posterPartnerId && myPartnerId() != currentStage.acceptorPartnerId) {
      canPerformAction = true
   }

   const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
   };
   const isValidUrl = (str) => {
      // Regular expression to validate URL format
      const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      let isV = urlRegex.test(str);
      if (!isV) {
         return str.startsWith('www.')
      }
      return isV
   };

   const handleAction = (actionField, stage) => {
      // Regular expression to validate URL format
      //Action - Update Stage.
      handleUpdate(actionField, stage)
      if (props.handleUpdate != undefined) {
         props.handleUpdate()
      }
      return ""
   };

   const fetchValue = (str) => {
      switch (str) {
         case 'comments':
            return currentStage?.comments
         case 'displayContent':
            return currentStage?.displayContent
         case 'tempInvoiceLink':
            return currentStage?.tempInvoiceLink
         case 'tempUploadLink':
            return currentStage?.tempUploadLink
         case 'tentativeStartDate':
            if (currentStage?.tentativeStartDate != undefined) {
               let sdate = new Date(currentStage?.tentativeStartDate)
               if (sdate.getFullYear() >= 2022) {
                  return sdate.toLocaleDateString('en-US', options);
               }
            }
            return undefined
         case 'tentativeEndDate':
            if (currentStage?.tentativeEndDate != undefined) {
               let sdate1 = new Date(currentStage?.tentativeEndDate)
               if (sdate1.getFullYear() >= 2022) {
                  return sdate1.toLocaleDateString('en-US', options);
               }
            }
            return undefined
         case 'JOB:jobPromoCode':
            return data?.jobInfluProdCodeLink

      }
   }
   const [promoCode, setPromoCode] = useState(data?.jobInfluProdCodeLink)
   const [documentForVerification, setDocumentForVerification] = useState(currentStage?.tempUploadLink)

   let actions = new Map()
   let availableDisplays = new Map()
   let stageInputs = new Map()
   if (currentStage?.stageId != undefined && currentStage?.stageUIData?.FullDisplayDetails != undefined && currentStage?.stageUIData?.FullDisplayDetails != null) {
      console.log('Into FullDisplay Details', currentStage?.stageUIData?.FullDisplayDetails)
      let displays = new Map(Object.entries(currentStage?.stageUIData?.FullDisplayDetails))
      displays.forEach((item, key) => {
         let text = fetchValue(item)
         if (text != undefined && text != null && text != "") {
            availableDisplays.set(key, isValidUrl(text) ? (<a href={text} target="_blank" rel="noopener noreferrer">
               Click Here
            </a>) : (text))
         }
      })
   }

   if (currentStage?.stageId != undefined && currentStage?.stageUIData?.FullAction != undefined && currentStage?.stageUIData?.FullAction != null) {
      let action = new Map(Object.entries(currentStage?.stageUIData?.FullAction))
      action.forEach((item, key) => {
         console.log('CurrentJobCard Action1 : ', item, key)
         actions.set(key, item)
      })
   }

   if (currentStage?.stageId != undefined && currentStage?.stageUIData?.StageInputFields != undefined && currentStage?.stageUIData?.StageInputFields != null) {
      let action = new Map(Object.entries(currentStage?.stageUIData?.StageInputFields))
      action.forEach((item, key) => {
         stageInputs.set(key, item)
      })
   }

   let ps = new Map(Object.entries(JSON.parse(localStorage.getItem('paymentstages'))))
   let isPaymentStage = false
   if (currentStage?.stageId != undefined && (ps.has(currentStage.stageId.toString()))) {
      isPaymentStage = true
   }

   return (
      <div className="currentJobCard">
         {/* {canshowJobDetails && ( */}
            <>
               <div className="currentJobCard-header">
                  <h3>{data && data.jobName}</h3>
               </div>
               <p className="currentJobCard-description">{data && data.jobDescription}</p>
            </>
         {/* )} */}
         {/* <p className="currentJobCard-links">
            <Link>Click</Link> to see Invoice/video Link
         </p>
         <p className="currentJobCard-links">
            <Link>Click</Link> to see payment detail/upload document
         </p> */}
         {console.log('Display elements : ', availableDisplays)}
         {Array.from(availableDisplays).map(([key, value], index1) => {
            { console.log('Display element : ', key, value) }
            return (
               <div key={key}>
                  <p className="currentJobCard-links"><b>{key}</b> : {value}</p>
               </div>
            )
         })}
         { canshowJobDetails && (
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
         )}

         <FileUpload
            canPerformAction={canPerformAction}
            data={data}
            actions={actions}
            canshowJobDetails={canshowJobDetails}
            handleAction={handleAction}
            stageInputs={stageInputs}
         />

      </div>
   )
}
export default CurrentJobCard
