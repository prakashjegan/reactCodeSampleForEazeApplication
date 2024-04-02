import urls from "../config/urls";
import request from "../xhr";
import responseParser from '../utils/parser';

const sendDeviceInformation = (payload) =>
request({
   method: 'post',
   url: `${urls().getDeviceInfo}`,
   secure: true,
   transformResponse: [responseParser],
   data: payload
})


const loginService = {
    sendDeviceInformation
}


export default loginService