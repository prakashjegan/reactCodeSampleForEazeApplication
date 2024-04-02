import React, { useEffect, useRef, useState } from "react";
import './style.scss';
import { Button, Checkbox, Form, Grid, Input, Row, Select, Space, } from 'antd';
import onboardService from "../../../services/onboardService";
import PlatformCard from "./platformCard";
import { Box, Card, CardContent } from "@mui/material";
import { navigationPageNumber } from "../../Payments/utills";
import { currencyList } from "../../../config/variables"

const { Option } = Select;


const OnboardingPlatform = ({ handleNext }) => {

    const ref = useRef(null);

    const [form] = Form.useForm();
    const [platformDetails, setPlatformDetails] = useState([{}]);
    const [optionLoading, SetOptionLoading] = useState(true);
    const [addPlatform, setAddPlatform] = useState(false);
    const [platformList, setPlatformList] = useState([]);
    //const [currencyList, setCurrencyList] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [platformTypeList, setPlatformTypeList] = useState([]);





    useEffect(() => {
        fetchPlatform();
        setPlatformList(localStorage.getItem("LocalStorage_platformTypes"));
        //setCurrencyList(JSON.parse(localStorage.getItem("currency")));
        setLanguageList(JSON.parse(localStorage.getItem("languages")));
        setLocationList(JSON.parse(localStorage.getItem('location')));
        setCategoryList(JSON.parse(localStorage.getItem("categories")));
        setPlatformTypeList(JSON.parse(localStorage.getItem('LocalStorage_platformTypes')));

    }, [])

    const onFinish = (values) => {
        let data = {
            platformName: values.platformName,
            platformType: values.platformType,
            amount: values.chargePerPost,
            description: values.description,
            language: values.language.join(","),
            publicLink: values.publicLink,
            locations: values.locations.join(","),
            tags: values.tags.join(","),
            verificationLink: values.publicLink,
            currency:values.currency[0]
        }
        console.log(data);
        updatePlatform(data);
        setAddPlatform(false);
    }

    const onFinishFailed = () => {
        console.log("falied");
    }

    const clickAddPlatform = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setAddPlatform(true);
    }


    const fetchPlatform = () => {
        SetOptionLoading(true);
        onboardService.fetchPlatform()
            .then((res) => {
                SetOptionLoading(false);
                if (res.data.message) {
                    setPlatformDetails([...[{}], ...res.data.message]);
                }
            })
            .catch(() => { SetOptionLoading(false) })
    }

    const updatePlatform = (payload) => {
        SetOptionLoading(true);
        onboardService.updatePlatform(payload)
            .then((res) => {
                SetOptionLoading(false);
                console.log(res.data);
                fetchPlatform();
                handleNext(navigationPageNumber['address']);
            })
            .catch(() => { SetOptionLoading(false) })
    }

    const handleSkip = () => {
        handleNext(navigationPageNumber['address'])
    }

    return (

        <div className="onboarding-basicdetails-container">
            <div className="addCardPlatform">
                <ul>
                    {platformDetails && platformDetails.map((platform) => (
                        <>
                            <li>
                                {(platform && platform["platformType"]) ?
                                    <>
                                        <PlatformCard platformDetails={platform} />
                                    </>
                                    :
                                    <>
                                        <Box m={1} sx={{ cursor: "pointer" }}>
                                            <Card sx={{ width: "225px", height: 180, borderRadius: "4px" }} onClick={clickAddPlatform}>
                                                <CardContent>
                                                    <div style={{ display: "flex", justifyContent: "center", height: "18vh", paddingTop: "40px", fontSize: 18, pointer: "cursor" }}><b>Add Platform</b></div>
                                                </CardContent>
                                            </Card >
                                        </Box>
                                    </>}
                            </li>

                        </>
                    ))}
                </ul>
            </div>

            {addPlatform && <>
                <div className="onboarding-header">Platform</div>
                <Form form={form} name="platformdetails" layout="vertical" className="form-container" onFinish={onFinish} onFinishFailed={onFinishFailed} >
                    <Form.Item
                        className="form-item"
                        label="Your Platform Name"
                        name="platformName"
                        rules={[
                            {
                                required: true,
                                message: 'Platform name is required',
                            },
                        ]}>
                        <Input placeholder="Enter Your Platform Name like (@abcdef)" />
                    </Form.Item>
                    <Form.Item
                        className="form-item"
                        label="Platform"
                        name="platformType"
                        rules={[
                            {
                                required: true,
                                message: 'Platform type is required',
                            },
                        ]}>
                        {platformTypeList &&
                            <Select>
                                {platformTypeList.map((platformType, index) => (
                                    <Select key={index} value={platformType} placeholder={"Platform Name"}>{platformType}</Select>

                                ))}
                            </Select>
                        }
                    </Form.Item>

                    <Space className="form-item" direction="vertical" >
                        <Space.Compact>
                            <Form.Item
                                label='Charges Per Post'
                                name='chargePerPost'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Charge Per Post is required',
                                    },
                                ]}

                                initialValue= "1000"
                            >

                                <Input placeholder="Enter Charge" type="number" />

                            </Form.Item>



                            <Form.Item
                                label='Currency'
                                name='currency'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Currency is required',
                                    },
                                ]}
                                initialValue={["INR"]}
                            >

                                <Select
                                     isSearchable={true}
                                    allowClear
                                    showSearch={true}
                                    placeholder="Currency"
                                    name="currency"
                                    defaultValue={["INR"]}
                                    options={currencyList()}
                                />
                            </Form.Item>
                        </Space.Compact>
                    </Space>

                    <Row style={{ width: "100%" }}>
                        <Form.Item
                            className="form-item"
                            label="What's your content's genre?"
                            name={'tags'}
                            style={{ width: '100%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Categories is required',
                                },
                            ]}>
                            <Select
                                mode="tags"
                                allowClear
                                placeholder="Select your genre of content for this platform like (TravelLog)"
                                defaultValue={[]}
                                options={categoryList}
                                name="category"
                            />
                        </Form.Item>
                    </Row>

                    <Row style={{ width: '100%' }}>
                        <Form.Item
                            className="form-item"
                            label="Describe your Platform"
                            name={'description'}
                            style={{ width: '100%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Description is required',
                                },
                            ]}>
                            <Input placeholder="Describe your Platform.." style={{ height: "50px" }} />
                        </Form.Item>
                    </Row>



                    <Form.Item className="form-item" label="Content Language(s)" required name="language"
                    >

                        <Select mode="tags" style={{ width: '100%' }} placeholder="Select language" options={languageList} />

                    </Form.Item>

                    <Form.Item className="form-item" label="Audiance Location(s)" name={'locations'} required >
                        <Select placeholder="Select location" mode="tags" allowClear>
                            {locationList.map((location, index) => (
                                <Select key={index} value={location['name']} >{location['name']}</Select>

                            ))}
                        </Select>

                    </Form.Item>

                    <Form.Item className="form-item" label="Your Platform Link" name={'publicLink'} required >
                        <Input placeholder="like (https://www.instagram.com/influozy/?hl=en)" />
                    </Form.Item>

                    <div style={{ margin: "auto" }}>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 20, width: "200px" }}>
                            Add Platform
                        </Button>


                        <Button style={{ marginLeft: 20, width: "200px" }} onClick={handleSkip}>
                            Skip
                        </Button>
                    </div>

                </Form>
            </>}

            <div ref={ref}></div>


        </div>
    )
}

export default OnboardingPlatform