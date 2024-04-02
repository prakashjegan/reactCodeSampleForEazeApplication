import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, Select, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Contract1 from "../Contract-1";
//import { Box, MenuItem } from '@mui/material';
//import SelectMui from '../../components/ReusableMuiComponents/SelectMui';
//import AutoCompleteMui from '../../components/ReusableMuiComponents/AutoCompleteMui';
import Layout from '../../components/layout'
import listService from '../../services/listService';
import jobsService from "../../services/jobService";

//import SQLiteDataImport from '../../constants/dataimports/sQLiteDataImport';
import './style.scss';
import DropDownMinMax from '../../components/ReusableMuiComponents/DropDownMinMax';
import moment from 'moment';
import userService from '../../services/userService';
import MultiSelectDropDown from '../jobs/components/MultiSelectUserComponent'
import { CircularProgress } from "@mui/material"
import MultiSelUserWithLimiFetchComp from '../jobs/components/MultiSelUserWithLimiFetchComp';

//import moment from 'moment';
//import { LoginSharp } from '@mui/icons-material';

const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PostAJob1 = (props) => {
  let res;
  const { id } = useParams();
  const { type } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [platformDropdown, setPlatformDropdown] = useState([]);
  let [jobDefinition, setJobDefinition] = useState({});
  const [contractGroups, setcontractGroups] = useState(new Map());
  const [contracts, setContracts] = useState(new Map());
  const [contractsInd, setContractsInd] = useState(new Map());
  const [userCount, setUserCount] = useState(0)
  const [stages, setStages] = useState(new Map());
  const [currentStage, setCurrentStage] = useState({});

  const [jobDefinitionId, setJobDefinitionId] = useState([]);
  const [postType, setPostType] = useState([]);
  const [tentativeStartDateTemp, setTentativeStartDateTemp] = useState(moment(new Date()))
  const [tentativeEndDateTemp, setTentativeEndDateTemp] = useState(moment(new Date()))
  const [selectedRange, setSelectedRange] = useState([]);
  const [rangeCounter, setRangeCounter] = useState(0)
  const [showContractScreen, setShowContractScreen] = useState(false)
  const [submitLabelText, setSubmitLabelText] = useState("Next")
  let tentativeEndDateT = moment(new Date())
  let tentativeStartDateT = moment(new Date())
  const [isUpdatingSave, setisUpdatingSave] = useState(false)
  //const [isUpdatingSubmit, setisUpdatingSubmit] = useState(false)



  const [tagDropDown, setTagDropdown] = useState([]);
  const [userDropDown, setUserDropdown] = useState([]);
  const [paymentstages, setPaymentstages] = useState(new Map())
  const [dontConsiderTheseStages, setDontConsiderTheseStages] = useState(new Map())
  const [stageDisplayMap, setStageDisplayMap] = useState(new Map())

  const [languageCSVData, setLanguageCSVData] = useState([]);
  const [locationCSVData, setLocationCSVData] = useState([]);
  const [currencyCSVData, setCurrencyCSVData] = useState([]);
  const [rateCardTypes, setRateCardTypes] = useState([]);

  // const [locationOptions , setLocationOptions] = useState([]);
  //const [languageOptions , setLanguageOptions] = useState([]);
  //const [tagOptions , setTagOptions] = useState([]);
  //const [platformOptions , setPlatformOptions] = useState([]);

  useEffect(() => {

    console.log('Into first UserEffect')
    //Dataimport.fetchDataAndImport()
    setLocationCSVData(JSON.parse(localStorage.getItem('location')));
    console.log('Location Data Json : ', JSON.parse(localStorage.getItem('location')))
    console.log('Location Data : ', locationCSVData);
    setLanguageCSVData(JSON.parse(localStorage.getItem('languages')));
    console.log('language Data Json : ', JSON.parse(localStorage.getItem('languages')))
    console.log('Language Data : ', languageCSVData);
    setCurrencyCSVData(JSON.parse(localStorage.getItem('currency')));
    console.log('Currency Data : ', currencyCSVData);
    console.log('currencyCSVData Data Json : ', JSON.parse(localStorage.getItem('currency')))
    setRateCardTypes(JSON.parse(localStorage.getItem('LocalStorage_rateCardTypeToInputFields')));
    console.log('RateCardTypes : ', rateCardTypes)


  }, []);

  useEffect(() => {

    const fetchAllData = async () => {
      try {
        setPlatformDropdown(JSON.parse(localStorage.getItem('platforms')));
        setTagDropdown(JSON.parse(localStorage.getItem('categories')));
        //TODO : Populate User DropDown.
        //let rs = await userService.fetchUsers()
        let rs = {}
        // console.log('Fetch Users', rs)
        let users = rs?.data?.message
        //let rs = await userService.fetchSearchOption()
        //let users = rs?.data?.message.partners
        console.log('Into Users', users)
        if (users != undefined) {
          let userSetup = []
          users.forEach(item => {
            userSetup.push({ value: item.partnerId, label: (item.firstName + " " + item.lastName), image: (item.userPictureLink === undefined ? 'https://seeklogo.com/images/L/logo-com-hr-logo-5636A4D2D5-seeklogo.com.png' : item.userPictureLink), platforms: item.stakeHolderType, category: item.preferredLanguage })
          })
          console.log('Into Users', userSetup)
          setUserDropdown(userSetup)
        }

        let ps = new Map(Object.entries(JSON.parse(localStorage.getItem('paymentstages'))))
        console.log('fetch all data  paymentstages', ps)

        setPaymentstages(ps);
        let dc = new Map(Object.entries(JSON.parse(localStorage.getItem('dontConsiderTheseStages'))))
        console.log('fetch all data  dontConsiderTheseStages', dc)
        setDontConsiderTheseStages(dc);
        let sd = new Map(Object.entries(JSON.parse(localStorage.getItem('stageDisplayMap'))))
        console.log('fetch all data  stageDisplayMap', sd)
        setStageDisplayMap(sd);

        console.log('fetch all data paymentstages', paymentstages.size)
        console.log('fetch all data  dontConsiderTheseStages', dontConsiderTheseStages.size)
        console.log('fetch all data  setStageDisplayMap', stageDisplayMap.size)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();
  }, []);
  useEffect(() => {
    if (paymentstages.size > 0 && dontConsiderTheseStages.size > 0 && stageDisplayMap.size > 0) {

      const getObjectFieldValue = (object, fieldName) => {
        if (fieldName in object) {
          return object[fieldName];
        } else {
          return undefined;
        }
      };

      const fetchJobTypeWithEvents = async () => {
        try {

          console.log('Config data', paymentstages.size, dontConsiderTheseStages.size, stageDisplayMap.size)
          console.log('Type Value : ', type)
          setPostType(type)
          let def = {}

          if (type === "JOB_TYPE") {
            res = await listService.fetchJobTypes(id);
            console.log('Fetch Job Types', res)
            let cloneFromWorkFlowContractGroupId = "000000000000000000"
            let jobType = "Others"
            let adType = 0
            console.log('Fetch Job Types', res)

            let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
            const stageMap = new Map(Object.entries(stageBOs))
            let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
            const contractMap = new Map(Object.entries(contractBOs))

            let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
            const contractGroupMap = new Map(Object.entries(contractGroupBOs))

            let jobDefBOs = res?.data?.message?.jobDefinitionBOs
            jobDefBOs = []
            console.log('Contract Groups FetchData: ', contractGroupMap)
            if (stageMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into Stage', stageMap.size)
              let contracts = stageMap
              const convertedMap = new Map();
              //Split workflowStage/ PaymentStage.
              contracts.forEach((item) => {
                if (!convertedMap.has(item.contractId)) {
                  convertedMap.set(item.contractId, new Map());
                  convertedMap.get(item.contractId).set("WORKFLOW", []);
                  convertedMap.get(item.contractId).set("PAYMENT", []);
                }
                item.stageMappingID = "000000000000000000"
                let id = item.contractId
                item.contractId = "000000000000000000"
                item.stageStatus = "PENDING"


                console.log('JOB TYPE Stage Id ', item.stageId)
                console.log('JOB TYPE stage Map', stageDisplayMap)
                console.log('JOB TYPE Stage consider ', dontConsiderTheseStages.has(item.stageId.toString()))
                if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if ((paymentstages.has(item.stageId.toString())) && (!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id into ', item.stageId.toString())
                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))

                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    if (item.currency === undefined) {
                      item.currency = "INR"
                    }
                    if (item.amount === undefined) {
                      item.amount = 1000000
                    }
                    item.isPaymentStage = true

                    convertedMap.get(id).get("PAYMENT").push(item);
                  } else if ((!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id WorkFlow into ', item.stageId.toString())
                    console.log('JOB TYPE Stage WorkFlow into ', stageDisplayMap)

                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))
                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = false

                    convertedMap.get(id).get("WORKFLOW").push(item);
                  }
                }
              });
              //TODO : Sort.

              setStages(convertedMap)

            }
            if (contractMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into contractMap', contractMap.size)

              let contracts = contractMap

              const convertedMap = new Map();
              const convMap = new Map();
              contracts.forEach(item => {
                if (item != null && item.contractMasterGroupId != null) {
                  if (!convertedMap.has(item.contractMasterGroupId)) {
                    convertedMap.set(item.contractMasterGroupId, []);
                  }
                  item.contractMakerType = "JOB"
                  item.contractType = "WorkflowContractType"
                  item.copyFromContractID = item.contractID
                  item.cloneMakerType = "MASTER"
                  convMap.set(item.copyFromContractID, item)

                  item.contractID = "000000000000000000"
                  let id = item.contractMasterGroupId
                  item.jobContractGroupID = "000000000000000000"
                  convertedMap.get(id).push(item);
                }

              });
              console.log('Contracts JOB TYPE Definition', convertedMap)
              setContracts(convertedMap)
              setContractsInd(convMap)
            }
            if (contractGroupMap.size > 0) {
              console.log('JOB TYPE Into contractGroupMap', contractGroupMap.size)
              console.log('JOB TYPE Into contractGroup', contractGroupMap)

              let contracts = contractGroupMap

              const convertedMap = new Map();

              contracts.forEach((item, key) => {
                console.log(' JOB TYPE Into contractGroupInto', item)


                if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                    convertedMap.set(item.contractGroupID, []);
                  }
                  cloneFromWorkFlowContractGroupId = key
                  item.cloneContractGroupMakerType = "MASTER"
                  item.cloneContractGroupId = cloneFromWorkFlowContractGroupId
                  item.contractMakerType = "JOB"
                  let id = item.contractGroupID
                  item.contractGroupID = "000000000000000000"
                  jobType = item.jobType
                  adType = item.adType
                  convertedMap.get(id).push(item);
                }
              });
              setcontractGroups(convertedMap)
            }
            //console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
            if (Array.isArray(jobDefBOs) && jobDefBOs.length > 0) {
              console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
              def = jobDefBOs[0]
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate);
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate

              if (def.shownToAllSubscriberCount === true) {
                def.shownToSubscriberMin = 0
                def.shownToSubscriberMax = 1000000000
              }

              if (def.shownToAllLocations === true) {
                def.shownToLocations = "ALL"
              }

              if (def.shownToAllLanguages === true) {
                def.shownToLanguages = "ALL"
              }

              if (def.shownToAllPlatforms === true) {
                def.shownToPlatforms = "ALL"
              }
              if (def.shownToAllAgeLimit === true) {
                def.shownToAgeLimitMin = 0
                def.shownToAgeLimitMax = 100
              }

              if (def.shownToAllGender === true) {
                def.shownToGender = "ALL"
              }
              if (def.shownToAllTags === true) {
                def.shownToTags = "ALL"
              }

              setJobDefinition(def)
              setJobDefinitionId(jobDefBOs.jobDefinitionId)
            } else {
              console.log('JOB TYPE Into jobDefBOs', cloneFromWorkFlowContractGroupId)

              def = {}
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              def.jobType = jobType
              def.adType = adType

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate);
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate
              //thirtyDaysLater.setDate(currentDate.getDate() + 30);

              def.jobName = ""

              def.amount = 1000000
              def.amountT = def.amount / 100
              def.currency = "INR"
              def.jobDescription = ""
              def.jobDescriptionLink = ""
              def.jobInfluProdCodeLink = ""


              def.maxBufferPeriodInDays = 30
              def.tags = ""

              def.shownToAllSubscriberCount = true
              def.shownToSubscriberMin = 0
              def.shownToSubscriberMax = 1000000000

              def.shownToAllLocations = true
              def.shownToLocations = "ALL"

              def.shownToAllLanguages = true
              def.shownToLanguages = "ALL"

              def.shownToAllPlatforms = true
              def.shownToPlatforms = "ALL"

              def.shownToAllAgeLimit = true
              def.shownToAgeLimitMin = 0
              def.shownToAgeLimitMax = 100


              def.shownToAllGender = true
              def.shownToGender = "ALL"

              def.shownToAllTags = true
              def.shownToTags = "ALL"

              setJobDefinition(def)
              setJobDefinitionId(0)
            }


          } else if (type === "PAST_DEFINITION") {
            console.log('Fetch Job Types', res)
            let cloneFromWorkFlowContractGroupId = "000000000000000000"
            res = await listService.fetchPastDefinition(id, {});
            console.log('Fetch Job Types', res)

            let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
            const stageMap = new Map(Object.entries(stageBOs))
            let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
            const contractMap = new Map(Object.entries(contractBOs))

            let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
            const contractGroupMap = new Map(Object.entries(contractGroupBOs))

            let jobDefBOs = res?.data?.message?.jobDefinitionBOs
            console.log(jobDefBOs[0].jobDefinitionId)

            if (stageMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into Stage', stageMap.size)
              let contracts = stageMap
              const convertedMap = new Map();
              //Split workflowStage/ PaymentStage.
              contracts.forEach((item) => {
                if (!convertedMap.has(item.contractId)) {
                  convertedMap.set(item.contractId, new Map());
                  convertedMap.get(item.contractId).set("WORKFLOW", []);
                  convertedMap.get(item.contractId).set("PAYMENT", []);
                }
                item.stageMappingID = "000000000000000000"
                let id = item.contractId
                item.contractId = "000000000000000000"
                item.stageStatus = "PENDING"


                console.log('JOB TYPE Stage Id ', item.stageId)
                console.log('JOB TYPE stage Map', stageDisplayMap)
                console.log('JOB TYPE Stage consider ', dontConsiderTheseStages.has(item.stageId.toString()))
                if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if ((paymentstages.has(item.stageId.toString())) && (!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id into ', item.stageId.toString())
                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))

                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = true
                    if (item.currency === undefined) {
                      item.currency = "INR"
                    }
                    if (item.amount === undefined) {
                      item.amount = 1000000
                    }
                    convertedMap.get(id).get("PAYMENT").push(item);
                  } else if ((!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id WorkFlow into ', item.stageId.toString())
                    console.log('JOB TYPE Stage WorkFlow into ', stageDisplayMap)

                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))
                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = false
                    convertedMap.get(id).get("WORKFLOW").push(item);
                  }
                }
              });
              setStages(convertedMap)
            }
            if (contractMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('PAST JOB Into contractMap', contractMap.size)

              let contracts = contractMap

              const convertedMap = new Map();
              const convMap = new Map();

              contracts.forEach(item => {
                if (item != null && item.jobContractGroupID != null) {
                  if (!convertedMap.has(item.jobContractGroupID)) {
                    convertedMap.set(item.jobContractGroupID, []);
                  }
                  item.contractMakerType = "JOB"
                  item.contractType = "WorkflowContractType"
                  item.copyFromContractID = item.contractID
                  item.cloneMakerType = "JOB"
                  convMap.set(item.copyFromContractID, item)

                  item.contractID = "000000000000000000"
                  let id = item.jobContractGroupID
                  item.jobContractGroupID = "000000000000000000"
                  convertedMap.get(id).push(item);
                }

              });
              console.log('Contracts PAST Definition', convertedMap)
              setContracts(convertedMap)
              setContractsInd(convMap)
            }
            if (contractGroupMap.size > 0) {
              console.log('PAST JOB Into contractGroupMap', contractGroupMap.size)

              let contracts = contractGroupMap
              //cloneFromWorkFlowContractGroupId = contracts.contractGroupID

              const convertedMap = new Map();

              contracts.forEach((item, key) => {
                console.log('PAST JOB Into contractGroupInto', contractGroupMap.size)

                if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                    convertedMap.set(item.contractGroupID, []);
                  }
                  cloneFromWorkFlowContractGroupId = key
                  item.cloneContractGroupId = cloneFromWorkFlowContractGroupId

                  item.cloneContractGroupMakerType = "JOB"
                  item.contractMakerType = "JOB"
                  let id = item.contractGroupID
                  item.contractGroupID = "000000000000000000"
                  convertedMap.get(id).push(item);
                }
              });
              setcontractGroups(convertedMap)
            }
            //console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
            if (Array.isArray(jobDefBOs) && jobDefBOs.length > 0) {
              console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
              def = jobDefBOs[0]
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              if (def.amount === undefined || def.amount === 0) {
                def.amount = 1000000
              }
              def.amountT = def.amount / 100
              if (def.shownToAllSubscriberCount === true) {
                def.shownToSubscriberMin = 0
                def.shownToSubscriberMax = 1000000000
              }

              if (def.shownToAllLocations === true) {
                def.shownToLocations = "ALL"
              }

              if (def.shownToAllLanguages === true) {
                def.shownToLanguages = "ALL"
              }

              if (def.shownToAllPlatforms === true) {
                def.shownToPlatforms = "ALL"
              }
              if (def.shownToAllAgeLimit === true) {
                def.shownToAgeLimitMin = 0
                def.shownToAgeLimitMax = 100
              }

              if (def.shownToAllGender === true) {
                def.shownToGender = "ALL"
              }
              if (def.shownToAllTags === true) {
                def.shownToTags = "ALL"
              }
              setJobDefinition(def)
              setJobDefinitionId(jobDefBOs.jobDefinitionId)
            }

          } else if (type === "MASTER_CONTRACT") {
            res = await listService.fetchMasterContract(id);
            console.log('Fetch Job Types', res)
            let cloneFromWorkFlowContractGroupId = "000000000000000000"
            let jobType = "Others"
            let adType = 0
            console.log('Fetch Job Types', res)

            let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
            const stageMap = new Map(Object.entries(stageBOs))
            let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
            const contractMap = new Map(Object.entries(contractBOs))

            let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
            const contractGroupMap = new Map(Object.entries(contractGroupBOs))

            let jobDefBOs = res?.data?.message?.jobDefinitionBOs
            console.log('Fetch Contracts', contractMap.size)
            const convertedMap1 = new Map();
            if (stageMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into Stage', stageMap.size)
              let contracts = stageMap
              //Split workflowStage/ PaymentStage.
              contracts.forEach((item) => {
                if (!convertedMap1.has(item.contractId)) {
                  convertedMap1.set(item.contractId, new Map());
                  convertedMap1.get(item.contractId).set("WORKFLOW", []);
                  convertedMap1.get(item.contractId).set("PAYMENT", []);
                }
                item.stageMappingID = "000000000000000000"
                let id = item.contractId
                item.contractId = "000000000000000000"
                item.stageStatus = "PENDING"


                console.log('JOB TYPE Stage Id ', item.stageId)
                console.log('JOB TYPE stage Map', stageDisplayMap)
                console.log('JOB TYPE Stage consider ', dontConsiderTheseStages.has(item.stageId.toString()))
                if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if ((paymentstages.has(item.stageId.toString())) && (!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id into ', item.stageId.toString())
                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))

                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    if (item.currency === undefined) {
                      item.currency = "INR"
                    }
                    if (item.amount === undefined) {
                      item.amount = 1000000
                    }
                    item.isPaymentStage = true
                    convertedMap1.get(id).get("PAYMENT").push(item);
                  } else if ((!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id WorkFlow into ', item.stageId.toString())
                    console.log('JOB TYPE Stage WorkFlow into ', stageDisplayMap)

                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))
                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = false
                    convertedMap1.get(id).get("WORKFLOW").push(item);
                  }
                }
              });
              setStages(convertedMap1)
            }
            if (contractMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into contractMap', contractMap.size)

              let contracts = contractMap

              const convertedMap = new Map();
              const convMap = new Map();
              contracts.forEach(item => {
                console.log('Fetch Contracts', contractMap.size)

                if (item != null && item.contractMasterGroupId != null) {
                  if (!convertedMap.has(item.contractMasterGroupId)) {
                    convertedMap.set(item.contractMasterGroupId, []);
                  }
                  item.contractMakerType = "JOB"
                  item.contractType = "WorkflowContractType"
                  item.copyFromContractID = item.contractID
                  item.cloneMakerType = "MASTER"
                  convMap.set(item.copyFromContractID, item)

                  item.contractID = "000000000000000000"
                  let id = item.contractMasterGroupId
                  item.jobContractGroupID = "000000000000000000"
                  convertedMap.get(id).push(item);
                }

              });
              console.log('Master contract', convertedMap.size)
              setContracts(convertedMap)
              setContractsInd(convMap)
            }
            if (contractGroupMap.size > 0) {
              console.log('JOB TYPE Into contractGroupMap', contractGroupMap.size)

              let contracts = contractGroupMap

              const convertedMap = new Map();
              contracts.forEach((item, key) => {
                console.log('JOB TYPE Into contractGroupInto', contractGroupMap.size)

                if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                    convertedMap.set(item.contractGroupID, []);
                  }
                  cloneFromWorkFlowContractGroupId = key
                  item.cloneContractGroupId = cloneFromWorkFlowContractGroupId
                  item.cloneContractGroupMakerType = "MASTER"
                  item.contractMakerType = "JOB"
                  let id = item.contractGroupID
                  item.contractGroupID = "000000000000000000"
                  jobType = item.jobType
                  adType = item.adType
                  convertedMap.get(id).push(item);
                }
              });

              console.log('JOB TYPE Into 1 contractGroupMap', convertedMap.size)
              setcontractGroups(convertedMap)
            }
            //console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
            if (Array.isArray(jobDefBOs) && jobDefBOs.length > 0) {
              console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
              def = jobDefBOs[0]
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              if (def.amount === undefined || def.amount === 0) {
                def.amount = 1000000
              }
              def.amountT = def.amount / 100

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate);
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate

              if (def.shownToAllSubscriberCount === true) {
                def.shownToSubscriberMin = 0
                def.shownToSubscriberMax = 1000000000
              }

              if (def.shownToAllLocations === true) {
                def.shownToLocations = "ALL"
              }

              if (def.shownToAllLanguages === true) {
                def.shownToLanguages = "ALL"
              }

              if (def.shownToAllPlatforms === true) {
                def.shownToPlatforms = "ALL"
              }
              if (def.shownToAllAgeLimit === true) {
                def.shownToAgeLimitMin = 0
                def.shownToAgeLimitMax = 100
              }

              if (def.shownToAllGender === true) {
                def.shownToGender = "ALL"
              }
              if (def.shownToAllTags === true) {
                def.shownToTags = "ALL"
              }
              // form.setFieldsValue({
              //   jobType: def.jobType
              // });
              setJobDefinition(def)

              setJobDefinitionId(jobDefBOs.jobDefinitionId)
            } else {
              def = {}
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              def.jobType = jobType
              def.adType = adType

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate);
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

              def.jobName = ""
              def.amount = 1000000
              def.amountT = def.amount / 100
              def.currency = "INR"
              def.jobDescription = ""
              def.jobDescriptionLink = ""
              def.jobInfluProdCodeLink = ""
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate
              def.maxBufferPeriodInDays = 30
              def.tags = ""

              def.shownToAllSubscriberCount = true
              def.shownToSubscriberMin = 0
              def.shownToSubscriberMax = 1000000000

              def.shownToAllLocations = true
              def.shownToLocations = "ALL"

              def.shownToAllLanguages = true
              def.shownToLanguages = "ALL"

              def.shownToAllPlatforms = true
              def.shownToPlatforms = "ALL"

              def.shownToAllAgeLimit = true
              def.shownToAgeLimitMin = 0
              def.shownToAgeLimitMax = 100


              def.shownToAllGender = true
              def.shownToGender = "ALL"

              def.shownToAllTags = true
              def.shownToTags = "ALL"
              setJobDefinition(def)
              setJobDefinitionId(0)
            }


          } else if (type === "EDIT_DEFINITION") {

            res = await listService.fetchDefinition(id, {});
            console.log('Fetch EDIT_DEFINITION', res)
            let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
            const stageMap = new Map(Object.entries(stageBOs))
            let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
            const contractMap = new Map(Object.entries(contractBOs))

            let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
            const contractGroupMap = new Map(Object.entries(contractGroupBOs))

            let jobDefBOs = res?.data?.message?.jobDefinitionBOs
            //console.log(jobDefBOs[0].jobDefinitionId)

            if (stageMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('EDIT_DEFINITION Into Stage', stageMap.size)
              let contracts = stageMap
              const convertedMap = new Map();
              //Split workflowStage/ PaymentStage.
              contracts.forEach((item) => {
                if (!convertedMap.has(item.contractId)) {
                  convertedMap.set(item.contractId, new Map());
                  convertedMap.get(item.contractId).set("WORKFLOW", []);
                  convertedMap.get(item.contractId).set("PAYMENT", []);
                }
                let id = item.contractId
                console.log('EDIT_DEFINITION Stage Id ', item.stageId)
                console.log('EDIT_DEFINITION stage Map', stageDisplayMap)
                console.log('EDIT_DEFINITION Stage consider ', dontConsiderTheseStages.has(item.stageId.toString()))
                if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if ((paymentstages.has(item.stageId.toString())) && (!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('EDIT_DEFINITION Stage Id into ', item.stageId.toString())
                    console.log('EDIT_DEFINITION Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))

                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    if (item.currency === undefined) {
                      item.currency = "INR"
                    }
                    if (item.amount === undefined) {
                      item.amount = 1000000
                    }
                    item.isPaymentStage = true
                    convertedMap.get(id).get("PAYMENT").push(item);
                  } else if ((!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('EDIT_DEFINITION Stage Id WorkFlow into ', item.stageId.toString())
                    console.log('EDIT_DEFINITION Stage WorkFlow into ', stageDisplayMap)

                    console.log('EDIT_DEFINITION Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))
                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = false
                    convertedMap.get(id).get("WORKFLOW").push(item);
                  }
                }
              });
              setStages(convertedMap)
            }

            if (contractMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('EDIT_DEFINITION Into contractMap', contractMap.size)

              let contracts = contractMap

              const convertedMap = new Map();
              const convMap = new Map();
              contracts.forEach(item => {
                if (item != null && item.jobContractGroupID != null) {
                  if (!convertedMap.has(item.jobContractGroupID)) {
                    convertedMap.set(item.jobContractGroupID, []);
                  }
                  convMap.set(item.contractID, item)
                  //item.copyFromContractID = item.contractID

                  let id = item.jobContractGroupID
                  convertedMap.get(id).push(item);
                }

              });
              console.log('Contracts Edit Definition', convertedMap)
              setContracts(convertedMap)
              setContractsInd(convMap)
            }
            if (contractGroupMap.size > 0) {
              console.log('EDIT_DEFINITION Into contractGroupMap', contractGroupMap.size)

              let contracts = contractGroupMap
              const convertedMap = new Map();

              contracts.forEach((item, key) => {
                console.log('EDIT_DEFINITION Into contractGroupMap', contractGroupMap.size)

                if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                    convertedMap.set(item.contractGroupID, []);
                  }
                  let id = item.contractGroupID
                  convertedMap.get(id).push(item);
                }
              });
              setcontractGroups(convertedMap)
            }
            console.log('EDIT_DEFINITION Into jobDefBOs', jobDefBOs.length)
            if (Array.isArray(jobDefBOs) && jobDefBOs.length > 0) {
              console.log('EDIT_DEFINITION Into jobDefBOs', jobDefBOs.length)
              def = jobDefBOs[0]
              let id = def.jobDefinitionId

              if (def.amount === undefined || def.amount === 0) {
                def.amount = 1000000
              }
              def.amountT = def.amount / 100

              if (def.shownToAllSubscriberCount === true) {
                def.shownToSubscriberMin = 0
                def.shownToSubscriberMax = 1000000000
              }

              if (def.shownToAllLocations === true) {
                def.shownToLocations = "ALL"
              }

              if (def.shownToAllLanguages === true) {
                def.shownToLanguages = "ALL"
              }

              if (def.shownToAllPlatforms === true) {
                def.shownToPlatforms = "ALL"
              }
              if (def.shownToAllAgeLimit === true) {
                def.shownToAgeLimitMin = 0
                def.shownToAgeLimitMax = 100
              }

              if (def.shownToAllGender === true) {
                def.shownToGender = "ALL"
              }
              if (def.shownToAllTags === true) {
                def.shownToTags = "ALL"
              }

              setJobDefinition(def)
              setJobDefinitionId(jobDefBOs.jobDefinitionId)
            }


            //console.log('Type RES : ', res)
          } else {
            res = await listService.fetchJobTypes(id);
            console.log('Fetch Job Types', res)
            let cloneFromWorkFlowContractGroupId = "000000000000000000"
            let jobType = "Others"
            let adType = 0
            console.log('Fetch Job Types', res)

            let stageBOs = res?.data?.message?.fetchObjectMapBO?.stageMappingBOs
            const stageMap = new Map(Object.entries(stageBOs))
            let contractBOs = res?.data?.message?.fetchObjectMapBO?.contractBOs
            const contractMap = new Map(Object.entries(contractBOs))

            let contractGroupBOs = res?.data?.message?.fetchObjectMapBO?.contractGroupBOs
            const contractGroupMap = new Map(Object.entries(contractGroupBOs))

            let jobDefBOs = res?.data?.message?.jobDefinitionBOs
            //console.log(jobDefBOs[0].jobDefinitionId)

            if (stageMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into Stage', stageMap.size)
              let contracts = stageMap
              const convertedMap = new Map();
              //Split workflowStage/ PaymentStage.
              contracts.forEach((item) => {
                if (!convertedMap.has(item.contractId)) {
                  convertedMap.set(item.contractId, new Map());
                  convertedMap.get(item.contractId).set("WORKFLOW", []);
                  convertedMap.get(item.contractId).set("PAYMENT", []);
                }
                item.stageMappingID = "000000000000000000"
                let id = item.contractId
                item.contractId = "000000000000000000"
                item.stageStatus = "PENDING"


                console.log('JOB TYPE Stage Id ', item.stageId)
                console.log('JOB TYPE stage Map', stageDisplayMap)
                console.log('JOB TYPE Stage consider ', dontConsiderTheseStages.has(item.stageId.toString()))
                if (stageDisplayMap.has(item.stageId.toString()) && stageDisplayMap.get(item.stageId.toString()).ShowInJOB_DEFINITION) {
                  if ((paymentstages.has(item.stageId.toString())) && (!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id into ', item.stageId.toString())
                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))

                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    if (item.currency === undefined) {
                      item.currency = "INR"
                    }
                    if (item.amount === undefined) {
                      item.amount = 1000000
                    }
                    item.isPaymentStage = true
                    convertedMap.get(id).get("PAYMENT").push(item);
                  } else if ((!dontConsiderTheseStages.has(item.stageId.toString()))) {
                    console.log('JOB TYPE Stage Id WorkFlow into ', item.stageId.toString())
                    console.log('JOB TYPE Stage WorkFlow into ', stageDisplayMap)

                    console.log('JOB TYPE Stage DisplayMap ', stageDisplayMap.get(item.stageId.toString()))
                    item.stageDisplayDetails = stageDisplayMap.get(item.stageId.toString()).StatusToStageUIData.JOB_DEFINITION
                    item.isPaymentStage = false
                    convertedMap.get(id).get("WORKFLOW").push(item);
                  }
                }
              });
              setStages(convertedMap)
            }
            if (contractMap.size > 0) {
              // Convert the array into a map of arrays
              console.log('JOB TYPE Into contractMap', contractMap.size)

              let contracts = contractMap

              const convertedMap = new Map();
              const convMap = new Map();
              contracts.forEach(item => {
                if (item != null && item.contractMasterGroupId != null) {
                  if (!convertedMap.has(item.contractMasterGroupId)) {
                    convertedMap.set(item.contractMasterGroupId, []);
                  }
                  item.contractMakerType = "JOB"
                  item.contractType = "WorkflowContractType"
                  item.copyFromContractID = item.contractID
                  item.cloneMakerType = "MASTER"
                  convMap.set(item.copyFromContractID, item)

                  item.contractID = "000000000000000000"
                  let id = item.contractMasterGroupId
                  item.jobContractGroupID = "000000000000000000"
                  convertedMap.get(id).push(item);
                }

              });
              console.log('Contracts Edit Definition', convertedMap)
              setContracts(convertedMap)
              setContractsInd(convertedMap)
            }
            if (contractGroupMap.size > 0) {
              console.log('JOB TYPE Into contractGroupMap', contractGroupMap.size)

              let contracts = contractGroupMap

              const convertedMap = new Map();
              contracts.forEach((item, key) => {
                console.log('JOB TYPE Into contractGroupInter', item)

                if (item != null && item.contractGroupID != null) {
                  if (!convertedMap.has(item.contractGroupID)) {
                    convertedMap.set(item.contractGroupID, []);
                  }
                  cloneFromWorkFlowContractGroupId = key
                  item.cloneContractGroupId = cloneFromWorkFlowContractGroupId
                  item.cloneContractGroupMakerType = "MASTER"
                  item.contractMakerType = "JOB"
                  let id = item.contractGroupID
                  item.contractGroupID = "000000000000000000"
                  jobType = item.jobType
                  adType = item.adType
                  convertedMap.get(id).push(item);
                }
              });
              setcontractGroups(convertedMap)
            }
            //console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
            if (Array.isArray(jobDefBOs) && jobDefBOs.length > 0) {
              console.log('JOB TYPE Into jobDefBOs', jobDefBOs.length)
              def = jobDefBOs[0]
              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              if (def.amount === undefined || def.amount === 0) {
                def.amount = 1000000
              }
              def.amountT = def.amount / 100

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate);
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate

              if (def.shownToAllSubscriberCount === true) {
                def.shownToSubscriberMin = 0
                def.shownToSubscriberMax = 1000000000
              }

              if (def.shownToAllLocations === true) {
                def.shownToLocations = "ALL"
              }

              if (def.shownToAllLanguages === true) {
                def.shownToLanguages = "ALL"
              }

              if (def.shownToAllPlatforms === true) {
                def.shownToPlatforms = "ALL"
              }
              if (def.shownToAllAgeLimit === true) {
                def.shownToAgeLimitMin = 0
                def.shownToAgeLimitMax = 100
              }

              if (def.shownToAllGender === true) {
                def.shownToGender = "ALL"
              }
              if (def.shownToAllTags === true) {
                def.shownToTags = "ALL"
              }
              setJobDefinition(def)
              setJobDefinitionId(jobDefBOs.jobDefinitionId)
            } else {

              let id = def.jobDefinitionId
              def.jobDefinitionId = "000000000000000000"
              def.cloneFromWorkFlowContractGroupId = cloneFromWorkFlowContractGroupId
              def.cloneFromWorkFlowContractGroupType = "MASTER"
              def.status = "INPROGRESS"
              def.jobType = jobType
              def.adType = adType

              let currentDate = new Date();
              let thirtyDaysLater = new Date(currentDate)
              thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

              def.jobName = ""
              def.amount = 1000000
              def.amountT = def.amount / 100
              def.currency = "INR"
              def.jobDescription = ""
              def.jobDescriptionLink = ""
              def.jobInfluProdCodeLink = ""
              def.tentativeEndDate = thirtyDaysLater
              def.tentativeStartDate = currentDate
              def.maxBufferPeriodInDays = 30
              def.tags = ""

              def.shownToAllSubscriberCount = true
              def.shownToSubscriberMin = 0
              def.shownToSubscriberMax = 1000000000

              def.shownToAllLocations = true
              def.shownToLocations = "ALL"

              def.shownToAllLanguages = true
              def.shownToLanguages = "ALL"

              def.shownToAllPlatforms = true
              def.shownToPlatforms = "ALL"

              def.shownToAllAgeLimit = true
              def.shownToAgeLimitMin = 0
              def.shownToAgeLimitMax = 100


              def.shownToAllGender = true
              def.shownToGender = "ALL"

              def.shownToAllTags = true
              def.shownToTags = "ALL"

              setJobDefinition(def)
              setJobDefinitionId(0)
            }

          }

          let jobBOs = res?.data?.message?.jobBOs
          if (jobBOs != undefined && jobBOs != null && Array.isArray(jobBOs) && jobBOs.length > 0) {
            let currentStage = jobBOs[0].currentStage
            let details = stageDisplayMap.get(currentStage.stageId.toString()).StatusToStageUIData
            currentStage.stageDisplayDetails = getObjectFieldValue(details, currentStage.stageStatus)
            console.log("Current Stage", currentStage)
            setCurrentStage(currentStage)
            console.log("curreent Stage State", currentStage)
          }


          // form.setFieldsValue({
          //   jobType: def.jobType,
          //   jobName: def.jobName,
          //   amount: def.amount,
          //   currency: def.currency,
          //   jobdescription: def.jobDescription,
          //   jobdescriptionlink: def.jobDescriptionLink,
          //   jobinfluproductioncodelink: def.jobInfluProdCodeLink,
          //   maxbufferperiodindays: def.maxBufferPeriodInDays,
          //   tags: def.tags,


          // });
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
          let shownToAllUsersT = true
          let shownToUsersT = ["ALL"]
          let shownToAgeLimitMinT = 0
          let shownToAgeLimitMaxT = 100
          let shownToAllAgeLimitT = true
          let tentativeStartDateM = new Date()
          let tentativeEndDateM = new Date()
          tentativeEndDateM.setDate(tentativeEndDateM.getDate() + 30);
          tentativeEndDateT = moment(tentativeEndDateM)
          tentativeStartDateT = moment(tentativeStartDateM)
          //setRangeCounter(rangeCounter + 1)
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
          if (def.shownToLocations != undefined &&
            def.shownToLocations != null && def.shownToLocations != "ALL") {
            shownToAllLocationsT = false
          }

          if (def.shownToLanguages != undefined && def.shownToLanguages != null) {
            shownToLanguagesT = def.shownToLanguages.split(",")
          }
          if (def.shownToLanguages != undefined &&
            def.shownToLanguages != null && def.shownToLanguages != "ALL") {
            shownToAllLanguagesT = false
          }
          if (def.shownToPlatforms != undefined && def.shownToPlatforms != null) {
            shownToPlatformsT = def.shownToPlatforms.split(",")
          }
          if (def.shownToPlatforms != undefined &&
            def.shownToPlatforms != null && def.shownToPlatforms != "ALL") {
            shownToAllPlatformsT = false
          }

          console.log('Gender OUT::: ', def)

          if (def.shownToGender != undefined && def.shownToGender != null) {
            shownToGenderT = def.shownToGender.split(",")
          }

          if (def.shownToGender != undefined &&
            def.shownToGender != null && def.shownToGender != "ALL") {
            shownToAllGenderT = false
          }
          console.log('Tags out::: ', def)
          if (def.tags != undefined && def.tags != null) {
            console.log('Tags ::: ', def.tags)
            tagsT = def.tags.split(",")
            console.log('Tags T ::: ', tagsT)

          }

          if (def.shownToTags != undefined && def.shownToTags != null) {
            shownToTagsT = def.shownToTags.split(",")
          }
          if (def.shownToUsers != undefined && def.shownToUsers != null) {
            shownToUsersT = def.shownToUsers.split(",")
          }

          if (def.shownToTags != undefined &&
            def.shownToTags != null && def.shownToTags != "ALL") {
            shownToAllTagsT = false
          }
          if (def.shownToUsers != undefined &&
            def.shownToUsers != null && def.shownToUsers != "ALL") {
            shownToAllUsersT = false
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


          if (!(def.tentativeStartDate === null || def.tentativeStartDate === undefined || (new Date(def.tentativeStartDate).getFullYear() <= 2022))) {
            tentativeStartDateM = new Date(def.tentativeStartDate)
          }
          if (!(def.tentativeEndDate === null || def.tentativeEndDate === undefined || (new Date(def.tentativeEndDate).getFullYear() <= 2022))) {
            tentativeEndDateM = new Date(def.tentativeEndDate)
          }
          tentativeEndDateT = moment(tentativeEndDateM)
          tentativeStartDateT = moment(tentativeStartDateM)
          //setRangeCounter(rangeCounter+1)

          setJobDefinition((prevJson) => ({
            ...prevJson,
            ['tagsT']: tagsT,
            ['shownToTagsT']: shownToTagsT,
            ['shownToUsersT']: shownToUsersT,
            ['shownToSubscriberMinT']: shownToSubscriberMinT,
            ['shownToSubscriberMaxT']: shownToSubscriberMaxT,
            ['shownToAllSubscriberCountT']: shownToAllSubscriberCountT,
            ['shownToLocationsT']: shownToLocationsT,
            ['shownToAllLocationsT']: shownToAllLocationsT,
            ['shownToAllLanguagesT']: shownToAllLanguagesT,
            ['shownToLanguagesT']: shownToLanguagesT,
            ['shownToAllPlatformsT']: shownToAllPlatformsT,
            ['shownToPlatformsT']: shownToPlatformsT,
            ['shownToGenderT']: shownToGenderT,
            ['shownToAllGenderT']: shownToAllGenderT,
            ['shownToAllTagsT']: shownToAllTagsT,
            ['shownToAllUsersT']: shownToAllUsersT,
            ['shownToAgeLimitMinT']: shownToAgeLimitMinT,
            ['shownToAgeLimitMaxT']: shownToAgeLimitMaxT,
            ['shownToAllAgeLimitT']: shownToAllAgeLimitT,
            ['tentativeStartDateM']: tentativeStartDateM,
            ['tentativeEndDateM']: tentativeEndDateM,
            ['tentativeEndDateT']: tentativeEndDateT,
            ['tentativeStartDateT']: tentativeStartDateT,
          }));
          //setTentativeStartDateTemp(tentativeStartDateT)
          //setTentativeEndDateTemp(tentativeEndDateT)
          setSelectedRange([tentativeStartDateT, tentativeEndDateT])
          //setRangeCounter(rangeCounter+1)





          console.log('job Definition', jobDefinition)
          console.log('contract Groups', contractGroups)
          console.log('contracts', contracts)
          console.log('stages ', stages)
          console.log('postType', postType)
          console.log('jobDefinitionId', jobDefinitionId)

        } catch (err) {
          console.log('Error On EDIT_DEFINITION ', err)
          console.log(err);
        }
      };

      fetchJobTypeWithEvents()
    }
  }, [paymentstages, dontConsiderTheseStages, stageDisplayMap]);

  // useEffect(() => {
  //   if (jobDefinition.tentativeStartDateT != undefined && jobDefinition.tentativeStartDateT != null && jobDefinition.tentativeEndDateT != undefined && jobDefinition.tentativeEndDateT != null && !jobDefinition.rangeSetupDone) {
  //     const updateTentativeData = async () => {
  //       //setTentativeStartDateTemp(jobDefinition.tentativeStartDateT)
  //       //setTentativeEndDateTemp(jobDefinition.tentativeEndDateT)
  //        // setSelectedRange([jobDefinition.tentativeStartDateT, jobDefinition.tentativeEndDateT])
  //       try {
  //         // setJobDefinition((prevJson) => ({
  //         //   ...prevJson,
  //         //   ['rangeSetupDone']:true,
  //         // }));

  //       } catch (err) {
  //         console.log('Error On EDIT_DEFINITION ', err)
  //         console.log(err);
  //       }
  //     };
  //     updateTentativeData()
  //   }
  // }, [jobDefinition]);

  const onFinish = (values) => {
    //console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
  };



  const handleNextClick = async () => {
    try {
      //const { errors } = await form.validateFields();
      // if (errors) {

      //   return;
      // }
      if (showContractScreen) {
        //SUBMIT - API

        saveJobDefinition("INPROGRESS")


      }
      setSubmitLabelText("Submit")
      setShowContractScreen(true)
    } catch (errorInfo) {
      console.log('Error:', errorInfo);
    }
  };

  const saveJobDefinition = async (status) => {
    setisUpdatingSave(true)
    console.log('Save Job Definition status', status)
    jobDefinition.status = status
    let postPayload = { ...jobDefinition }
    console.log('Save Job Definition stages', stages)
    console.log('Save Job Definition contractGroups', contractGroups)


    if (type === "JOB_TYPE") {
      postPayload.jobDefinitionId = "000000000000000000"

      //postPayload.

    } else if (type === "PAST_DEFINITION") {
      postPayload.jobDefinitionId = "000000000000000000"
    } else if (type === "MASTER_CONTRACT") {
      postPayload.jobDefinitionId = "000000000000000000"
    } else if (type === "EDIT_DEFINITION") {
    } else {
      postPayload.jobDefinitionId = "000000000000000000"
    }
    let contractGrs = contractGroups

    const stageMap = [];
    const stageMap1 = new Map();

    stages.forEach((item, key) => {
      console.log(' JOB TYPE Into contractInto', item)

      item.forEach((it, index) => {
        if (!stageMap1.has(key)) {
          stageMap1.set(key, [])
        }
        it.forEach((it1, val) => {
          let itr = { ...it1 }
          if (itr.stageEnabled != undefined && !itr.stageEnabled) {
            itr.stageStatus = "SKIPPED"
          } else {
            itr.stageStatus = "PENDING"
          }

          itr.contractMarkerType = "JOB"
          stageMap1.get(key).push(itr)
        });
      });

    });

    const convertedMap = [];
    const contractMap = new Map();

    contracts.forEach((item, key) => {
      console.log(' JOB TYPE Into contractInto', item)

      item.forEach((it, index) => {
        if (!contractMap.has(key)) {
          contractMap.set(key, [])
        }
        let itr = { ...it }
        itr.contractBOLists = null
        let contractId = (itr.contractID === "000000000000000000") ? itr.copyFromContractID : itr.contractID

        itr.stageMappingBOs = stageMap1.get(contractId)
        itr.stageMappingBOList = null
        if (itr.isNew != undefined && itr.isNew) {
          itr.contractID = "000000000000000000"
          itr.copyFromContractID = "000000000000000000"

        }
        if (!(itr.isNew != undefined && itr.isNew && itr.isDeleted != undefined && itr.isDeleted)) {
          contractMap.get(key).push(itr)
        }
      });

    });

    console.log('Save Job Definition contracts', contracts)



    contractGrs.forEach((item, index) => {
      console.log(' JOB TYPE Into contractGroupInto', item)


      if (item[0] != null && item[0].contractGroupID != null) {
        convertedMap.push(item[0]);
        item[0].contractBOLists = null
        item[0].contractBO = contractMap.get(index)
        postPayload.workFlowContractGroup = item[0]
      }
    });



    console.log('1231231231223 Save Job Definition jobDefinition ', postPayload)

    const j = await jobsService.createJobPosting(postPayload)
    console.log('job Posted ', j)
    if (status != 'SAVED') {
      navigate("/home")
    }
    setisUpdatingSave(false)
  }

  const handleSaveClick = async () => {
    try {
      //const { errors } = await form.validateFields();
      // if (errors) {

      //   return;
      // }
      //TODO : Save API.
      //setisUpdatingSave(true)
      saveJobDefinition("SAVED")
      //setisUpdatingSave(false)
    } catch (errorInfo) {
      console.log('Error:', errorInfo);
    }
  };

  const handleBackClick = async () => {
    try {
      if (!showContractScreen) {
        navigate(-1)
      } else {
        setSubmitLabelText("Next")
        setShowContractScreen(false)
      }

      //TODO : Save API.
    } catch (errorInfo) {
      console.log('Error:', errorInfo);
    }
  };

  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  // }
  const handleChange = (field, e) => {
    let prJson = { ...jobDefinition }
    if (field === 'amount') {
      let field1 = 'amountT'

      console.log('Handle Change Event1', field, e)
      console.log('Handle Change Event', field, e.target.value)
      setJobDefinition((prevJson) => ({
        ...prevJson,
        [field1]: e.target.value,
        [field]: e.target.value * 100
      }));
      prJson = {
        ...prJson,
        [field1]: e.target.value,
        [field]: e.target.value * 100
      }

      console.log('Handle Change Event', jobDefinition)
    } else if (field === 'currency') {
      console.log('Handle Change Event1', field, e)
      setJobDefinition((prevJson) => ({
        ...prevJson,
        [field]: e,
      }));
      prJson = {
        ...prJson,
        [field]: e,
      }

      console.log('Handle Change Event', jobDefinition)
    } else if (field === 'tentativeDate') {
      console.log('Handle Change Event1', field, e)
      console.log('Handle Change Event startDate', e[0])
      console.log('Handle Change Event EndDate', e[1])
      setJobDefinition((prevJson) => ({
        ...prevJson,
        ['tentativeStartDateT']: e[0].d,
        ['tentativeStartDateM']: e[0].toDate(),
        ['tentativeStartDate']: e[0].toDate().toISOString(),
        ['tentativeEndDateT']: e[1],
        ['tentativeEndDateM']: e[1].toDate(),
        ['tentativeEndDate']: e[1].toDate().toISOString(),
      }));
      prJson = {
        ...prJson,
        ['tentativeStartDateT']: e[0].d,
        ['tentativeStartDateM']: e[0].toDate(),
        ['tentativeStartDate']: e[0].toDate().toISOString(),
        ['tentativeEndDateT']: e[1],
        ['tentativeEndDateM']: e[1].toDate(),
        ['tentativeEndDate']: e[1].toDate().toISOString(),
      }

      setSelectedRange([...e])
      //setRangeCounter(rangeCounter+1)

      console.log('Handle Change Event', jobDefinition)
    } else if (Array.isArray(e)) {
      console.log('Handle Change Event1', field, e)
      let fi = e.join(',')
      setJobDefinition((prevJson) => ({
        ...prevJson,
        [field]: fi,
      }));
      prJson = {
        ...prJson,
        [field]: fi,
      }
      let field1 = '';
      let field2 = '';
      let val1 = true;
      let val2 = e;
      let field3 = 'test';
      let val3 = 0
      console.log('Handle Change Event', jobDefinition)
      switch (field) {
        case 'tags':
          field1 = 'shownToAllTestT'
          field2 = 'tagsT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToGender':
          field1 = 'shownToAllGender'
          field2 = 'shownToGenderT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToLanguages':
          field1 = 'shownToAllLanguages'
          field2 = 'shownToLanguagesT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToLocations':
          field1 = 'shownToAllLocations'
          field2 = 'shownToLocationsT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToPlatforms':
          field1 = 'shownToAllPlatforms'
          field2 = 'shownToPlatformsT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToTags':
          field1 = 'shownToAllTags'
          field2 = 'shownToTagsT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'shownToUsers':
          field1 = 'shownToAllUsers'
          field2 = 'shownToUsersT'
          if (fi.includes('ALL')) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'followerCount':
          field1 = 'shownToAllSubscriberCount'
          field2 = 'shownToSubscriberMin'
          field3 = 'shownToSubscriberMax'
          val2 = e[0]
          val3 = e[1]
          if (e[0] == 0 && e[1] == 1000000000) {
            val1 = true
          } else {
            val1 = false
          }
          break;
        case 'ageLimitCount':
          field1 = 'shownToAllAgeLimit'
          field2 = 'shownToAgeLimitMin'
          field3 = 'shownToAgeLimitMax'
          val2 = e[0]
          val3 = e[1]
          if (e[0] == 0 && e[1] == 1000000000) {
            val1 = true
          } else {
            val1 = false
          }
          break;
      }

      setJobDefinition((prevJson) => ({
        ...prevJson,
        [field1]: val1,
        [field2]: val2,
        [field3]: val3,
      }));
      prJson = {
        ...prJson,
        [field1]: val1,
        [field2]: val2,
        [field3]: val3,
      }
      updateShowntoUserCount(prJson)
    } else {
      console.log('Handle Change Event1', field, e)
      console.log('Handle Change Event', field, e.target.value)
      setJobDefinition((prevJson) => ({
        ...prevJson,
        [field]: e.target.value,
      }));
      prJson = {
        ...prJson,
        [field]: e.target.value,
      }

      console.log('Handle Change Event', jobDefinition)
    }

  };

  const updateShowntoUserCount = async (prJson) => {
    let jobDefinition1 = {}
    if (prJson != undefined) {
      jobDefinition1 = prJson
    } else {
      jobDefinition1 = jobDefinition
    }

    console.log('Handle Change Event updateShowntoUserCount', jobDefinition1)
    if (jobDefinition1.shownToUsersT != undefined && jobDefinition1.shownToUsersT.length > 0
      && jobDefinition1.shownToUsersT[0] != 'ALL') {
      console.log('Into Job Definition1 User List', jobDefinition1)
      setUserCount(jobDefinition1.shownToUsersT.length)
    } else {

      let searchCriteria1 = [
        {
          field: "documentType",
          value: "PARTNER_TAG",
          operator: "==",
          logical: "AND"
        }
      ]

      if (jobDefinition1.shownToPlatformsT != undefined &&
        jobDefinition1.shownToPlatformsT.length > 0 && jobDefinition1.shownToPlatformsT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "platforms",
          "termField": "platforms",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToPlatformsT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToTagsT != undefined &&
        jobDefinition1.shownToTagsT.length > 0 && jobDefinition1.shownToTagsT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "tags",
          "termField": "tags",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToTagsT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToUsersT != undefined &&
        jobDefinition1.shownToUsersT.length > 0 && jobDefinition1.shownToUsersT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "partnerId",
          "termField": "partnerId",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToUsersT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToLanguagesT != undefined &&
        jobDefinition1.shownToLanguagesT.length > 0 && jobDefinition1.shownToLanguagesT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "languages",
          "termField": "languages",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToLanguagesT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToLocationsT != undefined &&
        jobDefinition1.shownToLocationsT.length > 0 && jobDefinition1.shownToLocationsT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "locations",
          "termField": "locations",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToLocationsT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToGenderT != undefined &&
        jobDefinition1.shownToGenderT.length > 0 && jobDefinition1.shownToGenderT[0] != 'ALL') {
        searchCriteria1.push({
          "field": "gender",
          "termField": "gender",
          "operator": "LIKE",
          "termValue": jobDefinition1.shownToGenderT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToAgeLimitMinT != undefined) {
        searchCriteria1.push({
          "field": "minAge",
          "operator": ">=",
          "value": jobDefinition1.shownToAgeLimitMinT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToAgeLimitMaxT != undefined) {
        searchCriteria1.push({
          "field": "maxAge",
          "operator": "<=",
          "value": jobDefinition1.shownToAgeLimitMaxT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToSubscriberMinT != undefined) {
        searchCriteria1.push({
          "field": "totalFollowers",
          "operator": ">=",
          "value": jobDefinition1.shownToSubscriberMinT,
          "logical": "AND"
        })
      }
      if (jobDefinition1.shownToSubscriberMaxT != undefined) {
        searchCriteria1.push({
          "field": "totalFollowers",
          "operator": "<=",
          "value": jobDefinition1.shownToSubscriberMaxT,
          "logical": "AND"
        })
      }

      const j = await userService.fetchUserTagsCount({
        from: 0,
        size: 100,
        searchCriteria: searchCriteria1
      })
      console.log('User Count ', j)
      if (j?.data?.message?.count != undefined) {
        setUserCount(j?.data?.message?.count)
        console.log('User Count Into ', j)
      }
    }

  }

  useEffect(() => {

    updateShowntoUserCount()
  }, [])

  // const onChange = (value) => {
  //   console.log('changed', value);
  // };

  return (
    <div style={{ margin: '24px 146px' }}>
      <Card className='root' style={{ paddingTop: '16px' }}>
        <Form
          form={form}
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
          {!showContractScreen && (
            <>
              <Row gutter={[16, 26]} align='middle' style={{ marginBottom: '8px' }}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row align='middle'>
                    <Col>
                      <ArrowLeftOutlined onClick={() => handleBackClick()} />
                    </Col>
                    <Col>
                      <Title
                        level={4}
                        style={{ marginLeft: '16px', marginTop: '8px' }}
                      >
                        Post a Job
                      </Title>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row
                    align='middle'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Title level={4}>Basic Job Details</Title>
                    <Button type='text' style={{ color: 'blue' }}>
                      Close
                    </Button>
                  </Row>
                </Col>
              </Row>

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
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '16px',
                    }}
                  >
                    {console.log('Compnent logs ', jobDefinition.jobName)}
                    <Form.Item
                      label='Job Name'
                      name='jobName'
                      rules={[
                        {
                          required: true,
                          message: 'Job Name is required',
                        },
                      ]}
                      style={{ width: '35%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Input placeholder='Video Editor Job' value={jobDefinition.jobName} onChange={(e) => handleChange('jobName', e)}
                            style={{
                              width: '100%'

                            }}
                          />
                        </Space.Compact>
                      </Space>

                    </Form.Item>
                    {console.log('Compnent logs Type ', jobDefinition.jobType)}
                    <Form.Item
                      label='Job Type'
                      name='jobType'
                      rules={[
                        {
                          required: false,
                          message: 'Job Type is required',
                        },
                      ]}
                      style={{ width: '35%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Input style={{
                            backgroundColor: "white",
                            color: "black",
                            cursor: "text"
                          }} disabled placeholder='job Type' value={jobDefinition.jobType} onChange={(e) => handleChange('jobType', e)} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      label='Amount'
                      name='amount'
                      rules={[
                        {
                          required: true,
                          message: 'Amount is required',
                        },
                      ]}
                      style={{ width: '25%' }}
                    >
                      <Space direction="vertical" size="middle" >
                        <Space.Compact>
                          <Input value={jobDefinition.amountT} onChange={(e) => handleChange('amount', e)} style={{
                            width: '60%'
                          }} />
                          <Select mode="single"
                            isSearchable={true}
                            showSearch={true}
                            name='currency' onChange={(e) => handleChange('currency', e)} value={jobDefinition.currency} options={currencyCSVData} style={{
                              width: '40%'
                            }} />

                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between', height: '200px' }}>
                    <Form.Item
                      label='Job Description'
                      name='jobdescription'
                      rules={[
                        {
                          required: true,
                          message: 'Job Description is required',
                        },
                      ]}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <TextArea
                            placeholder='Job Description...'
                            value={jobDefinition.jobDescription}
                            onChange={(e) => handleChange('jobDescription', e)}
                            rows={6}
                            style={{ resize: 'both', width: '100%', height: '150px' }}
                          />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label='Job Description Link'
                      name='jobdescriptionlink'
                      rules={[
                        {
                          required: false,
                          message: 'Job Description Link is required',
                        },
                      ]}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Input placeholder='Add Description Link for better understanding of Job' value={jobDefinition.jobDescriptionLink} onChange={(e) => handleChange('jobDescriptionLink', e)} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  {console.log('Verify JobDefinition', jobDefinition)}
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label='Job influ Production Code Link'
                      name='jobinfluproductioncodelink'
                      value={jobDefinition.jobInfluProdCodeLink}
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Input value={jobDefinition.jobInfluProdCodeLink} placeholder='Add Production code link' onChange={(e) => handleChange('jobInfluProdCodeLink', e)} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      label='Tentative Start Date and End Date'
                      name='startandenddate'
                      rules={[
                        {
                          required: false,
                          message: 'Tentative Start Date and End Date is required',
                        },
                      ]}
                      className='date-styles'
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <RangePicker key={rangeCounter} dvalue={[tentativeStartDateT, tentativeEndDateT]} onChange={(e) => handleChange('tentativeDate', e)} />
                          {/* <RangePicker dvalue={[moment(new Date()),moment(new Date()) ]} onChange={(e) => handleChange('tentativeDate', e)} /> */}
                        </Space.Compact>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      label='Max Buffer Period In days'
                      name='maxbufferperiodindays'
                      rules={[
                        {
                          required: false,
                          message: 'Tentative Start Date and End Date is required',
                        },
                      ]}
                      style={{ width: '25%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Input value={jobDefinition.maxBufferPeriodInDays} onChange={(e) => handleChange('maxBufferPeriodInDays', e)} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label='Job Category'
                      name='tags'
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ width: '70%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={(e) => handleChange('tags', e)} options={tagDropDown} value={jobDefinition.tagsT} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row align='middle'>
                    <Title key={userCount} level={4}>Shown to - {userCount} Users</Title>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label='Followers'
                      name='followers'
                      rules={[
                        {
                          required: false,
                          message: 'followers is required',
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        borderRadius: '10px',
                        marginTop: '8px',
                      }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {console.log('Shown to JobDefinition', jobDefinition)}
                          <DropDownMinMax
                            name='followerCount'
                            sx={{
                              fontSize: '14px',
                              width: '100%',
                              background: 'white',
                              border: '1px solid #D9D9D9',
                              borderRadius: '4px',
                            }}
                            placeholder='Followers count'
                            getOptionLabel={(option) => {
                              return option;
                            }}
                            options={[{ "min": jobDefinition.shownToSubscriberMinT, "max": jobDefinition.shownToSubscriberMaxT, "value": "0-1000000", "label": "0-1000000" }]}
                            minimum={jobDefinition.shownToSubscriberMinT}
                            maximum={jobDefinition.shownToSubscriberMaxT}
                            onChange={(e) => handleChange('followerCount', e)}

                          />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label='Audience Age Limit'
                      name='ageLimit'
                      rules={[
                        {
                          required: false,
                          message: 'AgeLimit is required',
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        borderRadius: '10px',
                        marginTop: '8px',
                      }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <DropDownMinMax
                            name='ageLimitCount'
                            sx={{
                              fontSize: '14px',
                              width: '100%',
                              background: 'white',
                              border: '1px solid #D9D9D9',
                              borderRadius: '4px',
                            }}
                            placeholder='Age Limit'
                            getOptionLabel={(option) => {
                              return option;
                            }}
                            options={[{ "min": jobDefinition.shownToAgeLimitMinT, "max": jobDefinition.shownToAgeLimitMaxT, "value": (jobDefinition.shownToAgeLimitMinT + "" + "-" + jobDefinition.shownToAgeLimitMaxT + ""), "label": (jobDefinition.shownToAgeLimitMinT + "" + "-" + jobDefinition.shownToAgeLimitMaxT + "") }]}
                            minimum={jobDefinition.shownToAgeLimitMinT}
                            maximum={jobDefinition.shownToAgeLimitMaxT}
                            onChange={(e) => handleChange('ageLimitCount', e)}
                          />
                        </Space.Compact>
                      </Space>
                      {/* <Space>
                    <InputNumber
                    label='min'
                      defaultValue={0}
                      placeHolder='min'
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={onChange}
                    />
                    <InputNumber
                    label='max'
                    placeHolder='max'
                      defaultValue={1000000000}
                      min={0}
                      max={1000000000}
                      formatter={(value) => `${value}`}
                      parser={(value) => value.replace('', '')}
                      onChange={onChange}
                    />
                  </Space> */}

                    </Form.Item>
                    <Form.Item
                      label='Language'
                      name='language'
                      rules={[
                        {
                          required: false,
                          message: 'Language is required',
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        borderRadius: '10px',
                        marginTop: '8px',
                        //marginBottom: '10px',
                      }}
                    >
                      {/* <AutoCompleteMui
                    sx={{
                      fontSize: '14px',
                      width: '100%',
                      background: 'white',
                      border: '1px solid #D9D9D9',
                      borderRadius: '4px',
                    }}
                    placeholder='Language'
                    options={languageCSVData}
                    getOptionLabel={(option) => {
                      return option['Language name '];
                    }}
                  /> */}
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {console.log('Langauge', jobDefinition.shownToLanguagesT)}
                          <Select mode="tags" style={{ width: '100%' }} placeholder="language" onChange={(e) => handleChange('shownToLanguages', e)} options={languageCSVData} value={jobDefinition.shownToLanguagesT} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]} style={{ paddingTop: '16px' }}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item
                      label='Audience Gender'
                      name='Gender'
                      rules={[
                        {
                          required: false,
                          message: 'Gener is required',
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        borderRadius: '10px',
                        marginTop: '8px',
                      }}
                    >
                      {/* <AutoCompleteMui
                    sx={{
                      fontSize: '14px',
                      width: '100%',
                      background: 'white',
                      border: '1px solid #D9D9D9',
                      borderRadius: '4px',
                    }}
                    placeholder='Country'
                    getOptionLabel={(option) => {
                      return option.country_name;
                    }}
                    options={locationCSVData}
                  /> */}
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {console.log('Gender', jobDefinition.shownToGenderT)}
                          <Select mode="tags" style={{ width: '100%' }} placeholder="Gender" onChange={(e) => handleChange('shownToGender', e)} options={[{ "value": "MALE", "label": "MALE" }, { "value": "FEMALE", "label": "FEMALE" }, { "value": "Trans-Gender", "label": "Trans-Gender" }, { "value": "ALL", "label": "ALL" }]} value={jobDefinition.shownToGenderT} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label='Location'
                      name='location'
                      rules={[
                        {
                          required: false,
                          message: 'Location is required',
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        borderRadius: '10px',
                        marginTop: '8px',
                      }}
                    >
                      {/* <AutoCompleteMui
                    sx={{
                      fontSize: '14px',
                      width: '100%',
                      background: 'white',
                      border: '1px solid #D9D9D9',
                      borderRadius: '4px',
                    }}
                    placeholder='Country'
                    getOptionLabel={(option) => {
                      return option.country_name;
                    }}
                    options={locationCSVData}
                  /> */}
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Select mode="tags" style={{ width: '100%' }} placeholder="Locations" onChange={(e) => handleChange('shownToLocations', e)} options={locationCSVData} value={jobDefinition.shownToLocationsT} />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                    <Form.Item
                      label='Platform'
                      name='platform'
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{
                        width: '30%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        //marginBottom: '8px',
                        marginTop: '8px',
                        borderRadius: '10px',
                      }}
                    >
                      {/* <SelectMui
                    placeholder='Platform'
                    sx={{
                      fontSize: '12px',
                      border: 'none',
                      width: '100%',
                    }}
                  >
                    {platformDropDown?.map((allValues, index) => {
                      return <MenuItem key={index}>{allValues}</MenuItem>;
                    })}
                  </SelectMui> */}
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Select mode="tags" style={{ width: '100%' }} placeholder="Platforms" onChange={(e) => handleChange('shownToPlatforms', e)} options={platformDropdown} value={jobDefinition.shownToPlatformsT} />
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
                      display: 'flex',
                      justifyContent: 'space-between',
                      //background: 'rgb(240 240 240)',
                      //padding: '16px',
                      //borderRadius: '10px',
                    }}
                  >
                    <Form.Item
                      label='Categories'
                      name='shownToTags'
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{
                        width: '100%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        //marginBottom: '8px',
                        marginTop: '8px',
                        borderRadius: '10px',
                      }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={(e) => handleChange('shownToTags', e)} options={tagDropDown} value={jobDefinition.shownToTagsT} />
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
                      display: 'flex',
                      justifyContent: 'space-between',
                      //background: 'rgb(240 240 240)',
                      //padding: '16px',
                      //borderRadius: '10px',
                    }}
                  >
                    <Form.Item
                      label='Users'
                      name='shownToUsers'
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{
                        width: '100%',
                        background: 'rgb(240 240 240)',
                        padding: '16px',
                        //marginBottom: '8px',
                        marginTop: '8px',
                        borderRadius: '10px',
                      }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <MultiSelUserWithLimiFetchComp style={{ width: '100%' }} onSelect={(e) => handleChange('shownToUsers', e)} value={jobDefinition.shownToUsersT} />
                          {/* <MultiSelectDropDown style={{ width: '100%' }} options={userDropDown} onSelect={(e) => handleChange('shownToUsers', e)} value={jobDefinition.shownToUsersT} /> */}
                          {/* <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={(e) => handleChange('shownToTags', e)} options={tagDropDown} value={jobDefinition.shownToTagsT} /> */}
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row align='middle'>
                    <Title level={4}>Terms and Conditions</Title>
                  </Row>
                </Col>
              </Row>

              <Row gutter={[16, 26]}>
                <Col
                  xs={{ span: 20, offset: 2 }}
                  sm={{ span: 20, offset: 2 }}
                  md={{ span: 20, offset: 2 }}
                  lg={{ span: 20, offset: 2 }}
                  xl={{ span: 20, offset: 2 }}
                >
                  <Row style={{ display: 'flex', justifyContent: 'space-between', height: '200px' }}>
                    <Form.Item
                      label=''
                      name='jobtermsandconditions'
                      rules={[
                        {
                          required: false
                        },
                      ]}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          <TextArea
                            placeholder='Terms and Conditions...'
                            value={jobDefinition.jobTermsAndConditionLink}
                            onChange={(e) => handleChange('jobTermsAndConditionLink', e)}
                            rows={6}
                            style={{ resize: 'both', width: '100%', height: '150px' }}
                          />
                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          {showContractScreen && (
            <Contract1
              backClickHandler={handleBackClick}
              rateCardTypes={rateCardTypes}
              form={form}
              Form={Form}
              size={contractsInd.size}
              type={type}
              contracts={contracts}
              setContracts={setContracts}
              stages={stages}
              setStages={setStages}
              tagDropDown={tagDropDown}
              userDropDown={userDropDown}
              platformDropdown={platformDropdown}
              languageCSVData={languageCSVData}
              locationCSVData={locationCSVData}
              currencyCSVData={currencyCSVData}
              paymentstages={paymentstages}
              dontConsiderTheseStages={dontConsiderTheseStages}
              stageDisplayMap={stageDisplayMap}
            />
          )}
          <Row gutter={[16, 26]}>
            <Col
              xs={{ span: 20, offset: 2 }}
              sm={{ span: 20, offset: 2 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 20, offset: 2 }}
              xl={{ span: 20, offset: 2 }}
            >
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => handleSaveClick()}
                  style={{ width: '25%' }}
                  type='primary'
                  htmlType='submit'
                  disabled={isUpdatingSave}
                >
                  Save &nbsp; {isUpdatingSave && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                </Button>
                <Button
                  onClick={() => handleNextClick()}
                  label={submitLabelText}
                  name={submitLabelText}
                  style={{
                    width: '25%',
                    borderColor: '#1677ff',
                    color: '#1677ff',
                    marginLeft: '16px',
                  }}
                  disabled={isUpdatingSave}
                >
                  {submitLabelText} &nbsp; {isUpdatingSave && <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} />}
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>{' '}
      </Card>



    </div>
  );
};

export default Layout(PostAJob1);
