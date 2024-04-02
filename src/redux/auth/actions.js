import constants from './constants';

export const saveAuthenticationAccessToken = payload => {
    return {
        type: constants.AUTHENTICATION_ACCESS_TOKEN,
        payload,
    };
};

export const saveAuthenticationRefreshToken = payload => {
    return {
        type: constants.AUTHENTICATION_REFRESH_TOKEN,
        payload,
    };
};

export const savePartnerId = payload => {
    return {
        type: constants.PARTNER_ID,
        payload,
    };
};

export const saveAuthenticationUserLogout = payload => {
    return {
        type: constants.AUTHENTICATION_USER_LOGOUT,
        payload,
    };
};

