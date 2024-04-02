import React, { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { ArrowLeftOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, Select, Space, Collapse, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
//import listService from '../../../services/listService';
import InputFields from './../components/InputFields';
import WorkFlowStage from './../components/WorkFlowStage';
import { Box, MenuItem, Switch } from '@mui/material';
import Collapsible from 'react-collapsible';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';


//import SelectMui from '../../../components/ReusableMuiComponents/SelectMui';
//import AutoCompleteMui from '../../../components/ReusableMuiComponents/AutoCompleteMui';
import DropDownMinMax from '../../../components/ReusableMuiComponents/DropDownMinMax';


const { Text, Title } = Typography;
const { Panel } = Collapse;


// const ContractIndividual = ({contracts ,setContracts, stages ,setStages, tagDropDown, languageCSVData , locationCSVData, 
//   currencyCSVData, paymentstages, dontConsiderTheseStages, stageDisplayMap}) => {
const JobStageUpdte = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const form = props.form

    const [contractData, setContractData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allDetailsDropdown, setAllDetailsDropdown] = useState([]);
    const [checked, setChecked] = useState(false);
    const [csvData, setCSVData] = useState(null);
    const [csvDataLang, setCSVDataLang] = useState(null);
    const [showPaymentStage, setShowPaymentStage] = useState(false)
    const [showWorkFlowStage, setShowWorkflowStage] = useState(false)
    const [userCount , setUserCount] = useState(0)

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
    console.log('ContractsIndivialspaymentstages', props.paymentstages)
    console.log('ContractsIndivialsdontConsiderTheseStages', props.dontConsiderTheseStages)
    console.log('ContractsIndivialsstageDisplayMap', props.stageDisplayMap)

    const type = props.type
    let item = props.contract
    const languageCSVData = props.languageCSVData
    const platformDropdown = props.platformDropdown
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
    if (itemT.isExpanded === undefined || itemT.isExpanded ===null) {
        itemT.isExpanded = false
    }
    //setItemT(item)
    const stages = props.stages
    let paymentStage1s = []
    let workflowStage1s = []
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
const [filterPlatformsT, setFilterPlatformsT] = useState(["ALL"])
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

    const updateContracts = (item, field1, field2, field3, val1, value2, value3) => {
        item[field1] = val1;
        item[field2] = value2;
        item[field3] = value3;
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
        if (field === 'isSkipped') {
            
        } else if (Array.isArray(e)) {
            console.log('Handle Change Event1', field, e)
            let fi = e.join(',')
            // setContracts((prevJson) => ({
            //     ...prevJson,
            //     [field]: fi,
            // }));
            updateContracts(item ,field, 'field1','field2', fi , '' , '' )
            let field1 = '';
            let field2 = '';
            let val1 = true;
            let val2 = e;
            let field3 = 'test';
            let val3 = 0
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
                    val2 = e[0]
                    val3 = e[1]
                    if (e[0] == 0 && e[1] == 1000000000) {
                        val1 = true
                    } else {
                        val1 = false
                    }
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
            updateContracts(item, field1, field2, field3, val1, val2, val3)

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
                    break;
            }

        } else {
            console.log('Handle Change Event1', field, e)
            console.log('Handle Change Event', field, e.target.value)
            updateContracts(item, field, 'field1', 'field2', e.target.value, '', '')
            console.log('Handle Change Event', item)
        }
    };

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
            <Card 
             >
                <Collapse
                    size='small'
                    onChange={toggleExpand}
                    defaultActiveKey={((itemT.isExpanded != undefined && itemT.isExpanded != null && itemT.isExpanded) || index === props.size - 1 ) ? ['1'] : ['2']}
                    bordered
                    style={{
                      backgroundColor: '#f0f2f5',
                      padding: '16px',
                      //boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      width: '100%' ,
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
                                <h4 style={{ width: '5%', color: 'red' }} onClick={(e) => handleDelete()} >Delete</h4>

                                {isExpanded ? <CaretUpOutlined style={{ width: '5%' }} /> : <CaretDownOutlined style={{ width: '5%' }} />}
                            </Space.Compact>
                        }
                        showArrow={false}
                        size='small'
                    >
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
                                        marginBottom:'10px'
                                    }}
                                >
                                    <Text
                                        type='text'
                                        style={{ fontWeight: 'bold', fontSize: '24px' }}
                                    >
                                        Contract Filter -  {userCount} Users
                                    </Text>
                                </Row>
                            </Col>
                        </Row>

                        {/* Contract Name */}
                        <Row gutter={[16, 26]} style = {{width : '100%'}}>
                            <Col
                                // xs={{ span: 20, offset: 1 }}
                                // sm={{ span: 20, offset: 1 }}
                                // md={{ span: 20, offset: 1 }}
                                lg={{ span: 33, offset: 1 }}
                                // xl={{ span: 20, offset: 1 }}
                                style = {{width : '100%'}}
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
                                        <Input placeholder={`Contract Name`} />
                                    </Form.Item>
                                {/* </Row> */}
                            </Col>
                        </Row>

                        {/*Subscriber Count, */}
                        <Row gutter={[16, 26]}  style = {{width : '100%'}}>
                        <Col
                               // xs={{ span: 20, offset: 1 }}
                               // sm={{ span: 20, offset: 1 }}
                               // md={{ span: 20, offset: 1 }}
                               lg={{ span: 33, offset: 1 }}
                               // xl={{ span: 20, offset: 1 }}
                               style = {{width : '100%'}}
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
                                                />
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
                                                {console.log('Langauge', itemT.filterLanguagesT)}
                                                <Select key = {filterLanguagesT} mode="tags" style={{ width: '100%' }} placeholder="language" onChange={(e) => handleChange('filterLanguages', e)} options={languageCSVData} value={itemT.filterLanguagesT} />
                                            </Space.Compact>
                                        </Space>
                                    </Form.Item>
                                </Row>
                            </Col>
                        </Row>

                        <Row gutter={[16, 26]} style = {{width : '100%'}} >
                        <Col
                               // xs={{ span: 20, offset: 1 }}
                               // sm={{ span: 20, offset: 1 }}
                               // md={{ span: 20, offset: 1 }}
                               lg={{ span: 33, offset: 1 }}
                               // xl={{ span: 20, offset: 1 }}
                               style = {{width : '100%'}}
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
                                                {console.log('Gender', itemT.filterGenderT)}
                                                <Select key = {filterGenderT} mode="tags" style={{ width: '100%' }} placeholder="Gender" onChange={(e) => handleChange('filterGender', e)} options={[{ "value": "MALE", "label": "MALE" }, { "value": "FEMALE", "label": "FEMALE" }, { "value": "Trans-Gender", "label": "Trans-Gender" }, { "value": "ALL", "label": "ALL" }]} value={itemT.filterGenderT} />
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
                                                <Select key = {filterLocationsT} mode="tags" style={{ width: '100%' }} placeholder="Locations" onChange={(e) => handleChange('filterLocations', e)} options={locationCSVData} value={itemT.filterLocationsT} />
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
                                                <Select key = {filterPlatformsT} mode="tags" style={{ width: '100%' }} placeholder="Platforms" onChange={(e) => handleChange('filterPlatforms', e)} options={platformDropdown} value={itemT.filterPlatformsT} />
                                            </Space.Compact>
                                        </Space>
                                    </Form.Item>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={[16, 26]}  style = {{width : '100%'}} >
                        <Col
                               // xs={{ span: 20, offset: 1 }}
                               // sm={{ span: 20, offset: 1 }}
                               // md={{ span: 20, offset: 1 }}
                               lg={{ span: 33, offset: 1 }}
                               // xl={{ span: 20, offset: 1 }}
                               style = {{width : '100%'}}
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
                                        <Row gutter={[16, 26]}  style = {{width : '100%'}}>
                                            <Col
                                                xs={{ span: 30, offset: 0 }}
                                                sm={{ span: 30, offset: 0 }}
                                                md={{ span: 30, offset: 0 }}
                                                lg={{ span: 30, offset: 0 }}
                                                xl={{ span: 30, offset: 0 }}
                                                style = {{width : '100%'}}
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
                        <Row gutter={[16, 26]} style = {{width : '100%'}} >
                        <Col
                               // xs={{ span: 20, offset: 1 }}
                               // sm={{ span: 20, offset: 1 }}
                               // md={{ span: 20, offset: 1 }}
                               lg={{ span: 33, offset: 1 }}
                               // xl={{ span: 20, offset: 1 }}
                               style = {{width : '100%'}}
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
            </Card>
            {/* </Collapsible> */}

        </div>
    );
};

export default JobStageUpdte;
