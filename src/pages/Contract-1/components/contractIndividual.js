import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { ArrowLeftOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, Select, Space, Collapse, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
//import listService from '../../../services/listService';
import InputFields from './../components/InputFields';
import WorkFlowStage from './../components/WorkFlowStage';
import { Box, MenuItem, Switch } from '@mui/material';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import userService from '../../../services/userService';
import MultiUserSelectDropDown from '../../jobs/components/MultiSelectUserComponent'



//import SelectMui from '../../../components/ReusableMuiComponents/SelectMui';
//import AutoCompleteMui from '../../../components/ReusableMuiComponents/AutoCompleteMui';
import DropDownMinMax from '../../../components/ReusableMuiComponents/DropDownMinMax';
import MultiSelUserWithLimiFetchComp from '../../jobs/components/MultiSelUserWithLimiFetchComp';


const { Text, Title } = Typography;
const { Panel } = Collapse;


// const ContractIndividual = ({contracts ,setContracts, stages ,setStages, tagDropDown, languageCSVData , locationCSVData, 
//   currencyCSVData, paymentstages, dontConsiderTheseStages, stageDisplayMap}) => {
const ContractIndividual = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const form = props.form
    let isDisabled = props.isDisabled
    console.log('ContractIndividual isDisabled', isDisabled)
    if (isDisabled === undefined) {
        isDisabled = false
    }
    //isDisabled = true
    console.log('ContractIndividual isDisabled1', isDisabled)


    const [contractData, setContractData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allDetailsDropdown, setAllDetailsDropdown] = useState([]);
    const [checked, setChecked] = useState(false);
    const [csvData, setCSVData] = useState(null);
    const [csvDataLang, setCSVDataLang] = useState(null);
    const [showPaymentStage, setShowPaymentStage] = useState(false)
    const [showWorkFlowStage, setShowWorkflowStage] = useState(false)
    const [userCount, setUserCount] = useState(0)

    let subType = props.subType

    let canShowContDetails = true
    if (subType != undefined && (subType === 'JOB_DETAILS_JOB' || subType === 'JOB_DETAILS_JOB_DEFINITION' || subType === 'JOB_DETAILS_JOB_REQUEST' || subType === 'JOB_DETAILS_JOB_REVIEW')) {
        canShowContDetails = false
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (props.contracts === undefined || props.stages === undefined || props.contracts.size <= 0 || props.stages.size <= 0) {
        return <div></div>
    }

    console.log('ContractsIndivialscontracts', props.contracts)
    console.log('ContractsIndivialsstages', props.stages)
    console.log('ContractsIndivialstagDropDown', props.tagDropDown)
    console.log('ContractsIndivialslanguageCSVData', props.languageCSVData)
    console.log('ContractsIndivialslocationCSVData', props.locationCSVData)
    console.log('ContractsIndivialscurrencyCSVData', props.currencyCSVData)
    console.log('ContractsIndivialsplatformDropdown', props.platformDropdown)
    console.log('ContractsIndivialsUsersDropdown', props.userDropDown)

    console.log('ContractsIndivialspaymentstages', props.paymentstages)
    console.log('ContractsIndivialsdontConsiderTheseStages', props.dontConsiderTheseStages)
    console.log('ContractsIndivialsstageDisplayMap', props.stageDisplayMap)

    const type = props.type
    let item = props.contract
    let selectItem = props.staticContract
    if (selectItem === undefined) {
        selectItem = {}
    }
    const languageCSVData = props.languageCSVData
    const platformDropdown = props.platformDropdown
    const userDropDown = props.userDropDown
    const locationCSVData = props.locationCSVData
    const currencyCSVData = props.currencyCSVData
    const paymentstages = props.paymentstages
    const dontConsiderTheseStages = props.dontConsiderTheseStages
    const stageDisplayMap = props.stageDisplayMap
    let index = props.index
    let keyName = props.keyName
    let setContracts = props.setContracts
    let contracts = props.contracts
    // if (type === "JOB_TYPE") {
    //     const updatedArray = contracts.get(item.contractMasterGroupId)
    //     item = updatedArray[index]

    // } else if (type === "PAST_DEFINITION") {
    //     const updatedArray = contracts.get(item.jobContractGroupID)
    //     item = updatedArray[index]
    // } else if (type === "MASTER_CONTRACT") {
    //     const updatedArray = contracts.get(item.contractMasterGroupId)
    //     item = updatedArray[index]
    // } else if (type === "EDIT_DEFINITION") {
    //     const updatedArray = contracts.get(item.jobContractGroupID)
    //     item = updatedArray[index]
    // } else {
    //     const updatedArray = contracts.get(item.contractMasterGroupId)
    //     item = updatedArray[index]

    // }


    console.log("Contract Individual", item)

    //const [itemT, setItemT] = useState({item})
    const itemT = item
    if (itemT.isExpanded === undefined || itemT.isExpanded === null) {
        itemT.isExpanded = false
    }
    //setItemT(item)
    const stages = props.stages
    let paymentStage1s = []
    let workflowStage1s = []
    let staticPaymentStage1s = new Map()
    let staticWorkflowStage1s = new Map()

    //     if (selectItem.contractID != undefined && selectItem.contractID != 0 && (stages.get(selectItem.contractID) != undefined &&
    //     stages.get(selectItem.contractID) != null &&
    //     stages.get(selectItem.contractID).size != 0)
    // ) {
    //     let paymentStage1st = stages.get(selectItem.contractID).get('PAYMENT')
    //     let workflowStage1st = stages.get(selectItem.contractID).get('WORKFLOW')
    //     paymentStage1st.array.forEach(its => {
    //         staticPaymentStage1s.set(its.stageId , its)
    //     });
    //     workflowStage1st.array.forEach(its => {
    //         staticWorkflowStage1s.set(its.stageId , its)
    //     });
    // } 
    console.log("Contract Individual Static ", selectItem)
    console.log('Contract Individual Static Stages ', stages)
    if (selectItem.contractID != undefined && selectItem.contractID != 0 && (stages.get(selectItem.contractID) != undefined &&
        stages.get(selectItem.contractID) != null &&
        stages.get(selectItem.contractID).size != 0)
    ) {
        let paymentStage1st = stages.get(selectItem.contractID).get('PAYMENT')
        let workflowStage1st = stages.get(selectItem.contractID).get('WORKFLOW')
        console.log('Contract Individual Static Into stageMapping', paymentStage1st, workflowStage1st)

        paymentStage1st.forEach(its => {
            staticPaymentStage1s.set(its.stageId, its)
        });
        workflowStage1st.forEach(its => {
            staticWorkflowStage1s.set(its.stageId, its)
        });
    }
    console.log('Static Payment Stage 1st ', staticPaymentStage1s)
    console.log('Static staticWorkflowStage1s Stage 1st ', staticWorkflowStage1s)

    if (item.contractID != 0 && (stages.get(item.contractID) != undefined &&
        stages.get(item.contractID) != null &&
        stages.get(item.contractID).size != 0)
    ) {
        paymentStage1s = stages.get(item.contractID).get('PAYMENT')
        workflowStage1s = stages.get(item.contractID).get('WORKFLOW')
    } else if (stages.get(item.copyFromContractID) != undefined ||
        stages.get(item.copyFromContractID) != null ||
        stages.get(item.copyFromContractID).size != 0
    ) {
        paymentStage1s = stages.get(item.copyFromContractID).get('PAYMENT')
        workflowStage1s = stages.get(item.copyFromContractID).get('WORKFLOW')
    } else {
        paymentStage1s = stages.get(item.copyFromContractID).get('PAYMENT')
        workflowStage1s = stages.get(item.copyFromContractID).get('WORKFLOW')
    }


    paymentStage1s.forEach(its => {
        its.staticStage = staticPaymentStage1s.get(its.stageId)
        console.log('Payment static stages ', its.stageId, its.staticStage)
    });
    workflowStage1s.forEach(its => {
        its.staticStage = staticWorkflowStage1s.get(its.stageId)
        console.log('Workflow static stages ', its.stageId, its.staticStage)

    });


    paymentStage1s.sort((a, b) => a.indexStaging - b.indexStaging);
    workflowStage1s.sort((a, b) => a.indexStaging - b.indexStaging);
    console.log('PaymentStagesList', paymentStage1s)
    console.log('sWorkflowStagesList', workflowStage1s)


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

    const [filterGenderT, setFilterGenderT] = useState(["ALL"])
    const [filterAllGenderT, setFilterAllGenderT] = useState(true)
    const [filterAllTagsT, setFilterAllTagsT] = useState(true)
    const [filterTagsT, setFilterTagsT] = useState(["ALL"])
    const [filterAgeLimitMinT, setFilterAgeLimitMinT] = useState(0)
    const [filterAgeLimitMaxT, setFilterAgeLimitMaxT] = useState(100)
    const [filterAllAgeLimitT, setFilterAllAgeLimitT] = useState(true)
    const [tagsT, setTagsT] = useState(["ALL"])

    //let filterSubscriberMinT = 0
    // let filterSubscriberMaxT = 1000000000
    // let filterAllSubscriberCountT = true
    // let filterLocationsT = ["ALL"]
    // let filterAllLocationsT = true
    // let filterAllLanguagesT = true
    // let filterLanguagesT = ["ALL"]
    // let filterAllPlatformsT = true
    // let filterPlatformsT = ["ALL"]
    // let filterGenderT = ["ALL"]
    // let filterAllGenderT = true
    // let filterAllTagsT = true
    // let filterTagsT = ["ALL"]
    // let filterAgeLimitMinT = 0
    // let filterAgeLimitMaxT = 100
    // let filterAllAgeLimitT = true

    // let tagsT = ["ALL"]




    if (item.filterSubscriberMin != undefined && item.filterSubscriberMin != null && item.filterSubscriberMin > 0) {
        item.filterSubscriberMinT = item.filterSubscriberMin
    }

    if (item.filterSubscriberMax != undefined && item.filterSubscriberMax != null && item.filterSubscriberMax > 0) {
        item.filterSubscriberMaxT = item.filterSubscriberMax
    }

    if (!(filterSubscriberMinT === 0 && filterSubscriberMaxT === 1000000000)) {
        item.filterAllSubscriberCountT = false
    }

    if (item.filterLocations != undefined && item.filterLocations != null) {
        item.filterLocationsT = item.filterLocations.split(",")
    }
    if (item.filterLocations != undefined &&
        item.filterLocations != null && item.filterLocations != "ALL") {
        item.filterAllLocationsT = false
    }

    if (item.filterLanguages != undefined && item.filterLanguages != null) {
        item.filterLanguagesT = item.filterLanguages.split(",")
    }
    if (item.filterLanguages != undefined &&
        item.filterLanguages != null && item.filterLanguages != "ALL") {
        item.filterAllLanguagesT = false
    }
    if (item.filterPlatforms != undefined && item.filterPlatforms != null) {
        item.filterPlatformsT = item.filterPlatforms.split(",")
    }
    if (item.filterPlatforms != undefined &&
        item.filterPlatforms != null && item.filterPlatforms != "ALL") {
        item.filterAllPlatformsT = false
    }
    if (item.filterUsers != undefined && item.filterUsers != null) {
        item.filterUsersT = item.filterUsers.split(",")
    }
    if (item.filterUsers != undefined &&
        item.filterUsers != null && item.filterUsers != "ALL") {
        item.filterAllUsersT = false
    }


    console.log('Gender OUT::: ', item)

    if (item.filterGender != undefined && item.filterGender != null) {
        item.filterGenderT = item.filterGender.split(",")
    }

    if (item.filterGender != undefined &&
        item.filterGender != null && item.filterGender != "ALL") {
        item.filterAllGenderT = false
    }
    console.log('Tags out::: ', item)
    if (item.tags != undefined && item.tags != null) {
        console.log('Tags ::: ', item.tags)
        item.tagsT = item.tags.split(",")
        console.log('Tags T ::: ', tagsT)

    }

    if (item.filterTags != undefined && item.filterTags != null) {
        item.filterTagsT = item.filterTags.split(",")
    }

    if (item.filterTags != undefined &&
        item.filterTags != null && item.filterTags != "ALL") {
        item.filterAllTagsT = false
    }

    if (item.filterAgeLimitMin != undefined && item.filterAgeLimitMin != null && item.filterAgeLimitMin > 0) {
        item.filterAgeLimitMinT = item.filterAgeLimitMin
    }

    if (item.filterAgeLimitMax != undefined && item.filterAgeLimitMax != null && item.filterAgeLimitMax > 0) {
        item.filterAgeLimitMaxT = item.filterAgeLimitMax
    }

    if (!(filterAgeLimitMinT === 0 && filterAgeLimitMaxT === 1000000000)) {
        item.filterAllAgeLimitT = false
    }

    console.log("Into ContractIndividuals contracts 1 ", item)

    let typeToIgnoreFilter = ["JOB_REQUEST_DETAILS", "JOB_DETAILS"]
    let typeNoEditableFilter = ["JOB_DETAILS", "JOB_DEFINTION_DETAILS", "JOB_REQUEST_DETAILS"]

    let typeNoEditableINPUTS = ["JOB_DETAILS", "JOB_DEFINTION_DETAILS"]
    if (type === "JOB_TYPE") {
        const updatedArray = contracts.get(item.contractMasterGroupId)
        updatedArray[index] = item
        contracts.set(item.contractMasterGroupId, updatedArray)
        setContracts(contracts)
    } else if (type === "PAST_DEFINITION") {
        const updatedArray = contracts.get(item.jobContractGroupID)
        updatedArray[index] = item
        contracts.set(item.contractMasterGroupId, updatedArray)
        setContracts(contracts)
    } else if (type === "MASTER_CONTRACT") {
        const updatedArray = contracts.get(item.contractMasterGroupId)
        updatedArray[index] = item
        contracts.set(item.contractMasterGroupId, updatedArray)
        setContracts(contracts)
    } else if (type === "EDIT_DEFINITION") {
        const updatedArray = contracts.get(item.jobContractGroupID)
        updatedArray[index] = item

        contracts.set(item.jobContractGroupID, updatedArray)

        setContracts(contracts)
    } else {
        const updatedArray = contracts.get(item.contractMasterGroupId)
        updatedArray[index] = item
        contracts.set(item.contractMasterGroupId, updatedArray)
        setContracts(contracts)

    }
    //setItemT(item)
    console.log("Into ContractIndividuals contracts ", item)
    // function handleChange(value) {
    //   console.log(`selected ${value}`);
    // }
    const formatNumber = (number) => {
        let formatted = '';
        if (number === 0) {
            formatted += "0";
            return formatted;
        }

        let remainingNumber = number
        if (remainingNumber >= 1000000) {
            const millions = Math.floor(remainingNumber / 1000000);
            remainingNumber = remainingNumber - (millions * 1000000);
            if (millions > 0) {
                formatted += `${millions}M `;
            }
        }
        if (remainingNumber >= 1000) {
            const thousands = Math.floor((remainingNumber) / 1000);
            remainingNumber = remainingNumber - (thousands * 1000);

            formatted += `${thousands}K `;
        }
        if (remainingNumber > 0) {
            formatted += `${remainingNumber}`;
        }
        return formatted;

    };
    const updateContracts = (item, field1, field2, field3, val1, value2, value3, field4, field5, field6, val4, value5, value6) => {
        item[field1] = val1;
        item[field2] = value2;
        item[field3] = value3;
        item[field4] = val4;
        item[field5] = value5;
        item[field6] = value6;
        console.log('Item udpate in ContractIndividual', item)
        if (type === "JOB_TYPE") {
            const updatedArray = contracts.get(item.contractMasterGroupId)
            updatedArray[index] = item
            contracts.set(item.contractMasterGroupId, updatedArray)
            setContracts(contracts)
        } else if (type === "PAST_DEFINITION") {
            const updatedArray = contracts.get(item.jobContractGroupID)
            updatedArray[index] = item
            contracts.set(item.jobContractGroupID, updatedArray)
            setContracts(contracts)
        } else if (type === "MASTER_CONTRACT") {
            const updatedArray = contracts.get(item.contractMasterGroupId)
            updatedArray[index] = item
            contracts.set(item.contractMasterGroupId, updatedArray)
            setContracts(contracts)
        } else if (type === "EDIT_DEFINITION") {
            const updatedArray = contracts.get(item.jobContractGroupID)
            updatedArray[index] = item
            contracts.set(item.jobContractGroupID, updatedArray)
            setContracts(contracts)
        } else {
            const updatedArray = contracts.get(item.contractMasterGroupId)
            updatedArray[index] = item
            contracts.set(item.contractMasterGroupId, updatedArray)
            setContracts(contracts)
        }
        //setItemT(item)
        console.log('Item update Contracts', contracts)

    }
    const handleChange = (field, e) => {
        console.log("Into handleChangeContractIndividuals contracts ", e)
        let prJson = { ...item }
        if (field === 'isSkipped') {

        } else if (Array.isArray(e)) {
            console.log('Handle Change Event1', field, e)
            let fi = e.join(',')
            // setContracts((prevJson) => ({
            //     ...prevJson,
            //     [field]: fi,
            // }));
            updateContracts(item, field, 'field1', 'field2', fi, '', '', 'field4', 'field5', 'field6', '', '', '')
            let field1 = '';
            let field2 = '';
            let val1 = true;
            let val2 = e;
            let field3 = 'test';
            let val3 = 0
            let field4 = '';
            let field5 = '';
            let field6 = '';
            let val4 = true;
            let val5 = e;
            let val6 = 0;
            console.log('Handle Change Event', item)
            console.log('Value 2 Update', val2)

            switch (field) {
                case 'tags':
                    field1 = 'filterAllTagsT'
                    field2 = 'tagsT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterGender':
                    field1 = 'filterAllGender'
                    field2 = 'filterGenderT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterLanguages':
                    field1 = 'filterAllLanguages'
                    field2 = 'filterLanguagesT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterLocations':
                    field1 = 'filterAllLocations'
                    field2 = 'filterLocationsT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterPlatforms':
                    field1 = 'filterAllPlatforms'
                    field2 = 'filterPlatformsT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterUsers':
                    field1 = 'filterAllUsers'
                    field2 = 'filterUsersT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'filterTags':
                    field1 = 'filterAllTags'
                    field2 = 'filterTagsT'
                    if (fi.includes('ALL')) {
                        val1 = true
                    } else {
                        val1 = false
                    }
                    break;
                case 'followerCountInd':
                    field1 = 'filterAllSubscriberCount'
                    field2 = 'filterSubscriberMin'
                    field3 = 'filterSubscriberMax'
                    field4 = 'filterAllSubscriberCountT'
                    field5 = 'filterSubscriberMinT'
                    field6 = 'filterSubscriberMaxT'
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
                    break;
                case 'ageLimitCountInd':
                    field1 = 'filterAllAgeLimit'
                    field2 = 'filterAgeLimitMin'
                    field3 = 'filterAgeLimitMax'
                    field4 = 'filterAllAgeLimitT'
                    field5 = 'filterAgeLimitMinT'
                    field6 = 'filterAgeLimitMaxT'
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
                    break;
            }
            console.log('ContractInvidual setContract Data', val1, val2, val3)

            //TODO : Update the correct contract
            // setContracts((prevJson) => ({
            //     ...prevJson,
            //     [field1]: val1,
            //     [field2]: val2,
            //     [field3]: val3,
            // }));
            updateContracts(item, field1, field2, field3, val1, val2, val3, field4, field5, field6, val4, val5, val6)
            prJson = {
                ...item,
                [field1]: val1,
                [field2]: val2,
                [field3]: val3,
                [field4]: val4,
                [field5]: val5,
                [field6]: val6,

            }

            switch (field) {
                case 'tags':
                    setFilterTagsT(item.filterTagsT)
                    break;
                case 'filterGender':
                    setFilterGenderT(item.filterGenderT)
                    break;
                case 'filterLanguages':
                    setFilterLanguagesT(item.filterLanguagesT)
                    break;
                case 'filterLocations':
                    setFilterLocationsT(item.filterLocationsT)
                    break;
                case 'filterPlatforms':
                    setFilterPlatformsT(item.filterPlatformsT)
                    break;
                case 'filterUsers':
                    setFilterUsersT(item.filterUsersT)
                    break;
                case 'filterTags':
                    setFilterTagsT(item.filterTagsT)
                    break;
                case 'followerCountInd':
                    field1 = 'filterAllSubscriberCount'
                    field2 = 'filterSubscriberMin'
                    field3 = 'filterSubscriberMax'
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
                    break;
                case 'ageLimitCountInd':
                    field1 = 'filterAllAgeLimit'
                    field2 = 'filterAgeLimitMin'
                    field3 = 'filterAgeLimitMax'
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
                    break;
            }

        } else {
            console.log('Handle Change Event1', field, e)
            console.log('Handle Change Event', field, e.target.value)
            updateContracts(item, field, 'field1', 'field2', e.target.value, '', '')
            console.log('Handle Change Event', item)
        }
        console.log('Update Filter to User Count', prJson)
        updateShowntoUserCount(prJson)

    };

    const updateShowntoUserCount = async (prJson) => {
        let jobDefinition1 = {}
        if (prJson != undefined) {
            jobDefinition1 = prJson
        } else {
            jobDefinition1 = itemT
        }

        console.log('Handle Change Event updateShowntoUserCount', jobDefinition1)
        if (jobDefinition1.filterUsersT != undefined && jobDefinition1.filterUsersT.length > 0
            && jobDefinition1.filterUsersT[0] != 'ALL') {
            console.log('Into Job Definition1 User List', jobDefinition1)
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

            if (jobDefinition1.filterPlatformsT != undefined &&
                jobDefinition1.filterPlatformsT.length > 0 && jobDefinition1.filterPlatformsT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "platforms",
                    "termField": "platforms",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterPlatformsT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterTagsT != undefined &&
                jobDefinition1.filterTagsT.length > 0 && jobDefinition1.filterTagsT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "tags",
                    "termField": "tags",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterTagsT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterUsersT != undefined &&
                jobDefinition1.filterUsersT.length > 0 && jobDefinition1.filterUsersT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "partnerId",
                    "termField": "partnerId",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterUsersT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterLanguagesT != undefined &&
                jobDefinition1.filterLanguagesT.length > 0 && jobDefinition1.filterLanguagesT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "languages",
                    "termField": "languages",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterLanguagesT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterLocationsT != undefined &&
                jobDefinition1.filterLocationsT.length > 0 && jobDefinition1.filterLocationsT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "locations",
                    "termField": "locations",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterLocationsT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterGenderT != undefined &&
                jobDefinition1.filterGenderT.length > 0 && jobDefinition1.filterGenderT[0] != 'ALL') {
                searchCriteria1.push({
                    "field": "gender",
                    "termField": "gender",
                    "operator": "LIKE",
                    "termValue": jobDefinition1.filterGenderT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterAgeLimitMinT != undefined) {
                searchCriteria1.push({
                    "field": "minAge",
                    "operator": ">=",
                    "value": jobDefinition1.filterAgeLimitMinT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterAgeLimitMaxT != undefined) {
                searchCriteria1.push({
                    "field": "maxAge",
                    "operator": "<=",
                    "value": jobDefinition1.filterAgeLimitMaxT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterSubscriberMinT != undefined) {
                searchCriteria1.push({
                    "field": "totalFollowers",
                    "operator": ">=",
                    "value": jobDefinition1.filterSubscriberMinT,
                    "logical": "AND"
                })
            }
            if (jobDefinition1.filterSubscriberMaxT != undefined) {
                searchCriteria1.push({
                    "field": "totalFollowers",
                    "operator": "<=",
                    "value": jobDefinition1.filterSubscriberMaxT,
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

        updateShowntoUserCount(itemT)
    }, [])

    let explandable = ((itemT.isExpanded != undefined && itemT.isExpanded != null && itemT.isExpanded) || index === props.size - 1 ? true : false)
    const [isExpanded, setIsExpanded] = useState(explandable);
    const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
    const [isWorkflowExpand, setIsWorkflowExpand] = useState(true);


    const toggleExpand = () => {
        itemT.isExpanded = isExpanded
        setIsExpanded(!isExpanded);
    };

    const togglePaymentExpand = () => {
        setIsPaymentExpanded(!isPaymentExpanded);
    };
    const toggleIsWorkflowExpand = () => {
        setIsWorkflowExpand(!isWorkflowExpand);
    };

    const handleDelete = () => {
        if (type === "JOB_TYPE") {
            props.handleDelete(index, item.contractMasterGroupId)
        } else if (type === "PAST_DEFINITION") {
            props.handleDelete(index, item.jobContractGroupID)
        } else if (type === "MASTER_CONTRACT") {
            props.handleDelete(index, item.contractMasterGroupId)
        } else if (type === "EDIT_DEFINITION") {
            props.handleDelete(index, item.jobContractGroupID)

        } else {
            props.handleDelete(index, item.contractMasterGroupId)
        }
    };

    console.log('Property Index', props.index)

    return (
        <div key={props.index}>
            {console.log('ContractIndividual return item', item)}

            {/* <Card style={{ paddingTop: '16px', marginTop: '24px' , width:'100%' }}> */}
            {/* <Collapsible 
            trigger={
                <div className={`collapsible-header ${isExpanded ? 'expanded' : ''}`}>
          <h3><span>Contract - {item.contractName}</span></h3>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} />
        </div>
            }
            open= {index ===  props.size -1 ?  true : false }
            transitionTime={200}
            onOpening={toggleExpand}
            onClosing={toggleExpand}
             > */}
            <div style={{padding:"0"}}
            >
                <Collapse
                    size='small'
                    onChange={toggleExpand}
                    defaultActiveKey={((itemT.isExpanded != undefined && itemT.isExpanded != null && itemT.isExpanded) || index === props.size - 1) ? ['1'] : ['2']}
                    bordered
                    style={{
                        backgroundColor: '#f0f2f5',
                        padding: '16px',
                        //boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                    }}
                >
                    <Panel
                        key='1'
                        header={
                            // <Space direction="vertical" size="small" style={{
                            //     width: '100%',
                            //     height: '10px',
                            //     background: 'blue',

                            // }} >
                            //     {/* <Space.Compact style={{
                            //         width: '100%'

                            //     }} >
                            //         {console.log('Contract Item T' , itemT)}
                            //         <h4 style={{ width: '95%' ,background : 'blue'}} >Contract - {itemT.contractName}
                            //         </h4>
                            //         {isExpanded ? <CaretUpOutlined style={{alignItems : 'right'}}/> : <CaretDownOutlined style={{alignItems : 'right'}}/>}

                            //     </Space.Compact> */}
                            //     <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'  ,height: '40px'}}>
                            //         <h4 style={{ width: '95%'}}>Contract - {itemT.contractName}</h4>
                            //         {isExpanded ? <CaretUpOutlined style={{ width: '5%' }} /> : <CaretDownOutlined style={{ width: '5%' }} />}
                            //     </Space.Compact>
                            // </Space>
                            <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px' }}>
                                <h4 style={{ width: '90%' }}>Contract - {itemT.contractName}</h4>
                                {!isDisabled && (
                                    <h4 style={{ width: '5%', color: 'red' }} onClick={(e) => handleDelete()} >Delete</h4>
                                )}
                                {isExpanded ? <CaretUpOutlined style={{ width: '5%' }} /> : <CaretDownOutlined style={{ width: '5%' }} />}
                            </Space.Compact>
                        }
                        showArrow={false}
                        size='small'
                    >
                        {canShowContDetails && (
                            <Row gutter={[16, 26]}>
                                <Col
                                    xs={{ span: 20, offset: 1 }}
                                    sm={{ span: 20, offset: 1 }}
                                    md={{ span: 20, offset: 1 }}
                                    lg={{ span: 20, offset: 1 }}
                                    xl={{ span: 20, offset: 1 }}
                                >
                                    <Row
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <Text
                                            type='text'
                                            style={{ fontWeight: 'bold', fontSize: '24px' }}
                                            key={userCount}
                                        >
                                            Contract Filter -  {userCount} Users
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        )}

                        {/* Contract Name */}
                        {canShowContDetails && (
                            <>
                                <Row gutter={[16, 26]} style={{ width: '100%' }}>
                                    <Col
                                        // xs={{ span: 20, offset: 1 }}
                                        // sm={{ span: 20, offset: 1 }}
                                        // md={{ span: 20, offset: 1 }}
                                        lg={{ span: 33, offset: 1 }}
                                        // xl={{ span: 20, offset: 1 }}
                                        style={{ width: '100%' }}
                                    >
                                        {/* <Row
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '16px',
                                    }}
                                > */}
                                        <Form.Item
                                            label='Contract Name'
                                            initialValue={itemT.contractName}
                                            name={`contractname-${index}-${keyName}`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Contract Name is required',
                                                },
                                            ]}
                                            style={{ width: '100%' }}
                                        >
                                            <Input disabled={isDisabled} placeholder={`Contract Name`} />
                                        </Form.Item>
                                        {/* </Row> */}
                                    </Col>
                                </Row>
                            </>
                        )}
                        {(canShowContDetails || ( subType === 'JOB_DETAILS_JOB_DEFINITION' && props.isPosterPartnerId)) && (

                            <>
                                {/*Subscriber Count, */}
                                <Row gutter={[16, 26]} style={{ width: '100%' }}>
                                    <Col
                                        // xs={{ span: 20, offset: 1 }}
                                        // sm={{ span: 20, offset: 1 }}
                                        // md={{ span: 20, offset: 1 }}
                                        lg={{ span: 33, offset: 1 }}
                                        // xl={{ span: 20, offset: 1 }}
                                        style={{ width: '100%' }}
                                    >

                                        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Form.Item
                                                label='Subscriber Count'
                                                name='followersCont'
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Subscriber Count is required',
                                                    },
                                                ]}
                                                style={{
                                                    width: '35%',
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
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && props.isPosterPartnerId && (
                                                            // <DropDownMinMax
                                                            //     name='followerCountInd'
                                                            //     sx={{
                                                            //         fontSize: '14px',
                                                            //         width: '100%',
                                                            //         background: 'white',
                                                            //         border: '1px solid #D9D9D9',
                                                            //         borderRadius: '4px',
                                                            //     }}
                                                            //     placeholder='Followers count'
                                                            //     getOptionLabel={(option) => {
                                                            //         return option;
                                                            //     }}
                                                            //     options={[{ "min": itemT.filterSubscriberMinT, "max": itemT.filterSubscriberMaxT, "value": "0-1000000", "label": "0-1000000" }]}
                                                            //     minimum={itemT.filterSubscriberMinT}
                                                            //     maximum={itemT.filterSubscriberMaxT}
                                                            //     onChange={(e) => handleChange('followerCountInd', e)}
                                                            //     disabled={true}

                                                            // />
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }} >{formatNumber(itemT.filterSubscriberMinT)}-{formatNumber(itemT.filterSubscriberMaxT)}</Text>
                                                        )}
                                                        { subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            <DropDownMinMax
                                                                name='followerCountInd'
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
                                                                options={[{ "min": itemT.filterSubscriberMinT, "max": itemT.filterSubscriberMaxT, "value": "0-1000000", "label": "0-1000000" }]}
                                                                minimum={itemT.filterSubscriberMinT}
                                                                maximum={itemT.filterSubscriberMaxT}
                                                                onChange={(e) => handleChange('followerCountInd', e)}
                                                                disabled={isDisabled}
                                                            />
                                                        )}
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
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            // <DropDownMinMax
                                                            //     name='ageLimitCountInd'
                                                            //     sx={{
                                                            //         fontSize: '14px',
                                                            //         width: '100%',
                                                            //         background: 'white',
                                                            //         border: '1px solid #D9D9D9',
                                                            //         borderRadius: '4px',
                                                            //     }}
                                                            //     placeholder='Age Limit'
                                                            //     getOptionLabel={(option) => {
                                                            //         return option;
                                                            //     }}
                                                            //     options={[{ "min": itemT.filterAgeLimitMinT, "max": itemT.filterAgeLimitMaxT, "value": (itemT.filterAgeLimitMinT + "" + "-" + itemT.filterAgeLimitMaxT + ""), "label": (itemT.filterAgeLimitMinT + "" + "-" + itemT.filterAgeLimitMaxT + "") }]}
                                                            //     minimum={itemT.filterAgeLimitMinT}
                                                            //     maximum={itemT.filterAgeLimitMaxT}
                                                            //     onChange={(e) => handleChange('ageLimitCountInd', e)}
                                                            //     disabled={true}
                                                            // />                                                           <Text>{formatNumber(itemT.filterSubscriberMinT)}-{formatNumber(itemT.filterSubscriberMaxT)}</Text>
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }} >{formatNumber(itemT.filterAgeLimitMinT)}-{formatNumber(itemT.filterAgeLimitMaxT)}</Text>
                                                        )}
                                                        {subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            <DropDownMinMax
                                                                name='ageLimitCountInd'
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
                                                                options={[{ "min": itemT.filterAgeLimitMinT, "max": itemT.filterAgeLimitMaxT, "value": (itemT.filterAgeLimitMinT + "" + "-" + itemT.filterAgeLimitMaxT + ""), "label": (itemT.filterAgeLimitMinT + "" + "-" + itemT.filterAgeLimitMaxT + "") }]}
                                                                minimum={itemT.filterAgeLimitMinT}
                                                                maximum={itemT.filterAgeLimitMaxT}
                                                                onChange={(e) => handleChange('ageLimitCountInd', e)}
                                                                disabled={isDisabled}
                                                            />
                                                        )}
                                                    </Space.Compact>
                                                </Space>
                                            </Form.Item>
                                            <Form.Item
                                                label='Language'
                                                name='languageContInd'
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
                                                <Space direction="vertical" size="middle" style={{
                                                    width: '100%'

                                                }} >
                                                    <Space.Compact style={{
                                                        width: '100%'

                                                    }} >
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            // <Select disabled={true} key={filterLanguagesT} mode="tags" style={{ width: '100%' }} placeholder="language" onChange={(e) => handleChange('filterLanguages', e)} options={languageCSVData} value={itemT.filterLanguagesT} />
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }} >{itemT.filterLanguagesT}</Text>
                                                        )}
                                                        {subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            <Select disabled={isDisabled} key={filterLanguagesT} mode="tags" style={{ width: '100%' }} placeholder="language" onChange={(e) => handleChange('filterLanguages', e)} options={languageCSVData} value={itemT.filterLanguagesT} />
                                                        )}
                                                    </Space.Compact>
                                                </Space>
                                            </Form.Item>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 26]} style={{ width: '100%' }} >
                                    <Col
                                        // xs={{ span: 20, offset: 1 }}
                                        // sm={{ span: 20, offset: 1 }}
                                        // md={{ span: 20, offset: 1 }}
                                        lg={{ span: 33, offset: 1 }}
                                        // xl={{ span: 20, offset: 1 }}
                                        style={{ width: '100%' }}
                                    >
                                        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Form.Item
                                                label='Audience Gender'
                                                name='GenderContInd'
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
                                                <Space direction="vertical" size="middle" style={{
                                                    width: '100%'

                                                }} >
                                                    <Space.Compact style={{
                                                        width: '100%'

                                                    }} >
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && (

                                                            //<Select disabled={true} key={filterGenderT} mode="tags" style={{ width: '100%' }} placeholder="Gender" onChange={(e) => handleChange('filterGender', e)} options={[{ "value": "MALE", "label": "MALE" }, { "value": "FEMALE", "label": "FEMALE" }, { "value": "Trans-Gender", "label": "Trans-Gender" }, { "value": "ALL", "label": "ALL" }]} value={itemT.filterGenderT} />
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }}>{itemT.filterGenderT}</Text>
                                                        )}
                                                        {subType != 'JOB_DETAILS_JOB_DEFINITION' && (

                                                            <Select disabled={isDisabled} key={filterGenderT} mode="tags" style={{ width: '100%' }} placeholder="Gender" onChange={(e) => handleChange('filterGender', e)} options={[{ "value": "MALE", "label": "MALE" }, { "value": "FEMALE", "label": "FEMALE" }, { "value": "Trans-Gender", "label": "Trans-Gender" }, { "value": "ALL", "label": "ALL" }]} value={itemT.filterGenderT} />
                                                        )}
                                                    </Space.Compact>
                                                </Space>
                                            </Form.Item>
                                            <Form.Item
                                                label='Location'
                                                name='locationContInd'
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
                                                <Space direction="vertical" size="middle" style={{
                                                    width: '100%'

                                                }} >
                                                    <Space.Compact style={{
                                                        width: '100%'

                                                    }} >
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            //<Select disabled={true} key={filterLocationsT} mode="tags" style={{ width: '100%' }} placeholder="Locations" onChange={(e) => handleChange('filterLocations', e)} options={locationCSVData} value={itemT.filterLocationsT} />
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }}>{itemT.filterLocationsT}</Text>
                                                        )}
                                                        {subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            <Select disabled={isDisabled} key={filterLocationsT} mode="tags" style={{ width: '100%' }} placeholder="Locations" onChange={(e) => handleChange('filterLocations', e)} options={locationCSVData} value={itemT.filterLocationsT} />
                                                        )}
                                                    </Space.Compact>
                                                </Space>
                                            </Form.Item>
                                            <Form.Item
                                                label='Platform'
                                                name='platformContInd'
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
                                                <Space direction="vertical" size="middle" style={{
                                                    width: '100%'

                                                }} >
                                                    <Space.Compact style={{
                                                        width: '100%'

                                                    }} >
                                                        {subType === 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            // <Select disabled={true} key={filterPlatformsT} mode="tags" style={{ width: '100%' }} placeholder="Platforms" onChange={(e) => handleChange('filterPlatforms', e)} options={platformDropdown} value={itemT.filterPlatformsT} />
                                                            <Text type='text'
                                                                style={{ fontWeight: 'bold', fontSize: '14px' }}>{itemT.filterPlatformsT}</Text>
                                                        )}
                                                        {subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                            <Select disabled={isDisabled} key={filterPlatformsT} mode="tags" style={{ width: '100%' }} placeholder="Platforms" onChange={(e) => handleChange('filterPlatforms', e)} options={platformDropdown} value={itemT.filterPlatformsT} />
                                                        )}

                                                    </Space.Compact>
                                                </Space>
                                            </Form.Item>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Form.Item
                                        label='Users'
                                        name='userContInd'
                                        rules={[
                                            {
                                                required: false,
                                                message: 'User is required',
                                            },
                                        ]}
                                        style={{
                                            width: '100%',
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
                                                {subType === 'JOB_DETAILS_JOB_DEFINITION' && (
                                                    <>
                                                    <MultiSelUserWithLimiFetchComp isDisabled={isDisabled}  style={{ width: '100%' }} options={userDropDown} onSelect={(e) => handleChange('filterUsers', e)} value={itemT.filterUsersT} />
                                                    </>
                                                )}
                                                {subType != 'JOB_DETAILS_JOB_DEFINITION' && (
                                                    <>
                                                    {console.log('INTO EDIT JOB DEFINITION Check ')}
                                                    <MultiSelUserWithLimiFetchComp isDisabled={isDisabled} style={{ width: '100%' }} options={userDropDown} onSelect={(e) => handleChange('filterUsers', e)} value={itemT.filterUsersT} />
                                                    </>
                                                )}
                                            </Space.Compact>
                                        </Space>
                                    </Form.Item>

                                </Row>
                            </>
                        )}

                        <Row gutter={[16, 26]} style={{ width: '100%' }} >
                            <Col
                                // xs={{ span: 20, offset: 1 }}
                                // sm={{ span: 20, offset: 1 }}
                                // md={{ span: 20, offset: 1 }}
                                lg={{ span: 33, offset: 1 }}
                                // xl={{ span: 20, offset: 1 }}
                                style={{ width: '100%' }}
                            >
                                <Collapse
                                    size='small'
                                    onChange={togglePaymentExpand}
                                    defaultActiveKey={isExpanded === true ? ['payment1'] : ['payment2']}
                                >
                                    <Panel
                                        key='payment1'
                                        header={

                                            <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '30px' }}>

                                                <h4 style={{ width: '95%' }} ><span>Payment Stages</span></h4>
                                                {isPaymentExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                            </Space.Compact>

                                        }
                                        showArrow={false}
                                        size='small'
                                    >
                                        <Row gutter={[16, 26]} style={{ width: '100%' }}>
                                            <Col
                                                xs={{ span: 30, offset: 0 }}
                                                sm={{ span: 30, offset: 0 }}
                                                md={{ span: 30, offset: 0 }}
                                                lg={{ span: 30, offset: 0 }}
                                                xl={{ span: 30, offset: 0 }}
                                                style={{ width: '100%' }}
                                            >
                                                <Row
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {Object.entries(paymentStage1s)?.map(
                                                        ([key, vluNameStage], index) => {
                                                            console.log('Payment Stages : ', vluNameStage)

                                                            return (
                                                                <div key={index} >
                                                                    {/* <Row style={{ alignItems: 'baseline', background: '#F6F7F8', height: '40px', width : '100%' }}>
                                                                       
                                                                           <h4 style={{
                                                                                color: '#1d2736',
                                                                                fontSize: '12px',
                                                                                display: 'flex',
                                                                                marginRight: '14px',
                                                                                marginLeft: '4px',
                                                                                fontWeight: 600,

                                                                            }}> {vluNameStage?.stageName}</h4>
                                                                        <Switch
                                                                            onChange={(event) => {
                                                                                setChecked(event.target.checked);
                                                                            }}
                                                                            inputProps={{
                                                                                'aria-label': 'controlled',
                                                                            }}
                                                                            checked={
                                                                                vluNameStage?.stageEnabled === false ||
                                                                                vluNameStage?.StageStatus ===
                                                                                'SKIPPED' ||
                                                                                checked
                                                                            }
                                                                            size='small'
                                                                        />
                                                                    </Row>
                                                                    <Row style={{ alignItems: 'baseline' }}>
                                                                        <Title
                                                                            style={{
                                                                                color: '#6C6C6C',
                                                                                fontSize: '12px',
                                                                                display: 'flex',
                                                                                marginRight: '4px',
                                                                                fontWeight: 500,
                                                                            }}
                                                                            level={4}
                                                                        >
                                                                            {vluNameStage?.stageDisplayDetails?.StageDescription}
                                                                        </Title>
                                                                    </Row>
                                                                    <Row style={{ alignItems: 'baseline' }}> */}
                                                                    <InputFields
                                                                        subType={props.subType}
                                                                        isDisabled={isDisabled}
                                                                        isPosterPartnerId = {props.isPosterPartnerId}
                                                                        rateCardTypes={props.rateCardTypes}
                                                                        inputType='PAYMENT'
                                                                        item1={vluNameStage}
                                                                        currencyCSVData={currencyCSVData}
                                                                        form={form}
                                                                        index={index}
                                                                        Form={Form}
                                                                        allDetailsDropdown={allDetailsDropdown}
                                                                        vluNameStage={vluNameStage}
                                                                        type={props.type}
                                                                        size={props.size}
                                                                        keyName={item.copyFromContractID}
                                                                        contract={item}
                                                                        contracts={props.contracts}
                                                                        setContracts={props.setContracts}
                                                                        stages={props.stages}
                                                                        setStages={props.setStages}
                                                                        tagDropDown={props.tagDropDown}
                                                                        languageCSVData={props.languageCSVData}
                                                                        locationCSVData={props.locationCSVData}
                                                                        paymentstages={props.paymentstages}
                                                                        dontConsiderTheseStages={props.dontConsiderTheseStages}
                                                                        stageDisplayMap={props.stageDisplayMap}
                                                                    />
                                                                    {/* </Row> */}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>



                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                        {/*  Workflow Stage */}
                        <Row gutter={[16, 26]} style={{ width: '100%' }} >
                            <Col
                                // xs={{ span: 20, offset: 1 }}
                                // sm={{ span: 20, offset: 1 }}
                                // md={{ span: 20, offset: 1 }}
                                lg={{ span: 33, offset: 1 }}
                                // xl={{ span: 20, offset: 1 }}
                                style={{ width: '100%' }}
                            >
                                <Collapse
                                    size='small'
                                    onChange={toggleIsWorkflowExpand}
                                    defaultActiveKey={isExpanded === true ? ['workflow1'] : ['workflow2']}
                                >
                                    <Panel
                                        key='workflow1'
                                        header={

                                            <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '30px' }}>
                                                <h4 style={{ width: '95%' }} ><span>Workflow Stages</span></h4>
                                                {isPaymentExpanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                            </Space.Compact>
                                        }
                                        showArrow={false}
                                        size='small'
                                    >
                                        <Row gutter={[16, 26]}>
                                            <Col
                                                xs={{ span: 30, offset: 0 }}
                                                sm={{ span: 30, offset: 0 }}
                                                md={{ span: 30, offset: 0 }}
                                                lg={{ span: 30, offset: 0 }}
                                                xl={{ span: 30, offset: 0 }}
                                            >
                                                <Row
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    {Object.entries(workflowStage1s)?.map(
                                                        ([keyV, vluNameStage], index) => {
                                                            console.log('Workflow Stages : ', vluNameStage)
                                                            return (
                                                                <div key={index}>
                                                                    {/* <Row style={{ alignItems: 'baseline', background: '#F6F7F8', height: '40px', width : '100%'}}>
                                                                        
                                                                           <h4 style={{
                                                                                color: '#1d2736',
                                                                                fontSize: '12px',
                                                                                display: 'flex',
                                                                                marginRight: '14px',
                                                                                marginLeft: '4px',
                                                                                fontWeight: 600,

                                                                            }}> {vluNameStage?.stageName}</h4>
                                                                        <Switch
                                                                            onChange={(event) => {
                                                                                setChecked(event.target.checked);
                                                                            }}
                                                                            inputProps={{
                                                                                'aria-label': 'controlled',
                                                                            }}
                                                                            checked={
                                                                                vluNameStage?.stageEnabled === false ||
                                                                                vluNameStage?.StageStatus ===
                                                                                'SKIPPED' ||
                                                                                checked
                                                                            }
                                                                            size='small'
                                                                        />
                                                                    </Row>
                                                                    <Row style={{ alignItems: 'baseline' }}>
                                                                        <Title
                                                                            style={{
                                                                                color: '#6C6C6C',
                                                                                fontSize: '12px',
                                                                                display: 'flex',
                                                                                marginRight: '4px',
                                                                                fontWeight: 500,
                                                                            }}

                                                                            level={4}
                                                                        >
                                                                            <p>{vluNameStage?.stageDisplayDetails?.StageDescription}</p>
                                                                        </Title>
                                                                    </Row>
                                                                    <Row style={{ alignItems: 'baseline' }}> */}
                                                                    <InputFields
                                                                        subType={props.subType}
                                                                        isDisabled={isDisabled}
                                                                        rateCardTypes={props.rateCardTypes}
                                                                        inputType='WORKFLOW'
                                                                        currencyCSVData={currencyCSVData}
                                                                        form={form}
                                                                        index={index}
                                                                        Form={Form}
                                                                        allDetailsDropdown={allDetailsDropdown}
                                                                        vluNameStage={vluNameStage}
                                                                        type={props.type}
                                                                        size={props.size}
                                                                        keyName={item.copyFromContractID}
                                                                        contract={item}
                                                                        contracts={props.contracts}
                                                                        setContracts={props.setContracts}
                                                                        stages={props.stages}
                                                                        setStages={props.setStages}
                                                                        tagDropDown={props.tagDropDown}
                                                                        languageCSVData={props.languageCSVData}
                                                                        locationCSVData={props.locationCSVData}
                                                                        paymentstages={props.paymentstages}
                                                                        dontConsiderTheseStages={props.dontConsiderTheseStages}
                                                                        stageDisplayMap={props.stageDisplayMap}
                                                                    />
                                                                    {/* </Row> */}
                                                                    {/* <Divider /> */}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>



                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
            {/* </Collapsible> */}

        </div>
    );
};

export default ContractIndividual;
