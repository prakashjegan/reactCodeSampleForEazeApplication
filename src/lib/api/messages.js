import urls from '../../config/urls';
import { HTTP_METHODS } from '../../constants/const';
import { request } from './index'
//import jsonBig from 'json-bigint'


class Messages {

    static get({ page, chat_type , searchJobChat, searchString }) {
        console.log('Into Message Page :::' , page , chat_type)
        return request({
            url: 'message/chatgroup/listing',
            method: HTTP_METHODS.post,
            //baseURL: 'https://api.influkart.in/',
            baseURL:urls().base_url,
            secure: true,
            body: {
                page: page,
                pageSize: 10,
                chatType: chat_type,
                searchJobChat:searchJobChat,
                searchString:searchString

            }
        }) 
    }

    static getMessageDetail({page = 0, chatType, chatGroupID}) {
        console.log('Into Message Details :::' , page , chatType,chatGroupID )

        return request({
            url: 'message/chat/listing',
            method: HTTP_METHODS.post,
            baseURL: urls().base_url,
            secure: true,
            body: {
                chatType: chatType,
                groupId: chatGroupID,
                page: page,
                pageSize: 30
            }
        })
    }
    
    static postMessage(payload) {
        console.log('Into Message PostMessage :::' , payload )

        return request({
            url: 'message/send',
            method: HTTP_METHODS.post,
            secure: true,
            baseURL: urls().base_url,
            body: payload
        })
    }
}

export default Messages