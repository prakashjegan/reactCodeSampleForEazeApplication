import ReduxInitialState from "../../config/initialState";
import constants from "./constants";

const initialState = ReduxInitialState.authentication

const lovReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOVS_LANGUAGE:
            return {
                ...state,
                languages: action.payload
            }
        default:
            return state;
    }
};

export default lovReducer;
