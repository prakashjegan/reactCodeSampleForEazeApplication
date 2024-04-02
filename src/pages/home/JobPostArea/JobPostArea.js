import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import SearchHeader from "../components/SearchHeader"
import PostedJobHome from "./PostedJobHome"
import RequestedJobHome from "./RequestedJobHome"
import CurrentJobHome from "./CurrentJobHome"
import SavedJobHome from "./SavedJobHome"

const JobPostArea = () => {
   return (
      <div className="jobPostArea">
         <SearchHeader />
         <PostedJobHome />
         <RequestedJobHome />
         <CurrentJobHome />
         <SavedJobHome />
      </div>
   )
}
export default JobPostArea
