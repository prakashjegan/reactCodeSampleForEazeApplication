import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Collapse, Modal, Space, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ChatIcon } from "../../../assets/icons/figmaIcons"
import { Link, useNavigate } from "react-router-dom"
import fileUploadService from "../../../services/fileUploadService"
import invoiceService from "../../../services/invoiceService"

import axios from "axios"
import { toast } from "react-hot-toast"
import { MessageOutlined } from '@mui/icons-material';

const { Search } = Input;


//import './CommentForm.css'; // Import custom CSS for styling

const { Panel } = Collapse;
const { Dragger } = Upload

const CommentForm = (props) => {
    const [fileList, setFileList] = useState([]);
    const [shareLink, setShareLink] = useState('');
    const [comments, setComments] = useState('');
    const [platform, setPlatform] = useState('');
    const [contentLink, setContentLink] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    let setupdateData = {
        stageMappingId: "",
        stageStatus: "SENT_FOR_APPROVAL",
        comments: "",
        uploadLink: "",
    }

    const navigate = useNavigate();
    const handleNavChange = (key, open, id) => {
        switch (key) {
            case 'onboarding':
                navigate(`/onboarding`)
                break;
            case 'invoices':
                navigate(`/invoices`)
                break;
            case 'jobs':
                navigate(`/jobs?openTab=${open}&id=${id}`)
                break;
                case 'chat':   
            
            //navigate(`/messages?messageType=${open}&id=${id}`)
            navigate(`/messages?messageType=${open}&id=${id}`)
            //console.log('Into Chat cases', key , open, id, `/messages?messageType=${open}&id=${id}`)

            break;
        }
    }

    const toggleExpand = () => {
        //itemT.isExpanded = isExpanded
        console.log('Log FileUploaded : ', isExpanded)
        setIsExpanded(!isExpanded);
    };

    const openChat = () => {
        //itemT.isExpanded = isExpanded
        console.log('Log OpenChat : ', isExpanded)
        //setIsExpanded(!isExpanded);
    };

    let data = props.data
    let platforms = data.platforms
    console.log('Platforms File Uploads ', platforms)
    let stageInputs = props.stageInputs
    let canPerformAction = props.canPerformAction
    let directStage = false
    let buttonString = "Wait For An Update or Send Personal Message"
    let actions = props.actions
    const handleActions = props.handleAction
    console.log('CurrentJobCard Actions: ', actions)
    let currentStage = data.currentStage
    console.log('CurrentJobCard CurrentStage : ', currentStage)
    setupdateData = { ...setupdateData, stageMappingId: currentStage.stageMappingId }

    let hasComments = false
    let hasShareLink = false
    let hasUploadLink = false
    let hasPlatforms = false
    let hasContentLink = false

    if (stageInputs.has('Comments')) {
        hasComments = true
    }
    if (stageInputs.has('Share Link')) {
        hasShareLink = true
    }
    if (stageInputs.has('Upload Document')) {
        hasUploadLink = true
    }

    if (stageInputs.has('Platform')) {
        hasPlatforms = true
    }
    if (stageInputs.has('contentLink')) {
        hasContentLink = true
    }

    if (actions.size <= 0) {
        canPerformAction = false
        buttonString = "COMPLETED"
    }

    if (stageInputs === undefined || stageInputs.size <= 0) {
        directStage = true
    }


    const onFinish = (values) => {
        // Handle form submission
        const { comment } = values;
        message.success('Comment submitted successfully!');
        console.log('Comment:', comment);
        console.log('Files:', fileList);
        console.log('Share Link:', shareLink);
    };

    const handleAction = (key, status, e) => {
        console.log('handleAction', key, status)
        setupdateData = {
            ...setupdateData, 'stageStatus': status,
            'platformId': (platform === '' ? null : platform), 'comments': comments, 'stageMappingId': currentStage.jobContractStageMappingID, 'uploadLink': shareLink,
            'contentLink': contentLink
        }
        updateDataHandler(setupdateData)
        console.log('Handle Actions StatusUpdates', setupdateData)

    };

    const updateDataHandler = async (updateData) => {
        try {
            const j = await invoiceService.updateJobStage(updateData)
            console.log(updateData)
            console.log(j)
            props.handleAction()
        } catch (error) {
            console.log(error)
        } finally {
        }
        //setisUpdating(false)
    }

    const getAWSUrl = async (e) => {
        if (e.file.status === "removed") {
            setupdateData({ ...setupdateData, uploadLink: "" })
        } else {
            try {
                console.log('File Status', e.file.status)
                console.log(e.file)
                // file.preventDefault()
                const j = await fileUploadService.gets3ConfigUrl(e.file.name, 'jobDocument')
                console.log('SignedUrl', j)
                console.log('Signed Url ABC j.data ', j.data)
                console.log(j.data.message)
                const response = await axios.put(decodeURIComponent(j.data.message), e.file, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                console.log(response)
                if (response.status === 200) {
                    let str = decodeURIComponent(j.data.message.split("?")[0])
                    setupdateData = { ...setupdateData, uploadLink: str }
                    setShareLink(str)
                    setShowUploadModal(false)
                    return true || Upload.LIST_IGNORE
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (key, e) => {
        if (key === 'comments') {
            setComments(e.target.value)
            setupdateData = { ...setupdateData, comments: e.target.value }
            console.log('Handle Change', key, comments)
        } else if (key === 'platformId') {
            console.log('Handle Change Platforms ', key, e)
            setPlatform(e)
            setupdateData = { ...setupdateData, platformId: e }
        } else if (key === 'contentLink') {
            setContentLink(e.target.value)
            setupdateData = { ...setupdateData, contentLink: e.target.value }
        }



    }

    const handleFileChange = (e) => {
        console.log('File Change', e)
        getAWSUrl(e)
        //setFileList(e);
        // if (e.file.status === "removed") {
        //     shareLink("")
        //     setupdateData = { ...setupdateData, uploadLink: "" }
        // } else {
        //     try {
        //         console.log(e[0].file.status)
        //         // file.preventDefault()
        //         const j = fileUploadService.gets3ConfigUrl(e[0].file)
        //         console.log(j.data.message)
        //         const response = axios.put(decodeURIComponent(j.data.message), e.file, {
        //             headers: { "Content-Type": "multipart/form-data" }
        //         })
        //         console.log(response)
        //         if (response.status === 200) {
        //             setupdateData = { ...setupdateData, uploadLink: decodeURIComponent(j.data.message.split("?")[0]) }

        //             return true || Upload.LIST_IGNORE
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

    };


    // const getAWSUrl = (e) => {
    //     if (e.file.status === "removed") {
    //         shareLink("")
    //        setupdateData({ ...updateData, uploadLink: "" })
    //     } else {
    //        try {
    //           console.log(e.file.status)
    //           // file.preventDefault()
    //           const j =  fileUploadService.gets3ConfigUrl(e.file)
    //           console.log(j.data.message)
    //           const response =  axios.put(decodeURIComponent(j.data.message), e.file, {
    //              headers: { "Content-Type": "multipart/form-data" }
    //           })
    //           console.log(response)
    //           if (response.status === 200) {
    //              setupdateData({ ...updateData, uploadLink: decodeURIComponent(j.data.message.split("?")[0]) })

    //              return true || Upload.LIST_IGNORE
    //           }
    //        } catch (error) {
    //           console.log(error)
    //        }
    //     }
    //  }

    const handleLinkChange = (e) => {
        console.log('LinkChange', e)
        setShareLink(e.target.value);
    };

    const handleUploadModalOk = (e) => {
        console.log('File handleUploadModalOk ', e)

        setShowUploadModal(false);
    };

    const handleUploadModalCancel = () => {
        setShowUploadModal(false);
    };

    const showModal = () => {
        setShowUploadModal(true);
    };

    const handleBeforeUpload = () => {
        return false; // Prevent actual file upload
    };

    // const renderUploadButton = () => (
    //     <div className="upload-button">
    //         <Button icon={<UploadOutlined />} onClick={showModal}>
    //             Upload Image
    //         </Button>
    //         <Search
    //   placeholder="input search text"
    //   allowClear
    //   enterButton="Upload"
    //   size="large"
    //   onSearch={onSearch}
    // />
    //         <Modal
    //             title="Drag & Drop Upload"
    //             visible={showUploadModal}
    //             onOk={handleUploadModalOk}
    //             onCancel={handleUploadModalCancel}
    //         >
    //             {/* Drag and drop upload popup content */}
    //             <Upload.Dragger
    //                 fileList={fileList}
    //                 beforeUpload={handleBeforeUpload}
    //                 onChange={handleFileChange}
    //             >
    //                 <p className="upload-icon">
    //                     <UploadOutlined />
    //                 </p>
    //                 <p className="upload-text">Click or drag files here</p>
    //                 <p className="upload-hint">Support for a single or bulk upload.</p>
    //             </Upload.Dragger>
    //         </Modal>
    //     </div>
    // );

    return (
        <>
            {directStage && canPerformAction && (
                <div className="jobCard-btn-grp" style={{ justifyContent: 'center' }}>
                    {/* <Button type="primary">Upload</Button>
                        <Button primary="true">Start</Button> */}
                    {console.log('Actions : ', actions)}
                    {Array.from(actions).map(([key, value], index1) => {
                        { console.log('Display element : ', key, value) }
                        return (
                            <div key={key}>
                                {/* <p className="currentJobCard-links"><b>{key}</b> : {value}</p> */}
                                <Button type="primary" onClick={(e) => handleAction(key, value, e)}>{key}</Button>
                            </div>
                        )
                    })}

                    {/* <Link>
                        <ChatIcon onClick={(e) => {
               handleNavChange('chat', 'JOB', data.jobID)
            }
         }/>
                    </Link> */}
                    <MessageOutlined
                        onClick={(e) => {
                            console.log('Into Chat Click', data)
                            handleNavChange('chat', 'JOB', data.jobID)
                        }
                        }
                        style={{ cursor: "pointer", width: "40", height: "40" }}
                    />

                </div>
            )}
            {!directStage && !canPerformAction && (
                <>
                    <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px' }}>
                        {/* <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        // alignItems: 'center',
                        // justifyContent: 'flex-start',
                        // margin: '0 10px',
                        // gap: '15px',

                        // display: 'flex',
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                        // height: '40px',
                        // padding: '0 16px',
                        // background: '#1890ff', // Background color for the header (you can change this)
                        // color: '#fff', // Text color for the header (you can change this)
                        // borderRadius: '10px', // Rounded corner value for the header
                        // cursor: 'pointer', // Show pointer cursor on hover
                    }}
                > */}
                        {/* <h4 style={{ margin: 0, alignContent: 'center', width:'80%' }}>Update - stageName</h4> */}
                        <Button style={{
                            width: '90%',
                            display: 'flex',
                            height: '40px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: 'normal',
                            background: 'grey',
                        }}
                            type='primary'
                            onClick={(e) => { }}
                        > Wait For An Update or Send Personal Message</Button>
                        {/* </div> */}
                        {props.canshowJobDetails && (
                            // <Link style={{ margin: 0, alignContent: 'center', width: '8%' }}
                            //     onClick={(e) => openChat()}
                            // >
                            //     <ChatIcon />
                            // </Link>
                            <MessageOutlined
                                onClick={(e) => {
                                    console.log('Into Chat Click' , data)
                                    handleNavChange('chat', 'JOB', data.jobID)
                                }
                                }
                                style={{ cursor: "pointer", width: "40", height: "40" }}
                            />
                        )}
                    </Space.Compact>
                </>
            )
            }
            {console.log('Log FileUploaded Is Expanded FileUpload ', isExpanded)}
            {!directStage && canPerformAction && (
                <Collapse size='small'
                    isExpanded={isExpanded}
                    style={{
                        //backgroundColor: '#f0f2f5',
                        backgroundColor: 'white',
                        padding: '0px',
                        //boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        //boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                        //borderRadius: '8px',
                        border: 'none',
                    }}>
                    <Panel key='1'
                        header={
                            <>
                                {!isExpanded && (
                                    <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px' }}>
                                        {/* <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                // alignItems: 'center',
                                // justifyContent: 'flex-start',
                                // margin: '0 10px',
                                // gap: '15px',

                                // display: 'flex',
                                // alignItems: 'center',
                                // justifyContent: 'space-between',
                                // height: '40px',
                                // padding: '0 16px',
                                // background: '#1890ff', // Background color for the header (you can change this)
                                // color: '#fff', // Text color for the header (you can change this)
                                // borderRadius: '10px', // Rounded corner value for the header
                                // cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        > */}
                                        {/* <h4 style={{ margin: 0, alignContent: 'center', width:'80%' }}>Update - stageName</h4> */}
                                        <Button style={{
                                            width: '90%',
                                            display: 'flex',
                                            height: '40px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            lineHeight: 'normal',
                                        }}
                                            type='primary'
                                            onClick={(e) => toggleExpand()}
                                        >Hide Update</Button>
                                        {/* </div> */}
                                        {props.canshowJobDetails && (
                                            // <Link style={{ margin: 0, alignContent: 'center', width: '8%' }}
                                            //     onClick={(e) => openChat()}
                                            // >
                                            //     <ChatIcon />
                                            // </Link>
                                            <MessageOutlined
                                                onClick={(e) => {
                                                    console.log('Into Chat Click' , data)
                                                    handleNavChange('chat', 'JOB', data.jobID)
                                                }
                                                }
                                                style={{ cursor: "pointer", width: "40", height: "40" }}
                                            />
                                        )}
                                    </Space.Compact>
                                )}
                                {isExpanded && (
                                    <Space.Compact style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px' }}>
                                        {/* <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    // alignItems: 'center',
                                    // justifyContent: 'flex-start',
                                    // margin: '0 10px',
                                    // gap: '15px',

                                    // display: 'flex',
                                    // alignItems: 'center',
                                    // justifyContent: 'space-between',
                                    // height: '40px',
                                    // padding: '0 16px',
                                    // background: '#1890ff', // Background color for the header (you can change this)
                                    // color: '#fff', // Text color for the header (you can change this)
                                    // borderRadius: '10px', // Rounded corner value for the header
                                    // cursor: 'pointer', // Show pointer cursor on hover
                                }}
                            > */}
                                        {/* <h4 style={{ margin: 0, alignContent: 'center', width:'80%' }}>Update - stageName</h4> */}
                                        <Button style={{
                                            width: '90%',
                                            display: 'flex',
                                            height: '40px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            lineHeight: 'normal',
                                        }}
                                            type='primary'
                                            onClick={(e) => toggleExpand()}
                                        >Update - {currentStage.stageName}</Button>
                                        {/* </div> */}
                                        {/* <Link style={{ margin: 0, alignContent: 'center', width: '8%' }}
                                            onClick={(e) => openChat()}
                                        >
                                            <ChatIcon />
                                        </Link> */}
                                        <MessageOutlined
                                            onClick={(e) => {
                                                console.log('Into Chat Click' , data)
                                                handleNavChange('chat', 'JOB', data.jobID)
                                            }
                                            }
                                            style={{ cursor: "pointer", width: "40", height: "40" }}
                                        />
                                    </Space.Compact>
                                )
                                }
                            </>
                        }
                        showArrow={false}
                        size='small'
                    >
                        {console.log('HasComments , ', hasComments, currentStage)}
                        <Form onFinish={onFinish} layout="vertical">
                            {hasComments && (
                                <Form.Item label="Comment">
                                    <Form.Item name="comment" noStyle>
                                        <Input.TextArea rows={4} placeholder="Enter your comment" value={comments} onChange={(e) => handleChange('comments', e)} />
                                    </Form.Item>
                                </Form.Item>
                            )}
                            {hasPlatforms && (
                                <Form.Item label="Platfrom">
                                    <Form.Item name="platform" noStyle>
                                        <Select style={{ width: '100%' }} placeholder="Platfrom" onChange={(e) => handleChange('platformId', e)} options={platforms} value={platform} />
                                    </Form.Item>
                                </Form.Item>
                            )}
                            {hasContentLink && (
                                <Form.Item label="Content Link">
                                    <Form.Item name="contentLink" noStyle>
                                        <Input placeholder="https://example.com/link" value={contentLink} onChange={(e) => handleChange('contentLink', e)} />
                                    </Form.Item>
                                </Form.Item>
                            )}
                            {(hasShareLink || hasUploadLink) && (
                                <Form.Item label="Share Link or Upload File">
                                    {hasShareLink && hasUploadLink && (
                                        <>
                                            <Search
                                                placeholder="https://example.com/link"
                                                //allowClear
                                                enterButton="Upload"
                                                size="large"
                                                onSearch={(e) => showModal(e)}
                                                onChange={(e) => handleLinkChange(e)}
                                                value={shareLink}
                                            />

                                            <Modal
                                                title="Drag & Drop Upload"
                                                visible={showUploadModal}
                                                onOk={(e) => handleUploadModalOk(e)}
                                                onCancel={(e) => handleUploadModalCancel(e)}
                                            >
                                                {/* Drag and drop upload popup content */}
                                                <Dragger
                                                    name="Upload Document"
                                                    fileList={fileList}
                                                    beforeUpload={(e) => handleBeforeUpload(e)}
                                                    //onChange={(e) => handleFileChange(e)}
                                                    multiple={false}
                                                    beforeRemove={(e) => {
                                                        e.preventDefault()
                                                    }}
                                                    //beforeUpload={(e) => e.preventDefault()}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onChange={(e) => handleFileChange(e)}
                                                    className="upload-modal-dragArea"
                                                >
                                                    <p className="upload-icon">
                                                        <UploadOutlined />
                                                    </p>
                                                    <p className="upload-text">Click or drag files here</p>
                                                    <p className="upload-hint">Support for a single or bulk upload.</p>
                                                </Dragger>
                                            </Modal>
                                        </>
                                    )}
                                    {hasShareLink && !hasUploadLink && (
                                        <>
                                            <Input
                                                placeholder="https://example.com/link"
                                                //allowClear
                                                // enterButton="Upload"
                                                size="large"
                                                //onSearch={(e) => showModal(e)}
                                                onChange={(e) => handleLinkChange(e)}
                                                value={shareLink}
                                            />
                                        </>
                                    )}
                                </Form.Item>
                            )}

                            <div className="jobCard-btn-grp" style={{ justifyContent: 'center' }}>
                                {/* <Button type="primary">Upload</Button>
                        <Button primary="true">Start</Button> */}
                                {console.log('Actions : ', actions)}
                                {Array.from(actions).map(([key, value], index1) => {
                                    { console.log('Display element : ', key, value) }
                                    return (
                                        <div key={key}>
                                            {/* <p className="currentJobCard-links"><b>{key}</b> : {value}</p> */}
                                            <Button type="primary" onClick={(e) => handleAction(key, value, e)}>{key}</Button>
                                        </div>
                                    )
                                })}

                                {/* <Link>
                            <ChatIcon />
                        </Link> */}
                            </div>
                        </Form>
                    </Panel>
                </Collapse>
            )
            }
        </>
    );
};

export default CommentForm;