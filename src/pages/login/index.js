import React, { useEffect, useState } from "react";
import LoginImage from "../../assets/images/auth/login.png";
import LogoImage from "../../assets/images/auth/InflozyBrandSvg_1.svg";
import GoogleImage from "../../assets/images/auth/google.png";
import FacebookImage from "../../assets/images/auth/facebook.png";
import urls from "../../config/urls";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { message } from "antd";
import {
  saveAuthenticationAccessToken,
  saveAuthenticationRefreshToken,
  savePartnerId,
} from "../../redux/auth/actions";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { Dataimport } from "../../constants/dataimports/dataimports";
import { myPartnerId } from "../../config/variables";
import SaveStorage from "../../lib/state-storage";
import { fontWeight } from "@mui/system";
import {
  fireAuth,
  googleAuthProvider,
  facebookAuthProvider,
  messaging,
  getMessaging,
  getToken,
  onMessage,
} from "../../services/firebase";
import { signInWithPopup } from "firebase/auth";
import loginService from "../../services/loginService";
import { log } from "@antv/g2plot/lib/utils";

const Login = (props) => {
  const { saveAccessToken, saveRefreshToken, savePartnerId } = props;
  const [optionLoading, setOptionLoading] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState();

  const navigate = useNavigate();
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: "",
    platform: "",
    language: "",
    screenWidth: "",
    screenHeight: "",
    colorDepth: "",
    deviceMemory: "",
    hardwareConcurrency: "",
    battery: "",
    onlineStatus: "",
    cookieEnabled: "",
  });

  useEffect(() => {
    handleEvent();
    fetchUserDeviceInfo();
  }, []);

  const fetchUserDeviceInfo = () => {
    //  const { userAgent, platform, language } = window.navigator;
    //  const { width, height } = window.screen;
    //  const { colorDepth } = window.screen;
    //  const { deviceMemory } = navigator;
    //  const { hardwareConcurrency } = navigator;
    //  const battery =
    //    navigator.battery || navigator.mozBattery || navigator.webkitBattery;
    //  const onlineStatus = navigator.onLine ? "Online" : "Offline";
    //  const cookieEnabled = navigator.cookieEnabled ? "Enabled" : "Disabled";
    //  let dev = {
    //    userAgent,
    //    platform,
    //    language,
    //    screenWidth: width,
    //    screenHeight: height,
    //    colorDepth,
    //    deviceMemory,
    //    hardwareConcurrency,
    //    battery: battery ? battery.level * 100 + "%" : "N/A",
    //    onlineStatus,
    //    cookieEnabled,
    //  };
    //  setDeviceInfo({
    //    userAgent,
    //    platform,
    //    language,
    //    screenWidth: width,
    //    screenHeight: height,
    //    colorDepth,
    //    deviceMemory,
    //    hardwareConcurrency,
    //    battery: battery ? battery.level * 100 + "%" : "N/A",
    //    onlineStatus,
    //    cookieEnabled,
    //  });
    //  console.log("Into device Info Dv", dev);

    const getOSDetails = () => {
      var Name = "Not known";
      if (navigator.userAgent.indexOf("Win") != -1) Name = "Windows OS";
      if (navigator.userAgent.indexOf("Mac") != -1) Name = "MacOS";
      if (navigator.userAgent.indexOf("X11") != -1) Name = "UNIX OS";
      if (navigator.userAgent.indexOf("Linux") != -1) Name = "Linux OS";

      return Name;
    };

    const deviceOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        return "Portrait";
      } else {
        return "Landscape";
      }
    };

    const getDeviceType = () => {
      var a;
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        a = "Mobile";
      } else {
        a = "Desktop/Laptop";
      }

      return a;
    };

    const getBatteryLevel = () => {
      try {
        navigator.getBattery().then((battery) => {
          let m = "";
          let c = "";
          m = battery.level * 100;
          setBatteryLevel(m);
          console.log(batteryLevel);
        });
      }catch(e) {
        setBatteryLevel(100);
      }
     
    };

    getBatteryLevel();

    let data = {
      screenWidth: screen.width,
      screenHeight: screen.height,
      appVersion: navigator.userAgent,
      devicePlatform: getOSDetails(),
      ramInfo: (navigator.deviceMemory === undefined ) ? "" : navigator.deviceMemory.toString(),
      deviceOrientation: deviceOrientation(),
      // ipAddress: getIPAddress(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language || navigator.userLanguage,
      deviceType: getDeviceType(),
      os: getOSDetails(),
      connectionType: (navigator.connection === undefined ) ? "" :  navigator.connection.effectiveType,
      batteryLevel: batteryLevel,
    };

    console.log(data);
    try {
    sendDeviceInformation(data);
    }catch(error) {
      console.log('Into Send Device Information error :::' , error)
    }
  };

  const sendDeviceInformation = (payload) => {
    console.log("send device api");
    setOptionLoading(true);
    loginService
      .sendDeviceInformation(payload)
      .then((res) => {
        setOptionLoading(false);
        console.log(res.data);
      })
      .catch(() => {
        console.log("send device failed");
        setOptionLoading(false);
      });
  };

  const handleEvent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    code &&
      authService
        .fetchTokenForUser(code)
        .then((res) => {
          populateAuthToken(
            res,
            saveAccessToken,
            saveRefreshToken,
            savePartnerId,
            navigate
          );
        })
        .catch((err) =>
          message.error(err?.data?.message || "Something went wrong")
        );

    // Store the tokens in cookies
    // Cookies.set('accessToken', accessToken);
    // Cookies.set('refreshToken', refreshToken);
    // localStorage.setItem('authenticated', 'true');
    // localStorage.setItem('userSignUpStatus', res?.data?.userSignUpStatus);
    // localStorage.setItem('emailId', res?.data?.email);
    //navigate('/home');

    console.log("Tokens stored in cookies.");
  };

  const populateAuthToken = (
    res,
    saveAccessToken,
    saveRefreshToken,
    savePartnerId,
    navigate
  ) => {
    console.log(res);
    const responseData = res?.data?.message;
    console.log(
      "Config Data populated Tokens stored in cookies.",
      responseData
    );
    saveAccessToken(responseData?.accessJWT);
    saveRefreshToken(responseData?.refreshJWT);
    savePartnerId(responseData?.user?.partnerId);
    SaveStorage.saveAuthState(responseData);
    SaveStorage.saveLocalState("authenticated", "true");
    SaveStorage.saveLocalState(
      "userSignUpStatus",
      responseData?.userSignUpStatus
    );
    SaveStorage.saveLocalState("emailId", responseData?.email);
    if (responseData?.partnerTag === undefined) {
      responseData.partnerTag = { ...responseData?.user };
    }
    SaveStorage.saveLocalState(
      "userDetails",
      JSON.stringify(responseData?.partnerTag)
    );
    SaveStorage.saveLocalState("user", JSON.stringify(responseData?.user));
    SaveStorage.saveLocalState(
      "userId",
      JSON.stringify(responseData?.user?.userID)
    );
    SaveStorage.saveLocalState(
      "partnerId",
      JSON.stringify(responseData?.user?.partnerId)
    );
    //SaveStorage.saveLocalState('partnerId',responseData?.user?.partnerId);
    SaveStorage.saveLocalState(
      "userReview",
      JSON.stringify(responseData?.reviewTag)
    );
    console.log("Tokens stored in cookies.", responseData);
    //saveAccessToken(res?.data?.accessJWT);
    try {
      Cookies.set("accessToken", responseData?.accessJWT, { expires: 7 }); // Expires in 7 days
      console.log("Tokens stored in cookies Access Token.", responseData);

      Cookies.set("refreshtoken", responseData?.refreshJWT, { expires: 7 }); // Expires in 7 days
      Cookies.set("partnerId", responseData?.user?.partnerId, { expires: 7 }); // Expires in 7 days
      console.log("Tokens stored in cookies.222");
    } catch (error) {
      // Handling the error and logging a custom error message
      console.error("Error occurred:", error);
    }

    localStorage.setItem("authenticated", "true");
    localStorage.setItem("userSignUpStatus", responseData?.userSignUpStatus);
    localStorage.setItem("emailId", responseData?.email);
    localStorage.setItem(
      "userDetails",
      JSON.stringify(responseData?.partnerTag)
    );
    localStorage.setItem("user", JSON.stringify(responseData?.user));
    //localStorage.setItem('userId', JSON.stringify(responseData?.user?.userID));
    localStorage.setItem("userId", responseData?.user?.userID);
    //localStorage.setItem('partnerId', JSON.stringify(responseData?.user?.partnerId));
    localStorage.setItem("partnerId", responseData?.user?.partnerId);
    localStorage.setItem("userReview", JSON.stringify(responseData?.reviewTag));
    console.log("Tokens stored in cookies.1111");
    Dataimport.fetchDataAndImport();
    let signupStatus = responseData?.userSignUpStatus;

    //if (signupStatus.includes('BASIC')) {
    console.log("Tokens stored in cookies. userSignupData", signupStatus);
    // Request notification permission from the user
    try {
      // getToken(messaging, )
      // messaging.requestPermission().then(() => {
      //    console.log('Notification permission granted.');
      //    // Token should be retrieved here
      //    let detoken = messaging.getToken();
      //    console.log('Notification permission granted. detoken', detoken);
      //    return detoken;
      // }).then(token => {
      //    console.log('FCM Token:', token);
      //    // Send this token to your server for sending push notifications
      // }).catch(error => {
      //    console.log('Unable to get permission or token:', error);
      // });
    } catch (error) {
      console.log("Unable to get permission or token:", error);
    }
    if (signupStatus.includes("BASIC")) {
      console.log(
        "Tokens stored in cookies. userSignupData into home",
        signupStatus
      );

      navigate("/home");
    } else {
      console.log(
        "Tokens stored in cookies. userSignupDataInto onboarding",
        signupStatus
      );
      navigate(`/onboarding?to=basicDetails`);
      //navigate('/home');
    }
  };

  const handleProvider = async (provider) => {
    window.open(urls().base_url + "loginAuth/auth/" + provider, "_self");
  };

  const handleProvider1 = async (provider) => {
    var prv = undefined;
    if (provider === "google") {
      prv = googleAuthProvider;
    } else if (provider === "facebook") {
      prv = facebookAuthProvider;
    }
    console.log("Into Auth ProviderProvider", prv , fireAuth);
    signInWithPopup(fireAuth, prv).then((res) => {
      console.log("Into Auth Provider", res);
      let code = res?.user?.accessToken;
      if (code === undefined) {
        message.error("Authentication Failed");
      } else {
        code &&
          authService
            .fetchTokenForUserWithFireBase(code, provider)
            .then((res) => {
              populateAuthToken(
                res,
                saveAccessToken,
                saveRefreshToken,
                savePartnerId,
                navigate
              );
            })
            .catch((err) =>
              message.error(err?.data?.message || "Something went wrong")
            );
      }
    });
  };

  return (
    //    <div className="login-container">
    //       <div className="flex-container">
    //          <div className="form-container">
    //             <div className="logo-container">
    //                <img src={LogoImage} className="logo-img" alt="logo" />
    //             </div>

    //             <div className="login-message">Login as Normal User</div>

    //             <div className="auth-buttons" onClick={() => handleProvider("google")}>
    //                <img src={GoogleImage} className="auth-img" alt="google" />
    //                <div className="auth-text">Login through Google New</div>
    //             </div>
    //             <div className="auth-buttons" onClick={() => handleProvider("facebook")}>
    //                <img src={FacebookImage} className="auth-img" alt="facebook" />
    //                <div className="auth-text">Login through Facebook</div>
    //             </div>
    //          </div>
    //       </div>

    //       <div className="flex-container">
    //          <div className="welcome-message">Welcome to Inflozy</div>
    //          <div className="desc" style={{fontSize : '10px', justifyContent:'left'}}>
    //          Our all-in-one platform revolutionizes the way businesses, freelancers,
    //          influencers, and partner agencies engage in influencer marketing.
    //          With unparalleled convenience and efficiency, our platform offers a
    //          plethora of benefits tailored to each stakeholder.
    //          <p>To Know more about us <a href="https://influozy.com/">Click Here</a> or Contact us to our email id : <a href={`mailto:contacts@inflozy.com`} onClick={handleEmailClick}>
    //          contacts@inflozy.com
    //  </a></p>
    //  <p style={{ color: 'blue', fontWeight: 'bold' }}>
    //                Please note that our website is optimized for desktop use. For the best experience, we recommend accessing our platform from a desktop or laptop computer.Mobile app in Making.
    //             </p>
    //          <p style={{ color : 'red' , fontWeight : 'bold'}}>Your privacy is our top priority. No personal info like address, mobile number, KYC, or account details will be shared. All communication via our app and email/push notifications.</p>
    //          <>
    //          </>
    //          </div>
    //          <img src={LoginImage} className="login-image" alt="login" />
    //       </div>
    //    </div>

    <div className="login-container">
      <div className="flex-container">
        <div className="form-container">
          <div className="logo-container">
            <img src={LogoImage} className="logo-img" alt="logo" />
          </div>
          <div
            className="login-message"
            style={{
              fontFamily: "roboto-bold",
              fontWeight: "bolder",
              fontSize: "10px",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Best Suited in desktop. Mobile app in Making.
          </div>
          <div className="login-message">Login as Normal User</div>
          {/* <div
            className="auth-buttons"
            onClick={() => handleProvider("google")}
          >
            <img src={GoogleImage} className="auth-img" alt="google" />
            <div className="auth-text">Login through Google</div>
          </div>
          <div
            className="auth-buttons"
            onClick={() => handleProvider("facebook")}
          >
            <img src={FacebookImage} className="auth-img" alt="facebook" />
            <div className="auth-text">Login through Facebook </div>
          </div> */}
          <div
            className="auth-buttons"
            onClick={() => handleProvider1("google")}
          >
            <img src={GoogleImage} className="auth-img" alt="google" />
            <div className="auth-text">Login through Google </div>
          </div> 
          <div
            className="auth-buttons"
            onClick={() => handleProvider1("facebook")}
          >
            <img src={FacebookImage} className="auth-img" alt="facebook" />
            <div className="auth-text">Login through Facebook </div>
          </div>
        </div>
      </div>

      <div className="flex-container">
        <div className="welcome-message">Welcome to Inflozy</div>
        <div className="desc">
          <ul>
            <li>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "left",
                  lineHeight: 1.4,
                }}
              >
                Our all-in-one platform revolutionizes the way businesses,
                freelancers, influencers, and partner agencies engage in
                influencer marketing. With unparalleled convenience and
                efficiency, our platform offers a plethora of benefits tailored
                to each stakeholder.
              </p>
            </li>
            <li>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "left",
                  lineHeight: 1.4,
                }}
              >
                We collect FullName, EmailId and Logo image from google /facebook based on your login.
                We collect this information to give you better user experience.
              </p>
            </li>
            <li>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "left",
                  lineHeight: 1.4,
                }}
              >
               To know more about our Privacy Policy kindly <a href="https://influozy.com/privacy-policies/">click here</a> or contact us via<a
                  href={`mailto:contacts@inflozy.com`}
                  onClick={handleEmailClick}
                >
                  contacts@inflozy.com
                </a>
