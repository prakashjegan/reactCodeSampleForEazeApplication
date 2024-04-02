// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getMessaging , getToken, onMessage } from "firebase/messaging"; // Import messaging module
import {getAuth , GoogleAuthProvider , FacebookAuthProvider} from "firebase/auth"
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD8NNrQnLzsSqjI08j1GhW27E0h6oddIo0",
  authDomain: "influkart.firebaseapp.com",
  projectId: "influkart",
  storageBucket: "influkart.appspot.com",
  messagingSenderId: "111610323222",
  appId: "1:111610323222:web:dbc2eb7d6feb2e5834f037",
  measurementId: "G-K5HRJK4GZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fireAuth = getAuth(app);
//const messaging = getMessaging(app); // Initialize messaging
//console.log('Firebase Messaging :::', messaging)
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const getToken1 = (setTokenFound , setFirebaseToken) => {
  console.log('into GetToken1')
  // return getToken(messaging, {vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
  //   if (currentToken) {
  //     console.log('current token for client: ', currentToken);
  //     setTokenFound(true);
  //     // Track the token -> client mapping, by sending to backend server
  //     // show on the UI that permission is secured
  //     setFirebaseToken(currentToken)
  //     localStorage.setItem('firebaseToken', currentToken);

  //   } else {
  //     console.log('No registration token available. Request permission to generate one.');
  //     setTokenFound(false);
  //     // shows on the UI that permission is required 
  //   }
  // }).catch((err) => {
  //   console.log('An error occurred while retrieving token. ', err);
  //   // catch error while creating client token
  // });
  return 
}

const onMessageListener = () =>
new Promise((resolve) => {
  // onMessage(messaging, (payload) => {
  //   resolve(payload);
  // });
});

//export {fireAuth , googleAuthProvider, facebookAuthProvider, messaging, getMessaging , getToken1, onMessage , onMessageListener}
googleAuthProvider.addScope("email")
facebookAuthProvider.addScope("email")

export {fireAuth , googleAuthProvider, facebookAuthProvider}