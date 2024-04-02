import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SaveStorage from '../lib/state-storage'

const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authenticated') || false;
    const useSignUpstatus = localStorage.getItem('userSignUpStatus')
    //const isAuthenticated = SaveStorage.getAuthToken() || false
    const location = useLocation(); // Get the current URL location
    let url = location.pathname
    if (url.includes('mobile-warning')) {
        return children
    }
    const isMobile = window.screen.availWidth <= 768; // Adjust the width threshold as needed
      if (isMobile) {
        if (isAuthenticated) {
         console.log('Into handleMobileRedirect Into Public Route :::: ' , isMobile , window.innerWidth, window.screen.availWidth , children)
         return <Navigate to="/mobile-warning1" replace />
        } else {
            console.log('Into handleMobileRedirect Into Public Route :::: ' , isMobile , window.innerWidth, window.screen.availWidth , children)
         return <Navigate to="/mobile-warning" replace />
        }
    }
    if (isAuthenticated) {
        if (useSignUpstatus.includes('BASIC')) {
            return <Navigate to="/onboarding?to=basicDetails" replace />
        }
        return <Navigate to="/home" replace />
    }
    else return children
};

export default PublicRoute;
