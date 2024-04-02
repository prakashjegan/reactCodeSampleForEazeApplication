import React, { useEffect } from 'react';
import './style.scss'; // You can define your own styles here
import LogoImage from '../../assets/images/auth/InflozyBrandSvg_1.svg';
import { Footer } from 'antd/es/layout/layout';
const playstoreImage = 'path-to-your-playstore-image';
const appstoreImage = 'path-to-your-appstore-image';

const MobileWarningPage = () => {
  useEffect(() => {
    console.log('Into Mobile Warning screen screen')

  }, [])

  const openPlayStore = () => {
    // Replace 'yourPlayStoreLink' with the actual Play Store link for your app
    window.location.href = 'https://play.google.com/store/apps/details?id=com.inflozy.inflozy';
  };

  const openAppStore = () => {
    // Replace 'yourAppStoreLink' with the actual App Store link for your app
    window.location.href = 'https://apps.apple.com/us/app/inflozy/id6475646094';
  };
  return (
    <div className='authenticated-layout'>
      <div className="mobile-warning-page">
        <div className="logo">
          {/* Insert your logo image or component here */}
          <img src={LogoImage} className="logo-img" alt="logo" />
        </div>
        <div className="content">
          <h1>Mobile Version Warning</h1>
          <p>
            This website is currently optimized for desktop use. For the best experience, please download the app.
          </p>
          <p>
            <a href='https://play.google.com/store/apps/details?id=com.inflozy.inflozy&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' 
             style={{ display: "inline-block", overflow: "hidden", borderRadius: "13px", width: "280px", height: "123px", }}
            >
              <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' 
              style={{ borderRadius: '13px', width: '280px', height: '123px', }} 
              /></a>
            <a href="https://apps.apple.com/us/app/inflozy/id6475646094?itsct=apps_box_badge&amp;itscg=30200"
              style={{ display: "inline-block", overflow: "hidden", borderRadius: "13px", width: "250px", height: "83px", }}>
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1704844800" alt="Download on the App Store" style={{ borderRadius: '13px', width: '250px', height: '83px', }} />
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default MobileWarningPage;