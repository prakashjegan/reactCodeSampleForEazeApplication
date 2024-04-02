import React from 'react';
import { Navigate } from 'react-router-dom';
import StateStorage from '../lib/state-storage'

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authenticated') || false;

    //const isAuthenticated = StateStorage.getAuthToken() || false
    if (!isAuthenticated) return <Navigate to="/" replace />
    else return children
};

export default PrivateRoute;
