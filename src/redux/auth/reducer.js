import ReduxInitialState from "../../config/initialState";
import constants from "./constants";

const initialState = ReduxInitialState.authentication

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.AUTHENTICATION_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        case constants.AUTHENTICATION_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload
            }
        case constants.PARTNER_ID:
            return {
                ...state,
                partnerId: action.payload
            }
        default:
            return state;
    }
};

export default authenticationReducer;
