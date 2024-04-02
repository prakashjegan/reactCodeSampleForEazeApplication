import React from "react"
import PropTypes from 'prop-types'
import './style.scss'
import Avatar from "antd/es/avatar/avatar"
import { Badge } from "antd"
import { toHumanReadableDate } from "../../../utils/common/commonutils"
import { myPartnerId } from "../../../config/variables"


const MessageItem = ({
    messageItem,
    messageIdentityInfo,
    selected,
}) => {
    const {
        userChatGroupID,
        person2Name,
        updatedAt,
        lastComment,
        chatType,
        noOfUnReadMessagesPerson1,
        unReadMessages,
    } = messageItem || {}

    console.log('Into Message Item messageItemDetails', messageItem)
    // switch (messageItem.chatType) {
    //     case "USER_USER":
    //         if (myPartnerId() === messageItem?.person1?.partnerID) {
    //             messageItem.messageTitle = messageItem?.person1?.userName
    //             messageItem.logoLink = messageItem?.person1?.logoLink
    //         } else {
    //             messageItem.messageTitle = messageItem?.person2?.userName
    //             messageItem.logoLink = messageItem?.person2?.logoLink
    //         }
    //         break
    //     case "JOB":
    //         messageItem.messageTitle = messageItem?.job?.jobName || messageItem?.jobName
    //         messageItem.logoLink = undefined
    //         break

    //     case "JOB_REQUEST":
    //         messageItem.messageTitle = messageItem?.jobRequest?.jobName || messageItem?.jobName
    //         messageItem.logoLink = undefined
    //         break
    // }
    console.log('IntoMessageItem messageItemDetails', messageItem)
    return (
        <div className="message-item-container" style={{ backgroundColor: (selected === true) ? '#f0f2f5' : 'white' }}>
            {console.log('Selected : ', selected)}
            <div>
                <div>
                    {(messageItem.chatType === 'USER_GROUP') && (
                         <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Group.jpeg'} />
                    )}
                    {(messageItem.chatType === 'JOB') && (
                         <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Job.jpeg'} />
                    )}
                    {(messageItem.chatType === 'JOB_REQUEST') && (
                         <Avatar size={50} src={'https://public-document-influozy.s3.ap-south-1.amazonaws.com/images/Request.jpeg'} />
                    )}
                    {(messageItem.chatType === 'USER_USER') && (
                        <>
                    {messageItem?.logoLink ?
                        <Avatar size={50} src={messageItem.logoLink} /> : <Avatar size={50} />
                    }
                    </>
                    )}
                </div>
                <div className="message-item-info-flex-container">
                    <div className="message-item-display-flex">
                        <span style={{ width: '100%', float: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }}>{messageItem.messageTitle}</span>
                        <span style={{ width: 'auto', float: 'right' }}>{toHumanReadableDate(updatedAt, "DD-MMM-YY HH:MM")} </span>
                    </div>
                    <div className="message-item-display-flex">
                        <span style={{ width: '100%', textDecorationStyle: 'dotted' }} >{lastComment}</span>
                        {unReadMessages != undefined && unReadMessages > 0 && (<Badge count={noOfUnReadMessagesPerson1} showZero color="#007AFF" />)}
                    </div>
                </div>
            </div>
        </div>
    )
}


MessageItem.propTypes = {
    messageItem: PropTypes.shape({}).isRequired,
    messageIdentityInfo: PropTypes.shape({}).isRequired,
    selected: PropTypes.shape({}).isRequired,
}


export default MessageItem