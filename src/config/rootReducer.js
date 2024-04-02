import { combineReducers } from 'redux';
import authenticationReducer from '../redux/auth/reducer';
import ReduxInitialState from './initialState';
import lovReducer from '../redux/lovs/reducer';

const appReducer = combineReducers({
    authentication: authenticationReducer,
    lovs: lovReducer
});


const rootReducer = (state, action) => {
    if (action.type === 'AUTHENTICATION_USER_LOGOUT') {
        localStorage.clear()
        return appReducer(ReduxInitialState, action)
    }

    return appReducer(state, action)
}

export default rootReducer