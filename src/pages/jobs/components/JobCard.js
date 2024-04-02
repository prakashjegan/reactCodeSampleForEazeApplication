import { Box, Grid, MenuItem, MenuList, Paper, Stack } from "@mui/material";
import {
  Button,
  Card,
  Divider,
  Modal,
  Space,
  Input,
  DatePicker,
  Select,
  Form,
} from "antd";
const { Option } = Select;

import React, { useState } from "react";
import influkartIcon from "../../../assets/images/common/influ_icon.png";
import "./style.scss";
import PostedJobListView from "./postedJobListView";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import rentalService from "../../../services/rentalService";
import moment from "moment";
import PostedJobCalendarView from "./postedJobCalendarView";
import JobCalendarView from "./jobCalendarView";
import filter from "../../../assets/images/common/filter.png";
import JobListView from "./jobListView";
import Layout from "../../../components/layout";

const JobCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterObject, setFilterObject] = useState({
    a: true,
    b: true,
    c: false,
  });

  const [reviews, setReviews] = useState(true);
  const [language, setLanguage] = useState(false);
  const [location, setLocation] = useState(false);
  const [platform, setPlatform] = useState(false);
  const [category, setCategory] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  const [type, setType] = useState(false);
  const [users, setUsers] = useState(false);

  const [reviewss, setReviewss] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [jobTypes, setJobTypes] = useState(["EventsWithPostingVideo_PostedByInfluencer"]);

  const [userss, setUserss] = useState("");

  const [jobCardTypeList, setJobCardTypeList] = useState(false);

  const [data, setData] = useState([]);
  const [optionLoading, setOptionLoading] = useState(false);

  const [dataUpdateModalOpen, setDataUpdateModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [calenderView, setCalenderView] = useState(false);
  const [listView, setListView] = useState(true);

  const [platformTypeList, setPlatformTypeList] = useState([]);
  const [searchLocation, setSearchLocation] = useState([]);
  const [locationCSVData, setLocationCSVData] = useState([]);

  //card list

  const [eventPostinngWithVideo, setEventPostinngWithVideo] = useState(false);
  const [cameramanByFreelancer, setCameramanByFreelancer] = useState(false);
  const [videoEditorByFreelanncer, setVideoEditorByFreelanncer] =
    useState(false);
  const [freelancerOthers, setFreelancerOthers] = useState(false);
  const [meetupWithOutPostingVideo, setMeetupWithOutPostingVideo] =
    useState(false);
  const [rentalOfDevices, setRentalOfDevices] = useState(false);
  const [rentalOthers, setRentalOthers] = useState(false);
  const [rentalOfStudio, setRentalOfStudio] = useState(false);
  const [cardSelected , setCardSelected] = useState({});

  const [selectedCard, setSelectedCard] = useState(
    "EventsWithPostingVideo_PostedByInfluencer"
  );

  const [form] = Form.useForm();

  let navigate = useNavigate();
  const { Search } = Input;
  const { RangePicker } = DatePicker;

  useEffect(() => {
    // getPostedJobList();
    setLocationCSVData(JSON.parse(localStorage.getItem("location")));
    getJobCardTypeList();
    setPlatformTypeList(
      JSON.parse(localStorage.getItem("LocalStorage_platformTypes"))
    );
  }, []);

  const getJobCardTypeList = () => {
    setOptionLoading(true);
    rentalService
      .jobCardTypeList()
      .then((res) => {
        if (res.data.message) {
          const arrayOfObjects = Object.values(res.data.message.jobTypeCards);
          setJobCardTypeList(arrayOfObjects);
          console.log(' Into Get Job card Types :::' , arrayOfObjects[0] );
          setCardSelected(arrayOfObjects[0])
          setSelectedCard(arrayOfObjects[0].JobType)
        }
      })
      .catch(() => {
        console.log("Failed");
      });
  };

  const showDataUpdateModal = () => {
    setDataUpdateModalOpen(true);
  };

  const showFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleOk = () => {
    setFilterModalOpen(false);
    setDataUpdateModalOpen(false);
  };

  const handleCancel = () => {
    setFilterModalOpen(false);
    setDataUpdateModalOpen(false);
  };

  const showList = () => {
    setListView(true);
    setCalenderView(false);
  };

  const showCalender = () => {
    setListView(false);
    setCalenderView(true);
  };

  const createPost = () => {
    navigate(
      {
        pathname: "/createNewPost",
        search: `?action=create&action_type=JOB_DEFINITION&id=0000000000000000`,
      },
      { state: { jobType: selectedCard , jobCat : cardSelected  } }
    );
  };

  const handleOnChange = (date, dateString) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
    console.log("Date Range Handle on Change", date);

    // this.setState({ selectedDate: moment(dateString) });
  };

  const showModal = () => {
    setShowUploadModal(true);
  };

  const handleLinkChange = (locSelect, e) => {
    setSearchLocation(e);
    setLocations(e);
    console.log("LinkChange", e);
  };

  const cardSelection = (e, job) => {
    setSelectedCard([job.JobType]);
    setCardSelected(job);
    console.log("cardSelection", e, job.JobType);
    setJobTypes([job.JobType]);
  };

  //filter methods

  const dateFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(false);
    setPlatform(false);
    setCategory(false);
    setDateRange(true);
    setType(false);
    setUsers(false);
  };

  const reviewFilter = () => {
    setReviews(true);
    setLanguage(false);
    setLocation(false);
    setPlatform(false);
    setCategory(false);
    setDateRange(false);
    setType(false);
    setUsers(false);
  };

  const languageFilter = () => {
    setReviews(false);
    setLanguage(true);
    setLocation(false);
    setPlatform(false);
    setCategory(false);
    setDateRange(false);
    setType(false);
    setUsers(false);
  };

  const locationFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(true);
    setPlatform(false);
    setCategory(false);
    setDateRange(false);
    setType(false);
    setUsers(false);
  };

  const platformFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(false);
    setPlatform(true);
    setCategory(false);
    setDateRange(false);
    setType(false);
    setUsers(false);
  };

  const categoryFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(false);
    setPlatform(false);
    setCategory(true);
    setDateRange(false);
    setType(false);
    setUsers(false);
  };

  const typeFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(false);
    setPlatform(false);
    setCategory(false);
    setDateRange(false);
    setType(true);
    setUsers(false);
  };

  const usersFilter = () => {
    setReviews(false);
    setLanguage(false);
    setLocation(false);
    setPlatform(false);
    setCategory(false);
    setDateRange(false);
    setType(false);
    setUsers(true);
  };

  const styles = {
    selectedTab: {
      width: "100px",
      padding: "2px",
      color: "white",
      fontWeight: "600",
      textAlign: "center",
      cursor: "pointer",
      border: "2px solid black",
      borderRadius: "4px",
      borderImage: "linear-gradient(180deg, #007ACC, #3B4048) 10",
    },

    anotherTab: {
      width: "100px",
      padding: "2px",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      // border: "1px solid grey",
      cursor: "pointer",
      fontWeight: "600",
    },

    selectedFilter: {
      backgroundColor: "grey",
      fontSize: 12,
      fontWeight: 500,
    },

    unselectedFilter: {
      backgroundColor: "white",
      fontSize: 12,
      fontWeight: 500,
    },

    selectedCard: {
      width: 242,
      height: 152,
      margin: 10,
      backgroundColor: "black",
      cursor: "pointer",
      boxShadow: "1px 1px 10px 0px blue",
    },

    anotherCard: {
      width: 240,
      height: 150,
      margin: 10,
      backgroundColor: "black",
      cursor: "pointer",
    },
  };

  return (
    <>
      <div className="addCardPlatform">
        <ul>
          <div className="mainDiv">
            {jobCardTypeList &&
              jobCardTypeList.map((job) => (
                <>
                  <div>
                    <Card
                      style={
                        job.JobType == selectedCard
                          ? styles.selectedCard
                          : styles.anotherCard
                      }
                      onClick={(e) => cardSelection(e, job)}
                      key={job.JobType}
                    >
                      <Stack
                        direction="row"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={influkartIcon}
                          alt="influkartIcon"
                          height={50}
                        />
                        <p
                          style={{
                            color: "white",
                            marginLeft: 6,
                            fontSize: 16,
                          }}
                        >
                          {job.Title}
                        </p>
                      </Stack>

                      <Box sx={{ marginTop: 1 }}>
                        <p style={{ color: "white", fontSize: 14 }}>
                          {job.TitleDescription}
                        </p>
                        <a
                          style={{
                            fontSize: 12,
                            textDecorationColor: "yellowgreen",
                          }}
                        >
                          {job.WebLink}
                        </a>
                      </Box>
                    </Card>
                  </div>
                </>
              ))}
          </div>
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "25px 20px 25px",
          }}
        >
          <div>
            <Stack
              direction={"row"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <h3 style={{ marginRight: "20px" }}>{cardSelected.Title}</h3>

              {false && (<Box
                sx={{
                  borderRadius: "2px",
                  border: "3px solid transparent",
                  background:
                    "linear-gradient(180deg, #007ACC, #3B4048) border-box",
                }}
              >
                <Stack direction={"row"}>
                  <p
                    style={listView ? styles.selectedTab : styles.anotherTab}
                    onClick={showList}
                  >
                    List
                  </p>
                  <p
                    style={listView ? styles.anotherTab : styles.selectedTab}
                    onClick={showCalender}
                  >
                    Calender
                  </p>
                </Stack>
              </Box>
            )}
            </Stack>
          </div>

          <div>
            <Button
              type="primary"
              style={{ backgroundColor: "#00E1C6", fontWeight: 600 }}
              onClick={createPost}
            >
              Create Post
            </Button>
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "25px 20px 25px",
          }}
        >
          <Stack direction={"row"}>
            {/* <Search placeholder="Location..." style={{ width: 200 }} /> */}
            {/* <Search
              placeholder="Location..."
              //allowClear
              style={{ width: 200 }} />
            onSearch={(e) => showModal(e)}
            onChange={(e) => handleLinkChange(e)}
            /> */}
            <Select
              mode="tags"
              style={{ width: "200px" }}
              placeholder="Location..."
              onChange={(e) => handleLinkChange("LocationSelect", e)}
              options={locationCSVData}
            />

            <RangePicker
              size={"small"}
              style={{ marginLeft: 10 }}
              onChange={handleOnChange}
            />
          </Stack>

          <div>
            <div style={{ float: "right", cursor: "pointer" }}>
              <img
                src={filter}
                alt="filter image"
                height="25px"
                onClick={showFilterModal}
              />
            </div>
          </div>
        </Box>

        {listView && (
          <>
            {/* <PostedJobListView
              jobTypes={jobTypes}
              locations={locations}
              startDates={startDate}
              endDates={endDate}
              languages={languages}
              platforms={platforms}
              userss={userss}
              reviewss={reviewss}
            /> */}
            {/* <PostedJobListView jobTypes = {jobTypes} locations= {locations} startDates={startDate} endDates={endDate} languages={languages} platforms={platforms} userss={userss} reviewss={reviewss}   /> */}
            <JobListView
              jobTypes={jobTypes}
              locations={locations}
              startDates={startDate}
              endDates={endDate}
              languages={languages}
              platforms={platforms}
              userss={userss}
              reviewss={reviewss}
              jobCat={cardSelected}
            />
          </>
        )}

        {calenderView && (
          <>
            <JobCalendarView
              jobTypes={jobTypes}
              locations={locations}
              startDates={startDate}
              endDates={endDate}
              languages={languages}
              platforms={platforms}
              userss={userss}
              reviewss={reviewss}
              jobCat={cardSelected}
            />
          </>
        )}
      </div>

      <Box sx={{ position: "relative" }}>
        <Modal open={filterModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <h3>Filter</h3>
          <Stack direction={"row"}>
            <Box>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
              >
                <MenuItem
                  sx={reviews ? styles.selectedFilter : styles.unselectedFilter}
                  onClick={reviewFilter}
                >
                  Reviews
                </MenuItem>
                <MenuItem
                  onClick={languageFilter}
                  sx={
                    language ? styles.selectedFilter : styles.unselectedFilter
                  }
                >
                  Language
                </MenuItem>

                <MenuItem
                  onClick={locationFilter}
                  sx={
                    location ? styles.selectedFilter : styles.unselectedFilter
                  }
                >
                  Location
                </MenuItem>

                <MenuItem
                  onClick={platformFilter}
                  sx={
                    platform ? styles.selectedFilter : styles.unselectedFilter
                  }
                >
                  Platform
                </MenuItem>

                <MenuItem
                  onClick={categoryFilter}
                  sx={
                    category ? styles.selectedFilter : styles.unselectedFilter
                  }
                >
                  Category
                </MenuItem>
                <MenuItem
                  onClick={dateFilter}
                  sx={
                    dateRange ? styles.selectedFilter : styles.unselectedFilter
                  }
                >
                  Date Range
                </MenuItem>
                <MenuItem
                  onClick={typeFilter}
                  sx={type ? styles.selectedFilter : styles.unselectedFilter}
                >
                  Type
                </MenuItem>
                <MenuItem
                  onClick={usersFilter}
                  sx={users ? styles.selectedFilter : styles.unselectedFilter}
                >
                  Users
                </MenuItem>
              </MenuList>
            </Box>

            <Box
              sx={{
                width: "100%",
                margin: 1,
                border: "2px solid grey",
                padding: 2,
              }}
            >
              {reviews && <>Reviews here...</>}

              {language && (
                <>
                  <Form
                    form={form}
                    name="basicdetails"
                    layout="vertical"
                    className="form-container"
                  >
                    <Form.Item
                      className="form-item"
                      label="Select languages from the list..."
                      name="languages"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        placeholder="Please select"
                        options={[
                          { label: "Telugu", value: "telugu" },
                          { label: "Hindi", value: "hindi" },
                          { label: "Kannada", value: "kannada" },
                          { label: "Tamil", value: "tamil" },
                        ]}
                      />
                    </Form.Item>
                  </Form>
                </>
              )}

              {location && (
                <>
                  <RangePicker />
                </>
              )}

              {platform && (
                <>
                  <Form
                    form={form}
                    name="basicdetails"
                    layout="vertical"
                    className="form-container"
                  >
                    <Form.Item
                      className="form-item"
                      label="Select platform from the list..."
                      name="platform"
                    >
                      {platformTypeList && (
                        <Select>
                          {platformTypeList.map((platformType, index) => (
                            <Select
                              key={index}
                              value={platformType}
                              placeholder={"Platform Name"}
                            >
                              {platformType}
                            </Select>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Form>
                </>
              )}

              {category && (
                <>
                  <RangePicker />
                </>
              )}

              {dateRange && (
                <>
                  <RangePicker />
                </>
              )}

              {type && (
                <>
                  <RangePicker />
                </>
              )}

              {users && (
                <>
                  <RangePicker />
                </>
              )}
            </Box>
          </Stack>
        </Modal>

        {/* updating data modal */}

        {(false) && (<Button type="primary" onClick={showDataUpdateModal}>
          Open data update modal
        </Button>
        )}
        <Modal
          open={dataUpdateModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={450}
          okText="Upload"
          cancelText="Cancel"
        >
          <h4>test1</h4>
          <p style={{ fontSize: 12, fontWeight: 600 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vestibulum arcu quis ligula condimentum commodo. In nec justo a leo
            vulputate ornare. Suspendisse potenti.
          </p>
          <Grid container sx={{ marginTop: "4px", fontWeight: 600 }}>
            <Grid item xs={4}>
              <p style={{ fontSize: 12 }}>
                <b>Display Content: </b>
              </p>
            </Grid>

            <Grid item xs={8}>
              <p style={{ fontSize: 12, fontWeight: 600 }}>
                Lorem ipsum dolor sit amommodo. In nec justo a leo vulputate
                ornare. Suspendisse potenti.
              </p>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "4px" }}>
            <Grid item xs={4}>
              <p style={{ fontSize: 12 }}>
                <b>Promo Code: </b>
              </p>
            </Grid>

            <Grid item xs={8}>
              <p style={{ fontSize: 12, fontWeight: 600 }}>
                Lorem ipsum dolor sit amet,
              </p>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: "4px" }}>
            <Grid item xs={4}>
              <p style={{ fontSize: 12 }}>
                <b>Invoice Link: </b>
              </p>
            </Grid>

            <Grid item xs={8}>
              <p style={{ fontSize: 12, fontWeight: 600 }}>
                Lorem ipsum dolor sit amet,
              </p>
            </Grid>
          </Grid>

          <Divider />

          <div>
            <p style={{ fontSize: 12 }}>
              <b>Comment: </b>
            </p>

            <textarea
              id="comments"
              name="postContent"
              rows={4}
              cols={50}
              style={{ padding: "4px" }}
            />
          </div>

          <div>
            <p>
              <h5>Share Link or Upload File</h5>
            </p>
            <input type="file" />
            <button>Upload!</button>
          </div>
        </Modal>
      </Box>
    </>
  );
};

export default Layout(JobCard);
