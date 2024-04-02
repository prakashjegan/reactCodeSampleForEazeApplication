import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Upload, Skeleton } from "antd"
import { UserOutlined, SendOutlined } from '@ant-design/icons';
//import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import messageDetailDuck from './duck'
import { CircularProgress } from "@mui/material"
import { connect } from "react-redux"
import Input from "antd/es/input/Input";
import './style.scss'
import { color } from "@mui/system";
import { List, AutoSizer } from "react-virtualized";
import styles from 'react-virtualized/styles.css';
import { toHumanReadableDate } from "../../../utils/common/commonutils";
import zIndex from "@mui/material/styles/zIndex";
import Messages from '../../../lib/api/messages'
import StateStorage from '../../../lib/state-storage'
import { myPartnerId } from "../../../config/variables";
import { ImojiSmily } from "../../../assets/icons/figmaIcons";
import { ArrowDownwardOutlined, AttachmentOutlined, FileDownloadOutlined, Refresh } from "@mui/icons-material";
import moment from 'moment';
import EmojiPicker from "emoji-picker-react";
import fileUploadService from "../../../services/fileUploadService";
import axios from "axios"
import { Link } from "react-router-dom";
const { Dragger } = Upload;
const { TextArea } = Input

const MessageDetail = ({
    clickedMessageItem,
    messageDetail,
    messageDetailLoading,
    getMessageDetails
}) => {

    console.log('Into MessageDetails clickedMessageItem Details', clickedMessageItem, messageDetail)
    const isRowLoaded = ({ index }) => {
        return true
    }

    let [pageIndex, setPageIndex] = useState(1)
    const chatRef = useRef()

    const [scrollToBottom, setScrollToBottom] = useState(true);
    const [loadMore, setLoadMore] = useState(messageDetail?.message?.count > 20)

    const [composeMessage, setComposeMessage] = useState("")
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [firstLoadScroll, setFirstLoadScrolled] = useState(false)


    //let [messages, setMessages] = useState(messageDetail?.messsage?.userChatList.reverse() || [])
    let [messages, setMessages] = useState([])
    let [messageMap, setMessageMap] = useState(new Map())
    const [imojiOpen, setImojiOpen] = useState(false)
    let documentLink = new Map()
    const [documentLink1, setDocumentLink1] = useState(new Map())
    const [partnerDetail, setPartnerDetail] = useState(new Map())
    const [loading, setLoading] = useState(false);

    let [lastScrollIndex, setLastScrollIndex] = useState(messages.size - 1)
    const [fileList, setFileList] = useState([])

    const userDetails = StateStorage.loadAuthState()
    const chatDate = (date) => {
        const localDate = new Date()

    }
    function formatChatDate(timestamp) {
        const now = moment();
        const messageTime = moment(timestamp);

        if (now.isSame(messageTime, 'day')) {
            return messageTime.format('HH:mm');
        } else if (now.isSame(messageTime, 'week')) {
            return messageTime.format('ddd HH:mm');
        } else if (now.isSame(messageTime, 'year')) {
            return messageTime.format('MMM D HH:mm');
        } else if (now.diff(messageTime, 'days') === 1) {
            return 'Yesterday ' + messageTime.format('HH:mm');
        } else {
            return messageTime.format('DD MMM YY HH:mm');
        }
    }
    const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        const atBottom = clientHeight + scrollTop >= scrollHeight - 500;

        if (!atBottom) {
            setScrollToBottom(false);
        } else {
            setScrollToBottom(true);
        }
    };
    useEffect(() => {
        setDocumentLink1(new Map())
        let pageIndex = messageDetail?.message?.page || 1
        console.log(messageDetail)
        // debugger
        let chatList = messageDetail?.message?.userChatList || undefined


        setPageIndex(pageIndex)
        { console.log('IntoMessageDetails Into Message Details partnerDetailsMessage Empty', chatList, messageDetail, messageMap) }
        if (chatList === undefined || chatList.length == 0) {
            setMessages([])
            setMessageMap(new Map())
            { console.log('IntoMessageDetails Into Message Details partnerDetailsMessage EmptyMap', chatList, messageDetail, messageMap) }


        } else if (chatList !== undefined) {
            let partnerMap = (messageDetail?.message?.partnerMap === undefined) ? new Map() : new Map(Object.entries(messageDetail?.message?.partnerMap))
            const mergedMap = new Map([...partnerDetail, ...partnerMap]);
            { console.log('IntoMessageDetails Into Message Details partnerDetails4', partnerDetail, partnerMap, mergedMap) }
            setPartnerDetail(mergedMap)
            if (chatList.length == 0) {
                setLoadMore(false)
            } else {
                setLoadMore(true)
            }
            //let messageMa = { ...messageMap }
            let messageMa = new Map()
            let newMessages = []
            if (pageIndex <= 1) {
                if (messages.length > 0 && chatList.length > 0) {
                    let oldMessage = messages[0]
                    let newMessage = chatList[0]

                    if (!(oldMessage.userChatGroupID === newMessage.userChatGroupID)) {
                        messageMa = new Map()
                    } else {
                        messageMa = new Map([...messageMap]);
                    }
                } else {
                    messageMa = new Map([...messageMap]);
                }
            }

            console.log('IntoMessageDetails Details MessageMap : ', messageMa, messages, chatList)

            if (chatList.length > 0) {
                for (let i = 0; i < chatList.length; i++) {

                    if (!messageMap.has(chatList[i].userChatID)) {
                        messageMa.set(chatList[i].userChatID, chatList[i])
                        newMessages.push(chatList[i])
                    }
                }

            }
            setMessageMap(messageMa)
            newMessages = newMessages.slice().reverse();
            console.log('IntoMessageDetails Details Message : ', newMessages, chatList)
            if (messages.length > 0 && chatList.length > 0) {
                let oldMessage = messages[0]
                let newMessage = chatList[0]

                if (oldMessage.userChatGroupID === newMessage.userChatGroupID) {
                    console.log('IntoMessageDetails Old Message : ', newMessages.length, oldMessage, newMessage)

                    if (newMessages.length > 0) {
                        setMessages([...newMessages, ...messages])
                    }
                } else {
                    console.log('IntoMessageDetails New Message : ', newMessages.length, oldMessage, newMessage)
                    if (newMessages.length > 0) {
                        setMessages([...newMessages])
                    }
                }
            } else {
                console.log('IntoMessageDetails other Message : ', newMessages)
                if (newMessages.length > 0) {
                    setMessages([...newMessages, ...messages])
                }
            }

        }
    }, [messageDetail])

    useEffect(() => {
        setFirstLoadScrolled(false)
    }, [clickedMessageItem])

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    async function postMessage(message) {
        console.log('Into postMessages documentLink1 dsfsfsdf:::', documentLink1)
        let documentLinkCsv = Array.from(documentLink1.values()).join(',')
        console.log('Into postMessages documentLink1  :::', documentLinkCsv, documentLink1)
        if (message == undefined || message.length == 0) return
        const { userID, partnerId } = userDetails.auth.user
        const {
            jobId,
            jobDefinitionId,
            jobPartnerId,
            jobRequestId,
            partner2Id,
            partner2Name,
            person2Id,
            userGroupId,
        } = clickedMessageItem

        let payload = {
            chatType: clickedMessageItem.data.chatType,
            senderUserId: clickedMessageItem.data.senderUserId,
            senderName: clickedMessageItem.data.senderName,
            receiverName: clickedMessageItem.data.receiverName,
            receiverUserId: clickedMessageItem.data.receiverUserId,
            sender: clickedMessageItem.data.sender,
            receiver: clickedMessageItem.data.receiver,
            jobRequestId: clickedMessageItem.data.jobRequestId,
            jobId: clickedMessageItem.data.ArrayjobId,
            jobDefinitionId: clickedMessageItem.data.jobDefinitionId,
            message: message.trim(),
            messageType: "TEXT",
            jobChat: {
                adType: clickedMessageItem.data.adType,
                jobDefinitionId: clickedMessageItem.data.jobDefinitionId,
                jobRequestId: clickedMessageItem.data.jobDefinitionId,
                jobPartnerId: clickedMessageItem.data.jobPartnerId,
                jobId: clickedMessageItem.data.jobId,
                jobName: clickedMessageItem.data.jobName,
                jobType: clickedMessageItem.data.jobType,
                documentLink: documentLinkCsv,
                userGroupId: clickedMessageItem.data.userGroupId,
            },
            documentLink: documentLinkCsv,
        }
        console.log('IntoMessageDetails post API Payload :::', payload, clickedMessageItem)
        setDocumentLink1(new Map())
        const result = await Messages.postMessage(payload)
        console.log('IntoMessageDetails post API ::: ', result)
        setMessages([...messages, result.message])
        let partnerMap = result.message.partners
        let partMap = new Map()
        for (let i = 0; i < partnerMap.length; i++) {
            partMap[partnerMap[i].partnerId] = partnerMap[i]

        }
        { console.log('postMessages Into Message Details partnerDetails5', partnerDetail, partMap, result.message) }
        const mergedMap = new Map([...partnerDetail, ...partMap]);
        setPartnerDetail(mergedMap)
        setComposeMessage("")
    }

    const chatRowRender = ({ index, key, style }) => {
        let m = messages[index]
        const documentLink = m?.documentLink?.length ? m?.documentLink?.split(",") : []
        console.log('Message chatRow Render', m, userDetails, index, messages[-1]);
        if (!firstLoadScroll) {
            chatRef.current.scrollToRow((index + 1 || 0) + 1)
        }
        if (messages[messages.length - 1].userChatID === m.userChatID) {
            setFirstLoadScrolled(true)
        }
        return (
            <div key={key} style={style} className="message-detail-history-flex-container-chat-history-list-item-container">
                {m.commentPostedBy != myPartnerId() ?
                    (
                        <>
                            {console.log('MessagePosted by others', m.userChatID, myPartnerId(), m.partnerId)}
                            <div className="message-detail-history-flex-container-chat-history-list-item-left">
                                {console.log('Into Message Details partnerDetails', partnerDetail, m.commentPostedBy, partnerDetail.get(m.commentPostedBy))}
                                <Avatar src={partnerDetail.get(m.commentPostedBy).logoLink} style={{ width: '30px', height: "30px" }} />
                                <div className="chat-box">
                                    {documentLink.map((e, i) => {
                                        let file = e.split("?")[0]
                                        return <div key={i} className="document-container" >
                                            <a target="_" style={{ textDecoration: "none" }} href={e}><div className="doc" >
                                                <div className="doc-type" >{file.substring(file.lastIndexOf('.') + 1)}</div>
                                                <div className="doc-name"  >{file.substring(file.lastIndexOf('/') + 1)}</div>
                                                <div className="download">
                                                    <FileDownloadOutlined />
                                                </div>
                                            </div></a>
                                        </div>
                                    })}

                                    <span className="comment" >{m.comment} </span>
                                    <span style={{ fontSize: '12px', fontStyle: 'normal', justifySelf: 'right', color: '#2C2C2E' }}>{formatChatDate(m.createdAt)}</span>
                                </div>
                            </div>
                        </>

                    ) : (
                        <>
                            {console.log('MessagePosted by me', m.userChatID)}

                            <div className="message-detail-history-flex-container-chat-history-list-item-right" >
                                <div className="chat-box">
                                    {documentLink.map((e, i) => {
                                        let file = e.split("?")[0]
                                        return <div key={i} className="document-container" >
                                            <a target="_" style={{ textDecoration: "none" }} href={e}><div className="doc" >
                                                <div className="doc-type" >{file.substring(file.lastIndexOf('.') + 1)}</div>
                                                <div className="doc-name"  >{file.substring(file.lastIndexOf('/') + 1)}</div>
                                                <div className="download">
                                                    <FileDownloadOutlined />
                                                </div>
                                            </div></a>
                                        </div>
                                    })}
                                    <span className="comment">{m.comment}</span>
                                    <span style={{ fontSize: '12px', fontStyle: 'normal', color: 'white', justifySelf: 'right' }}>{formatChatDate(m.createdAt)}</span>
                                </div>
                                {console.log('Into Message Details partnerDetails22', partnerDetail, m.commentPostedBy)}
                                <Avatar src={partnerDetail.get(m?.commentPostedBy)?.logoLink} style={{ width: '30px', height: "30px" }} />
                            </div>
                        </>
                    )
                }
            </div>
        )
    }


    const _loadMoreRows = ({ startIndex, stopIndex }) => {
        //if (loadMore) {
        console.log("load more rows called");
        let pageIndex1 = pageIndex + 1
        setPageIndex(pageIndex1)
        console.log('Into Load More Rows', clickedMessageItem)
        return getMessageDetails({
            chatType: clickedMessageItem.chatType,
            page: pageIndex1,
            chatGroupID: clickedMessageItem.userChatGroupID,
        })
        //}
    }

    function getMessageHeight(message) {
        // const maxLettersPerRow = 50;
        // const totalRows = Math.ceil(message.comment.length / maxLettersPerRow);
        // const lineHeight = 24; // Adjust the line height as needed based on your styling
        // const paddingTopBottom = 8; // Adjust the padding top and bottom as needed based on your styling

        // // Calculate the height of the message based on the number of rows and other styling considerations
        // const height = totalRows * lineHeight + paddingTopBottom * 2;

        // return height;
        const averageLetterWidth = 8; // Adjust this based on your font and design
        const paddingBetweenRows = 10; // Adjust this based on your desired padding between rows

        // Calculate the number of letters that can fit in a row based on the screen width
        const maxLettersPerRow = Math.floor(screenWidth / averageLetterWidth);

        // Calculate the number of rows needed to display the entire message

        const totalRows = Math.ceil(((message.comment === undefined || message.comment === null) ? 50 : message.comment.length) / maxLettersPerRow);

        // Calculate the height based on the number of rows and padding
        let height = totalRows * 70 + (totalRows - 1) * paddingBetweenRows;
        let documentLink = message?.documentLink || ''
        let pieces = documentLink.length ? documentLink.split(",") : [];
        height = height + pieces.length * 70
        console.log('Message Height', height, pieces.length, totalRows, paddingBetweenRows, message)
        //height = 80
        return height;
    }

    console.log(messages);
    console.log(composeMessage);
    function onFileDrop(e) {
        setFileList(e?.fileList)
        console.log('into OnDropFile', e)

        getAWSUrl(e)
    }

    const getAWSUrl = async (e) => {
        setLoading(true)

        if (e.file.status === "removed") {
            //setupdateData({ ...setupdateData, uploadLink: "" })
            //documentLink.delete(e.file.uid)
            let temp = new Map([...documentLink1])
            temp.delete(e.file.uid)
            console.log('Into Get AWS Urls documentLink1', temp)
            setDocumentLink1(temp)
        } else {
            try {
                console.log('File Status', e.file.status)
                console.log(e.file)
                // file.preventDefault()
                const j = await fileUploadService.gets3ConfigUrl(e.file.name, 'chat')
                console.log('SignedUrl', j)
                console.log('Signed Url ABC j.data ', j.data)
                console.log(j.data.message)
                const response = await axios.put(decodeURIComponent(j.data.message), e.file, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                console.log(response)
                if (response.status === 200) {
                    let str = decodeURIComponent(j.data.message.split("?")[0])
                    //setupdateData = { ...setupdateData, uploadLink: str }
                    //setShareLink(str)
                    documentLink.set(e.file.uid, str)
                    console.log('documentLink1 MessageDetails Into Aws Urls Document linkt add documentLink1:::;', documentLink1)

                    let temp = new Map([...documentLink1, ...documentLink])
                    console.log('documentLink1 MessageDetails Into Aws Urls Document linkt add :::;', temp, documentLink, str, e.file.uid)
                    setDocumentLink1(temp)
                    setLoading(false)
                    return true || Upload.LIST_IGNORE
                }
            } catch (error) {
                console.log(error)
            }
        }
        setLoading(false)
        console.log('MessageDetails Into Aws Urls :::;', documentLink)
    }

    return (
        <>
            {clickedMessageItem === undefined && (<></>)}
            {clickedMessageItem != undefined && (<div style={{ width: '100%' }}>
                {messageDetail === null ? null :
                    <div className="message-detail-container">
                        <div className="message-detail-top-message-subject">
                            {console.log('Check Avatar data ', clickedMessageItem, partnerDetail)}
                            {(clickedMessageItem.chatType === 'USER_GROUP') && (
                                <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Group.jpeg'} />
                            )}
                            {(clickedMessageItem.chatType === 'JOB') && (
                                <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Job.jpeg'} />
                            )}
                            {(clickedMessageItem.chatType === 'JOB_REQUEST') && (
                                <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Request.jpeg'} />
                            )}
                            {(clickedMessageItem.chatType === 'USER_USER') && (
                                <>
                                    {clickedMessageItem?.data?.display?.logoLink === undefined ? (<Avatar size={48} icon={<UserOutlined />} />) :
                                        (
                                            <Avatar size={48} src={clickedMessageItem.data.display.logoLink} style={{ width: '48px', height: "48px" }} />
                                        )
                                    }
                                </>
                            )}


                            {/* <Avatar src={partnerDetail.get(m.commentPostedBy).logoLink} style={{ width: '20px', height: "20px" }} /><div className="chat-box"> */}
                            {/* <Avatar size={48} icon={<UserOutlined />} /> */}
                            <span className="message-detail-top-chat-info-title">{clickedMessageItem?.data?.messageTitle || ""}</span>
                        </div >
                        <div className="message-detail-history-flex-container">
                            <div className="message-detail-history-flex-container-chat-history-list">
                                {console.log('Load More Button for visibility', loadMore)}
                                <Button
                                    key={loadMore}
                                    type="primary"
                                    shape="round"
                                    className="load-more-btn"
                                    style={{
                                        zIndex: '100',
                                        display: loadMore == false ? 'none' : 'flex'
                                    }}
                                    onClick={(e) => {
                                        _loadMoreRows(1, 30)
                                    }
                                    }
                                ><Refresh sx={{ width: 18, height: 18 }} /> Load More</Button>
                                <AutoSizer>
                                    {({ width, height }) => (
                                        <List
                                            ref={chatRef}
                                            rowRenderer={chatRowRender}
                                            rowHeight={({ index }) => getMessageHeight(messages[index])}
                                            rowCount={messages.length || 0}
                                            height={height}
                                            width={width}
                                            overscanRowCount={10}
                                            scrollToIndex={30}
                                            onScroll={handleScroll}
                                        />
                                    )}
                                </AutoSizer>
                                <Button
                                    type="primary" shape="round" className="scroll-to-bottom-btn" style={{ display: `${!scrollToBottom ? "flex" : "none"}` }} onClick={(e) => {
                                        chatRef.current.scrollToRow((chatRef.current?.props?.rowCount || 0) + 1)
                                    }
                                    }><ArrowDownwardOutlined sx={{ width: 18, height: 18 }} /> Latest Messages</Button>
                            </div>
                            <hr style={{ position: "relative" }} />
                            <div className="chat-drag-drop-input">
                                <Dragger className="chat-drop" openFileDialogOnClick={false} style={{ height: 'auto' }}
                                    beforeRemove={(e) => {
                                        e.preventDefault()
                                    }}
                                    fileList={fileList}
                                    listType="picture"
                                    beforeUpload={(e) => e.preventDefault()}
                                    onDragOver={(e) => e.preventDefault()}
                                    position="top"
                                    onChange={(e) => onFileDrop(e)}
                                    disabled={loading}
                                >
                                    <div className="message-detail-history-flex-container-bottom">
                                        <div type="button" style={{ position: "relative", cursor: "pointer", display: "flex" }}>
                                            <ImojiSmily onClick={() => setImojiOpen(!imojiOpen)} />
                                            <div style={{ position: "absolute", bottom: "50px", zIndex: "999", display: `${imojiOpen ? "block" : "none"}` }}>
                                                <EmojiPicker onEmojiClick={(e) => setComposeMessage((prev => prev + e.emoji))} />
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", height: 'max-content' }}>
                                            <Input.TextArea
                                                placeholder="Start typing..."
                                                className="chat-input"
                                                value={composeMessage}
                                                onPressEnter={(e) => {
                                                    console.log(e)
                                                    if (composeMessage) return
                                                    postMessage(composeMessage)
                                                    setComposeMessage("")
                                                }}
                                                onChange={(e) => { setComposeMessage(e.target.value) }}
                                            />
                                        </div>
                                        <Button
                                            type="primary"
                                            shape="circle"
                                            icon={loading ? <CircularProgress style={{ height: "20px", width: "20px" }} thickness={5} /> : <SendOutlined />}
                                            size="middle"
                                            style={{ marginLeft: '10px' }}
                                            onClick={(e) => {
                                                postMessage(composeMessage)
                                                setFileList([])
                                                setComposeMessage("")
                                            }
                                            }
                                            disabled={loading}
                                        ></Button>
                                    </div>
                                </Dragger>
                            </div>
                        </div>
                    </div>
                }
            </div>
            )}
        </>
    )
}

MessageDetail.defaultProps = {
    getMessageDetails: {},
    messageDetail: undefined,
    messageDetailLoading: true
}

MessageDetail.propTypes = {
    clickedMessageItem: PropTypes.shape({}),
    messageDetail: PropTypes.shape({}),
    getMessageDetails: PropTypes.func.isRequired,
    messageDetailLoading: PropTypes.bool
}

export default compose(
    connect(
        (state) => ({
            isLoading: false,
            messageDetail: state.messageDetail.payload,
            messageDetailLoading: state.messageDetail.isFetching
        }),
        (dispatch) =>
            bindActionCreators({
                getMessageDetails: messageDetailDuck.creators.fetch
            },
                dispatch
            )
    )
)(MessageDetail)