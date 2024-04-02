import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, Select, Space } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Contract1 from "../../Contract-1"
//import { Box, MenuItem } from '@mui/material';
//import SelectMui from '../../components/ReusableMuiComponents/SelectMui';
//import AutoCompleteMui from '../../components/ReusableMuiComponents/AutoCompleteMui';
import Layout from "../../../components/layout"
import listService from "../../../services/listService"
import jobsService from "../../../services/jobService"
import { myPartnerId } from "../../../config/variables"
import CurrentJobCard from "../../home/components/CurrentJobCard"
import MultiSelectDropDown from "../components/MultiSelectUserComponent"
import userService from "../../../services/userService"
import { CircularProgress } from "@mui/material"
import { toast } from "react-hot-toast"
// import 'react-toastify/dist/ReactToastify.css';

//import SQLiteDataImport from '../../constants/dataimports/sQLiteDataImport';
import "./style.scss"
import DropDownMinMax from "../../../components/ReusableMuiComponents/DropDownMinMax"
import moment from "moment"
import { FmdBadTwoTone } from "@mui/icons-material"
import { isDisabled } from "@testing-library/user-event/dist/utils"
import MultiSelUserWithLimiFetchComp from "./MultiSelUserWithLimiFetchComp"
//import moment from 'moment';
//import { LoginSharp } from '@mui/icons-material';

const { Title } = Typography
const { TextArea, Text } = Input
const { RangePicker } = DatePicker

