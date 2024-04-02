import React from "react";
import CopyRightIcon from '../../assets/images/footer/copyright.png';
import './style.scss';

const Footer = () => {

    return (
        <div className="footer-container">
            <div className="left-flex">
                <div className="brand-name">INFLOZY . </div>
                <div className="copyright">
                    Copyright
                    <img src={CopyRightIcon} className="copyright-icon" alt="copyright" />
                    . All rights Reserved
                </div>
            </div>

            <div className="right-flex">
                <div className="link-item">General conditions of use  .</div>
                <div className="link-item">Protection of personal data</div>
            </div>
        </div>
    )
}

export default Footer