.
              </p>
            </li>
            <li>
              <p
                style={{
                  fontFamily: "roboto-bold",
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                To know more about us and the Application,{" "}
                <a href="https://influozy.com/">click here</a> or contact us via
                email:{" "}
                <a
                  href={`mailto:contacts@inflozy.com`}
                  onClick={handleEmailClick}
                >
                  contacts@inflozy.com
                </a>
              </p>
            </li>
            <li>
              <p
                style={{
                  fontFamily: "roboto-bold",
                  color: "red",
                  fontWeight: "bolder",
                  fontSize: "12px",
                  textAlign: "left",
                  lineHeight: 1.4,
                }}
              >
                Your privacy is our top priority. No personal information like
                address, mobile number, KYC, or account details will be shared.
                All communication will be conducted via our app and email/push
                notifications.
              </p>
            </li>
          </ul>
        </div>
        <img src={LoginImage} className="login-image" alt="login" />
      </div>
    </div>
  );
};

const handleEmailClick = () => {
  // Use window.location.href to open the default email client
  window.location.href = `mailto:contacts@inflozy.com`;
};

const mapDispatchToProps = {
  saveAccessToken: saveAuthenticationAccessToken,
  saveRefreshToken: saveAuthenticationRefreshToken,
  savePartnerId: savePartnerId,
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.authentication.accessToken,
    refreshToken: state.authentication.refreshToken,
    partnerId: state.lovs.partnerId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
