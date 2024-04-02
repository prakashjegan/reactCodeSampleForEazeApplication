import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { ArrowLeftOutlined,DownCircleOutlined,UpCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import listService from '../../services/listService';
import InputFields from './components/InputFields';
import WorkFlowStage from './components/WorkFlowStage';
import {  Box, MenuItem, Switch } from '@mui/material';
import SelectMui from '../../components/ReusableMuiComponents/SelectMui';
import AutoCompleteMui from '../../components/ReusableMuiComponents/AutoCompleteMui';

const { Text, Title } = Typography;

const Contract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contractData, setContractData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allDetailsDropdown, setAllDetailsDropdown] = useState([]);
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [platformDropDown, setPlatformDropdown] = useState([]);
  const [csvData, setCSVData] = useState(null);
  const [locationCSVData, setLocationCSVData] = useState([]);
  const [csvDataLang, setCSVDataLang] = useState(null);
  const [languageCSVData, setLanguageCSVData] = useState([]);
  const [showPaymentStage, setShowPaymentStage] = useState(false)
  const [showWorkFlowStage, setShowWorkflowStage] = useState(false)


  const fetchJobTypeWithEvents = async () => {
    try {
      const res = await listService.fetchJobTypes(id);
      if (res?.data?.message?.fetchObjectMapBO?.contractBOs === undefined) {
        setContractData(new Map());
      } else {
      setContractData(res?.data?.message?.fetchObjectMapBO?.contractBOs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllData = async () => {
    try {
      const res = await listService.fetchEventsList();
      setAllData(res?.data?.message?.stageDisplayMap);
      setAllDetailsDropdown(res?.data?.message);
      setPlatformDropdown(res?.data?.message?.platformTypes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/Location.csv');
        const text = await response.text();
        setCSVData(text);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };
    fetchCSV();
  }, []);
  useEffect(() => {
    if (csvData) {
      const rows = csvData.split('\n');
      const keys = rows[0].split(',');

      const currencyOptions = rows.slice(1).map((row) => {
        const values = row.split(',');
        const obj = {};

        keys.forEach((key, index) => {
          return <div key={index}>{(obj[key] = values[index])}</div>;
        });

        return obj;
      });
      setLocationCSVData(currencyOptions);
    }
  }, [csvData]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/Languages.csv');
        const text = await response.text();
        setCSVDataLang(text);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };
    fetchCSV();
  }, []);
  useEffect(() => {
    if (csvDataLang) {
      const rows = csvDataLang.split('\n');
      const keys = rows[0].split(',');

      const currencyOptionsss = rows.slice(1).map((row, index) => {
  
        const values = row.split(',');
        const obj = {};

        keys.forEach((key, index) => {
          obj[key] = values[index];
        });
        obj.key = index;
        return obj;
      });
      setLanguageCSVData(currencyOptionsss);
    }
  }, [csvDataLang]);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    fetchJobTypeWithEvents();
    fetchAllData();
  }, []);

  return (
    <div
      style={{
        marginTop: '24px',
        marginBottom: '24px',
        marginLeft: '146px',
        marginRight: '146px',
      }}
    >
      <Form
        form={form}
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
      >
        {Object.entries(contractData)?.map(([keyName, item], index) => {
          return (
            <div key={index}>
              <Card style={{ paddingTop: '16px', marginTop: '24px' }}>
                <Row gutter={[16, 26]} align='baseline'>
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 20, offset: 2 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 20, offset: 2 }}
                  >
                    <Row align='middle'>
                      {index === 0 && (
                        <Col>
                          <ArrowLeftOutlined onClick={() => navigate(-1)} />
                        </Col>
                      )}
                      <Col>
                        <Title
                          level={4}
                          style={{
                            marginLeft: index === 0 && '16px',
                            marginTop: '8px',
                          }}
                        >
                          Contracts
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
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        type='text'
                        style={{ fontWeight: 320, fontSize: '24px' }}
                      >
                        Contract Filter
                      </Text>
                    </Row>
                  </Col>
                </Row>

                {/* Contract Name */}
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
                      <Form.Item
                        label='Contract Name'
                        initialValue={item.contractName}
                        name={`contractname${keyName}`}
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
                    </Row>
                  </Col>
                </Row>

                {/*Subscriber Count, */}
                <Row gutter={[16, 26]} style={{ paddingTop: '8px' }}>
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
                      }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          marginTop: '12px',
                          background: 'rgb(231 227 227)',
                          padding: '16px',
                          borderRadius: '10px',
                        }}
                      >
                        <Form.Item
                          label='Subscriber Count'
                          name={`minsubscribercount`}
                          rules={[
                            {
                              required: false,
                              message: 'Subscriber is required',
                            },
                          ]}
                        >
                          <SelectMui
                            placeholder='Min Subscriber Count'
                            sx={{ fontSize: '12px', border: 'none' }}
                          >
                            {Array.from({ length: 1001 }, (_, i) => (
                              <MenuItem key={i} value={i}>
                                {i}
                              </MenuItem>
                            ))}
                          </SelectMui>
                        </Form.Item>
                        <Form.Item
                          label=' '
                          name={`maxsubscribercount`}
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          <SelectMui
                            placeholder='Max Subscriber Count'
                            sx={{ fontSize: '12px' }}
                          >
                            {Array.from({ length: 1001 }, (_, i) => (
                              <MenuItem key={i} value={i}>
                                {i}
                              </MenuItem>
                            ))}
                          </SelectMui>
                        </Form.Item>
                      </Box>

                      {/* Platform */}

                      <Form.Item
                        label='Platform'
                        name='platform'
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{
                          width: '45%',
                          background: 'rgb(231 227 227)',
                          padding: '16px',
                          marginBottom: '8px',
                          marginTop: '8px',
                          borderRadius: '10px',
                        }}
                      >
                        <SelectMui
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
                        </SelectMui>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>

                {/* Language, ? Location */}
                <Row gutter={[16, 26]} style={{ paddingTop: '8px' }}>
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
                      }}
                    >
                      <Form.Item
                        label='Language'
                        name='language'
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{
                          width: '45%',
                          background: 'rgb(231 227 227)',
                          padding: '16px',
                          borderRadius: '10px',
                          marginTop: '8px',
                        }}
                      >
                        <AutoCompleteMui
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
                        />
                      </Form.Item>
                      <Form.Item
                        label='Location'
                        name='location'
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{
                          width: '45%',
                          background: 'rgb(231 227 227)',
                          padding: '16px',
                          borderRadius: '10px',
                        }}
                      >
                        <AutoCompleteMui
                          sx={{
                            fontSize: '14px',
                            width: '100%',
                            background: 'white',
                            border: '1px solid #D9D9D9',
                            borderRadius: '4px',
                          }}
                          placeholder='Country'
                          getOptionLabel={(option) => {
                            return (
                              <div key={option.id}>{option.country_name}</div>
                            );
                          }}
                          options={locationCSVData}
                        />
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
                    <Row
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text
                        type='text'
                        style={{ fontWeight: 320, fontSize: '24px' }}
                      >
                        Payment Stage
                        {showPaymentStage === true && (
                          <UpCircleOutlined
                            onClick={() => {
                              setShowPaymentStage(false);
                            }}
                            style={{ marginLeft: '16px' }}
                          />
                        )}
                        {showPaymentStage === false && (
                          <DownCircleOutlined
                            onClick={() => {
                              setShowPaymentStage(true);
                            }}
                            style={{ marginLeft: '16px' }}
                          />
                        )}
                      </Text>
                    </Row>
                  </Col>
                </Row>
                {showPaymentStage === true && (
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
                          flexDirection: 'column',
                        }}
                      >
                        {Object.entries(item?.stageMappingBOList)?.map(
                          ([keyNameStage, vluNameStage], index) => {
                            if (
                              allData[vluNameStage?.stageId]
                                ?.ShowInJOB_DEFINITION === true
                            ) {
                              const jobDefinitionDetails =
                                allData[vluNameStage?.stageId]
                                  ?.StatusToStageUIData?.JOB_DEFINITION;

                              return (
                                <div key={index}>
                                  {/* Stage Name */}
                                  <Row style={{ alignItems: 'baseline' }}>
                                    <Title
                                      style={{
                                        color: '#768293',
                                        fontSize: '12px',
                                        display: 'flex',
                                        marginRight: '4px',
                                        fontWeight: 600,
                                      }}
                                      level={4}
                                    >
                                      {jobDefinitionDetails?.StageTitle}
                                    </Title>
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
                                  {/* Stage Description */}
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
                                      {jobDefinitionDetails?.StageDescription}
                                    </Title>
                                  </Row>
                                  <Row style={{ alignItems: 'baseline' }}>
                                    <InputFields
                                      form={form}
                                      index={index}
                                      Form={Form}
                                      allDetailsDropdown={allDetailsDropdown}
                                      vluNameStage={vluNameStage}
                                    />
                                  </Row>
                                  <Divider />
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </Row>
                    </Col>
                  </Row>
                )}

                {/*  Workflow Stage */}
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
                      }}
                    >
                      <Text
                        type='text'
                        style={{ fontWeight: 320, fontSize: '24px' }}
                      >
                        Workflow Stage
                        {showWorkFlowStage === true && (
                          <UpCircleOutlined
                            onClick={() => {
                              setShowWorkflowStage(false);
                              console.log('false clicked');
                            }}
                            style={{ marginLeft: '14px' }}
                          />
                        )}
                        {showWorkFlowStage === false && (
                          <DownCircleOutlined
                            onClick={() => {
                              setShowWorkflowStage(true);
                              console.log('true clicked');
                            }}
                            style={{ marginLeft: '14px' }}
                          />
                        )}
                      </Text>
                    </Row>
                  </Col>
                </Row>

                {showWorkFlowStage === true && (
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
                          flexDirection: 'column',
                        }}
                      >
                        {Object.entries(item?.stageMappingBOList)?.map(
                          ([keyNameStage, vluNameStage], index) => {
                            if (
                              allData[vluNameStage?.stageId]
                                ?.ShowInJOB_DEFINITION === true
                            ) {
                              const jobDefinitionDetails =
                                allData[vluNameStage?.stageId]
                                  ?.StatusToStageUIData?.JOB_DEFINITION;

                              return (
                                <div key={index}>
                                  {/* Stage Name */}
                                  <Row style={{ alignItems: 'baseline' }}>
                                    <Title
                                      style={{
                                        color: '#768293',
                                        fontSize: '12px',
                                        display: 'flex',
                                        marginRight: '4px',
                                        fontWeight: 600,
                                      }}
                                      level={4}
                                    >
                                      {jobDefinitionDetails?.StageTitle}
                                    </Title>
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
                                  {/* Stage Description */}
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
                                      {jobDefinitionDetails?.StageDescription}
                                    </Title>
                                  </Row>
                                  <Row style={{ alignItems: 'baseline' }}>
                                    <>
                                      <WorkFlowStage
                                        form={form}
                                        index={index}
                                        Form={Form}
                                        allDetailsDropdown={allDetailsDropdown}
                                        vluNameStage={vluNameStage}
                                      />
                                    </>
                                  </Row>
                                  <Divider />
                                </div>
                              );
                            }
                            return null;
                          }
                        )}
                      </Row>
                    </Col>
                  </Row>
                )}
              </Card>
            </div>
          );
        })}
        <Card>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '25%' }} type='primary' htmlType='submit'>
              Save
            </Button>
            <Button
              onClick={() => {}}
              style={{
                width: '25%',
                borderColor: '#1677ff',
                color: '#1677ff',
                marginLeft: '16px',
              }}
            >
              Next
            </Button>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default Layout(Contract);
