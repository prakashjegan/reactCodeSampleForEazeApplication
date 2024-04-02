import urls from "../config/urls";
import request from "../xhr";
import responseParser from '../utils/parser';

const loginUser = (payload) =>
    request({
        method: 'post',
        url: `${urls().login}`,
        data: payload,
        transformResponse: [responseParser],
    })

const fetchTokenForUser = (code) =>
{
    console.log(code)
return request({
    method: 'get',
    url: `${urls({code}).authtoken}`,
    transformResponse: [responseParser],
  })
};

const fetchTokenForUserWithFireBase = (code , event) =>
{
    console.log(code, event)
return request({
    method: 'get',
    url: `${urls({event, code}).authVerification}`,
    transformResponse: [responseParser],
  })
};

const authService = {
    loginUser,
    fetchTokenForUser,
    fetchTokenForUserWithFireBase
}

export default authService