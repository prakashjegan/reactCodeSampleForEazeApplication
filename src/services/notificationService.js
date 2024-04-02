import urls from "../config/urls";
import responseParser from "../utils/parser";
import request from "../xhr";


const fetchAllNotificationDetails = (payload) =>
request({
   method: 'post',
   url: `${urls().getAllNotifications}?${new URLSearchParams(payload)}`,
   secure: true,
   transformResponse: [responseParser],
   data: payload
})

const fetchPriorityNotificationDetails = (payload) =>
request({
   method: 'post',
   url: `${urls().getAllNotifications}?${new URLSearchParams(payload)}`,
   secure: true,
   transformResponse: [responseParser],
   data: payload
})

const notificationService = {
    fetchAllNotificationDetails
}

export default notificationService;