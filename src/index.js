import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import initialiseStore from './store';
//import store, { persistor } from './config/store'; //Karthik code
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'; // Rahul code
import env from './config/env';
const {store, persistedStore} = initialiseStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
//console.log('Environments :: ', env , process.env)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      {/* <PersistGate loading={null} persistor={persistedStore} >
      <PersistGate loading={null} persistor={persistor}> 

      {/* <PersistGate loading={null} persistor={persistedStore} > */}
      {/* <BrowserRouter>
        <App /> 
      </BrowserRouter>  */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
