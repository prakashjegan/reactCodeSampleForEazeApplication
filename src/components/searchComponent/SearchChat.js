import React, { useState, useEffect } from 'react';
//import Modal from 'react-modal';
//import {  Modal } from "@mui/material"
import Layout from '../../components/layout';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { ArrowLeftOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Typography, Divider, Modal, Menu, Dropdown, Select, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, MenuItem, Switch } from '@mui/material';
import abc from '../../assets/images/navbar/searchicon.svg'
import UserModalForAllPopups from "../../pages/jobs/components/userModelForAllPopups";

import 'font-awesome/css/font-awesome.min.css';
import ProfileImage from '../../assets/images/navbar/profile.png';
import { UserOutlined, SolutionOutlined, DownOutlined } from '@ant-design/icons';


import './style.scss';
import userService from '../../services/userService';

//import { useDebounce } from 'react-use';




const { Text, Title } = Typography;

const SearchChat = (props) => {

    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');
    const [userOptions, setUserOptions] = useState([]);
    const [jobOptions, setJobOptions] = useState([]);
    const [jobRequestOptions, setJobRequestOptions] = useState([]);
    const [jobDefinitionOptions, setJobDefinitionOptions] = useState([]);
    const [overallOptions, setOverallOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userModelVisible, setUserModelVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [jobSelectOption, setJobSelectOption] = useState([])
    const [jobDefinitionSelectOption, setJobDefinitionSelectOption] = useState([])
    const [jobRequestSelectOption, setJobRequestSelectOption] = useState([])
    const [userSelectOption, setUserSelectOption] = useState([])
    const [counterOption, setCounterOption] = useState(0)

    let modelPartnerId = '';
    const [modelUserId, setModelUserId] = useState('')
    const navigate = useNavigate();
    let addSeeAll = props.addSeeAll || true;

    //const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        fetchOptions();
    }, [searchValue]);

    useEffect(() => {
        console.log('Into Option changes ', options)
    }, [options]);

    const fetchOptions = async () => {
        // Call your API with the debounced search value
        // Replace YOUR_API_ENDPOINT with the actual API endpoint
        //console.log('Options FetchOptions Completed fetchOptions', searchValue)
        let res = await userService.fetchSearchOptionAllSearch(searchValue)
        const userData = res?.data?.message?.partners;
        const jobData = res?.data?.message?.jobs;
        const jobRequestData = res?.data?.message?.jobRequests;
        const jobDefinitionData = res?.data?.message?.jobDefinitions;
        //console.log('Options FetchOptions Completed Into fetch Search Details ', searchValue , res, userData?.length, jobData?.length, jobRequestData?.length, jobDefinitionData?.length)
        let allData = []
        if (Array.isArray(userData) && userData != undefined && userData != null) {
            for (let i = 0; i < userData.length; i++) {
                userData[i].value = userData[i].partnerID
                userData[i].label = userData[i].partnerName != undefined ? userData[i].partnerName : userData[i].userName
                userData[i].searchString = userData[i].label
                userData[i].redirectLink = popupUserDetails
                userData[i].type = "USER"
                let pic = (userData[i].logoLink != undefined) ? userData[i].logoLink : ((userData[i]?.userPictureLink != undefined) ? userData[i]?.userPictureLink : ProfileImage)
                userData[i].image = pic
                allData.push(userData[i])
            }
        }
        if (Array.isArray(jobDefinitionData) && jobDefinitionData != undefined && jobDefinitionData != null) {
            for (let i = 0; i < jobDefinitionData.length; i++) {
                jobDefinitionData[i].value = jobDefinitionData[i].jobDefinitionID
                jobDefinitionData[i].label = jobDefinitionData[i].jobName
                jobDefinitionData[i].searchString = jobDefinitionData[i].label
                jobDefinitionData[i].redirectLink = redirectJobDetailsPage
                jobDefinitionData[i].type = "JOB_DEFINITION"
                allData.push(jobDefinitionData[i])
            }
        }
        if (Array.isArray(jobData) && jobData != undefined && jobData != null) {
            for (let i = 0; i < jobData.length; i++) {
                jobData[i].value = jobData[i].jobID
                jobData[i].label = jobData[i].jobName
                jobData[i].searchString = jobData[i].label
                jobData[i].redirectLink = redirectJobDetailsPage

                jobData[i].type = "JOB"
                allData.push(jobData[i])
            }
        }
        if (Array.isArray(jobRequestData) && jobRequestData != undefined && jobRequestData != null) {
            for (let i = 0; i < jobRequestData.length; i++) {
                jobRequestData[i].value = jobRequestData[i].jobRequestID
                jobRequestData[i].label = jobRequestData[i].jobName
                jobRequestData[i].searchString = jobRequestData[i].label
                jobRequestData[i].redirectLink = redirectJobDetailsPage
                jobRequestData[i].type = "JOB_REQUEST"
                allData.push(jobRequestData[i])
            }
        }
        setJobRequestOptions(jobRequestData)
        setJobDefinitionOptions(jobDefinitionData)
        setJobOptions(jobData)
        setUserOptions(userData)
        //console.log('Options FetchOptions Completed Into fetch Search Details2 ', searchValue, userData?.length, jobData?.length, jobRequestData?.length, jobDefinitionData?.length)

        try {
            if (userData.length === 0 || jobDefinitionData.legnth === 0) {
                return
            }
            //console.log('Options FetchOptions Completed Before Selection',userData?.length , jobDefinitionData?.length  )

            let currentRow = formatListData(userData, "USER", searchValue)
            let currentRow3 = formatListData(jobData, "JOB", searchValue)
            //let currentRow2 = formatListData(jobDefinitionData, "JOB_DEFINITION", searchValue)
            let currentRow2 = formatListData(jobRequestData, "JOB_REQUEST", searchValue)
            if (currentRow.length <= 0 && currentRow2.length <= 0 && currentRow3 <= 0) {
                //setOptions(overallOptions)
                setOptions([{ value: searchValue, label: searchValue, "type": "none" }, ...currentRow, ...currentRow2 , ...currentRow3])
                //console.log('Options FetchOptions Completed',userData?.length , jobDefinitionData?.length ,  currentRow ,currentRow2 )

            } else {
                setOptions([{ value: searchValue, label: searchValue, "type": "none" }, ...currentRow, ...currentRow2, ...currentRow3])
                //console.log('Options FetchOptions Completed else',userData?.length , jobDefinitionData?.length ,  currentRow ,currentRow2 )
            }
        } catch (error) {
            console.error('Options FetchOptions Completed  Error fetching data:', error);
            //setOptions([{value:searchValue, label : searchValue, "type" : "none"}]);
        }
    };

    const handleInputChange = (event) => {
        //console.log('Options FetchOptions Completed Handle input Changes', event)
        setSearchText(event.target.value);
        setSearchValue(event.target.value);
        if(props.onSearch != undefined) {
            props.onSearch(event.target.value)
        }
        // formatListData(userOptions, "USER", event)
        // //formatListData(jobOptions, "JOB", event)
        // formatListData(jobDefinitionOptions, "JOB_DEFINITION", event)
        // //formatListData(jobRequestOptions, "JOB_REQUEST", event)
        //setShowModal(true)

    };

    // useEffect(() => {
    //     console.log('Into Options update', jobSelectOption, jobDefinitionSelectOption , jobRequestSelectOption, userSelectOption )
    //     setOptions([...jobSelectOption , ...jobDefinitionSelectOption , ...jobRequestSelectOption , ...userSelectOption])
    //     setCounterOption(counterOption+1)
    // }, [jobSelectOption, jobDefinitionSelectOption, jobRequestSelectOption , userSelectOption])

    const handleSeeAll = (segment) => {
        setSelectedSegment(segment);
        setShowModal(true);
    };

    useEffect(() => {
        fetchSearchDetails();
    }, [])

    const popupUserDetails = (data) => {
        if (props.handleClick != undefined) {
            props.handleClick (data)
            return 
        }
        modelPartnerId = data.partnerID
        setModelUserId(modelPartnerId)
        setUserModelVisible(true)
        //console.log('UserModalForAllPopups Into Popup User Details' ,modelPartnerId , data )
    }

    const formatListData = (datalist, type, textVal) => {
        const rows = [];
        let currentRow = [];
        //console.log('Into formatList0 ', datalist?.length, type)

        // Loop through the datalist and create rows with a maximum of 5 items per row
        // console.log('into format List ', hyperlinkSeeAll, datalist)
        if (datalist != undefined) {
            let count = 0
            for (let i = 0; i < datalist.length; i++) {
                //if (datalist[i].searchString != undefined && (searchText === undefined || searchText === null || searchText === '' || datalist[i].searchString.toLowerCase().includes(searchText.toLowerCase()))) {
                if (datalist[i].searchString != undefined && (textVal === undefined || textVal === null || textVal === '' || datalist[i].searchString.toLowerCase().includes(textVal.toLowerCase()))) {
                    //console.log('Into formatList1 ', i, datalist[i].searchString, textVal, datalist[i].type)
                }

                if (datalist[i].searchString != undefined && (textVal === undefined || textVal === null || textVal === '' || datalist[i].searchString.toLowerCase().includes(textVal.toLowerCase()))) {

                    if (count < 3) {
                        //console.log('Into formatList2 ', i, datalist[i].searchString, textVal , datalist.length , datalist[i].type)
                        currentRow.push(datalist[i]);
                        count = count + 1
                    }
                }
            }
        }
        switch (type) {
            case 'JOB':
                setJobSelectOption(currentRow)
                break
            case 'JOB_REQUEST':
                setJobRequestSelectOption(currentRow)
                break
            case 'JOB_DEFINITION':
                setJobDefinitionSelectOption(currentRow)
                break
            case 'USER':
                setUserSelectOption(currentRow)
                break

        }
        //console.log('Into Option formatListData' , type , currentRow)
        return currentRow
    };

    const redirectJobDetailsPage = (data) => {
        //console.log('Into Popup User Details', data.value)
        if (props.handleClick != undefined) {
            props.handleClick (data)
            return 
        }
        switch (data.type) {
            case 'JOB':
                navigate(`/jobs?openTab=all-jobs&id=${data.value}`)
                break
            case 'JOB_REQUEST':
                navigate(`/jobs?openTab=all-requests&id=${data.value}`)
                break
            case 'JOB_DEFINITION':
                navigate(`/jobs?openTab=all-job-postings&id=${data.value}`)
                break

        }
    }

    const fetchSearchDetails = async () => {
        try {
            //setDetails(null)
            setLoading(true);
            let res = null
            //res = await userService.fetchSearchOptionAll()
            res = await userService.fetchSearchOptionAllSearch('')
            const userData = res?.data?.message?.partners;
            const jobData = res?.data?.message?.jobs;
            const jobRequestData = res?.data?.message?.jobRequests;
            const jobDefinitionData = res?.data?.message?.jobDefinitions;
            //console.log('Into fetch Search Details ', res, userData, jobData, jobRequestData, jobDefinitionData)
            let allData = []
            if (Array.isArray(userData) && userData != undefined && userData != null) {
                for (let i = 0; i < userData.length; i++) {
                    userData[i].value = userData[i].partnerID
                    userData[i].label = userData[i].partnerName != undefined ? userData[i].partnerName : userData[i].userName
                    userData[i].searchString = userData[i].label
                    userData[i].redirectLink = popupUserDetails
                    userData[i].type = "USER"
                    let pic = (userData[i].logoLink != undefined) ? userData[i].logoLink : ((userData[i]?.userPictureLink != undefined) ? userData[i]?.userPictureLink : ProfileImage)
                    userData[i].image = pic
                    allData.push(userData[i])
                }
            }
            if (Array.isArray(jobDefinitionData) && jobDefinitionData != undefined && jobDefinitionData != null) {
                for (let i = 0; i < jobDefinitionData.length; i++) {
                    jobDefinitionData[i].value = jobDefinitionData[i].jobDefinitionID
                    jobDefinitionData[i].label = jobDefinitionData[i].jobName
                    jobDefinitionData[i].searchString = jobDefinitionData[i].label
                    jobDefinitionData[i].redirectLink = redirectJobDetailsPage
                    jobDefinitionData[i].type = "JOB_DEFINITION"
                    allData.push(jobDefinitionData[i])
                }
            }
            if (Array.isArray(jobData) && jobData != undefined && jobData != null) {
                for (let i = 0; i < jobData.length; i++) {
                    jobData[i].value = jobData[i].jobID
                    jobData[i].label = jobData[i].jobName
                    jobData[i].searchString = jobData[i].label
                    jobData[i].redirectLink = redirectJobDetailsPage

                    jobData[i].type = "JOB"
                    allData.push(jobData[i])
                }
            }
            if (Array.isArray(jobRequestData) && jobRequestData != undefined && jobRequestData != null) {
                for (let i = 0; i < jobRequestData.length; i++) {
                    jobRequestData[i].value = jobRequestData[i].jobRequestID
                    jobRequestData[i].label = jobRequestData[i].jobName
                    jobRequestData[i].searchString = jobRequestData[i].label
                    jobRequestData[i].redirectLink = redirectJobDetailsPage
                    jobRequestData[i].type = "JOB_REQUEST"
                    allData.push(jobRequestData[i])
                }
            }
            setJobRequestOptions(jobRequestData)
            setJobDefinitionOptions(jobDefinitionData)
            setJobOptions(jobData)
            setUserOptions(userData)
            setOverallOptions(allData)
            //console.log('Updated the details ', allData)
            let currentRow = formatListData(userData, "USER", '')
            //setUserSelectOption(currentRow)
            //let currentRow1 = formatListData(jobData, "JOB", '')
            //setJobSelectOption(currentRow1)
            let currentRow2 = formatListData(jobDefinitionData, "JOB_DEFINITION", '')
            //setJobDefinitionSelectOption(currentRow2)

            //let currentRow3 = formatListData(jobRequestData, "JOB_REQUEST", '')
            // setJobDefinitionSelectOption(currentRow3)
            setOptions([...currentRow, ...currentRow2])
        } catch (error) {
            console.warn(error)
        } finally {
            setLoading(false)
        }

    }

    // const formatUserOptionLabel = (data) => (

    //     <div style={{ display: 'flex', alignItems: 'center' }} onClick={data.redirectLink(data)}>
    //         <img src={data.image} alt={data.label} style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '3px' }} />
    //         <div>
    //             <div style={{ fontWeight: 'bold' }}>{data.label}</div>
    //             <div style={{ color: '#666' }}>
    //                 <span style={{ marginLeft: '8px' }}>{data.stackHolderType}</span>
    //                 <span style={{ marginLeft: '8px' }}>{data.skillSets}</span>
    //             </div>
    //         </div>
    //     </div>
    // );

    const formatUserOptionLabel = (data) => (
        <Card
            style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', height: '45px', border: 'none' }}
            onClick={() => popupUserDetails(data)}
            bodyStyle={{ padding: '0px', display: 'flex', alignItems: 'center', border: 'none' }}
        >
            <img
                src={data.image}
                alt={data.label}
                style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
            />
            {/* {console.log('Intp formatUserOptionLabel', data.label)} */}
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{data.label}</div>
                <div style={{ color: '#666', fontSize: '8px' }}>
                    <div>{data.stakeHolderType}</div>
                    <div style={{ marginLeft: '8px', fontSize: '8px' }}>{data.skillSet}</div>
                </div>
            </div>
        </Card>
    );

    // const formatJobOptionLabel = (data) => (
    //     <div style={{ display: 'flex', alignItems: 'center' }} onClick={data.redirectLink(data)}>
    //         <img src={data.image} alt={data.label} style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
    //         <div>
    //             <div style={{ fontWeight: 'bold' }}>{data.label}</div>
    //             <div style={{ color: '#666' }}>
    //                 <span style={{ marginLeft: '8px' }}>{data.jobDescription}</span>
    //             </div>
    //         </div>
    //     </div>
    // );

    const formatJobOptionLabel = (data) => (
        <Card
            style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', height: '45px', border: 'none' }}
            onClick={() => redirectJobDetailsPage(data)}
            bodyStyle={{ padding: '0px', display: 'flex', alignItems: 'center', border: 'none' }}
        >
            {/* <img
                src={data.image}
                alt={data.label}
                style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
            /> */}
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{data.label}</div>
                <div style={{ color: '#666', fontSize: '8px' }}>
                    <div>{data.jobDescription}</div>
                    {/* <div style={{ marginLeft: '8px' }}>{data.jobType}</div> */}
                </div>
            </div>
        </Card>
    );

    const formatList = (currentRow, hyperlinkSeeAll, type) => {
        // const rows = [];
        // let currentRow = [];

        // // Loop through the datalist and create rows with a maximum of 5 items per row
        // // console.log('into format List ', hyperlinkSeeAll, datalist)
        // if (datalist != undefined) {
        //     for (let i = 0; i < datalist.length; i++) {
        //         if (datalist[i].searchString != undefined && (searchText === undefined || searchText === null || searchText === '' || datalist[i].searchString.toLowerCase().includes(searchText.toLowerCase()))) {
        //             //if (datalist[i].searchString != undefined && (textVal === undefined || textVal === null || textVal === '' || datalist[i].searchString.toLowerCase().includes(textVal.toLowerCase()))) {

        //             //console.log('Into formatList ', i, datalist[i].searchString, searchText)
        //             if (i < 3) {
        //                 console.log('Into formatList ', i, datalist[i].searchString, searchText)
        //                 currentRow.push(datalist[i]);
        //             }
        //         }
        //     }
        // }
        // return (
        //     <div>
        //         {currentRow.length >= 0 && (
        //             <>
        //                 <Row gutter={[16, 26]}>
        //                     {currentRow.map((item, index) => (
        //                         <div key={index} style={{ display: 'flex', marginBottom: '1px' }}>
        //                             {/* Render each item in the row */}
        //                             {item.type === 'USER' && formatUserOptionLabel(item)}
        //                             {item.type === 'JOB' && formatJobOptionLabel(item)}
        //                             {item.type === 'JOB_REQUEST' && formatJobOptionLabel(item)}
        //                             {item.type === 'JOB_DEFINITION' && formatJobOptionLabel(item)}

        //                         </div>
        //                     ))}
        //                     {/* Render the "See All" button in the top right corner */}
        //                     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        //                         <Link to={hyperlinkSeeAll} style={{ fontWeight: 'bold' }}>See All</Link>
        //                     </div>
        //                     <Divider />
        //                 </Row>
        //             </>
        //         )}
        //     </div>

        // );
        return (
            <div>
                {console.log('Info fetch details', currentRow, hyperlinkSeeAll)}
                {/* Render the filtered data list */}
                {currentRow.length > 0 && (
                    <Row gutter={[200, 0]} >
                        {currentRow.map((item, index) => (
                            <>
                                {item.type === type && (<Col key={item.partnerID}>
                                    {/* Render each item in the row */}
                                    {item.type === 'USER' && formatUserOptionLabel(item)}
                                    {item.type === 'JOB' && formatJobOptionLabel(item)}
                                    {item.type === 'JOB_REQUEST' && formatJobOptionLabel(item)}
                                    {item.type === 'JOB_DEFINITION' && formatJobOptionLabel(item)}
                                    {/* Add more condition for other item types */}
                                </Col>)}
                            </>
                        ))}
                        {/* Render the "See All" button in the bottom */}
                        <Space style={{ 'background': '#d5deed' }}>
                            <Space.Compact>
                                <Col >
                                    <h5 style={{ width: '70%' }}>
                                        {type === 'USER' && 'Users'}
                                        {type === 'JOB' && 'Jobs'}
                                        {type === 'JOB_REQUEST' && 'Job Requests'}
                                        {type === 'JOB_DEFINITION' && 'Ads'}
                                    </h5>
                                </Col>
                            </Space.Compact>

                            { addSeeAll && (
                            <Space.Compact>
                                <Col span={24} style={{ textAlign: 'right', marginTop: '10px', width: '30%' }}>
                                    <Link to={hyperlinkSeeAll}>
                                        {/* <Button type="primary" shape="round" size="small"> */}
                                        See All
                                        {/* </Button> */}
                                    </Link>
                                </Col>
                            </Space.Compact>
                            )}
                        </Space>
                        {/* <Divider /> */}
                    </Row>

                )}
            </div>
        );

    };


    //   const handleInputChange = (event) => {
    //     setSearchValue(event.target.value);
    //   };

    const handleSearch = () => {
        // Perform your search operation with the searchValue here.
        // For demonstration purposes, let's just log the value in the console.
        //console.log('Searching for:', searchValue);

        // Once the search is performed, reset the component state.
        setSearchValue('');
    };

    // Simulated data for users and jobs

    const handleDropdownVisibleChange = (visible) => {
        //console.log('handleDropdownVisibleChanges', visible)
        setShowModal(true);
    };

    const handleDropdownClose = () => {
        //console.log('into handle DropDownClose')
    };

    const renderDropdownMenu = () => {
        return (
            <>
                {/* {console.log('into handle renderDropdownMenu' , options)} */}
                <Space direction="vertical" size="middle">
                    {/* {formatList(userSelectOption, "/user_details")} */}
                    {/* {formatList(jobSelectionOption, "/jobs?openTab=all-jobs")} */}
                    {/* {formatList(jobDefinitionSelectOption, "/jobs?openTab=your-postings")} */}
                    {/* {formatList(jobRequestSelectionOptions, "/jobs?openTab=all-requests")} */}

                    {formatList(options, "/user_details", "USER")}
                    {formatList(options, "/jobs?openTab=your-postings", "JOB_DEFINITION")}

                </Space>
            </>

        );
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none', // Remove the border
            boxShadow: 'none', // Remove any box shadow if needed
            width: '100%',
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hide the indicator separator
        }),
    };

    return (

        <div>

            <UserModalForAllPopups isVisible={userModelVisible} partnerId={modelUserId} closeModal={() => {
                modelPartnerId = ''
                setUserModelVisible(false)
            }} />
            <div className="search-input-container">
                <button onClick={handleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
                <div style={{ flex: '1' }}>
                    {/* <Select
                        value={searchValue}
                        //defaultValue = 'ALL'
                        mode="single"
                        showSearch={true}
                        isSearchable={true}
                        placeholder="Search "
                        onSearch={(e) => handleInputChange(e)}
                        dropdownRender={() => renderDropdownMenu()}
                        onBlur={handleDropdownClose}
                        //options={overallOptions}
                        options={options}
                        //getOptionLabel={(option) => option.label} 
                        suffixIcon={null} // This removes the dropdown indicator
                        //style={customStyles}
                        bordered={false}
                        style={{
                            width: '100%',
                            borderColor: '#d9d9d9 !important',
                            border: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                        }}
                    >
                    </Select> */}
                    <Input 
                    value={searchValue}
                    onChange={(e) => handleInputChange(e)}
                    style={{
                        width: '100%',
                        borderColor: '#d9d9d9 !important',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                    }}
                    ></Input>
                </div>
            </div>
        </div>
    );
};

export default SearchChat;