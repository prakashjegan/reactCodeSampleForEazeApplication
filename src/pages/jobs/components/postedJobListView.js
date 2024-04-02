import { Box, Grid, Stack } from "@mui/material";
import { Button, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DemoSlider from "./ImageSlider";
import rentalService from "../../../services/rentalService";
import CommentForm from "../../home/components/FileUpload";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

const localizer = momentLocalizer(moment);

const PostedJobListView = () => {
  const [a, setA] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  const [allJobPostings, setAllJobPostings] = useState(true);
  const [postedByYou, setPostedByYou] = useState(false);
  const [requests, setRequests] = useState(false);
  const [yourBookings, setYourBookings] = useState(false);
  const [bookingForAds, setBookingForAds] = useState(false);

  const [checkboxValue, setCheckboxValue] = useState("allJobPostings");

  useEffect(() => {
    getPostedJobList();
  }, []);

  const getPostedJobList = () => {
    setOptionLoading(true);
    rentalService
      .allPostedJobList()
      .then((res) => {
        if (res.data.message) {
          setData(res.data.message.jobDefinitionBOs);
          setOptionLoading(false);
          console.log(1);
          console.log(data);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const getYourBookingList = () => {
    setOptionLoading(true);
    rentalService
      .yourBookingList()
      .then((res) => {
        if (res.data.message) {
          setData(res.data.message.jobBOs);
          setOptionLoading(false);
          console.log(1);
          console.log(data);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const imageSlider = [
    {
      url: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const imageSliderTyle = {
    width: "300px",
    height: "200px",
    margin: "0 auto",
    padding: "6px",
  };

  const ExpandableTable = () => {
    return (
      <>
        <div style={imageSliderTyle}>
          <DemoSlider imageSlider={imageSlider} />
        </div>
      </>
    );
  };

  const handleClick = (e) => {
    console.log(e.target.jobDefinitionId);
  };

  const columns = [
    {
      name: "",
      sortable: true,
      width: "27%",
      selector: (row) => {
        return (
          <Box>
            <div className="tag-list" onClick={handleClick}>
              <b style={{ fontSize: 14 }}>Job Name: </b> {row.jobName}
            </div>

            <div className="tag-list" style={{ padding: 2 }}>
              <b style={{ fontSize: 14 }}>Description: </b> {row.jobDescription}
            </div>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "20%",

      selector: (row) => {
        return (
          <div className="tag-list" style={{ fontSize: "14px" }}>
            <b>Job type: </b> {row.jobType}
          </div>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "20%",

      selector: (row) => {
        return (
          <>
            <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>Status: </b> {row.status}
            </div>
            <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>Tags: </b> {row.tags}
            </div>
          </>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "18%",

      selector: (row) => {
        return (
          <>
            <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>Amount: </b> {row.amount}
            </div>
          </>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "10%",

      selector: (row) => {
        return (
          <div className="tag-list">
            <Button type="primary">Book</Button>
          </div>
        );
      },
    },
  ];

  const onCheckboxChange = (e) => {
    switch (e.target.value) {
      case "allJobPostings":
        getPostedJobList();
        setAllJobPostings(true);
        setPostedByYou(false);
        setRequests(false);
        setBookingForAds(false);
        setYourBookings(false);
        break;

      case "postedByYou":
        getPostedJobList();

        setAllJobPostings(false);
        setPostedByYou(true);
        setRequests(false);
        setBookingForAds(false);
        setYourBookings(false);
        break;

      case "requests":
        getYourBookingList();

        setAllJobPostings(false);
        setPostedByYou(false);
        setRequests(true);
        setBookingForAds(false);
        setYourBookings(false);
        break;

      case "yourBookings":
        getYourBookingList();

        setAllJobPostings(false);
        setPostedByYou(false);
        setRequests(false);
        setBookingForAds(false);
        setYourBookings(true);
        break;

      case "bookingForAds":
        getYourBookingList();

        setAllJobPostings(false);
        setPostedByYou(false);
        setRequests(false);
        setBookingForAds(true);
        setYourBookings(false);
        break;

      default:
    }

    setCheckboxValue(e.target.value);
    console.log(checkboxValue);
    setCheckboxValue("");
  };

  return (
    <>
      <Stack direction={"row"} sx={{ margin: 2 }}>
        <Checkbox
          style={{
            backgroundColor: "#C1B11C",
            padding: 3,
            fontWeight: 700,
            borderRadius: "4px",
          }}
          value="allJobPostings"
          onChange={onCheckboxChange}
          checked={allJobPostings}
        >
          All Postings
        </Checkbox>

        <Checkbox
          style={{
            backgroundColor: "#F94DC8",
            padding: 3,
            fontWeight: 700,
            marginLeft: 8,
            borderRadius: "4px",
          }}
          value="postedByYou"
          onChange={onCheckboxChange}
          checked={postedByYou}
        >
          Posted By you
        </Checkbox>

        <Checkbox
          style={{
            backgroundColor: "#2C73DE",
            padding: 3,
            fontWeight: 700,
            marginLeft: 8,
            borderRadius: "4px",
          }}
          value="requests"
          onChange={onCheckboxChange}
          checked={requests}
        >
          Requests
        </Checkbox>

        <Checkbox
          style={{
            backgroundColor: "#1CC19A",
            padding: 3,
            fontWeight: 700,
            marginLeft: 8,
            borderRadius: "4px",
          }}
          value="yourBookings"
          onChange={onCheckboxChange}
          checked={yourBookings}
        >
          Your Bookings
        </Checkbox>

        <Checkbox
          style={{
            backgroundColor: "#008000",
            padding: 3,
            fontWeight: 700,
            marginLeft: 8,
            borderRadius: "4px",
          }}
          value="bookingForAds"
          onChange={onCheckboxChange}
          checked={bookingForAds}
        >
          Bookings for Ads
        </Checkbox>
      </Stack>

      <DataTable
        columns={columns}
        data={data}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={ExpandableTable}
      />
      {/* <CommentForm /> */}
    </>
  );
};

export default PostedJobListView;
