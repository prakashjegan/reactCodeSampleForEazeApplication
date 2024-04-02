import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import "./style.scss"
import { Card, Grid } from "@mui/material"
import JobPostArea from "./JobPostArea/JobPostArea"
import StatisticsArea from "./StatisticsArea/StatisticsArea"
import UserInfoArea from "./UserInfoArea/UserInfoArea"
import { useNavigate } from "react-router-dom"
import { messaging } from "../../services/firebase"

const Home = () => {
   const navigate = useNavigate();
   const [deviceInfo, setDeviceInfo] = useState({
      userAgent: '',
      platform: '',
      language: '',
      screenWidth: '',
      screenHeight: '',
      colorDepth: '',
      deviceMemory: '',
      hardwareConcurrency: '',
      battery: '',
      onlineStatus: '',
      cookieEnabled: '',
   });

   useEffect(() => {
      console.log('Into Home screen')
      fetchUserDeviceInfo()

   }, [])

   const fetchUserDeviceInfo = () => {
      const { userAgent, platform, language } = window.navigator;
      const { width, height } = window.screen;
      const { colorDepth } = window.screen;
      const { deviceMemory } = navigator;
      const { hardwareConcurrency } = navigator;
      const battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
      const onlineStatus = navigator.onLine ? 'Online' : 'Offline';
      const cookieEnabled = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
      let dev = {
         userAgent,
         platform,
         language,
         screenWidth: width,
         screenHeight: height,
         colorDepth,
         deviceMemory,
         hardwareConcurrency,
         battery: battery ? battery.level * 100 + '%' : 'N/A',
         onlineStatus,
         cookieEnabled,
      }
      setDeviceInfo({
         userAgent,
         platform,
         language,
         screenWidth: width,
         screenHeight: height,
         colorDepth,
         deviceMemory,
         hardwareConcurrency,
         battery: battery ? battery.level * 100 + '%' : 'N/A',
         onlineStatus,
         cookieEnabled,
      });
      console.log('Into device Info Dv', dev)
   //    try {
   //    messaging.requestPermission().then(() => {
   //       console.log('Notification permission granted.');
   //       // Token should be retrieved here
   //       let detoken = messaging.getToken();
   //       console.log('Notification permission granted. detoken', detoken);
   //       return detoken;
   //    }).then(token => {
   //       console.log('FCM Token:', token);
   //       // Send this token to your server for sending push notifications
   //    }).catch(error => {
   //       console.log('Unable to get permission or token:', error);
   //    });
   // }catch(error) {
   //    console.log('Unable to get permission or token:', error);
   // }
   }
   return (
      <div className="home-container" style={{ minWidth: "1400px", overflow: "auto" }}>
         {/* <SearchHeader /> */}
         {/* Home */}
         <Grid container spacing={1}>
            <Grid item xs={3}>
               <UserInfoArea />
            </Grid>
            <Grid item xs={5}>
               <JobPostArea />
            </Grid>
            <Grid item xs={4} padding={10}>
               <StatisticsArea />
            </Grid>
         </Grid>
      </div>
   )
}

export default Layout(Home)
