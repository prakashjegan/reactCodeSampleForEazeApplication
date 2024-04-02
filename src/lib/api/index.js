import axios from "axios";
import env from '../../config/env';
import { isStringValueTruthy } from "../../utils/common/commonutils";
import StateStorage from "../state-storage";
import { ERROR_CODES, HTTP_METHODS, STATUS_CODE } from "../../constants/const";
import responseParser from '../../utils/parser'
import { jwtToken } from "../../config/variables"

//import jsonBig from 'json-bigint'

export function getHeaders({
    awz,
    lang,
    multipart,
    pdf,
    token,
    upload,
    withAuthorization,
    xHeaders,
    withCacheControl = false
}) {
    //const parsedToken  = token || StateStorage.getAuthToken() || jwtToken()
    const parsedToken  = jwtToken()
    console.log('Passed Token , ' , token , StateStorage.getAuthToken() ,  jwtToken() )
    const contentType = generateContentTypes({multipart, pdf, awz})
    const authHeader = {
        ...generateAuthHeaders({parsedToken})
    }
    
    //need to set cache control policy
    return {
        Accept: 'appliication/json',
        'Accept-Language': 'en',
        ...(!upload && { 'Content-Type': `application/${contentType}`}),
        ...(withAuthorization && authHeader),
        //'x-platform': 'web-desktop',
        ...(Boolean(xHeaders) && {...xHeaders}),
    }
}

export function generateAuthHeaders({parsedToken}) {
    if(isStringValueTruthy(parsedToken)) {
        return {
            Authorization: `Bearer ${parsedToken}`
        }
    }
}

export function generateContentTypes({
    multipart = null,
    pdf = null,
    awz = null
}) {
    if(multipart) return 'x-www-form-urlencoded; charset=utf-8'
    if(pdf) return 'pdf'
    if(awz) return 'x-amz-json-1.1'
    return 'json'
}



export async function request({
    awz,
    lang,
    multipart,
    forceRenewToken,
    pdf,
    token = null,
    body= null,
    baseURL = env.API_HOST,
    stringify = false,
    params = undefined,
    upload,
    withAuthorization = true,
    xHeaders,
    responseType = 'json',
    method = HTTP_METHODS.get,
    timeout = env.API_REQUEST_TIMEOUT,
    signal,
    url = '',
    header,
    withCacheControl = false
}) {
    //TODO: force refresh promise here
    const headers =  header || getHeaders({
        awz,
        lang,
        multipart,
        forceRenewToken,
        pdf,
        token,
        upload,
        withAuthorization,
        xHeaders,
        withCacheControl
    })
    return axios({
        baseURL,
        method,
        url,
        responseType,
        headers,
        signal,
        timeout,
        transformResponse:{responseParser},
        ...(Boolean(body) &&  { data: stringify ? JSON.stringify(body) : body}),
        ...(Boolean(params) && {params})
    })
    .then((res) => {
        const {data, headers: resHeader} = res
        if(data.statusCode && data.statusCode !== 200){
            throw Error(data.message)
        }
        return data
    })
    .catch(async(err) => {
        if(err.response || err.code === ERROR_CODES.timeout) throw err
        if(err.response?.status == STATUS_CODE.unauthorised) {
            if(!forceRenewToken) {
                return request({
                    ...err.config,
                    ...(method == HTTP_METHODS.post && {body}),
                    forceRenewToken: true
                })
            }
            stateStorage.setCookie('isTokenExpired', true)

            throw Error('Unauthorized access')
        }

        throw err.response.data
    })
}