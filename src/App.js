import React, { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RouteItems from "./router-auth/route";
import PrivateRoute from "./router-auth/private";
import PublicRoute from "./router-auth/public";
import { Toaster } from "react-hot-toast";
import metricsService from "./services/metricsService";
import { Toast } from "react-bootstrap";
import { getToken1, onMessageListener } from "./services/firebase";

const App = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState("");
  let par = localStorage.getItem("partnerId");
  let par1 = localStorage.getItem("firebaseToken");
  console.log("Into Token Generation :::: ", par, par1);
  let alwaysFalse = false;
  if (alwaysFalse) {
    // if ((par !== undefined || par1 !== null) && (par1 === undefined || par1 === null)) {
    //    console.log('Into Token Generation Into :::: ')
    //    getToken1(setTokenFound, setFirebaseToken);
    //    onMessageListener().then(payload => {
    //       setShow(true);
    //       setNotification({title: payload.notification.title, body: payload.notification.body})
    //       console.log(payload);
    //     }).catch(err => console.log('failed: ', err));
    // }
  }
  //

  const handleMobileRedirect = () => {
    const isMobile = window.screen.availWidth <= 768; // Adjust the width threshold as needed
    if (isMobile) {
      console.log(
        "Into handleMobileRedirect Into :::: ",
        isMobile,
        window.innerWidth,
        window.screen.availWidth
      );
      navigate("/mobile-warning"); // Navigate to the warning page
    }
  };

  const fetchAttributeHandler = async () => {
    try {
      let k1 = localStorage.getItem("fetchAttributeFetched");
      if (k1 === "true") {
        return;
      }
      if (
        localStorage.getItem("persist:root") != undefined &&
        localStorage.getItem("persist:root") != null
      ) {
        try {
          localStorage.setItem("fetchAttributeFetched", "true");
          const k = await metricsService.fetchAttribute();
          console.log(k);
          localStorage.setItem("fetchAttribute", JSON.stringify(k));
        } catch (error) {
          localStorage.setItem("fetchAttributeFetched", "false");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMobileRedirect();
    fetchAttributeHandler();
    let val = false
    if (val) {
    OneSignal.init({
      appId: "6ea94001-306e-408b-9431-6471ed58274b",
    });
    }

  }, []);

  return (
    <div className="content-container">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {RouteItems?.map((route, index) => {
          return (
            <Route
              path={route.path}
              key={index}
              element={
                route.private ? (
                  <PrivateRoute>{route.element}</PrivateRoute>
                ) : (
                  <PublicRoute>{route.element}</PublicRoute>
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
