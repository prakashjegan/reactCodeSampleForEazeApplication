import React, { useState } from "react";
import Layout from "../../components/layout";
import "./style.scss";
import { Button, Modal } from "antd";
import { Grid, Stack } from "@mui/material";
import { Divider } from "antd";
import AllNotifications from "./notificationAll";
import PriorityNotifications from "./notificationPriority";
import JobCard from "../jobs/components/JobCard";

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAllNotifications, setOpenAllNotifications] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
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

  return (
    <>
      <div className="notification-container">Notifications</div>

      <JobCard/>


      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Grid container spacing={2}>
          <Grid item xl={6}>
            <Button
              type={openAllNotifications ? "primary" : "dashed"}
              style={{ fontSize: 16, fontWeight: "bold",  }}
              onClick={handleAllNotifications}
            >
              All
            </Button>
          </Grid>
          <Grid item xl={6}>
            <Button
              type={openAllNotifications ? "dashed" : "primary"}
              style={{ fontSize: 16, fontWeight: "bold" }}
              onClick={handlePriorityNotifications}
            >
              By Priority
            </Button>
          </Grid>
        </Grid>
        <Divider />

        {openAllNotifications ? (
          <AllNotifications />
        ) : (
          <PriorityNotifications />
        )}
        {}
      </Modal>
    </>
  );
};

export default Notifications;
