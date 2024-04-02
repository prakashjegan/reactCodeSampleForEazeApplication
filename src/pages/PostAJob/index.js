import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, MenuItem } from '@mui/material';
import SelectMui from '../../components/ReusableMuiComponents/SelectMui';
import AutoCompleteMui from '../../components/ReusableMuiComponents/AutoCompleteMui';
import Layout from '../../components/layout'
import listService from '../../services/listService';
import './style.scss';
import SQLiteDataImport from '../../constants/dataimports/sQLiteDataImport';


const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PostAJob = () => {
  let res;
  const { id } = useParams();
  const { type } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [platformDropDown, setPlatformDropdown] = useState([]);
  const [csvDataLang, setCSVDataLang] = useState(null);
  const [languageCSVData, setLanguageCSVData] = useState([]);
  const [csvData, setCSVData] = useState(null);
  const [locationCSVData, setLocationCSVData] = useState([]);

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

  useEffect(() => {
    const fetchJobTypeWithEvents = async () => {
      try {
        console.log('Type Value : ', type)
        if (type === "JOB_TYPE") {
          res = await listService.fetchJobTypes(id);
        } else if (type === "PAST_DEFINITION") {
          res = await listService.fetchPastDefinition(id, {});
        } else if (type === "MASTER_CONTRACT") {
          res = await listService.fetchMasterContract(id);
        } else if (type === "EDIT_DEFINITION") {
          
          res = await listService.fetchDefinition(id, {});
          console.log('Type RES : ', res)
        } else {
          res = await listService.fetchJobTypes(id);
        }
        console.log(res)
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllData = async () => {
      try {
        const res = await listService.fetchEventsList();
        setPlatformDropdown(res?.data?.message?.platformTypes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobTypeWithEvents();
    fetchAllData();
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleNextClick = async () => {
    try {
      const { errors } = await form.validateFields();
      if (errors) {
       
        return;
      }
      navigate(`/contract/${id}`);
    } catch (errorInfo) {
      console.log('Error:', errorInfo);
    }
  };


  return (
    <div style={{ margin: '24px 146px' }}>
      <SQLiteDataImport/>
      <Card className='root' style={{ paddingTop: '16px' }}>
        <Form
          form={form}
          name='basic'
          initialValues={{
            jobname: '',
            jobtype: id,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
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
                  <ArrowLeftOutlined onClick={() => navigate(-1)} />
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
                <Form.Item
                  label='Job Name'
                  name='jobname'
                  rules={[
                    {
                      required: true,
                      message: 'Job Name is required',
                    },
                  ]}
                  style={{ width: '25%' }}
                >
                  <Input placeholder='Video Editor Job' />
                </Form.Item>

                <Form.Item
                  label='Job Type'
                  name='jobtype'
                  rules={[
                    {
                      required: true,
                      message: 'Job Type is required',
                    },
                  ]}
                  style={{ width: '25%' }}
                >
                  <Input placeholder={id} />
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
                  <Input placeholder='INR 10,000' />
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
                  <TextArea
                    placeholder='Job Description...'
                    rows={6}
                    style={{ resize: 'both' }}
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
              <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item
                  label='Job Description Link'
                  name='jobdescriptionlink'
                  rules={[
                    {
                      required: true,
                      message: 'Job Description Link is required',
                    },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input placeholder='Add Description Link for better understanding of Job' />
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
                  label='Job influ Production Code Link'
                  name='jobinfluproductioncodelink'
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input placeholder='Add Production code link' />
                </Form.Item>

                <Form.Item
                  label='Tentative Start Date and End Date'
                  name='startandenddate'
                  rules={[
                    {
                      required: true,
                      message: 'Tentative Start Date and End Date is required',
                    },
                  ]}
                  className='date-styles'
                >
                  <RangePicker />
                </Form.Item>

                <Form.Item
                  label='Max Buffer Period In days'
                  name='maxbufferperiodindays'
                  rules={[
                    {
                      required: true,
                      message: 'Tentative Start Date and End Date is required',
                    },
                  ]}
                  style={{ width: '25%' }}
                >
                  <Input />
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
                  label='Tags'
                  name='tags'
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  style={{ width: '70%' }}
                >
                  <Input />
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
                <Title level={4}>Shown to</Title>
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
                <Box
                  style={{
                    display: 'flex',
                    marginTop: '12px',
                    background: 'rgb(231 227 227)',
                    padding: '16px',
                    borderRadius: '10px',
                    width: '45%',
                  }}
                >
                  <Form.Item
                    label='Subscriber Count'
                    name={`minsubscribercount`}
                    rules={[
                      {
                        required: true,
                        message: 'Subscriber Count is required',
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
                        required: true,
                        message: 'Subscriber Count is required',
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

                <Form.Item
                  label='Language'
                  name='language'
                  rules={[
                    {
                      required: true,
                      message: 'Language is required',
                    },
                  ]}
                  style={{
                    width: '45%',
                    background: 'rgb(231 227 227)',
                    padding: '16px',
                    borderRadius: '10px',
                    marginTop: '8px',
                    marginBottom: '10px',
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
                  label='Location'
                  name='location'
                  rules={[
                    {
                      required: true,
                      message: 'Location is required',
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
                    placeholder='Country'
                    getOptionLabel={(option) => {
                      return option.country_name;
                    }}
                    options={locationCSVData}
                  />
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
                    width: '45%',
                    background: 'rgb(231 227 227)',
                    padding: '16px',
                    marginBottom: '8px',
                    // marginTop: '8px',
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
                  background: 'rgb(231 227 227)',
                  padding: '16px',
                  borderRadius: '10px',
                }}
              >
                <Form.Item
                  label='Tags'
                  name='tags'
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  style={{ width: '100%' }}
                >
                  <Input />
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
              <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item
                  label='Job Term and conditions'
                  name='jobtermsandconditions'
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  style={{ width: '100%' }}
                >
                  <TextArea />
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
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  style={{ width: '25%' }}
                  type='primary'
                  htmlType='submit'
                >
                  Save
                </Button>
                <Button
                  onClick={handleNextClick}
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
            </Col>
          </Row>
        </Form>{' '}
      </Card>
    </div>
  );
  };

export default Layout(PostAJob);
