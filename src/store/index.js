import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import messageDuck from '../components/message/duck'
import messageDetailDuck from '../components/message/message-detail/duck'
import authenticationReducer from '../redux/auth/reducer'
import lovReducer from '../redux/lovs/reducer'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import env from '../config/env';


const config = {
    key: 'root',
    storage: storage
}

const app = combineReducers({
    [messageDuck.store]: messageDuck.reducer,
    [messageDetailDuck.store]: messageDetailDuck.reducer,
    authentication: persistReducer(config, authenticationReducer),
    lovs: persistReducer(config, lovReducer)
})

const initialiseStore = (initialState = {}) => {
    const middlewares = [thunkMiddleware]
    const store = configureStore({
        reducer: app,
        preloadedState: {
        },
        //devTools: process.env.REACT_APP_NODE_ENV !== 'production',
        devTools:true,
        ...initialState,
        middleware: middlewares
    })
    const persistedStore = persistStore(store)
    return {store, persistedStore}
}
export default initialiseStore