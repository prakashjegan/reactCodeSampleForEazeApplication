import React, { useEffect, useState } from 'react';
import '../style.scss';
import { Box, MenuItem, Grid, Switch } from '@mui/material';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, Select, Space, Collapse, Divider, InputNumber } from 'antd';
import SelectMui from '../../../components/ReusableMuiComponents/SelectMui';
import TextFieldMui from '../../../components/ReusableMuiComponents/TextFieldMui';
import AutoCompleteMui from '../../../components/ReusableMuiComponents/AutoCompleteMui';
import moment from 'moment';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const InputFields = (props) => {

  const vluNameStage = props.vluNameStage
  const itemT = props.vluNameStage
  const type = props.type
  const form = props.form
  const Form = props.Form
  let isDisabled = props.isDisabled
  const index = props.index
  
  if (isDisabled === undefined) {
    isDisabled = false
  }
  //let itemT = vluNameStage
  //const [valueOfTypeFixed, setValueOfTypeFixed] = useState(vluNameStage.rateCardRuleType);
  //const[item, setItem] = useState({...vluNameStage})
  //let item = itemT 
  console.log('Item in InputFields', itemT, props.subType)
  let showWorkflowDetails = true
  let subType = props.subType

  if (subType != undefined && (subType === 'JOB_DETAILS_JOB' || subType === 'JOB_DETAILS_JOB_DEFINITION' || subType === 'JOB_DETAILS_JOB_REQUEST' || subType === 'JOB_DETAILS_JOB_REVIEW')) {

    showWorkflowDetails = false
  }
  if (subType != undefined && subType === 'JOB_DETAILS_JOB_DEFINITION') {
    showWorkflowDetails = true
  }
  if (!props.isPosterPartnerId && subType === 'JOB_DETAILS_JOB_DEFINITION') {
    isDisabled = false
    showWorkflowDetails = false
  }
  if (subType != undefined && subType === 'JOB_DETAILS_JOB_REQUEST') {
    console.log('Into Job Request Input Fields ', props)
    if (itemT?.canPerformAction !== undefined ) {
      isDisabled = !itemT?.canPerformAction
    } else {
      isDisabled = false
    }
  }

  console.log('RateCardTypes : ', props.rateCardTypes)
  const [selectedRange, setSelectedRange] = useState([]);


  let types = []
  let repeatPaymentTypes = [{ "value": "WEEEKLY", "label": "WEEKLY" }, { "value": "MONTHLY", "label": "MONTHLY" }]
  {
    Object.entries(props.rateCardTypes)?.map(
      ([key, itemT], index) => {

        types.push({ "value": key, "label": key })
      }
    )
  }
  itemT.eventValueT = 0
  itemT.fixedAmountT = 0
  itemT.fixedCurrencyT = ""
  itemT.repeatPaymentTypesT = 0
  itemT.reapeatPaymentTimesT = 0
  itemT.disableEventT = false
  itemT.tentativeStartDateM = new Date()
  itemT.tentativeEndDateM = new Date()
  itemT.tentativeEndDateM.setDate(itemT.tentativeEndDateM.getDate() + 30);
  itemT.tentativeEndDateT = moment(itemT.tentativeEndDateM)
  itemT.tentativeStartDateT = moment(itemT.tentativeStartDateM)
  itemT.displayContentT = itemT.displayContent
  itemT.isSkipped = false


  if (props.inputType === 'PAYMENT') {
    if (itemT.rateCardRuleType === 'PERCENTAGE') {
      itemT.eventValueT = itemT.percentageValue
    } else if (itemT.rateCardRuleType === 'PER_EVENT') {
      itemT.eventValueT = itemT.perEventCount
    } else if (itemT.rateCardRuleType === 'PER_VIEW') {
      itemT.eventValueT = itemT.perViewCount
    } else {
      itemT.disableEventT = true
    }

    if (itemT.rateCardRuleType === 'PERCENTAGE') {
      itemT.fixedAmountT = itemT.percentageValue
    } else if (itemT.rateCardRuleType === 'PER_EVENT') {
      itemT.fixedAmountT = itemT.perEventValue / 100
    } else if (itemT.rateCardRuleType === 'PER_VIEW') {
      itemT.fixedAmountT = itemT.perViewValue / 100
    } else {
      itemT.fixedAmountT = itemT.fixedValue / 100
    }
    itemT.fixedCurrencyT = itemT.currency
    // if (itemT.fixedAmountT === undefined) {
    //   itemT.currency = "INR"
    //   itemT.fixedCurrencyT = "INR"
    // }
    itemT.repeatPaymentTypesT = itemT.repeatPaymentDurationType
    itemT.reapeatPaymentTimesT = itemT.repeatPaymentDurationTimes
  }
  if (!(itemT.tentativeStartDate === null || itemT.tentativeStartDate === undefined || (new Date(itemT.tentativeStartDate).getFullYear() <= 2022))) {
    itemT.tentativeStartDateM = new Date(itemT.tentativeStartDate)
  }
  if (!(itemT.tentativeEndDate === null || itemT.tentativeEndDate === undefined || (new Date(itemT.tentativeEndDate).getFullYear() <= 2022))) {
    itemT.tentativeEndDateM = new Date(itemT.tentativeEndDate)
  }
  if (itemT.stageEnabled === false || itemT.stageStatus === "SKIPPED") {
    itemT.isSkipped = true
  } else {
    itemT.isSkipped = false
  }

  if (itemT.staticStage != undefined && itemT.staticStage.stageEnabled != undefined) {

    if (props.inputType === 'PAYMENT') {
      if (itemT.staticStage.rateCardRuleType === 'PERCENTAGE') {
        itemT.staticStage.eventValueT = itemT.staticStage.percentageValue
      } else if (itemT.staticStage.rateCardRuleType === 'PER_EVENT') {
        itemT.staticStage.eventValueT = itemT.staticStage.perEventCount
      } else if (itemT.staticStage.rateCardRuleType === 'PER_VIEW') {
        itemT.staticStage.eventValueT = itemT.staticStage.perViewCount
      } else {
        itemT.staticStage.disableEventT = true
      }

      if (itemT.staticStage.rateCardRuleType === 'PERCENTAGE') {
        itemT.staticStage.fixedAmountT = itemT.staticStage.percentageValue
      } else if (itemT.staticStage.rateCardRuleType === 'PER_EVENT') {
        itemT.staticStage.fixedAmountT = itemT.staticStage.perEventValue / 100
      } else if (itemT.staticStage.rateCardRuleType === 'PER_VIEW') {
        itemT.staticStage.fixedAmountT = itemT.staticStage.perViewValue / 100
      } else {
        itemT.staticStage.fixedAmountT = itemT.staticStage.fixedValue / 100
      }
      itemT.staticStage.fixedCurrencyT = itemT.staticStage.currency
      // if (itemT.fixedAmountT === undefined) {
      //   itemT.currency = "INR"
      //   itemT.fixedCurrencyT = "INR"
      // }
      itemT.staticStage.repeatPaymentTypesT = itemT.staticStage.repeatPaymentDurationType
      itemT.staticStage.reapeatPaymentTimesT = itemT.staticStage.repeatPaymentDurationTimes
    }
    if (!(itemT.staticStage.tentativeStartDate === null || itemT.staticStage.tentativeStartDate === undefined || (new Date(itemT.staticStage.tentativeStartDate).getFullYear() <= 2022))) {
      itemT.staticStage.tentativeStartDateM = new Date(itemT.staticStage.tentativeStartDate)
    }
    if (!(itemT.staticStage.tentativeEndDate === null || itemT.staticStage.tentativeEndDate === undefined || (new Date(itemT.staticStage.tentativeEndDate).getFullYear() <= 2022))) {
      itemT.staticStage.tentativeEndDateM = new Date(itemT.staticStage.tentativeEndDate)
    }
    if (itemT.staticStage.stageEnabled === false || itemT.staticStage.stageStatus === "SKIPPED") {
      itemT.staticStage.isSkipped = true
    } else {
      itemT.staticStage.isSkipped = false
    }
  }


  itemT.tentativeEndDateT = moment(itemT.tentativeEndDateM)
  itemT.tentativeStartDateT = moment(itemT.tentativeStartDateM)
  console.log('types', types)

  const [eventValueT, setEventValueT] = useState(itemT.eventValueT)
  const [fixedAmountT, setFixedAmountT] = useState(itemT.fixedAmountT)
  const [fixedCurrencyT, setFixedCurrencyT] = useState(itemT.fixedCurrencyT)
  const [repeatPaymentTypesT, setRepeatPaymentTypesT] = useState(itemT.repeatPaymentTypesT)
  const [reapeatPaymentTimesT, setReapeatPaymentTimesT] = useState(itemT.reapeatPaymentTimesT)
  const [disableEventT, setDisableEventT] = useState(itemT.disableEventT)
  const [tentativeStartDateM, setTentativeStartDateM] = useState(itemT.tentativeStartDateM)
  const [tentativeEndDateM, setTentativeEndDateM] = useState(itemT.tentativeEndDateM)
  const [tentativeEndDateT, setTentativeEndDateT] = useState(itemT.tentativeEndDateT)
  const [tentativeStartDateT, setTentativeStartDateT] = useState(itemT.tentativeStartDateT)
  const [displayContentT, setDisplayContentT] = useState(itemT.displayContentT)
  const [rateCardRuleType, setRateCardRuleType] = useState(itemT.rateCardRuleType)
  const [isSkipped, setIsSkipped] = useState(itemT.isSkipped)

  let contracts = props.contracts
  let contract = props.contract
  let stages = props.stages 
  let setStages = props.setStages

  const updateStages = (item) => {
    
    console.log('Item udpate in ContractIndividual', item )

    //setItem({...item})
    let workflow = "WORKFLOW"
    
    if (item?.isPaymentStage ) {
      workflow = "PAYMENT"
    }
    let contr = "" 
    if (type === 'EDIT_DEFINITION') {
      contr = contract.contractID
    } else {
      contr = contract.copyFromContractID
    }
    if (contract.isNew != undefined && contract.isNew) {
      contr = contract.contractID
    }
    let map = stages.get(contr)
    let stagesWorkflowList = [...map.get('WORKFLOW')]
    let stagesPaymentList = [...map.get('PAYMENT')]
    let updatedStagePaymentList = stagesPaymentList
    let updatedStageWorkflowList = stagesWorkflowList
    if (item?.isPaymentStage) {
      updatedStagePaymentList = stagesPaymentList.map((stage) => {
        // Perform updates on each stage object
        // For example, update the stageId and contractId properties
       
        if (stage.stageId != item.stageId) {
          console.log(' handleAdd Stages Map INTO interation No Change' , stage.stageId , item.stageId)
          return {
            ...stage ,
          };
        } else {
          console.log('handleAdd Stages Map INTO interation MapList' , stage.stageId , item.stageId)
        return {
          ...stage,
          ...item,
        };
      }
      });
    } else {
      updatedStageWorkflowList = stagesWorkflowList.map((stage) => {
        // Perform updates on each stage object
        // For example, update the stageId and contractId properties
        if (stage.stageId != item.stageId) {
          return {
            ...stage,
          };
        } else {
        return {
          ...stage,
          ...item,
        };
      }
      });

    }
    console.log('handleAdd Stages Map stagesWorkflowList', updatedStageWorkflowList)
    console.log('handleAdd Stages Map stagesPaymentList', updatedStagePaymentList)
    let stageMap = new Map()
    stageMap.set('WORKFLOW' , updatedStageWorkflowList)
    stageMap.set('PAYMENT' , updatedStagePaymentList)
    stages.set(contr , stageMap)
    setStages(stages)


    //setItemT(item)
    console.log('Item update Contracts Stage Map', map , stages, item , props.contract)

  }

  const rangeUpdate = () => {

  };
  const handleChange = (field, e) => {
    console.log("Into handleChangeContractIndividuals contracts ", e)
    if (field === 'isSkipped') {
      if (e.target.checked) {
        itemT.isEnabled = e.target.checked
        itemT.isSkipped = !itemT.isEnabled
        itemT.stageEnabled = itemT.isEnabled
        itemT.stageStatus = "PENDING"
        console.log('StageStatus Pending :::: ' , itemT.stageStatus)
      } else {
        itemT.isEnabled = e.target.checked
        itemT.isSkipped = !itemT.isEnabled
        itemT.stageEnabled = itemT.isEnabled
        itemT.stageStatus = "SKIPPED"
        console.log('StageStatus Skipped :::: ' , itemT.stageStatus)

      }
      updateStages(itemT)
      setIsSkipped(!e.target.checked)
    } else if (field === 'eventValue') {
      if (itemT.rateCardRuleType === 'PER_EVENT') {
        itemT.perEventCount = (e === '' || e === undefined) ? 0 : e *1
      } else if (itemT.rateCardRuleType === 'PER_VIEW') {
        itemT.perViewCount = (e === '' || e === undefined) ? 0 : e *1
      } else if (itemT.rateCardRuleType === 'PERCENTAGE') {
        itemT.percentageValue = (e === '' || e === undefined) ? 0 : e *1
      } 
      itemT.eventValueT = (e === '' || e === undefined) ? 0 : e *1
      updateStages(itemT)
      setEventValueT((e === '' || e === undefined) ? 0 : e *1)
    } else if (field === 'fixedValue') {
      if (itemT.rateCardRuleType === 'PER_EVENT') {
        itemT.perEventValue = e.target.value * 100
      } else if (itemT.rateCardRuleType === 'PER_VIEW') {
        itemT.perViewValue = e.target.value * 100
      } else if (itemT.rateCardRuleType === 'PERCENTAGE') {
        itemT.fixedValue = e.target.value*1
      } else {
        itemT.fixedValue = e.target.value * 100
      }
      itemT.fixedAmountT = e.target.value
      updateStages(itemT)
      setFixedAmountT(e.target.value)
    } else if (field === 'currency') {
      itemT.fixedCurrencyT = e
      itemT.currency = e
      updateStages(itemT)
      setFixedCurrencyT(e)
    } else if (field === 'tentativeDate') {
      console.log('Handle Change Event1', field, e)
      console.log('Handle Change Event startDate', e[0])
      console.log('Handle Change Event EndDate', e[1])
      let field1 = 'tentativeStartDateT'
      let field2 = 'tentativeStartDateM'
      let field3 = 'tentativeStartDate'


      let val1 = e[0].d
      let val2 = e[0].toDate()
      let val3 = e[0].toDate().toISOString()

      let field11 = 'tentativeEndDateT'
      let field12 = 'tentativeEndDateM'
      let field13 = 'tentativeEndDate'
      let val11 = e[1].d
      let val12 = e[1].toDate()
      let val13 = e[1].toDate().toISOString()
      itemT.tentativeStartDateT = val1
      itemT.tentativeStartDateM = val2
      itemT.tentativeStartDate = val3
      itemT.tentativeEndDateT = val11
      itemT.tentativeEndDateM = val12
      itemT.tentativeEndDate = val13
      updateStages(itemT)
      setTentativeStartDateT(val1)
      setTentativeEndDateT(val11)
      rangeUpdate()

    } else if (field === 'repeatPaymentDurationType') {
      itemT.repeatPaymentDurationType = e
      updateStages(itemT)
      rangeUpdate()
      setRepeatPaymentTypesT(e)
    } else if (field === 'repeatPaymentDurationTimes') {
      itemT.repeatPaymentDurationTimes = (e === '' || e === undefined) ? 0 : e *1
      updateStages(itemT)
      rangeUpdate()
      setReapeatPaymentTimesT((e === '' || e === undefined) ? 0 : e *1)
    } else if (field === 'rateCardRuleType') {
      itemT.rateCardRuleType = e
      updateStages(itemT)
      rangeUpdate()
      setRateCardRuleType(e)
    } else if (field === 'displayContent') {
      itemT.displayContentT = e.target.value
      updateStages(itemT)
      rangeUpdate()
      setDisplayContentT(e.target.value)
    } else {
      updateStages(itemT)
      rangeUpdate()
      console.log('Handle Change Event', itemT)
    }
  };
  return (


    <>
      <Row style={{ alignItems: 'baseline', background: '#F6F7F8', height: '40px', width: '100%' }}>

        <h4 style={{
          color: '#1d2736',
          fontSize: '12px',
          display: 'flex',
          marginRight: '14px',
          marginLeft: '4px',
          fontWeight: 600,

        }}> {itemT.stageName} - {itemT.staticStage != undefined && itemT.staticStage.isSkipped != undefined && itemT.staticStage.isSkipped === true ? "(OFF)" : ""} {itemT.staticStage != undefined && itemT.staticStage.isSkipped != undefined && itemT.staticStage.isSkipped === false ? "(ON)" : ""} </h4>
        {!isDisabled && (
          <Switch
            disabled={isDisabled}
            onChange={(e) => handleChange('isSkipped', e)}
            inputProps={{
              'aria-label': 'controlled',
            }}
            checked={!isSkipped}
            size='small'
          />
        )}
        {console.log('TEXT , FIELD ::: isSkipped ', isSkipped)}
        {isDisabled && (
          <Text type='text'
            style={{ fontWeight: 'bold', fontSize: '14px' }}>{!isSkipped ? "(ON)" : "(OFF)"}</Text>
        )}
      </Row>
      {!isSkipped && (
        <>
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
              {itemT.stageDisplayDetails.StageDescription}
            </Title>
          </Row>
          <Row style={{ alignItems: 'baseline' }}>
            <Row gutter={[1, 2]} style={{ width: '100%' }}>
              <Col
                // xs={{ span: 20, offset: 1 }}
                // sm={{ span: 20, offset: 1 }}
                // md={{ span: 20, offset: 1 }}
                lg={{ span: 33, offset: 1 }}
                // xl={{ span: 20, offset: 1 }}
                style={{ width: '100%' }}
              >
                {props.inputType === 'PAYMENT' && (
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '2px',
                    }}
                  >
                    {console.log('Static Stage : ', itemT.staticStage)}
                    <Form.Item
                      label={(itemT.staticStage != undefined && itemT.staticStage.rateCardRuleType != undefined) ? ((itemT.staticStage.rateCardRuleType != "") ? "PaymentType - ( " + itemT.staticStage.rateCardRuleType + " ) " : "PaymentType ") : "PaymentType "}
                      name='rateCardRuleType'
                      rules={[
                        {
                          required: true,
                          message: 'PaymentType is required',
                        },
                      ]}
                      style={{ width: '30%' }}
                    >
                      {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                      <Space.Compact style={{
                        width: '100%'

                      }} >
                        {console.log('TEXT , FIELD ::: rateCardRuleType ', rateCardRuleType)}

                        {isDisabled && (
                          //<Select disabled={isDisabled} style={{ width: '100%' }} placeholder="Type" onChange={(e) => handleChange('rateCardRuleType', e)} options={types} value={rateCardRuleType} />
                          <Text type='text'
                            style={{ fontWeight: 'bold', fontSize: '14px' }}>{rateCardRuleType}</Text>
                        )}
                        {!isDisabled && (
                          <Select disabled={isDisabled} style={{ width: '100%' }} placeholder="Type" onChange={(e) => handleChange('rateCardRuleType', e)} options={types} value={rateCardRuleType} />
                        )}
                      </Space.Compact>
                      {/* </Space> */}

                    </Form.Item>
                    <Form.Item
                      label={itemT.staticStage != undefined && itemT.staticStage.eventValueT != undefined ? (itemT.staticStage.eventValueT != "" ? "Event/View - ( " + itemT.staticStage.eventValueT + " ) " : "Event/View ") : "Event/View "}
                      name='eventCount'
                      rules={[
                        {
                          required: false,
                          message: 'Event or view or percentage is required',
                        },
                      ]}
                      style={{ width: '30%' }}
                    >
                      <Space direction="vertical" size="middle" style={{
                        width: '100%'

                      }} >
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {/* <Input key={item.eventValueT}  placeholder='0' value={item.eventValueT} onInput={(e) => handleChange('eventValue', e)} /> */}
                          {!isDisabled && (
                            <InputNumber disabled={isDisabled} value={eventValueT} onChange={(e) => handleChange('eventValue', e)} />

                          )}
                          {console.log('TEXT , FIELD ::: eventValueT ', eventValueT)}

                          {isDisabled && (
                            <Text type='text'
                              style={{ fontWeight: 'bold', fontSize: '14px' }}>{eventValueT}</Text>
                          )}

                        </Space.Compact>
                      </Space>
                    </Form.Item>

                    <Form.Item
                      label={itemT.staticStage != undefined && itemT.staticStage.eventValueT != undefined ? (itemT.staticStage.fixedAmountT != 0 ? "Amount - ( " + itemT.staticStage.fixedAmountT + " " + fixedCurrencyT + " ) " : "Amount ") : "Amount "}
                      name='amount'
                      rules={[
                        {
                          required: true,
                          message: 'Amount is required',
                        },
                      ]}
                      style={{ width: '35%' }}
                    >
                      <Space direction="vertical" size="middle" >
                        <Space.Compact>
                          {!isDisabled && (
                            <>
                              <Input disabled={isDisabled} value={fixedAmountT} onChange={(e) => handleChange('fixedValue', e)} style={{
                                width: '60%'
                              }} />
                              {console.log('InputField Currency ', fixedCurrencyT, itemT)}

                              <Select mode="single"
                                isSearchable={true}
                                allowClear
                                showSearch= {true} 
                                disabled={isDisabled} name='currency' onChange={(e) => handleChange('currency', e)} value={fixedCurrencyT} options={props.currencyCSVData} style={{
                                width: '40%'
                              }} />
                            </>
                          )}
                          {console.log('TEXT , FIELD ::: fixedAmountT ', fixedAmountT, fixedCurrencyT)}

                          {isDisabled && (
                            <Text type='text'
                              style={{ fontWeight: 'bold', fontSize: '14px' }}>{fixedAmountT} {fixedCurrencyT}</Text>
                          )}

                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  </Row>
                )}
                <Row
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0px',
                    width: '100%',
                  }}
                >
                  {props.inputType === 'PAYMENT' && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '0px',
                      width: '100%',
                    }}>
                      <Form.Item
                        label={itemT.staticStage != undefined && itemT.staticStage.repeatPaymentTypesT != undefined ? (itemT.staticStage.repeatPaymentTypesT != "" ? "Repeat Payment Type - ( " + itemT.staticStage.repeatPaymentTypesT + "  ) " : "Repeat Payment Type ") : "Repeat Payment Type "}
                        name='repeatPaymentDurationType'
                        rules={[
                          {
                            required: false,
                            message: 'PaymentType is required',
                          },
                        ]}
                        style={{ width: '30%' }}
                      >
                        {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {!isDisabled && (

                            <Select disabled={isDisabled} style={{ width: '100%' }} placeholder="Type" onChange={(e) => handleChange('repeatPaymentDurationType', e)} options={repeatPaymentTypes} value={repeatPaymentTypesT} />
                          )}
                          {console.log('TEXT , FIELD ::: repeatPaymentTypesT ', repeatPaymentTypesT, isDisabled)}
                          {isDisabled && (
                            <Text type='text'
                              style={{ fontWeight: 'bold', fontSize: '14px' }}> {repeatPaymentTypesT === undefined ? "" : repeatPaymentTypesT}</Text>
                          )}
                        </Space.Compact>
                        {/* </Space> */}

                      </Form.Item>
                      <Form.Item
                        label={itemT.staticStage != undefined && itemT.staticStage.reapeatPaymentTimesT != undefined ? (itemT.staticStage.reapeatPaymentTimesT != 0 ? "Repeat Payment Times - ( " + itemT.staticStage.reapeatPaymentTimesT + "  ) " : "Repeat Payment Times ") : "Repeat Payment Times "}
                        name='repeatPaymentTimes'
                        rules={[
                          {
                            required: false,
                            message: 'Repeat Payment Times',
                          },
                        ]}
                        style={{ width: '30%' }}
                      >
                        {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                        <Space.Compact style={{
                          width: '100%'

                        }} >
                          {/* <Input key={item.repeatPaymentDurationTimes} placeholder='0' value={itemT.repeatPaymentDurationTimes} onChange={(e) => handleChange('repeatPaymentDurationTimes', e)} /> */}
                          {!isDisabled && (

                            <InputNumber disabled={isDisabled} placeholder='0' value={reapeatPaymentTimesT} onChange={(e) => handleChange('repeatPaymentDurationTimes', e)} />
                          )}
                          {console.log('TEXT , FIELD ::: reapeatPaymentTimesT ', reapeatPaymentTimesT, isDisabled)}

                          {isDisabled && (
                            <Text type='text'
                              style={{ fontWeight: 'bold', fontSize: '14px' }}> {reapeatPaymentTimesT}</Text>
                          )}
                        </Space.Compact>
                        {/* </Space> */}
                      </Form.Item>
                      <div style={{ width: '30%' }}></div>
                    </div>
                  )}
                  {/* {props.inputType === 'PAYMENT' && (
        <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0px',
          width:'20%',
        }} ></div>
)} */}
                  {props.inputType === 'WORKFLOW' && showWorkflowDetails && (
                    <Form.Item
                      label='Tentative Dates'
                      name='tentativeDates'
                      rules={[
                        {
                          required: false,
                          message: 'Tentative Dates is required',
                        },
                      ]}
                      style={{ width: '80%' }}
                    >
                      <Space direction="vertical" size="middle" >
                        <Space.Compact>
                          {!isDisabled && (
                            <RangePicker disabled={isDisabled} dvalue={[tentativeStartDateT, tentativeEndDateT]} onChange={(e) => handleChange('tentativeDate', e)} />
                          )}
                          {isDisabled && (
                            <Text type='text'
                              style={{ fontWeight: 'bold', fontSize: '14px' }}> {tentativeStartDateT.format('MMMM Do, YYYY')} - {tentativeEndDateT.format('MMMM Do, YYYY')} </Text>
                          )}
                          {console.log('TEXT , FIELD ::: tentativeStartDateT ', tentativeStartDateT, isDisabled)}

                        </Space.Compact>
                      </Space>
                    </Form.Item>
                  )}
                </Row>
                {props.inputType === 'WORKFLOW' && showWorkflowDetails && (
                  <Row style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Form.Item
                      label='Display Content'
                      name='displayContent'
                      rules={[
                        {
                          required: false,
                          message: 'Job Description is required',
                        },
                      ]}
                      style={{ width: '100%' }}
                    >
                      {/* <Space direction="vertical" size="middle" style={{
            width: '100%'

          }} > */}
                      <Space.Compact style={{
                        width: '100%'

                      }} >
                        {!isDisabled && (
                          <TextArea
                            disabled={isDisabled}
                            placeholder='Display Content...'
                            value={displayContentT}
                            onChange={(e) => handleChange('displayContent', e)}
                            rows={2}
                            style={{ resize: 'both', width: '100%' }}
                          />
                        )}

                        {isDisabled && (
                          <Text type='text'
                            style={{ fontWeight: 'bold', fontSize: '14px' }}> {displayContentT} </Text>
                        )}
                        {console.log('TEXT , FIELD ::: displayContentT ', displayContentT, isDisabled)}

                      </Space.Compact>
                      {/* </Space> */}
                    </Form.Item>
                  </Row>
                )}
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default InputFields;
