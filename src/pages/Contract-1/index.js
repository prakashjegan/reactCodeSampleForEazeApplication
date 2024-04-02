import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { ArrowLeftOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import listService from '../../services/listService';
import InputFields from './components/InputFields';
import WorkFlowStage from './components/WorkFlowStage';
import { Box, MenuItem, Switch } from '@mui/material';
import SelectMui from '../../components/ReusableMuiComponents/SelectMui';
import AutoCompleteMui from '../../components/ReusableMuiComponents/AutoCompleteMui';
import ContractIndividual from './components/contractIndividual';


const { Text, Title } = Typography;

const Contract1 = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm()

  let isDisabled = props.isDisabled 
  if (isDisabled === undefined) {
    isDisabled = false
  }

  let removeHeader = props.removeHeader 
  if (removeHeader === undefined) {
    removeHeader = false
  }

  const [contractData, setContractData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allDetailsDropdown, setAllDetailsDropdown] = useState([]);
  const [checked, setChecked] = useState(false);
  const [counter, setCounter] = useState(0)
  const [platformDropdown, setPlatformDropDown] = useState([]);
  const [csvData, setCSVData] = useState(null);
  const [csvDataLang, setCSVDataLang] = useState(null);
  const [showPaymentStage, setShowPaymentStage] = useState(false)
  const [showWorkFlowStage, setShowWorkflowStage] = useState(false)
  let contracts = props.contracts
  let staticContract = props.staticContract 
  
  let contractGroupId = 0
  let contractMaxIndex = 0;
  let type = props.type
  const handleDelete1 = (index, contractGroupId) => {
    contracts = props.contracts
    const updatedArray = contracts.get(contractGroupId)
    //updatedArray[index] = item
    let item = updatedArray[index]
    item.isDeleted = true
    updatedArray[index] = item
    contracts.set(contractGroupId, updatedArray)
    props.setContracts(contracts)
    setCounter(prevCounter => prevCounter + 1);
    console.log('handleDelete ', updatedArray)


  };

  const handleAddClick = () => {
    contracts = props.contracts
    let stages = props.stages
    const updatedArray = contracts.get(contractGroupId)
    
    //updatedArray[index] = item
    let item = {...updatedArray[contractMaxIndex]}
    let contractId =(item.contractID === "000000000000000000") ? item.copyFromContractID : item.contractID
    console.log('handleAdd Stages Map ', contractId , stages)

    let tempStage = stages.get(contractId)
    console.log('handleAdd Stages temp  Map ', tempStage)
    let stageMap = new Map()
    console.log('handleAdd Stages temp stage Map ', stageMap)

    let stagesWorkflowList = [...tempStage.get('WORKFLOW')]
    let stagesPaymentList = [...tempStage.get('PAYMENT')]
    console.log('handleAdd Stages Map stagesWorkflowList', stagesWorkflowList)
    console.log('handleAdd Stages Map stagesPaymentList', stagesPaymentList)
//"WORKFLOW"
//"PAYMENT"

    item.isExpanded = true
    item.isDeleted = false
    item.contractName = "New contract" + contractMaxIndex + 2
    item.isNew = true
    const currentTimestamp = new Date().getTime();
    item.contractID = currentTimestamp
    item.copyFromContractID = currentTimestamp
    const updatedStagePaymentList = stagesPaymentList.map((stage) => {
      // Perform updates on each stage object
      // For example, update the stageId and contractId properties
      return {
        ...stage,
        stageMappingID: "000000000000000000",
        isNew : true,
        contractId: "000000000000000000",
      };
    });
    const updatedStageWorkflowList = stagesWorkflowList.map((stage) => {
      // Perform updates on each stage object
      // For example, update the stageId and contractId properties
      return {
        ...stage,
        stageMappingID: "000000000000000000",
        contractId: "000000000000000000",
      };
    });

    stageMap.set('WORKFLOW' , updatedStageWorkflowList)
    stageMap.set('PAYMENT' , updatedStagePaymentList)
  



    updatedArray.push({...item})
    contracts.set(contractGroupId, updatedArray)
    stages.set(item.contractID, stageMap)
    props.setStages(stages)
    props.setContracts(contracts)
    setCounter(prevCounter => prevCounter + 1);
    console.log('handleAdd Contract', updatedArray)
    console.log('handleAdd Stages ', stages)


  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if (props.contracts === undefined || props.stages === undefined || props.contracts.size <= 0 || props.stages.size <= 0) {
    return <div></div>
  }

  console.log('Contracts contracts', props.contracts)
  console.log('Contracts stages', props.stages)
  console.log('Contracts tagDropDown', props.tagDropDown)
  console.log('Contracts languageCSVData', props.languageCSVData)
  console.log('Contracts locationCSVData', props.locationCSVData)
  console.log('Contracts currencyCSVData', props.currencyCSVData)
  console.log('Contracts paymentstages', props.paymentstages)
  console.log('Contracts dontConsiderTheseStages', props.dontConsiderTheseStages)
  console.log('Contracts stageDisplayMap', props.stageDisplayMap)

  let typeToIgnoreFilter = ["JOB_REQUEST_DETAILS", "JOB_DETAILS"]
  let typeNoEditableFilter = ["JOB_DETAILS", "JOB_DEFINTION_DETAILS", "JOB_REQUEST_DETAILS"]

  let typeNoEditableINPUTS = ["JOB_DETAILS", "JOB_DEFINTION_DETAILS"]

  return (

    <>
      {/* // <div
    //   style={{
    //     marginTop: '24px',
    //     marginBottom: '24px',
    //     marginLeft: '146px',
    //     marginRight: '146px',
    //   }}
    // > */}

      {/* <Form
      //   form={form}
      //   name='contractBasic'
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      //   autoComplete='off'
      //   layout='vertical'
      // > */}
      {!removeHeader && (
      //<Card id={counter} style={{ paddingTop: '16px', marginTop: '24px', width: '100%' }}>
        <Row gutter={[16, 26]} align='baseline'>
          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 20, offset: 2 }}
          >
            <Row align='middle'>
              <Col>
                <ArrowLeftOutlined onClick={() => props.backClickHandler()} />
              </Col>
              <Col>
                <Title
                  level={4}
                  style={{
                    marginLeft: '16px',
                    marginTop: '8px',
                  }}
                >
                  Contracts
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      //</Card>
      )}
      {console.log('OuterContracts contracts', contracts)}
      {
        Array.from(contracts).map(([key, value], index1) => {
          // console.log("OuterContracts Key Name", key)
          console.log("OuterContracts Contract1 item1 ", value)
          console.log("OuterContracts Contract1 index ", index1)

          return Array.from(value).map((item, index) => {
            console.log("OuterContractsKey Name", item.copyFromContractID)
            console.log("OuterContracts Contract item ", item)
            console.log("OuterContracts Contract index ", index)
            if (type === "JOB_TYPE") {
              contractGroupId = item.contractMasterGroupId;
            } else if (type === "PAST_DEFINITION") {
              contractGroupId = item.jobContractGroupID;
            } else if (type === "MASTER_CONTRACT") {
              contractGroupId = item.contractMasterGroupId;
            } else if (type === "EDIT_DEFINITION") {
              contractGroupId = item.jobContractGroupID;
            } else {
              contractGroupId = item.contractMasterGroupId;

            }
            contractMaxIndex = index
            return (

              (item.isDeleted === undefined || item.isDeleted === null || !item.isDeleted) && (
<>
{console.log('Into Contract1individual Via job_updates' , isDisabled)}

                <ContractIndividual
                subType = {props.subType}
                  staticContract = {staticContract}
                  isDisabled={isDisabled}
                  handleDelete={handleDelete1}
                  rateCardTypes={props.rateCardTypes}
                  type={props.type}
                  isPosterPartnerId={props.isPosterPartnerId}
                  size={props.size}
                  keyName={item.copyFromContractID}
                  contract={item}
                  index={index}
                  form={props.form}
                  Form={props.Form}
                  contracts={props.contracts}
                  setContracts={props.setContracts}
                  stages={props.stages}
                  setStages={props.setStages}
                  tagDropDown={props.tagDropDown}
                  platformDropdown={props.platformDropdown}
                  userDropDown={props.userDropDown}
                  languageCSVData={props.languageCSVData}
                  locationCSVData={props.locationCSVData}
                  currencyCSVData={props.currencyCSVData}
                  paymentstages={props.paymentstages}
                  dontConsiderTheseStages={props.dontConsiderTheseStages}
                  stageDisplayMap={props.stageDisplayMap}
                />
                </>

              )
            );
          });
        })}
      {/* {
        Array.from(props.contracts).map(([key , value], index1) => {
          //console.log("OuterContracts Key Name", key)
          console.log("OuterContracts Contract1 item1 ", value)
          console.log("OuterContracts Contract1 index ", index1)

          Array.from(value).map((item, index) => {
            console.log("OuterContractsKey Name", item.copyFromContractID)
            console.log("OuterContracts Contract item ", item)
            console.log("OuterContracts Contract index ", index)
          

          return (
            <ContractIndividual
            keyName = {item.copyFromContractID}
            contract = {item}
            index = {index}
            contracts = {props.contracts} 
      setContracts = {props.setContracts}
      stages = {props.stages} 
      setStages = {props.setStages}
       tagDropDown={props.tagDropDown} 
       languageCSVData={props.languageCSVData} 
       locationCSVData={props.locationCSVData}
  currencyCSVData={props.currencyCSVData} 
  paymentstages={props.paymentstages} 
  dontConsiderTheseStages={props.dontConsiderTheseStages} 
  stageDisplayMap={props.stageDisplayMap}
            />
          );
        })})} */}
      {/* <Card> */}
      { !isDisabled && (
      <Row style={{ display: 'flex', justifyContent: 'right' }}>
        <div style={{ width: '90%' }}></div>
        <Button
          onClick={() => handleAddClick()}
          style={{
            width: '25%',
            borderColor: '#1677ff',
            color: '#1677ff',
            marginLeft: '16px',
          }}
        >
          Add Contract
        </Button>
      </Row>
      )}
      {/* </Card> */}
      {/* </Form> */}
      {/* </div> */}
    </>
  );
};

export default Contract1;
