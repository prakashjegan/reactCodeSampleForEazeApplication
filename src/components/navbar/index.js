import React, { useEffect, useState } from "react";
import LogoImage from "../../assets/images/auth/InflozyBrandSvg_1.svg";
import ProfileImage from "../../assets/images/navbar/profile.png";
import "./style.scss";
import NavBarItems from "./items";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TagIcon from "@mui/icons-material/Tag";
import Settings from "@mui/icons-material/Settings";
import ContactsIcon from "@mui/icons-material/Contacts";
import Logout from "@mui/icons-material/Logout";
import SearchSelect from "../searchComponent/SearchSelect";
import profileImage from "../../assets/images/navbar/profile.png";
import { Button, Input, Modal } from "antd";
import MultiUserSelectDropDown from "../../pages/jobs/components/MultiSelectUserComponent";
import AllNotifications from "../../pages/notifications/notificationAll";
import PriorityNotifications from "../../pages/notifications/notificationPriority";
import { Grid } from "@mui/material";
import notificationService from "../../services/notificationService";
import arrowSymbol from "../../assets/images/common/Polygon 1.png";
import stateStorage from "../../lib/state-storage";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("/home");
  const [profImage, setProfImage] = useState(ProfileImage);
  const [userName, setUserName] = useState("NewUser");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAllNotifications, setOpenAllNotifications] = useState(true);
  const [optionLoading, setOptionLoading] = useState(false);
  const [allNotificationsPriorityLevel, setAllNotificationsPriorityLevel] =
    useState(0);

  const [notificationsPriorityLevel, setNotificationsPriorityLevel] =
    useState(3);
  const [notificationData, setNotificationData] = useState();
  const [priorityNotificationData, setPriorityNotificationData] = useState();
  
  const location = useLocation();
  const navigate = useNavigate();

  const { Search } = Input;

  //METHODS FOR MODAL

  const showModal = () => {
    fetchAllNotifications();
    fetchPriorityNotifications();
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePriorityNotifications = () => {
    setOpenAllNotifications(false);
  };

  const handleAllNotifications = () => {
    setOpenAllNotifications(true);
  };

  const modalTabClickedOne = {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
    textUnderlineOffset: "8px"
  };

  const modalClickedTwo = {
    cursor: "pointer",
  };

  const fetchAllNotifications = () => {
    setOptionLoading(true);
    notificationService
      .fetchAllNotificationDetails({
        priorityLevel: allNotificationsPriorityLevel,
      })
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setNotificationData(res.data.message.notifications);
          console.log(res.data.message.notifications);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const fetchPriorityNotifications = () => {
    setOptionLoading(true);
    notificationService
      .fetchAllNotificationDetails({
        priorityLevel: notificationsPriorityLevel,
      })
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setPriorityNotificationData(res.data.message.notifications);
          console.log(res.data.message.notifications);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  useEffect(() => {
    setCurrentPath(location?.pathname);
    const user = JSON.parse(localStorage.getItem("user"));
    if (
      localStorage.getItem("userDetails") === undefined ||
      localStorage.getItem("userDetails") === null
    ) {
    }
    console.log(localStorage.getItem("userDetails"));
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    console.log("Into UseEffect", user);
    let pic =
      userDetails.logoLink != undefined
        ? userDetails.logoLink
        : user?.userPictureLink != undefined
        ? user?.userPictureLink
        : profileImage;
    console.log("Source Picture ", pic);
    setProfImage(pic);
    // if (user?.userPictureLink != undefined && user?.userPictureLink != null && user?.userPictureLink != "") {
    //     setProfImage(user?.userPictureLink)
    // }
    setUserName(
      userDetails.partnerName === undefined || userDetails.partnerName === ""
        ? userDetails.firstName
        : userDetails.partnerName
    );
  }, [location?.pathname]);

  const handleNavChange = (key) => {
    switch (key) {
      case "notifications":
        showModal();
        break;
      default:
        navigate(`/${key}`);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (key) => {
    if (key === "LOGOUT") {
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
        "partnerId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        stateStorage.removeCookie("accessToken");
        stateStorage.removeCookie("auth");
        stateStorage.removeCookie("refreshToken");
        stateStorage.removeCookie("partnerId");
        stateStorage.removeCookie("refreshtoken");
      localStorage.clear();
      console.log("INTO LOGOUT");
      navigate("/login");
    } else {
      navigate(`/onboarding?to=${key}`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {};

  return (
    <div className="navbar-container">
      <img src={LogoImage} className="logo-image" alt="logo" />
      <SearchSelect />

      <div className="nav-links">
        {NavBarItems?.map((item, index) => {
          return (
            <div
              className={`nav-item ${
                currentPath?.includes(item.key) ? "active-nav" : ""
              }`}
              onClick={() => handleNavChange(item?.key)}
              key={index}
            >
              <img src={item?.image} alt={item.key} className="nav-image" />
              <div>{item.name}</div>
              {currentPath?.includes(item.key) && (
                <div className="active-border" />
              )}
            </div>
          );
        })}
      </div>

      <div className="profile-container">
        <div className="profile-name">{userName}</div>
        <Tooltip title="Account settings">
          <img
            key={profImage}
            onClick={handleClick}
            src={profImage}
            alt="profile"
            className="profile-image"
          />
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleMenuClick("basicDetails")}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("platform")}>
            <ListItemIcon>
              <TagIcon fontSize="small" />
            </ListItemIcon>
            My Platforms
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleMenuClick("bankDetails")}>
            <ListItemIcon>
              <AccountBalanceWalletIcon fontSize="small" />
            </ListItemIcon>
            Payment Details
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("address")}>
            <ListItemIcon>
              <ContactsIcon fontSize="small" />
            </ListItemIcon>
            Contacts
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("LOGOUT")}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          style={{ top: 74, left: 330, overflowY: "auto" }}
          width={380}

        >
          {isModalOpen && (
            <img
              src={arrowSymbol}
              alt="arrow symbol"
              width={22}
              style={{ position: "relative", top: -38, left: 260,  }}
            />
          )}

          <Grid container spacing={2} sx={{ padding: 1 }}>
            <Grid item xl={6}>
              {/* <Button
                type={openAllNotifications ? "primary" : "dashed"}
                style={{ fontSize: 16, fontWeight: "bold" }}
                onClick={handleAllNotifications}
              >
                All
              </Button> */}

              <h3
                style={
                  openAllNotifications ? modalTabClickedOne : modalClickedTwo
                }
                onClick={handleAllNotifications}
              >
                All
              </h3>
            </Grid>
            <Grid item xl={6}>
              {/* <Button
                type={openAllNotifications ? "dashed" : "primary"}
                style={{ fontSize: 16, fontWeight: "bold" }}
                onClick={handlePriorityNotifications}
              >
                By Priority
              </Button> */}

              <h3
                style={
                  openAllNotifications ? modalClickedTwo : modalTabClickedOne
                }
                onClick={handlePriorityNotifications}
              >
                By Priority
              </h3>
            </Grid>
          </Grid>
          <Divider />

          <div>
            {openAllNotifications ? (
              <div>
                {notificationData &&
                  notificationData.map((notification) => (
                    <AllNotifications
                      key={notification.notificationId}
                      info={notification}
                    />
                  ))}
              </div>
            ) : (
              <div>
                {priorityNotificationData &&
                  priorityNotificationData.map((notification) => (
                    <PriorityNotifications
                      key={notification.notificationId}
                      info={notification}
                    />
                  ))}
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
