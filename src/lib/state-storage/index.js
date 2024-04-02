import UniversalCookie from 'universal-cookie'
import Cookies from 'js-cookie'
import { json } from 'react-router-dom'

let UniversalCookiesInstance = new UniversalCookie()

function removeLocalState(key) {
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
        return true
    }
    return false
}

function saveLocalState(key, data, lifespan) {
    let comuptedLifeSpan = lifespan
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
        if(lifespan === undefined || lifespan === null){
            comuptedLifeSpan = 300 //expire in 5 mins
        } else if (lifespan !== false) {
            comuptedLifeSpan = Math.abs(lifespan)
        }
    }

    const res = {
        payload: data,
        ...(lifespan !== false && {
            expires: Date.now() + comuptedLifeSpan * 100
        }),
    }

    localStorage.setItem(key, JSON.stringify(res))
}

function getLocalState(key) {
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        try {
            const serializedState = localStorage.getItem(key)

            const data = typeof serializedState === 'string'
            ? JSON.parse(serializedState) 
            : serializedState

            if(data?.expires || data?.expires === 0) {
                const now = Date.now()
                const lifespan = data.expires

                if(lifespan < now) {
                    removeLocalState(key)
                    return null
                }
            }
            return data?.payload
        } catch(e){

        }
    }
}

function loadAuthState() {
    try {
        const serializedState = getCookie('auth')

        if(!serializedState) return undefined

        const unserializedState = typeof serializedState === 'string'
            ? JSON.parse(serializedState)
            : serializedState
        return {
            auth: {
                token: unserializedState.token,
                user: unserializedState.user
            }
        }    
    } catch(e) {
        return undefined
    }
}

function initCookie(req, shop, lang) {
    if(typeof document !== 'undefined') {
        return
    }
    UniversalCookiesInstance = new UniversalCookie(req)
}



function setCookie(key, value, lifespanDays) {
    if(typeof document !== 'undefined') {
        if(lifespanDays) {
            Cookies.set(key, value, {expires: lifespanDays})
        } else {
            Cookies.set(key,value)
        }
        return true
    }
    return UniversalCookiesInstance.set(key, value) || false
}

function getCookie(key) {
    if(typeof document  === 'undefined') {
        return UniversalCookiesInstance.get(key)
    }
    return Cookies.get(key) || UniversalCookiesInstance.get(key) || null
}

function getAuthCookies() {
    try {
        const serializedState = getCookie('auth')
        if(!serializedState) return undefined

        return typeof serializedState === 'string'
            ? JSON.parse(serializedState)
            : serializedState
    } catch (error) {
        return undefined
    }
}

function removeCookie(key) {
    if(typeof document === 'undefined') {
        return UniversalCookiesInstance.remove(key)
    }

    return Cookies.remove(key)
}


function saveAuthState(authState) {
    try {
        const {accessJWT ,user, refreshJWT} = authState || {}
        const serializedState = JSON.stringify({
            accessJWT,
            user
        })
        console.log(serializedState);
        setCookie('auth', serializedState, 7)
        setCookie('refreshToken', refreshJWT)
    } catch (e) {
        console.log("error saveAuthState");
        console.log(e);
    }
}

function setAuthToken(token) {
    const auth = getAuthCookies() || {}
    saveAuthState({
        ...auth,
        token
    })
}

function isAuthCookiesAvailable() {
    const serializedState = getCookie('auth')
    if(!serializedState) return true

    const unserializedState = 
        typeof serializedState === 'string'
        ? JSON.parse(serializedState)
        : serializedState
    return !unserializedState?.tokn && !unserializedState?.user    
}


function getAuthToken(){
    try{
        const auth = getAuthCookies()
        const token = auth?.accessJWT
        if(typeof window === 'undefined'){
            const refreshToken = getCookie('refreshToken')
            return refreshToken ? token : ''
        }
        return token
    } catch(e) {
        return undefined
    }
    
}

function getServerRefreshToken(){
    const refreshToken = getCookie('refreshToken')
    return refreshToken
}


export default {
    getAuthCookies,
    getAuthToken,
    getCookie,
    removeCookie,
    setCookie,
    removeLocalState,
    saveLocalState,
    saveAuthState,
    getLocalState,
    getServerRefreshToken,
    setAuthToken,
    isAuthCookiesAvailable,
    initCookie,
    loadAuthState,
}

