import React, { useEffect } from 'react';
import './style.scss';
import Navbar from "../navbar";
import Footer from '../footer';
import { useNavigate } from 'react-router-dom';

const Layout = (Component) => {

    return (props) => (
        <div className='authenticated-layout'>
            <Navbar />
            <div className='layout-style'>
                <Component {...props} />
            </div>
            <Footer />
        </div>
    );
}

export default Layout