const JobsUpdate = (props) => {
   //const { idr } = useParams()
   //const { subType } = useParams()
   let idr = props.id
   let subType = props.subType
   let id = idr
   let data = props.data
   console.log('Into JobsUpdate ', id, data)

   const navigate = useNavigate()
   const [form] = Form.useForm()
   const [platformDropdown, setPlatformDropdown] = useState([])
   let [jobDefinition, setJobDefinition] = useState({})
   const [contractGroups, setcontractGroups] = useState(new Map())
   const [contracts, setContracts] = useState(new Map())
   const [contractsInd, setContractsInd] = useState(new Map())
   const [staticContracts, setStaticContracts] = useState(new Map())
   const [staticContract, setStaticContract] = useState({})
   const [commentForRequest, setCommentForRequest] = useState("")
   const [isUpdating, setisUpdating] = useState(false)

   const [staticContractsInd, setStaticContractsInd] = useState(new Map())
   const [isEditDefinition, setIsEditDefinition] = useState(true)
   const [stages, setStages] = useState(new Map())
   const [currentStage, setCurrentStage] = useState({})
   const [isAcceptorPartnerId, setIsAcceptorPartnerId] = useState(true)

   const [jobDefinitionId, setJobDefinitionId] = useState([])
   const [postType, setPostType] = useState([])
   const [tentativeStartDateTemp, setTentativeStartDateTemp] = useState(moment(new Date()))
   const [tentativeEndDateTemp, setTentativeEndDateTemp] = useState(moment(new Date()))
   const [selectedRange, setSelectedRange] = useState([])
   const [rangeCounter, setRangeCounter] = useState(0)
   const [showContractScreen, setShowContractScreen] = useState(false)
   const [submitLabelText, setSubmitLabelText] = useState("Next")
   let tentativeEndDateT = moment(new Date())
   let tentativeStartDateT = moment(new Date())
   let type = "EDIT_DEFINITION"
   const [lastComment, setLastComment] = useState("")
   const [tagDropDown, setTagDropdown] = useState([])
   const [userDropDown, setUserDropdown] = useState([])
   const [userGroupDropDown, setUserGroupDropdown] = useState([])

   const [paymentstages, setPaymentstages] = useState(new Map())
   const [dontConsiderTheseStages, setDontConsiderTheseStages] = useState(new Map())
   const [stageDisplayMap, setStageDisplayMap] = useState(new Map())

   const [languageCSVData, setLanguageCSVData] = useState([])
   const [locationCSVData, setLocationCSVData] = useState([])
   const [currencyCSVData, setCurrencyCSVData] = useState([])
   const [rateCardTypes, setRateCardTypes] = useState([])
   const [isPosterPartnerId, setIsPosterPartnerId] = useState(false)

   const [itemT, setItemT] = useState({})
   // let itemT = {}
   // const setItemT = (ite) => {
   //     itemT = {
   //         ...itemT,
   //         ...ite,
   //     }
   // }
   const [filterSubscriberMinT, setFilterSubscriberMinT] = useState(0)
   const [filterSubscriberMaxT, setFilterSubscriberMaxT] = useState(1000000000)
   const [filterAllSubscriberCountT, setFilterAllSubscriberCountT] = useState(true)
   const [filterLocationsT, setFilterLocationsT] = useState(["ALL"])
   const [filterAllLocationsT, setFilterAllLocationsT] = useState(true)
   const [filterAllLanguagesT, setFilterAllLanguagesT] = useState(true)
   const [filterLanguagesT, setFilterLanguagesT] = useState(["ALL"])
   const [filterAllPlatformsT, setFilterAllPlatformsT] = useState(true)
   const [filterAllUsersT, setFilterAllUsersT] = useState(true)

   const [filterPlatformsT, setFilterPlatformsT] = useState(["ALL"])
   const [filterUsersT, setFilterUsersT] = useState(["ALL"])
   const [filterUserGroupsT, setFilterUserGroupsT] = useState(["ALL"])


   const [filterGenderT, setFilterGenderT] = useState(["ALL"])
   const [filterAllGenderT, setFilterAllGenderT] = useState(true)
   const [filterAllTagsT, setFilterAllTagsT] = useState(true)
   const [filterTagsT, setFilterTagsT] = useState(["ALL"])
   const [filterAgeLimitMinT, setFilterAgeLimitMinT] = useState(0)
   const [filterAgeLimitMaxT, setFilterAgeLimitMaxT] = useState(100)
   const [filterAllAgeLimitT, setFilterAllAgeLimitT] = useState(true)
   const [tagsT, setTagsT] = useState(["ALL"])
   const [userCount, setUserCount] = useState(0)
   const [disableSentRequest, setDisableSentRequest] = useState(false)

   const handleRequestFilterChange = (field, e) => {
      console.log("Into handleRequestFilterChange handleChangeContractIndividuals contracts ", e, field, itemT)
      let prJson = { ...itemT }
      if (field === "isSkipped") {
      } else if (Array.isArray(e)) {
         console.log(" handleRequestFilterChange Handle Change Event1", field, e)
         let fi = e.join(",")
         // setContracts((prevJson) => ({
         //     ...prevJson,
         //     [field]: fi,
         // }));
         //updateContracts(item, field, 'field1', 'field2', fi, '', '', 'field4', 'field5', 'field6', '', '', '')
         prJson = {
            ...prJson,
            [field]: fi
         }
         let field1 = ""
         let field2 = ""
         let val1 = true
         let val2 = e
         let field3 = "test"
         let val3 = 0
         let field4 = ""
         let field5 = ""
         let field6 = ""
         let val4 = true
         let val5 = e
         let val6 = 0
         console.log("handleRequestFilterChange Handle Change Event", itemT)
         console.log("handleRequestFilterChange Value 2 Update", val2)

         switch (field) {
            case "tags":
               field1 = "filterAllTagsT"
               field2 = "tagsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterGender":
               field1 = "filterAllGender"
               field2 = "filterGenderT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterLanguages":
               field1 = "filterAllLanguages"
               field2 = "filterLanguagesT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterLocations":
               field1 = "filterAllLocations"
               field2 = "filterLocationsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterPlatforms":
               field1 = "filterAllPlatforms"
               field2 = "filterPlatformsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterUsers":
               field1 = "filterAllUsers"
               field2 = "filterUsersT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterUserGroups":
               field1 = "filterAllUserGroups"
               field2 = "filterUserGroupsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "filterTags":
               field1 = "filterAllTags"
               field2 = "filterTagsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "followerCountInd":
               field1 = "filterAllSubscriberCount"
               field2 = "filterSubscriberMin"
               field3 = "filterSubscriberMax"
               field4 = "filterAllSubscriberCountT"
               field5 = "filterSubscriberMinT"
               field6 = "filterSubscriberMaxT"
               val2 = e[0]
               val3 = e[1]

               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               val4 = val1
               val5 = e[0]
               val6 = e[1]
               break
            case "ageLimitCountInd":
               field1 = "filterAllAgeLimit"
               field2 = "filterAgeLimitMin"
               field3 = "filterAgeLimitMax"
               field4 = "filterAllAgeLimitT"
               field5 = "filterAgeLimitMinT"
               field6 = "filterAgeLimitMaxT"
               val2 = e[0]
               val3 = e[1]
               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               val4 = val1
               val5 = e[0]
               val6 = e[1]
               break
         }
         console.log("handleRequestFilterChange ContractInvidual setContract Data", val1, val2, val3)
         prJson = {
            ...prJson,
            ...itemT,
            [field1]: val1,
            [field2]: val2,
            [field3]: val3,
            [field4]: val4,
            [field5]: val5,
            [field6]: val6
         }
         setItemT({
            ...itemT,
            ...prJson,
            [field1]: val1,
            [field2]: val2,
            [field3]: val3,
            [field4]: val4,
            [field5]: val5,
            [field6]: val6
         })
         console.log("handleRequestFilterChange JobUpdates into itemT", itemT)
         switch (field) {
            case "tags":
               setFilterTagsT(prJson.filterTagsT)
               break
            case "filterGender":
               setFilterGenderT(prJson.filterGenderT)
               break
            case "filterLanguages":
               setFilterLanguagesT(prJson.filterLanguagesT)
               break
            case "filterLocations":
               setFilterLocationsT(prJson.filterLocationsT)
               break
            case "filterPlatforms":
               setFilterPlatformsT(prJson.filterPlatformsT)
               break
            case "filterUsers":
               setFilterUsersT(prJson.filterUsersT)
               break
            case "filterUserGroups":
               setFilterUserGroupsT(prJson.filterUserGroupsT)
               break
            case "filterTags":
               setFilterTagsT(prJson.filterTagsT)
               break
            case "followerCountInd":
               field1 = "filterAllSubscriberCount"
               field2 = "filterSubscriberMin"
               field3 = "filterSubscriberMax"
               val2 = e[0]
               val3 = e[1]
               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               setFilterAllSubscriberCountT(val1)
               setFilterSubscriberMinT(val2)
               setFilterSubscriberMaxT(val3)
               break
            case "ageLimitCountInd":
               field1 = "filterAllAgeLimit"
               field2 = "filterAgeLimitMin"
               field3 = "filterAgeLimitMax"
               val2 = e[0]
               val3 = e[1]
               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               setFilterAllAgeLimitT(val1)
               setFilterAgeLimitMinT(val2)
               setFilterAgeLimitMaxT(val3)
               break
         }
      } else {
         console.log("handleRequestFilterChange Handle Change Event1", field, e)
         console.log("handleRequestFilterChange Handle Change Event", field, e.target.value)
         console.log("handleRequestFilterChange Handle Change Event", prJson)
         prJson = {
            ...prJson,
            ...itemT,
            [field]: e.target.value
         }
         setItemT({
            ...itemT,
            ...prJson,
            [field]: e.target.value
         })
      }
      console.log("handleRequestFilterChange Update Filter to User Count", prJson)
      updateShowntoUserCount(prJson)
   }

   const updateShowntoUserCount = async (prJson) => {
      let jobDefinition1 = {}
      if (prJson != undefined) {
         jobDefinition1 = prJson
      } else {
         jobDefinition1 = itemT
      }

      console.log("Handle Change Event updateShowntoUserCount", jobDefinition1)
      if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != "ALL") {
         console.log("Into Job Definition1 User List", jobDefinition1)
         setUserCount(jobDefinition1.filterUsersT.length)
      } else {
         let searchCriteria1 = [
            {
               field: "documentType",
               value: "PARTNER_TAG",
               operator: "==",
               logical: "AND"
            }
         ]

         if (
            jobDefinition1.filterPlatformsT != undefined &&
            jobDefinition1.filterPlatformsT.length > 0 &&
            jobDefinition1.filterPlatformsT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "platforms",
               termField: "platforms",
               operator: "LIKE",
               termValue: jobDefinition1.filterPlatformsT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterTagsT != undefined && jobDefinition1.filterTagsT.length > 0 && jobDefinition1.filterTagsT[0] != "ALL") {
            searchCriteria1.push({
               field: "tags",
               termField: "tags",
               operator: "LIKE",
               termValue: jobDefinition1.filterTagsT,
               logical: "AND"
            })
         }
         let serRequest = {}
         if (jobDefinition1.filterUserGroupsT != undefined && jobDefinition1.filterUserGroupsT.length > 0 && jobDefinition1.filterUserGroupsT[0] != "ALL") {
            serRequest = {
               userGroupSearch: true,
               userGroupIds: jobDefinition1.filterUserGroupsT
            }

         }
         if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != "ALL") {
            searchCriteria1.push({
               field: "partnerId",
               //"termField": "partnerId",
               operator: "in",
               value: jobDefinition1.filterUsersT,
               logical: "AND"
            })
         }
         if (
            jobDefinition1.filterLanguagesT != undefined &&
            jobDefinition1.filterLanguagesT.length > 0 &&
            jobDefinition1.filterLanguagesT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "languages",
               termField: "languages",
               operator: "LIKE",
               termValue: jobDefinition1.filterLanguagesT,
               logical: "AND"
            })
         }
         if (
            jobDefinition1.filterLocationsT != undefined &&
            jobDefinition1.filterLocationsT.length > 0 &&
            jobDefinition1.filterLocationsT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "locations",
               termField: "locations",
               operator: "LIKE",
               termValue: jobDefinition1.filterLocationsT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterGenderT != undefined && jobDefinition1.filterGenderT.length > 0 && jobDefinition1.filterGenderT[0] != "ALL") {
            searchCriteria1.push({
               field: "gender",
               termField: "gender",
               operator: "LIKE",
               termValue: jobDefinition1.filterGenderT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterAgeLimitMinT != undefined) {
            searchCriteria1.push({
               field: "minAge",
               operator: ">=",
               value: jobDefinition1.filterAgeLimitMinT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterAgeLimitMaxT != undefined) {
            searchCriteria1.push({
               field: "maxAge",
               operator: "<=",
               value: jobDefinition1.filterAgeLimitMaxT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterSubscriberMinT != undefined) {
            searchCriteria1.push({
               field: "totalFollowers",
               operator: ">=",
               value: jobDefinition1.filterSubscriberMinT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterSubscriberMaxT != undefined) {
            searchCriteria1.push({
               field: "totalFollowers",
               operator: "<=",
               value: jobDefinition1.filterSubscriberMaxT,
               logical: "AND"
            })
         }

         const j = await userService.fetchUserTagsCount({
            ...serRequest,
            from: 0,
            size: 100,
            searchCriteria: searchCriteria1
         })
         console.log("User Count ", j)
         if (j?.data?.message?.count != undefined) {
            setUserCount(j?.data?.message?.count)
            console.log("User Count Into ", j)
         } else {
            setUserCount(0)
            console.log("User Count Into ", j)
         }
      }
   }

   const updateSendRequestPoster = async (prJson) => {
      let jobDefinition1 = {}
      if (prJson != undefined) {
         jobDefinition1 = prJson
      } else {
         jobDefinition1 = itemT
      }
      setisUpdating(true)
      console.log("Into Send Request Is Updating updateSendRequestPoster Handle Change Event updateShowntoUserCount", jobDefinition1, isUpdating, true)
      if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != "ALL") {
         console.log("updateSendRequestPoster  Into Job Definition1 User List", jobDefinition1)
         //setUserCount(jobDefinition1.filterUsersT.length)
         let searchCriteria1 = [
            {
               field: "documentType",
               value: "PARTNER_TAG",
               operator: "==",
               logical: "AND"
            }
         ]
         if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != "ALL") {
            searchCriteria1.push({
               field: "partnerId",
               // "termField": "partnerId",
               operator: "in",
               value: jobDefinition1.filterUsersT,
               logical: "AND"
            })
         }

         let searchRequest = {
            from: 0,
            size: 100,
            searchCriteria: searchCriteria1
         }
         let payload = {
            searchRequest: searchRequest,
            jobDefinitionId: id
         }
         console.log("User Count Payloads ", payload)
         const j = await jobsService.generateJobRequestPoster(payload)
         console.log("User Count ", j)
         //Handle Correct Condition
         if (j?.data?.message?.count != undefined) {
            //setUserCount(j?.data?.message?.count)
            console.log("User Count Into ", j)
         } else {
            //setUserCount(0)
            console.log("User Count Into ", j)
         }
      } else {
         let searchCriteria1 = [
            {
               field: "documentType",
               value: "PARTNER_TAG",
               operator: "==",
               logical: "AND"
            }
         ]

         if (
            jobDefinition1.filterPlatformsT != undefined &&
            jobDefinition1.filterPlatformsT.length > 0 &&
            jobDefinition1.filterPlatformsT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "platforms",
               termField: "platforms",
               operator: "LIKE",
               termValue: jobDefinition1.filterPlatformsT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterTagsT != undefined && jobDefinition1.filterTagsT.length > 0 && jobDefinition1.filterTagsT[0] != "ALL") {
            searchCriteria1.push({
               field: "tags",
               termField: "tags",
               operator: "LIKE",
               termValue: jobDefinition1.filterTagsT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != "ALL") {
            searchCriteria1.push({
               field: "partnerId",
               //"termField": "partnerId",
               operator: "in",
               value: jobDefinition1.filterUsersT,
               logical: "AND"
            })
         }
         let serRequest = {}
         if (jobDefinition1.filterUserGroupsT != undefined && jobDefinition1.filterUserGroupsT.length > 0 && jobDefinition1.filterUserGroupsT[0] != "ALL") {
            serRequest = {
               userGroupSearch: true,
               userGroupIds: jobDefinition1.filterUserGroupsT
            }

         }
         if (
            jobDefinition1.filterLanguagesT != undefined &&
            jobDefinition1.filterLanguagesT.length > 0 &&
            jobDefinition1.filterLanguagesT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "languages",
               termField: "languages",
               operator: "LIKE",
               termValue: jobDefinition1.filterLanguagesT,
               logical: "AND"
            })
         }
         if (
            jobDefinition1.filterLocationsT != undefined &&
            jobDefinition1.filterLocationsT.length > 0 &&
            jobDefinition1.filterLocationsT[0] != "ALL"
         ) {
            searchCriteria1.push({
               field: "locations",
               termField: "locations",
               operator: "LIKE",
               termValue: jobDefinition1.filterLocationsT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterGenderT != undefined && jobDefinition1.filterGenderT.length > 0 && jobDefinition1.filterGenderT[0] != "ALL") {
            searchCriteria1.push({
               field: "gender",
               termField: "gender",
               operator: "LIKE",
               termValue: jobDefinition1.filterGenderT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterAgeLimitMinT != undefined) {
            searchCriteria1.push({
               field: "minAge",
               operator: ">=",
               value: jobDefinition1.filterAgeLimitMinT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterAgeLimitMaxT != undefined) {
            searchCriteria1.push({
               field: "maxAge",
               operator: "<=",
               value: jobDefinition1.filterAgeLimitMaxT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterSubscriberMinT != undefined) {
            searchCriteria1.push({
               field: "totalFollowers",
               operator: ">=",
               value: jobDefinition1.filterSubscriberMinT,
               logical: "AND"
            })
         }
         if (jobDefinition1.filterSubscriberMaxT != undefined) {
            searchCriteria1.push({
               field: "totalFollowers",
               operator: "<=",
               value: jobDefinition1.filterSubscriberMaxT,
               logical: "AND"
            })
         }
         let searchRequest = {
            ...serRequest,
            from: 0,
            size: 100,
            searchCriteria: searchCriteria1
         }
         const j = await jobsService.generateJobRequestPoster({
            searchRequest: searchRequest,
            jobDefinitionId: id
         })
         console.log("User Count ", j)
         //Handle Correct Condition
         if (j?.data?.message?.count != undefined) {
            //setUserCount(j?.data?.message?.count)
            console.log("User Count Into ", j)
         } else {
            //setUserCount(0)
            console.log("User Count Into ", j)
         }
      }
      console.log("Updating false")
      setisUpdating(false)
   }

   useEffect(() => {
      //if (subType != undefined && (subType === 'JOB_DETAILS_JOB' || subType === 'JOB_DETAILS_JOB_DETAILS' || subType === 'JOB_DETAILS_JOB_REQUEST' || subType === 'JOB_DETAILS_JOB_REVIEW')) {
      const fetchBasicDetails = async () => {
         console.log("Into first UserEffect")
         //Dataimport.fetchDataAndImport()
         setLocationCSVData(JSON.parse(localStorage.getItem("location")))
         console.log("Location Data Json : ", JSON.parse(localStorage.getItem("location")))
         console.log("Location Data : ", locationCSVData)
         setLanguageCSVData(JSON.parse(localStorage.getItem("languages")))
         console.log("language Data Json : ", JSON.parse(localStorage.getItem("languages")))
         console.log("Language Data : ", languageCSVData)
         setCurrencyCSVData(JSON.parse(localStorage.getItem("currency")))
         console.log("Currency Data : ", currencyCSVData)
         console.log("currencyCSVData Data Json : ", JSON.parse(localStorage.getItem("currency")))
         setRateCardTypes(JSON.parse(localStorage.getItem("LocalStorage_rateCardTypeToInputFields")))
         console.log("RateCardTypes : ", rateCardTypes)

         setPlatformDropdown(JSON.parse(localStorage.getItem("platforms")))
         setTagDropdown(JSON.parse(localStorage.getItem("categories")))

         //TODO : Populate User DropDown.

         let payload = {
            userGroupSearch: true
         }
         let rs = await userService.fetchUserGroups(payload)
         console.log("Fetch User Groups", rs)
         let userGroupss = rs?.data?.message
         console.log("Into Users", userGroupss)
         if (userGroupss != undefined) {
            let userSetup = []
            userGroupss.forEach((item) => {
               userSetup.push({
                  value: item.userGroupId,
                  label: item.userGroupName,
                  image: 'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Group.jpeg',
               })
            })
            console.log("Into Users", userSetup)
            setUserGroupDropdown(userSetup)
         }

         //let rsgrs = await userService.fetchUsers()
         let rsgrs = {}
         console.log("Fetch Users", rsgrs)
         let users = rsgrs?.data?.message
         console.log("Into Users", users)
         if (users != undefined) {
            let userSetup = []
            users.forEach((item) => {
               if ( !(item.firstName === undefined && item.lastName === undefined )) {
               userSetup.push({
                  value: item.partnerId,
                  label: ((item.firstName === undefined) ? "" : item.firstName) + " " + ((item.lastName === undefined) ? "" : item.lastName),
                  image:
                     item.userPictureLink === undefined
                        ? "https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png"
                        : item.userPictureLink,
                  platforms: item.stakeHolderType,
                  category: item.preferredLanguage
               })
            }
            })
            console.log("Into Users", userSetup)
            setUserDropdown(userSetup)
         }

         let ps = new Map(Object.entries(JSON.parse(localStorage.getItem("paymentstages"))))
         console.log("fetch all data  paymentstages", ps)
         setPaymentstages(ps)
         let dc = new Map(Object.entries(JSON.parse(localStorage.getItem("dontConsiderTheseStages"))))
         console.log("fetch all data  dontConsiderTheseStages", dc)
         setDontConsiderTheseStages(dc)
         let sd = new Map(Object.entries(JSON.parse(localStorage.getItem("stageDisplayMap"))))
         console.log("fetch all data  stageDisplayMap", sd)
         setStageDisplayMap(sd)

         console.log("fetch all data paymentstages", paymentstages.size)
         console.log("fetch all data  dontConsiderTheseStages", dontConsiderTheseStages.size)
         console.log("fetch all data  setStageDisplayMap", stageDisplayMap.size)
      }

      fetchBasicDetails()
   }, [])
   let myPartnerId1 = myPartnerId()
   useEffect(() => {
      const getObjectFieldValue = (object, fieldName) => {
         if (fieldName in object) {
            return object[fieldName]
         } else {
            return undefined
         }
      }

      const fetchJobDetails = async () => {
         console.log("Sub Types1 : ", subType)
         if (!(paymentstages.size > 0 && dontConsiderTheseStages.size > 0 && stageDisplayMap.size > 0)) {
            return ""
         }
         let job = []
         let def = {}
         let res = {}
         //let id = "000000000000000000"
         console.log("Sub Types : ", subType)
         if (subType === "JOB_DETAILS_JOB_DEFINITION") {
            //res = await listService.fetchDefinition(id)
            res = data
            console.log("Jobs Details res", res)
            job = res?.data?.message?.jobDefinitionBOs
            console.log("Jobs Details", job)
            def = job[0]
            id = def.jobDefinitionId
            def.jobRequests = res?.data?.message?.jobRequests
            if (!(def.jobRequests === undefined || def.jobRequests.length === 0)) {
               setDisableSentRequest(true)
            }
         } else if (subType === "JOB_DETAILS_JOB") {
            //res = await listService.fetchJob(id)
            res = data
            console.log("JOB_DETAILS_JOB res ", res)
            job = res?.data?.message?.jobBOs
            def = job[0]
            id = def.jobId
         } else if (subType === "JOB_DETAILS_JOB_REVIEW") {
            //res = await listService.fetchJob(id)
            res = data
            job = res?.data?.message?.jobBOs
            def = job[0]
            id = def.jobId
         } else if (subType === "JOB_DETAILS_JOB_REQUEST") {
            //res = await listService.fetchJobRequest(id)
            res = data
            job = res?.data?.message?.jobRequestBOs
            def = job[0]
            id = def.jobRequestId
            if ((def.actionReqiredBy === "ACCEPTOR" && myPartnerId1 === def.acceptorPartnerId) || (def.actionReqiredBy === "POSTER" && myPartnerId1 === def.posterPartnerId)) {
               def.canPerformAction = true
            } else {
               def.canPerformAction = false
            }

            console.log("JOB_DETAILS_JOBRequest  ", def)

         }
         if (def.lastComment != undefined) {
            setLastComment(def.lastComment)
         }

         if (def.posterPartnerId != myPartnerId1 && def.acceptorPartnerId != myPartnerId1) {
            myPartnerId1 = def.acceptorPartnerId
         }
         if (def.posterPartnerId === myPartnerId1) {
            setIsPosterPartnerId(true)
         }
         //TODO : Remove
         // def.status = 'INPROGRESS'
         //TODO : REMOVE ABOVE
         if (def.amount === undefined || def.amount === 0) {
            def.amount = 1000000
         }
         def.amountT = def.amount / 100
         if (def.shownToAllSubscriberCount === undefined || def.shownToAllSubscriberCount === true) {
            def.shownToSubscriberMin = 0
            def.shownToSubscriberMax = 1000000000
         }

         if (def.shownToAllLocations === undefined || def.shownToAllLocations === true) {
            def.shownToLocations = "ALL"
         }

         if (def.shownToAllLanguages === undefined || def.shownToAllLanguages === true) {
            def.shownToLanguages = "ALL"
         }

         if (def.shownToAllPlatforms === undefined || def.shownToAllPlatforms === true) {
            def.shownToPlatforms = "ALL"
         }
         if (def.shownToAllAgeLimit === undefined || def.shownToAllAgeLimit === true) {
            def.shownToAgeLimitMin = 0
            def.shownToAgeLimitMax = 100
         }

         if (def.shownToAllGender === undefined || def.shownToAllGender === true) {
            def.shownToGender = "ALL"
         }
         if (def.shownToAllTags === undefined || def.shownToAllTags === true) {
            def.shownToTags = "ALL"
         }
         let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
         const stageMap = (stageBOs === undefined) ? new Map() : new Map(Object.entries(stageBOs))
         let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
         let contractMap = new Map()
         if (contractBOs === undefined) {
            contractMap = new Map()
         } else {
            contractMap = new Map(Object.entries(contractBOs))
         }

         let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
         const contractGroupMap = new Map(Object.entries(contractGroupBOs))
         console.log(def)
         const currentTimestamp = new Date().getTime()
         if (stageMap.size > 0) {
            // Convert the array into a map of arrays
            console.log("EDIT_DEFINITION Into Stage", stageMap.size)
            let contracts = stageMap
            const convertedMap = new Map()
            //Split workflowStage/ PaymentStage.
            contracts.forEach((item) => {
               if (!convertedMap.has(item.contractId)) {
                  convertedMap.set(item.contractId, new Map())
                  convertedMap.get(item.contractId).set("WORKFLOW", [])
                  convertedMap.get(item.contractId).set("PAYMENT", [])
               }
               let id = item.contractId
               console.log(
                  "EDIT_DEFINITION Stage Id ",
                  item.stageId,
                  item.jobContractStageMappingID,
                  stageDisplayMap.has(item.stageId.toString()),
                  stageDisplayMap.get(item.stageId.toString())?.ShowInJOB_DEFINITION
               )
               console.log("EDIT_DEFINITION stage Map", stageDisplayMap)
               console.log("EDIT_DEFINITION Stage consider ", dontConsiderTheseStages.has(item.stageId.toString()))
               if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if (paymentstages.has(item.stageId.toString()) && !dontConsiderTheseStages.has(item.stageId.toString())) {
                     console.log("EDIT_DEFINITION Stage Id into ", item.stageId.toString(), item.jobContractStageMappingID)
                     console.log("EDIT_DEFINITION Stage DisplayMap ", stageDisplayMap.get(item.stageId.toString()))

                     if (stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData != undefined) {
                        item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                        if (item.currency === undefined) {
                           item.currency = "INR"
                        }
                        if (item.amount === undefined) {
                           item.amount = 1000000
                        }
                        item.isPaymentStage = true
                        item.canPerformAction = def.canPerformAction
                        convertedMap.get(id).get("PAYMENT").push(item)
                     }
                  } else if (!dontConsiderTheseStages.has(item.stageId.toString())) {
                     console.log("EDIT_DEFINITION Stage Id WorkFlow into ", item.stageId.toString(), item.jobContractStageMappingID)
                     console.log("EDIT_DEFINITION Stage WorkFlow into ", stageDisplayMap)

                     console.log("EDIT_DEFINITION Stage DisplayMap ", stageDisplayMap.get(item.stageId.toString()))
                     if (stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData != undefined) {
                        item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                        item.isPaymentStage = false
                        item.canPerformAction = def.canPerformAction
                        convertedMap.get(id).get("WORKFLOW").push(item)
                     }
                  }
               }
            })

            if (subType === "JOB_DETAILS_JOB_DEFINITION" && myPartnerId1 != jobDefinition.posterPartnerId) {
               let contracts1 = contractMap
               let contractId = ""
               contracts1.forEach((item) => {
                  if (item != null && item.jobContractGroupID != null) {
                     contractId = item.contractID
                  }
               })
               contracts.forEach((ite) => {
                  if (contractId === ite.contractId) {
                     let item = {
                        ...ite,
                        contractId: currentTimestamp,
                        stageMappingID: "000000000000000000"
                     }

                     if (!convertedMap.has(item.contractId)) {
                        convertedMap.set(item.contractId, new Map())
                        convertedMap.get(item.contractId).set("WORKFLOW", [])
                        convertedMap.get(item.contractId).set("PAYMENT", [])
                     }
                     let id = item.contractId
                     console.log(
                        "EDIT_DEFINITION Stage Id ",
                        item.stageId,
                        item.jobContractStageMappingID,
                        stageDisplayMap.has(item.stageId.toString()),
                        stageDisplayMap.get(item.stageId.toString())?.ShowInJOB_DEFINITION
                     )
                     console.log("EDIT_DEFINITION stage Map", stageDisplayMap)
                     console.log("EDIT_DEFINITION Stage consider ", dontConsiderTheseStages.has(item.stageId.toString()))
                     if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                        if (paymentstages.has(item.stageId.toString()) && !dontConsiderTheseStages.has(item.stageId.toString())) {
                           console.log("EDIT_DEFINITION Stage Id into ", item.stageId.toString(), item.jobContractStageMappingID)
                           console.log("EDIT_DEFINITION Stage DisplayMap ", stageDisplayMap.get(item.stageId.toString()))

                           if (stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData != undefined) {
                              item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                              if (item.currency === undefined) {
                                 item.currency = "INR"
                              }
                              if (item.amount === undefined) {
                                 item.amount = 1000000
                              }
                              item.isPaymentStage = true
                              convertedMap.get(id).get("PAYMENT").push(item)
                           }
                        } else if (!dontConsiderTheseStages.has(item.stageId.toString())) {
                           console.log("EDIT_DEFINITION Stage Id WorkFlow into ", item.stageId.toString(), item.jobContractStageMappingID)
                           console.log("EDIT_DEFINITION Stage WorkFlow into ", stageDisplayMap)

                           console.log("EDIT_DEFINITION Stage DisplayMap ", stageDisplayMap.get(item.stageId.toString()))
                           if (stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData != undefined) {
                              item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                              item.isPaymentStage = false
                              convertedMap.get(id).get("WORKFLOW").push(item)
                           }
                        }
                     }
                  }
               })
            }
            console.log("Stage Convertible Map", convertedMap)
            setStages(convertedMap)
         }

         if (contractMap.size > 0) {
            console.log("EDIT_DEFINITION Into contractMap", contractMap.size)

            let contracts = contractMap

            const convertedMap = new Map()
            const convMap = new Map()
            const staticConvMap = new Map()
            const staticConvertedMap = new Map()
            // Convert the array into a map of arrays
            if (subType === "JOB_DETAILS_JOB_REQUEST") {
               contracts.forEach((item) => {
                  if (item != null && item.jobContractGroupID != null) {
                     if (myPartnerId1 === def.acceptorPartnerId || myPartnerId1 === def.posterPartnerId) {
                        console.log(
                           "Into Contracts With Iteration contractId ",
                           item.contractID,
                           def.acceptorReqWorkFlowContractId,
                           def.posterReqWorkFlowContractId
                        )
                        if (item.contractID === def.acceptorReqWorkFlowContractId || item.contractID === def.posterReqWorkFlowContractId) {
                           console.log("Into Contracts With Iteration", item)
                           let isStaticUpdated = false
                           if (myPartnerId1 === def.acceptorPartnerId && item.contractID === def.acceptorReqWorkFlowContractId) {
                              if (!convertedMap.has(item.jobContractGroupID)) {
                                 convertedMap.set(item.jobContractGroupID, [])
                              }
                              convMap.set(item.contractID, item)
                              //item.copyFromContractID = item.contractID
                              let id = item.jobContractGroupID
                              convertedMap.get(id).push(item)

                           } else if (myPartnerId1 === def.acceptorPartnerId && item.contractID === def.posterReqWorkFlowContractId) {
                              if (!staticConvertedMap.has(item.jobContractGroupID)) {
                                 staticConvertedMap.set(item.jobContractGroupID, [])
                              }
                              staticConvMap.set(item.contractID, item)
                              //item.copyFromContractID = item.contractID
                              let id = item.jobContractGroupID
                              setStaticContract({ ...item })
                              staticConvertedMap.get(id).push(item)
                              isStaticUpdated = true
                           } else if (myPartnerId1 === def.posterPartnerId && item.contractID === def.acceptorReqWorkFlowContractId) {
                              if (!staticConvertedMap.has(item.jobContractGroupID)) {
                                 staticConvertedMap.set(item.jobContractGroupID, [])
                              }
                              staticConvMap.set(item.contractID, item)
                              //item.copyFromContractID = item.contractID
                              let id = item.jobContractGroupID
                              setStaticContract({ ...item })
                              staticConvertedMap.get(id).push(item)
                              isStaticUpdated = true
                           } else if (myPartnerId1 === def.posterPartnerId && item.contractID === def.posterReqWorkFlowContractId) {
                              if (!convertedMap.has(item.jobContractGroupID)) {
                                 convertedMap.set(item.jobContractGroupID, [])
                              }
                              convMap.set(item.contractID, item)
                              //item.copyFromContractID = item.contractID
                              let id = item.jobContractGroupID
                              convertedMap.get(id).push(item)
                           }
                           if (item.contractID === def.posterReqWorkFlowContractId && def.acceptorReqWorkFlowContractId === def.posterReqWorkFlowContractId) {
                              if (isStaticUpdated) {
                                 if (!convertedMap.has(item.jobContractGroupID)) {
                                    convertedMap.set(item.jobContractGroupID, [])
                                 }
                                 convMap.set(item.contractID, item)
                                 //item.copyFromContractID = item.contractID
                                 let id = item.jobContractGroupID
                                 convertedMap.get(id).push(item)
                              } else {
                                 if (!staticConvertedMap.has(item.jobContractGroupID)) {
                                    staticConvertedMap.set(item.jobContractGroupID, [])
                                 }
                                 staticConvMap.set(item.contractID, item)
                                 //item.copyFromContractID = item.contractID
                                 let id = item.jobContractGroupID
                                 setStaticContract({ ...item })
                                 staticConvertedMap.get(id).push(item)
                                 isStaticUpdated = true
                              }
                           }
                        }
                     }
                  }
               })
            } else {
               contracts.forEach((item) => {
                  if (item != null && item.jobContractGroupID != null) {
                     if (!convertedMap.has(item.jobContractGroupID)) {
                        convertedMap.set(item.jobContractGroupID, [])
                     }
                     convMap.set(item.contractID, item)
                     //item.copyFromContractID = item.contractID

                     let id = item.jobContractGroupID
                     convertedMap.get(id).push(item)
                  }
               })
               if (subType === "JOB_DETAILS_JOB_DEFINITION" && myPartnerId1 != jobDefinition.posterPartnerId) {
                  contracts.forEach((itr) => {
                     let item = { ...itr }
                     if (item != null && item.jobContractGroupID != null) {
                        if (!staticConvertedMap.has(item.jobContractGroupID)) {
                           staticConvertedMap.set(item.jobContractGroupID, [])
                        }
                        item.copyFromContractID = item.contractID
                        item.contractID = currentTimestamp
                        staticConvMap.set(item.contractID, item)
                        let id = item.jobContractGroupID

                        setStaticContract({ ...item })
                        staticConvertedMap.get(id).push(item)
                     }
                  })
               }
            }
            console.log("Contracts Edit Definition", convertedMap)
            setContracts(convertedMap)
            setContractsInd(convMap)
            setStaticContracts(staticConvertedMap)
            setStaticContractsInd(staticConvMap)
         }
         if (contractGroupMap.size > 0) {
            console.log("EDIT_DEFINITION Into contractGroupMap", contractGroupMap.size)

            let contracts = contractGroupMap
            const convertedMap = new Map()

            contracts.forEach((item, key) => {
               console.log("EDIT_DEFINITION Into contractGroupMap", contractGroupMap.size)

               if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                     convertedMap.set(item.contractGroupID, [])
                  }
                  let id = item.contractGroupID
                  convertedMap.get(id).push(item)
               }
            })
            setcontractGroups(convertedMap)
         }
         if (subType === "JOB_DETAILS_JOB") {
            let currentSage = def.currentStage
            if (currentSage.stageId != undefined) {
               console.log("Current Stage", currentSage)
               let details = stageDisplayMap.get(currentSage.stageId.toString()).StatusToStageUIData
               currentSage.stageDisplayDetails = getObjectFieldValue(details, currentSage.stageStatus)
               setCurrentStage(currentSage)
               console.log("curreent Stage State", currentSage)
            }
         }
         if (myPartnerId1 === def.acceptorPartnerId) {
            setIsAcceptorPartnerId(true)
         } else {
            setIsAcceptorPartnerId(false)
         }
         setJobDefinition(def)
         setJobDefinitionId(id)

         let tagsT = []
         let shownToSubscriberMinT = 0
         let shownToSubscriberMaxT = 1000000000
         let shownToAllSubscriberCountT = true
         let shownToLocationsT = ["ALL"]
         let shownToAllLocationsT = true
         let shownToAllLanguagesT = true
         let shownToLanguagesT = ["ALL"]
         let shownToAllPlatformsT = true
         let shownToPlatformsT = ["ALL"]
         let shownToGenderT = ["ALL"]
         let shownToAllGenderT = true
         let shownToAllTagsT = true
         let shownToTagsT = ["ALL"]
         let shownToAgeLimitMinT = 0
         let shownToAgeLimitMaxT = 100
         let shownToAllAgeLimitT = true
         let tentativeStartDateM = new Date()
         let tentativeEndDateM = new Date()
         tentativeEndDateM.setDate(tentativeEndDateM.getDate() + 30)
         tentativeEndDateT = moment(tentativeEndDateM)
         tentativeStartDateT = moment(tentativeStartDateM)
         setRangeCounter(rangeCounter + 1)
         if (def.shownToSubscriberMin != undefined && def.shownToSubscriberMin != null && def.shownToSubscriberMin > 0) {
            shownToSubscriberMinT = def.shownToSubscriberMin
         }

         if (def.shownToSubscriberMax != undefined && def.shownToSubscriberMax != null && def.shownToSubscriberMax > 0) {
            shownToSubscriberMaxT = def.shownToSubscriberMax
         }

         if (!(shownToSubscriberMinT === 0 && shownToSubscriberMaxT === 1000000000)) {
            shownToAllSubscriberCountT = false
         }

         if (def.shownToLocations != undefined && def.shownToLocations != null) {
            shownToLocationsT = def.shownToLocations.split(",")
         }
         if (def.shownToLocations != undefined && def.shownToLocations != null && def.shownToLocations != "ALL") {
            shownToAllLocationsT = false
         }

         if (def.shownToLanguages != undefined && def.shownToLanguages != null) {
            shownToLanguagesT = def.shownToLanguages.split(",")
         }
         if (def.shownToLanguages != undefined && def.shownToLanguages != null && def.shownToLanguages != "ALL") {
            shownToAllLanguagesT = false
         }
         if (def.shownToPlatforms != undefined && def.shownToPlatforms != null) {
            shownToPlatformsT = def.shownToPlatforms.split(",")
         }
         if (def.shownToPlatforms != undefined && def.shownToPlatforms != null && def.shownToPlatforms != "ALL") {
            shownToAllPlatformsT = false
         }

         console.log("Gender OUT::: ", def)

         if (def.shownToGender != undefined && def.shownToGender != null) {
            shownToGenderT = def.shownToGender.split(",")
         }

         if (def.shownToGender != undefined && def.shownToGender != null && def.shownToGender != "ALL") {
            shownToAllGenderT = false
         }
         console.log("Tags out::: ", def)
         if (def.tags != undefined && def.tags != null) {
            console.log("Tags ::: ", def.tags)
            tagsT = def.tags.split(",")
            console.log("Tags T ::: ", tagsT)
         }

         if (def.shownToTags != undefined && def.shownToTags != null) {
            shownToTagsT = def.shownToTags.split(",")
         }

         if (def.shownToTags != undefined && def.shownToTags != null && def.shownToTags != "ALL") {
            shownToAllTagsT = false
         }

         if (def.shownToAgeLimitMin != undefined && def.shownToAgeLimitMin != null && def.shownToAgeLimitMin > 0) {
            shownToAgeLimitMinT = def.shownToAgeLimitMin
         }

         if (def.shownToAgeLimitMax != undefined && def.shownToAgeLimitMax != null && def.shownToAgeLimitMax > 0) {
            shownToAgeLimitMaxT = def.shownToAgeLimitMax
         }

         if (!(shownToAgeLimitMinT === 0 && shownToAgeLimitMaxT === 1000000000)) {
            shownToAllAgeLimitT = false
         }

         if (!(def.tentativeStartDate === null || def.tentativeStartDate === undefined || new Date(def.tentativeStartDate).getFullYear() <= 2022)) {
            tentativeStartDateM = new Date(def.tentativeStartDate)
         }
         if (!(def.tentativeEndDate === null || def.tentativeEndDate === undefined || new Date(def.tentativeEndDate).getFullYear() <= 2022)) {
            tentativeEndDateM = new Date(def.tentativeEndDate)
         }
         tentativeEndDateT = moment(tentativeEndDateM)
         tentativeStartDateT = moment(tentativeStartDateM)
         //setRangeCounter(rangeCounter+1)

         setJobDefinition((prevJson) => ({
            ...prevJson,
            ["tagsT"]: tagsT,
            ["shownToTagsT"]: shownToTagsT,
            ["shownToSubscriberMinT"]: shownToSubscriberMinT,
            ["shownToSubscriberMaxT"]: shownToSubscriberMaxT,
            ["shownToAllSubscriberCountT"]: shownToAllSubscriberCountT,
            ["shownToLocationsT"]: shownToLocationsT,
            ["shownToAllLocationsT"]: shownToAllLocationsT,
            ["shownToAllLanguagesT"]: shownToAllLanguagesT,
            ["shownToLanguagesT"]: shownToLanguagesT,
            ["shownToAllPlatformsT"]: shownToAllPlatformsT,
            ["shownToPlatformsT"]: shownToPlatformsT,
            ["shownToGenderT"]: shownToGenderT,
            ["shownToAllGenderT"]: shownToAllGenderT,
            ["shownToAllTagsT"]: shownToAllTagsT,
            ["shownToAgeLimitMinT"]: shownToAgeLimitMinT,
            ["shownToAgeLimitMaxT"]: shownToAgeLimitMaxT,
            ["shownToAllAgeLimitT"]: shownToAllAgeLimitT,
            ["tentativeStartDateM"]: tentativeStartDateM,
            ["tentativeEndDateM"]: tentativeEndDateM,
            ["tentativeEndDateT"]: tentativeEndDateT,
            ["tentativeStartDateT"]: tentativeStartDateT
         }))
         //setTentativeStartDateTemp(tentativeStartDateT)
         //setTentativeEndDateTemp(tentativeEndDateT)
         setSelectedRange([tentativeStartDateT, tentativeEndDateT])
         if (def.status === "INPROGRESS") {
            setIsEditDefinition(false)
         }
         if (def.status === "SAVED") {
            setIsEditDefinition(true)
         }

         //setRangeCounter(rangeCounter+1)

         console.log("jobs_update job Definition", job)
         console.log("jobs_update contract Groups", contractGroups)
         console.log("jobs_update contracts", contracts)
         console.log("jobs_update stages ", stages)
         console.log("jobs_update postType", postType)
         console.log("jobs_update jobDefinitionId", jobDefinitionId)

         //console.log('Type RES : ', res)
      }
      fetchJobDetails()
      updateShowntoUserCount({})
   }, [paymentstages, dontConsiderTheseStages, stageDisplayMap])

   const onFinish = (values) => {
      //console.log('Success:', values);
   }

   const onFinishFailed = (errorInfo) => {
      //console.log('Failed:', errorInfo);
   }

   const handleNextClick = async () => {
      try {
         //const { errors } = await form.validateFields();
         // if (errors) {

         //   return;
         // }
         if (showContractScreen) {
            //SUBMIT - API
            //saveJobDefinition("INPROGRESS")
         }
         //setSubmitLabelText("Submit")
         //setShowContractScreen(true)
      } catch (errorInfo) {
         console.log("Error:", errorInfo)
      }
   }

   const updateJobAction = async () => {
      props.refreshList()
   }

   const handleRenegoniateClick = async () => {
      try {
         setisUpdating(true)
         let contractId = "000000000000000000"
         let stagess = []
         let stageMap = new Map()
         let cloneContract = []
         contracts.forEach((itr) => {
            if (itr != null) {
               let item = { ...itr[0] }
               if (item != null) {
                  console.log("Into Is AcceptorPartnerId Contracts ", item)
                  contractId = item.contractID
                  cloneContract.push(item)
               }
            }
         })
         console.log("Into Send Request ::: ", contractId, stages)
         let wfs = stages.get(contractId).get("WORKFLOW")
         wfs.forEach((itr) => {
            if (itr != null) {
               let item = { ...itr }
               if (item != null) {
                  stagess.push(item)
                  stageMap.set(item.stageMappingID, item)
               }
            }
         })
         let pfs = stages.get(contractId).get("PAYMENT")
         pfs.forEach((itr) => {
            if (itr != null) {
               let item = { ...itr }
               if (item != null) {
                  stagess.push(item)
                  stageMap.set(item.stageMappingID, item)
               }
            }
         })
         cloneContract[0].stageMappingBOs = stagess

         let payload = {
            jobRequestId: jobDefinition.jobRequestId,
            lastComment: commentForRequest,
            stageMappingBOs: mapToObject(stageMap)
         }

         console.log("INTO RENEGOTIATE ", payload)
         let event1 = isAcceptorPartnerId
         let code = id
         console.log(
            "Into RENEGOTIATE Request : ",
            payload,
            event1,
            code,
            jobDefinition.acceptorPartnerId,
            jobDefinition.posterPartnerId,
            jobDefinition,
            stages
         )
         let res = await jobsService.renegotiateJobRequest(payload, event1, jobDefinition.jobRequestId)
         //jobsService.renegotiateJobRequest(payload, event1, jobDefinition.jobRequestId).then((res) => {
         setisUpdating(false)
         console.log("Into RENEGOTIATE Clicked")
         refreshParentList()
         //  })
         //  .catch(() => {
         //    setisUpdating(false)

         // });

         //Call renegoniate for update.
      } catch (errorInfo) {
         console.log("Error:", errorInfo)
         try {
            toast.error(errorInfo, {
               position: "top-right", // You can change the position as per your preference
               autoClose: 5000, // The duration (in milliseconds) the toast should be visible
               hideProgressBar: false, // Set to true if you don't want the progress bar
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined
            })
         } catch (errorB) {

         }
         setisUpdating(false)
      }
   }

   const mapToObject = (map) => {
      const obj = {};
      for (let [key, value] of map) {
         obj[key] = value;
      }
      return obj;
   };

   const refreshParentList = () => {
      props.refreshList()
   }

   const handleRejectClick = async () => {
      try {
         setisUpdating(true)
         let payload = {
            lastComment: commentForRequest
         }
         let event1 = isAcceptorPartnerId
         let code = id

         console.log(
            "Into REJECT Request : ",
            payload,
            event1,
            code,
            jobDefinition.acceptorPartnerId,
            jobDefinition.posterPartnerId,
            jobDefinition.jobRequestId,
            jobDefinition
         )
         let res = await jobsService.rejectJobRequest(payload, event1, jobDefinition.jobRequestId)
         setisUpdating(false)
         console.log("Into REJECT Clicked")
         refreshParentList()
      } catch (errorInfo) {
         console.log("Error:", errorInfo)
         try {
            toast.error(errorInfo, {
               position: "top-right", // You can change the position as per your preference
               autoClose: 5000, // The duration (in milliseconds) the toast should be visible
               hideProgressBar: false, // Set to true if you don't want the progress bar
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined
            })
         } catch (errorB) {

         }
         setisUpdating(false)
      }
   }

   const handleApproveClick = async () => {
      try {
         setisUpdating(true)
         let payload = {
            lastComment: commentForRequest
         }
         let event1 = isAcceptorPartnerId
         let code = id
         console.log(
            "Into Approve Request : ",
            payload,
            event1,
            code,
            jobDefinition.acceptorPartnerId,
            jobDefinition.posterPartnerId,
            jobDefinition.jobRequestId,
            jobDefinition
         )
         let res = await jobsService.approveJobRequest(payload, event1, jobDefinition.jobRequestId)
         setisUpdating(false)
         console.log("Into Approve Clicked")
         refreshParentList()

      } catch (errorInfo) {
         console.log("Error:", errorInfo)
         try {
            toast.error(errorInfo, {
               position: "top-right", // You can change the position as per your preference
               autoClose: 5000, // The duration (in milliseconds) the toast should be visible
               hideProgressBar: false, // Set to true if you don't want the progress bar
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined
            })
         } catch (errorB) {

         }
         setisUpdating(false)
      }
   }

   const handleSendRequest = async (status) => {
      try {
         //const { errors } = await form.validateFields();
         // if (errors) {

         //   return;
         // }
         //TODO : Save API.
         //saveJobDefinition("SAVED")
         if (status === "Edit") {
            // Open Edit Job Definition
            navigate("/post-a-job/EDIT_DEFINITION/" + id)
         } else if (status === "Send_Request") {
            if (isAcceptorPartnerId) {
               //Direct Call
               console.log("Into Is AcceptorPartnerId ", jobDefinition, stages, contracts)

               setisUpdating(true)
               let contractId = "000000000000000000"
               //let convertedMap = new Map()
               let stagess = []
               let cloneContract = []
               contracts.forEach((itr) => {
                  if (itr != null) {
                     let item = { ...itr[0] }
                     if (item != null) {
                        //if (!convertedMap.has(item.contractMasterGroupId)) {
                        //     convertedMap.set(item.contractMasterGroupId, []);
                        //}
                        console.log("Into Is AcceptorPartnerId Contracts ", item)

                        item.contractMakerType = "JOB"
                        item.contractType = "WorkflowContractType"
                        item.copyFromContractID = item.contractID
                        contractId = item.contractID
                        console.log("Into Send Request 1 ::: ", contractId)
                        item.cloneMakerType = "JOB"
                        item.contractID = "000000000000000000"
                        item.jobContractGroupID = "000000000000000000"
                        cloneContract.push(item)
                        //convertedMap.set(item.copyFromContractID, item)
                     }
                  }
               })
               console.log("Into Send Request ::: ", contractId, stages)
               let wfs = stages.get(contractId).get("WORKFLOW")
               wfs.forEach((itr) => {
                  if (itr != null) {
                     let item = { ...itr }
                     if (item != null) {
                        item.stageMappingID = "000000000000000000"
                        item.contractId = "000000000000000000"
                        if (item.stageStatus != "SKIPPED") {
                           item.stageStatus = "PENDING"
                        }
                        stagess.push(item)
                     }
                  }
               })
               let pfs = stages.get(contractId).get("PAYMENT")
               pfs.forEach((itr) => {
                  if (itr != null) {
                     let item = { ...itr }
                     if (item != null) {
                        item.stageMappingID = "000000000000000000"
                        item.contractId = "000000000000000000"
                        if (item.stageStatus != "SKIPPED") {
                           item.stageStatus = "PENDING"
                        }
                        stagess.push(item)
                     }
                  }
               })
               cloneContract[0].stageMappingBOs = stagess

               let payload = {
                  jobDefinitionId: jobDefinition.jobDefinitionId,
                  isCloneRequestByAcceptor: true,
                  cloneContractBOs: cloneContract,
                  acceptorCloneReqWorkFlowContractId: contractId
               }

               console.log("INTO SEND_REQUEST_ACCEPTOR_CLONE_VALUE ", payload)

               jobsService.sendJobRequestAcceptor(payload).then((res) => {
                  refreshParentList()
                  setisUpdating(false)
               })

            } else {
               console.log("Into Is PosterPartnerId ")
               updateSendRequestPoster(itemT)
               //Open Component UserList
            }
         }
      } catch (errorInfo) {
         console.log("handle Send Request Error:", errorInfo)
         try {
            toast.error(errorInfo, {
               position: "top-right", // You can change the position as per your preference
               autoClose: 5000, // The duration (in milliseconds) the toast should be visible
               hideProgressBar: false, // Set to true if you don't want the progress bar
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined
            })
         } catch (errorB) {

         }
         setisUpdating(false)
      }
      // setisUpdating(false)
   }

   // function handleChange(value) {
   //   console.log(`selected ${value}`);
   // }
   const handleChange = (field, e) => {
      if (field === "commentforRequest") {
         setCommentForRequest(e.target.value)
      }
      if (field === "amount") {
         let field1 = "amountT"

         console.log("Handle Change Event1", field, e)
         console.log("Handle Change Event", field, e.target.value)
         setJobDefinition((prevJson) => ({
            ...prevJson,
            [field1]: e.target.value,
            [field]: e.target.value * 100
         }))

         console.log("Handle Change Event", jobDefinition)
      } else if (field === "tentativeDate") {
         console.log("Handle Change Event1", field, e)
         console.log("Handle Change Event startDate", e[0])
         console.log("Handle Change Event EndDate", e[1])
         setJobDefinition((prevJson) => ({
            ...prevJson,
            ["tentativeStartDateT"]: e[0].d,
            ["tentativeStartDateM"]: e[0].toDate(),
            ["tentativeStartDate"]: e[0].toDate().toISOString(),
            ["tentativeEndDateT"]: e[1],
            ["tentativeEndDateM"]: e[1].toDate(),
            ["tentativeEndDate"]: e[1].toDate().toISOString()
         }))
         setSelectedRange([...e])
         //setRangeCounter(rangeCounter+1)

         console.log("Handle Change Event", jobDefinition)
      } else if (Array.isArray(e)) {
         console.log("Handle Change Event1", field, e)
         let fi = e.join(",")
         setJobDefinition((prevJson) => ({
            ...prevJson,
            [field]: fi
         }))
         let field1 = ""
         let field2 = ""
         let val1 = true
         let val2 = e
         let field3 = "test"
         let val3 = 0
         console.log("Handle Change Event", jobDefinition)
         switch (field) {
            case "tags":
               field1 = "shownToAllTestT"
               field2 = "tagsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "shownToGender":
               field1 = "shownToAllGender"
               field2 = "shownToGenderT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "shownToLanguages":
               field1 = "shownToAllLanguages"
               field2 = "shownToLanguagesT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "shownToLocations":
               field1 = "shownToAllLocations"
               field2 = "shownToLocationsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "shownToPlatforms":
               field1 = "shownToAllPlatforms"
               field2 = "shownToPlatformsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "shownToTags":
               field1 = "shownToAllTags"
               field2 = "shownToTagsT"
               if (fi.includes("ALL")) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "followerCount":
               field1 = "shownToAllSubscriberCount"
               field2 = "shownToSubscriberMin"
               field3 = "shownToSubscriberMax"
               val2 = e[0]
               val3 = e[1]
               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
            case "ageLimitCount":
               field1 = "shownToAllAgeLimit"
               field2 = "shownToAgeLimitMin"
               field3 = "shownToAgeLimitMax"
               val2 = e[0]
               val3 = e[1]
               if (e[0] == 0 && e[1] == 1000000000) {
                  val1 = true
               } else {
                  val1 = false
               }
               break
         }

         setJobDefinition((prevJson) => ({
            ...prevJson,
            [field1]: val1,
            [field2]: val2,
            [field3]: val3
         }))
      } else {
         console.log("Handle Change Event1", field, e)
         console.log("Handle Change Event", field, e.target.value)
         setJobDefinition((prevJson) => ({
            ...prevJson,
            [field]: e.target.value
         }))

         console.log("Handle Change Event", jobDefinition)
      }
   }
   // const onChange = (value) => {
   //   console.log('changed', value);
   // };

   return (
      <div style={{ width: '100%' }}>
         <div className="root" style={{ padding: "0", paddingTop: "16px", width: '100%' }}>
            <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical" style={{ padding: "0", paddingTop: "16px", width: '100%' }} >
               {subType === "JOB_DETAILS_JOB_DEFINITION" && myPartnerId1 === jobDefinition.posterPartnerId && (
                  <>
                     <Row gutter={[16, 26]}>
                        <Col
                           xs={{ span: 20, offset: 2 }}
                           sm={{ span: 20, offset: 2 }}
                           md={{ span: 20, offset: 2 }}
                           lg={{ span: 20, offset: 2 }}
                           xl={{ span: 20, offset: 2 }}
                        >
                           <Row style={{ display: "flex", justifyContent: "space-between" }}>
                              <Form.Item
                                 label="Followers"
                                 name="followers"
                                 rules={[
                                    {
                                       required: false,
                                       message: "followers is required"
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    marginTop: "8px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       {console.log("Shown to JobDefinition", jobDefinition)}
                                       <DropDownMinMax
                                          disabled={true}
                                          name="followerCount"
                                          sx={{
                                             fontSize: "14px",
                                             width: "100%",
                                             background: "white",
                                             border: "1px solid #D9D9D9",
                                             borderRadius: "4px"
                                          }}
                                          placeholder="Followers count"
                                          getOptionLabel={(option) => {
                                             return option
                                          }}
                                          options={[
                                             {
                                                min: jobDefinition.shownToSubscriberMinT,
                                                max: jobDefinition.shownToSubscriberMaxT,
                                                value: "0-1000000",
                                                label: "0-1000000"
                                             }
                                          ]}
                                          minimum={jobDefinition.shownToSubscriberMinT}
                                          maximum={jobDefinition.shownToSubscriberMaxT}
                                          onChange={(e) => handleChange("followerCount", e)}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                              <Form.Item
                                 label="Audience Age Limit"
                                 name="ageLimit"
                                 rules={[
                                    {
                                       required: false,
                                       message: "AgeLimit is required"
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    marginTop: "8px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <DropDownMinMax
                                          disabled={true}
                                          name="ageLimitCount"
                                          sx={{
                                             fontSize: "14px",
                                             width: "100%",
                                             background: "white",
                                             border: "1px solid #D9D9D9",
                                             borderRadius: "4px"
                                          }}
                                          placeholder="Age Limit"
                                          getOptionLabel={(option) => {
                                             return option
                                          }}
                                          options={[
                                             {
                                                min: jobDefinition.shownToAgeLimitMinT,
                                                max: jobDefinition.shownToAgeLimitMaxT,
                                                value: jobDefinition.shownToAgeLimitMinT + "" + "-" + jobDefinition.shownToAgeLimitMaxT + "",
                                                label: jobDefinition.shownToAgeLimitMinT + "" + "-" + jobDefinition.shownToAgeLimitMaxT + ""
                                             }
                                          ]}
                                          minimum={jobDefinition.shownToAgeLimitMinT}
                                          maximum={jobDefinition.shownToAgeLimitMaxT}
                                          onChange={(e) => handleChange("ageLimitCount", e)}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                              <Form.Item
                                 label="Language"
                                 name="language"
                                 rules={[
                                    {
                                       required: false,
                                       message: "Language is required"
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    marginTop: "8px"
                                    //marginBottom: '10px',
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       {console.log("Langauge", jobDefinition.shownToLanguagesT)}
                                       <Select
                                          disabled={true}
                                          mode="tags"
                                          style={{ width: "100%" }}
                                          placeholder="language"
                                          onChange={(e) => handleChange("shownToLanguages", e)}
                                          options={languageCSVData}
                                          value={jobDefinition.shownToLanguagesT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                           </Row>
                        </Col>
                     </Row>

                     <Row gutter={[16, 26]} style={{ paddingTop: "16px" }}>
                        <Col
                           xs={{ span: 20, offset: 2 }}
                           sm={{ span: 20, offset: 2 }}
                           md={{ span: 20, offset: 2 }}
                           lg={{ span: 20, offset: 2 }}
                           xl={{ span: 20, offset: 2 }}
                        >
                           <Row style={{ display: "flex", justifyContent: "space-between" }}>
                              <Form.Item
                                 label="Audience Gender"
                                 name="Gender"
                                 rules={[
                                    {
                                       required: false,
                                       message: "Gener is required"
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    marginTop: "8px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       {console.log("Gender", jobDefinition.shownToGenderT)}
                                       <Select
                                          disabled={true}
                                          mode="tags"
                                          style={{ width: "100%" }}
                                          placeholder="Gender"
                                          onChange={(e) => handleChange("shownToGender", e)}
                                          options={[
                                             { value: "MALE", label: "MALE" },
                                             { value: "FEMALE", label: "FEMALE" },
                                             { value: "Trans-Gender", label: "Trans-Gender" },
                                             { value: "ALL", label: "ALL" }
                                          ]}
                                          value={jobDefinition.shownToGenderT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                              <Form.Item
                                 label="Location"
                                 name="location"
                                 rules={[
                                    {
                                       required: false,
                                       message: "Location is required"
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    borderRadius: "10px",
                                    marginTop: "8px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <Select
                                          disabled={true}
                                          mode="tags"
                                          style={{ width: "100%" }}
                                          placeholder="Locations"
                                          onChange={(e) => handleChange("shownToLocations", e)}
                                          options={locationCSVData}
                                          value={jobDefinition.shownToLocationsT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                              <Form.Item
                                 label="Platform"
                                 name="platform"
                                 rules={[
                                    {
                                       required: false
                                    }
                                 ]}
                                 style={{
                                    width: "30%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    //marginBottom: '8px',
                                    marginTop: "8px",
                                    borderRadius: "10px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <Select
                                          disabled={true}
                                          mode="tags"
                                          style={{ width: "100%" }}
                                          placeholder="Platforms"
                                          onChange={(e) => handleChange("shownToPlatforms", e)}
                                          options={platformDropdown}
                                          value={jobDefinition.shownToPlatformsT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                           </Row>
                        </Col>
                     </Row>

                     {/* Tags */}
                     <Row gutter={[16, 26]}>
                        <Col
                           xs={{ span: 20, offset: 2 }}
                           sm={{ span: 20, offset: 2 }}
                           md={{ span: 20, offset: 2 }}
                           lg={{ span: 20, offset: 2 }}
                           xl={{ span: 20, offset: 2 }}
                        >
                           <Row
                              style={{
                                 display: "flex",
                                 justifyContent: "space-between"
                              }}
                           >
                              <Form.Item
                                 label="Categories"
                                 name="shownToTags"
                                 rules={[
                                    {
                                       required: false
                                    }
                                 ]}
                                 style={{
                                    width: "100%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    //marginBottom: '8px',
                                    marginTop: "8px",
                                    borderRadius: "10px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <Select
                                          disabled={true}
                                          mode="tags"
                                          style={{ width: "100%" }}
                                          placeholder="Tags"
                                          onChange={(e) => handleChange("shownToTags", e)}
                                          options={tagDropDown}
                                          value={jobDefinition.shownToTagsT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                           </Row>
                        </Col>
                     </Row>
                     {/* Users */}
                     <Row gutter={[16, 26]}>
                        <Col
                           xs={{ span: 20, offset: 2 }}
                           sm={{ span: 20, offset: 2 }}
                           md={{ span: 20, offset: 2 }}
                           lg={{ span: 20, offset: 2 }}
                           xl={{ span: 20, offset: 2 }}
                        >
                           <Row
                              style={{
                                 display: "flex",
                                 justifyContent: "space-between"
                              }}
                           >
                              <Form.Item
                                 label="Users"
                                 name="shownToUsers"
                                 rules={[
                                    {
                                       required: false
                                    }
                                 ]}
                                 style={{
                                    width: "100%",
                                    background: "rgb(240 240 240)",
                                    padding: "16px",
                                    //marginBottom: '8px',
                                    marginTop: "8px",
                                    borderRadius: "10px"
                                 }}
                              >
                                 <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{
                                       width: "100%"
                                    }}
                                 >
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <MultiSelUserWithLimiFetchComp
                                          isDisabled={true}
                                          style={{ width: "100%" }}
                                          //options={userDropDown}
                                          onSelect={(e) => handleChange("shownToUsers", e)}
                                          value={jobDefinition.shownToUsersT}
                                       />
                                    </Space.Compact>
                                 </Space>
                              </Form.Item>
                           </Row>
                        </Col>
                     </Row>
                  </>
               )}
               {console.log('JobDetailsContractsList', contracts)}
               <Contract1
                  removeHeader={true}
                  rateCardTypes={rateCardTypes}
                  form={form}
                  Form={Form}
                  size={contractsInd.size}
                  type={type}
                  contracts={contracts}
                  setContracts={setContracts}
                  stages={stages}
                  setStages={setStages}
                  isPosterPartnerId={isPosterPartnerId}
                  tagDropDown={tagDropDown}
                  platformDropdown={platformDropdown}
                  languageCSVData={languageCSVData}
                  locationCSVData={locationCSVData}
                  currencyCSVData={currencyCSVData}
                  paymentstages={paymentstages}
                  dontConsiderTheseStages={dontConsiderTheseStages}
                  stageDisplayMap={stageDisplayMap}
                  staticContract={staticContract}
                  subType={subType}
                  isDisabled={true}
               />
               <Row gutter={[16, 26]}>
                  <Col
                     xs={{ span: 20, offset: 2 }}
                     sm={{ span: 20, offset: 2 }}
                     md={{ span: 20, offset: 2 }}
                     lg={{ span: 20, offset: 2 }}
                     xl={{ span: 20, offset: 2 }}
                  >
                     {subType === "JOB_DETAILS_JOB_REQUEST" &&
                        (isAcceptorPartnerId || isPosterPartnerId) &&
                        ((jobDefinition.actionReqiredBy === "POSTER" && isPosterPartnerId) ||
                           (jobDefinition.actionReqiredBy === "ACCEPTOR" && isAcceptorPartnerId)) && (
                           <>
                              {lastComment != undefined && lastComment != "" && (
                                 <Row style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <Form.Item
                                       label="Last Comment"
                                       name="displayContent"
                                       rules={[
                                          {
                                             required: false,
                                             message: "Comment is required"
                                          }
                                       ]}
                                       style={{ width: "100%" }}
                                    >
                                       {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                                       <Space.Compact
                                          style={{
                                             width: "100%"
                                          }}
                                       >
                                          <TextArea
                                             disabled={true}
                                             placeholder="Comment..."
                                             value={lastComment}
                                             onChange={(e) => handleChange("commentforRequest", e)}
                                             rows={2}
                                             style={{ resize: "both", width: "100%" }}
                                          />
                                       </Space.Compact>
                                       {/* </Space> */}
                                    </Form.Item>
                                 </Row>
                              )}
                              <Row style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                 <Form.Item
                                    label="Comment"
                                    name="displayContent"
                                    rules={[
                                       {
                                          required: false,
                                          message: "Comment is required"
                                       }
                                    ]}
                                    style={{ width: "100%" }}
                                 >
                                    {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                                    <Space.Compact
                                       style={{
                                          width: "100%"
                                       }}
                                    >
                                       <TextArea
                                          disabled={false}
                                          placeholder="Comment..."
                                          value={commentForRequest}
                                          onChange={(e) => handleChange("commentforRequest", e)}
                                          rows={2}
                                          style={{ resize: "both", width: "100%" }}
                                       />
                                    </Space.Compact>
                                    {/* </Space> */}
                                 </Form.Item>
                              </Row>
                              <Row style={{ display: "flex", justifyContent: "center" }}>
                                 <Button
                                    onClick={() => handleApproveClick()}
                                    style={{ width: "25%", height: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isUpdating}
                                 >
                                    Approve &nbsp; {isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                                 </Button>
                                 <Button
                                    onClick={() => handleRejectClick()}
                                    label="Reject"
                                    name="reject"
                                    style={{
                                       width: "25%",
                                       borderColor: "#1677ff",
                                       color: "#1677ff",
                                       marginLeft: "16px",
                                       height: "100%"
                                    }}
                                    disabled={isUpdating}
                                 >
                                    Reject &nbsp; {isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                                 </Button>
                                 {jobDefinition.acceptorReqWorkFlowContractId != jobDefinition.posterReqWorkFlowContractId && (
                                    <Button
                                       onClick={() => handleRenegoniateClick()}
                                       label="Renegotiate"
                                       name="renegotiate"
                                       style={{
                                          width: "25%",
                                          height: "100%",
                                          borderColor: "#1677ff",
                                          color: "#1677ff",
                                          marginLeft: "16px"
                                       }}
                                       disabled={isUpdating}
                                    >
                                       Re-negotiate &nbsp; {isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                                    </Button>
                                 )}
                              </Row>
                           </>
                        )}
                     {subType === "JOB_DETAILS_JOB_REQUEST" &&
                        (isAcceptorPartnerId || isPosterPartnerId) &&
                        !((jobDefinition.actionReqiredBy === "POSTER" && isPosterPartnerId) ||
                           (jobDefinition.actionReqiredBy === "ACCEPTOR" && isAcceptorPartnerId)) && (
                           <>
                              <Row style={{ display: "flex", justifyContent: "center" }}>
                                 <Button
                                    onClick={() => handleApproveClick()}
                                    style={{ width: "100%", height: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={true}
                                 >
                                    Waiting For Approval from other end &nbsp; {isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                                 </Button>
                              </Row>
                           </>
                        )}

                     {subType === "JOB_DETAILS_JOB_DEFINITION" && (
                        <>
                           {/*Subscriber Count, */}
                           {isPosterPartnerId && (
                              <>
                                 <Row gutter={[16, 26]} style={{ width: "100%" }}>
                                    <Col
                                       // xs={{ span: 20, offset: 1 }}
                                       // sm={{ span: 20, offset: 1 }}
                                       // md={{ span: 20, offset: 1 }}
                                       lg={{ span: 33, offset: 1 }}
                                       // xl={{ span: 20, offset: 1 }}
                                       style={{ width: "100%" }}
                                    >
                                       <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                          <Form.Item
                                             label="Subscriber Count"
                                             name="followersCont"
                                             rules={[
                                                {
                                                   required: false,
                                                   message: "Subscriber Count is required"
                                                }
                                             ]}
                                             style={{
                                                width: "35%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                borderRadius: "10px",
                                                marginTop: "8px"
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <DropDownMinMax
                                                      name="followerCountInd"
                                                      sx={{
                                                         fontSize: "14px",
                                                         width: "100%",
                                                         background: "white",
                                                         border: "1px solid #D9D9D9",
                                                         borderRadius: "4px"
                                                      }}
                                                      placeholder="Followers count"
                                                      getOptionLabel={(option) => {
                                                         return option
                                                      }}
                                                      options={[
                                                         {
                                                            min: filterSubscriberMinT,
                                                            max: filterSubscriberMaxT,
                                                            value: "0-1000000",
                                                            label: "0-1000000"
                                                         }
                                                      ]}
                                                      minimum={filterSubscriberMinT}
                                                      maximum={filterSubscriberMaxT}
                                                      onChange={(e) => handleRequestFilterChange("followerCountInd", e)}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                          <Form.Item
                                             label="Audience Age Limit"
                                             name="ageLimit"
                                             rules={[
                                                {
                                                   required: false,
                                                   message: "AgeLimit is required"
                                                }
                                             ]}
                                             style={{
                                                width: "30%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                borderRadius: "10px",
                                                marginTop: "8px"
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <DropDownMinMax
                                                      name="ageLimitCountInd"
                                                      sx={{
                                                         fontSize: "14px",
                                                         width: "100%",
                                                         background: "white",
                                                         border: "1px solid #D9D9D9",
                                                         borderRadius: "4px"
                                                      }}
                                                      placeholder="Age Limit"
                                                      getOptionLabel={(option) => {
                                                         return option
                                                      }}
                                                      options={[
                                                         {
                                                            min: filterAgeLimitMinT,
                                                            max: filterAgeLimitMaxT,
                                                            value: filterAgeLimitMinT + "" + "-" + filterAgeLimitMaxT + "",
                                                            label: filterAgeLimitMinT + "" + "-" + filterAgeLimitMaxT + ""
                                                         }
                                                      ]}
                                                      minimum={filterAgeLimitMinT}
                                                      maximum={filterAgeLimitMaxT}
                                                      onChange={(e) => handleRequestFilterChange("ageLimitCountInd", e)}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                          <Form.Item
                                             label="Language"
                                             name="languageContInd"
                                             rules={[
                                                {
                                                   required: false,
                                                   message: "Language is required"
                                                }
                                             ]}
                                             style={{
                                                width: "30%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                borderRadius: "10px",
                                                marginTop: "8px"
                                                //marginBottom: '10px',
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <Select
                                                      key={filterLanguagesT}
                                                      mode="tags"
                                                      style={{ width: "100%" }}
                                                      placeholder="language"
                                                      onChange={(e) => handleRequestFilterChange("filterLanguages", e)}
                                                      options={languageCSVData}
                                                      value={filterLanguagesT}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                       </Row>
                                    </Col>
                                 </Row>

                                 <Row gutter={[16, 26]} style={{ width: "100%" }}>
                                    <Col
                                       // xs={{ span: 20, offset: 1 }}
                                       // sm={{ span: 20, offset: 1 }}
                                       // md={{ span: 20, offset: 1 }}
                                       lg={{ span: 33, offset: 1 }}
                                       // xl={{ span: 20, offset: 1 }}
                                       style={{ width: "100%" }}
                                    >
                                       <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                          <Form.Item
                                             label="Audience Gender"
                                             name="GenderContInd"
                                             rules={[
                                                {
                                                   required: false,
                                                   message: "Gener is required"
                                                }
                                             ]}
                                             style={{
                                                width: "30%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                borderRadius: "10px",
                                                marginTop: "8px"
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <Select
                                                      key={filterGenderT}
                                                      mode="tags"
                                                      style={{ width: "100%" }}
                                                      placeholder="Gender"
                                                      onChange={(e) => handleRequestFilterChange("filterGender", e)}
                                                      options={[
                                                         { value: "MALE", label: "MALE" },
                                                         { value: "FEMALE", label: "FEMALE" },
                                                         { value: "Trans-Gender", label: "Trans-Gender" },
                                                         { value: "ALL", label: "ALL" }
                                                      ]}
                                                      value={filterGenderT}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                          <Form.Item
                                             label="Location"
                                             name="locationContInd"
                                             rules={[
                                                {
                                                   required: false,
                                                   message: "Location is required"
                                                }
                                             ]}
                                             style={{
                                                width: "30%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                borderRadius: "10px",
                                                marginTop: "8px"
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <Select
                                                      key={filterLocationsT}
                                                      mode="tags"
                                                      style={{ width: "100%" }}
                                                      placeholder="Locations"
                                                      onChange={(e) => handleRequestFilterChange("filterLocations", e)}
                                                      options={locationCSVData}
                                                      value={filterLocationsT}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                          <Form.Item
                                             label="Platform"
                                             name="platformContInd"
                                             rules={[
                                                {
                                                   required: false
                                                }
                                             ]}
                                             style={{
                                                width: "30%",
                                                background: "rgb(240 240 240)",
                                                padding: "16px",
                                                //marginBottom: '8px',
                                                marginTop: "8px",
                                                borderRadius: "10px"
                                             }}
                                          >
                                             <Space
                                                direction="vertical"
                                                size="middle"
                                                style={{
                                                   width: "100%"
                                                }}
                                             >
                                                <Space.Compact
                                                   style={{
                                                      width: "100%"
                                                   }}
                                                >
                                                   <Select
                                                      key={filterPlatformsT}
                                                      mode="tags"
                                                      style={{ width: "100%" }}
                                                      placeholder="Platforms"
                                                      onChange={(e) => handleRequestFilterChange("filterPlatforms", e)}
                                                      options={platformDropdown}
                                                      value={filterPlatformsT}
                                                   />
                                                </Space.Compact>
                                             </Space>
                                          </Form.Item>
                                       </Row>
                                    </Col>
                                 </Row>
                                 <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item
                                       label="Users"
                                       name="userContInd"
                                       rules={[
                                          {
                                             required: false,
                                             message: "User is required"
                                          }
                                       ]}
                                       style={{
                                          width: "100%",
                                          background: "rgb(240 240 240)",
                                          padding: "16px",
                                          borderRadius: "10px",
                                          marginTop: "8px"
                                       }}
                                    >
                                       <Space
                                          direction="vertical"
                                          size="middle"
                                          style={{
                                             width: "100%"
                                          }}
                                       >
                                          <Space.Compact
                                             style={{
                                                width: "100%"
                                             }}
                                          >
                                             {/* <MultiSelectDropDown
                                                style={{ width: "100%" }}
                                                options={userDropDown}
                                                onSelect={(e) => handleRequestFilterChange("filterUsers", e)}
                                                value={filterUsersT}
                                             /> */}
                                              <MultiSelUserWithLimiFetchComp
                                                style={{ width: "100%" }}
                                                //options={userDropDown}
                                                onSelect={(e) => handleRequestFilterChange("filterUsers", e)}
                                                value={filterUsersT}
                                             /> 
                                          </Space.Compact>
                                       </Space>
                                    </Form.Item>
                                 </Row>
                                 <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item
                                       label="Groups"
                                       name="userGroupsInd"
                                       rules={[
                                          {
                                             required: false,
                                             message: "Groups is required"
                                          }
                                       ]}
                                       style={{
                                          width: "100%",
                                          background: "rgb(240 240 240)",
                                          padding: "16px",
                                          borderRadius: "10px",
                                          marginTop: "8px"
                                       }}
                                    >
                                       <Space
                                          direction="vertical"
                                          size="middle"
                                          style={{
                                             width: "100%"
                                          }}
                                       >
                                          <Space.Compact
                                             style={{
                                                width: "100%"
                                             }}
                                          >
                                             <MultiSelectDropDown
                                                style={{ width: "100%" }}
                                                options={userGroupDropDown}
                                                onSelect={(e) => handleRequestFilterChange("filterUserGroups", e)}
                                                value={filterUserGroupsT}
                                             />
                                          </Space.Compact>
                                       </Space>
                                    </Form.Item>
                                 </Row>
                              </>
                           )}

                           <Row style={{ display: "flex", justifyContent: "center" }}>
                              {!disableSentRequest && (
                                 <Button
                                    onClick={() => handleSendRequest(isEditDefinition ? "Edit" : "Send_Request")}
                                    style={{ width: "100%", height: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isUpdating}
                                 >
                                    {console.log('Into Send Request Is Updating :: ', isUpdating)}
                                    {isEditDefinition ? "Edit" : isPosterPartnerId ? "Send Request - " + userCount + " Users" : "Send Request"} &nbsp;{" "}
                                    {isUpdating && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                                 </Button>
                              )}
                              {disableSentRequest && (
                                 <Button
                                    onClick={() => handleSendRequest(isEditDefinition ? "Edit" : "Send_Request")}
                                    style={{ width: "100%", height: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={true}
                                 >
                                    Already Sent Request
                                 </Button>
                              )}
                           </Row>
                        </>
                     )}
                     {subType === "JOB_DETAILS_JOB" && currentStage != undefined && currentStage.stageStatus != undefined && (
                        <>
                           {console.log("Job Details JOB_DETAILS_JOB ", jobDefinition, subType, currentStage)}
                           <Row style={{ display: "flex", justifyContent: "center" }}>
                              <CurrentJobCard subType={subType} key={jobDefinition.jobId} data={jobDefinition} handleUpdate={updateJobAction} />
                           </Row>
                        </>
                     )}
                     {subType === "JOB_DETAILS_JOB_REVIEW" && currentStage != undefined && currentStage.stageStatus != undefined && (
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                           <CurrentJobCard subType={subType} key={jobDefinition.jobId} data={jobDefinition} handleUpdate={updateJobAction} />
                        </Row>
                     )}
                  </Col>
               </Row>
            </Form>{" "}
         </div>
      </div>
   )
}

export default JobsUpdate
//export default Layout(JobsUpdate)
