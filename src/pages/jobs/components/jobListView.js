import { Box, Grid, Stack, Pagination } from "@mui/material";
import {
  Button,
  Checkbox,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Typography,
  Select,
  Space,
  Collapse,
  Divider,
} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { format, addMonths, subMonths } from 'date-fns';

import {
  ArrowLeftOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DemoSlider from "./ImageSlider";
import rentalService from "../../../services/rentalService";
import CommentForm from "../../home/components/FileUpload";
import { fetchEvents, fetchEventsEvn } from "./jobCalendarEvents";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import UserModalForAllPopups from "./userModelForAllPopups";
import './style.scss';
import JobCalendarToolbar from "./jobCalendarToolbar";

// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

const localizer = momentLocalizer(moment);

const { Text, Title } = Typography;
const { Panel } = Collapse;

const JobListView = (props) => {
  const [currentMonth, setCurrentMonth] = useState(moment().format("MMMM"));
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));

  const [currentDate, setCurrentDate] = useState(
    props.startDate === undefined ? new Date() : props.startDate
  );
  const [events, setEvents] = useState([]);
  const [eventsAll, setEventsAll] = useState([]);
  const [isPostallSelected, setIsPostallSelected] = useState(true);
  const [isRequestedSelected, setIsRequestedSelected] = useState(false);
  const [isBookingSelected, setIsBookingSelected] = useState(false);
  const [isyourPostSelected, setIsYourPostSelected] = useState(false);
  const [isyourPostBookSelected, setIsYourPostBookSelected] = useState(false);
  const [reviewss, setReviewss] = useState(props.reviewss);
  const [languages, setLanguages] = useState(props.languages);
  const [locations, setLocations] = useState(props.locations);
  const [platforms, setPlatforms] = useState(props.platforms);
  const [categorys, setCategorys] = useState(props.categorys);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [jobTypes, setJobTypes] = useState(props.jobTypes);
  const [userss, setUserss] = useState(props.userss);
  const [userModelVisible, setUserModelVisible] = useState(false);
  const [modelUserId, setModelUserId] = useState('')


  const [currentPagePostAll, setCurrentPagePostAll] = useState(1)



  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  let navigate = useNavigate();
  let modelPartnerId = ''

  useEffect(() => {
    let curDate = props.startDate === undefined ? new Date() : props.startDate;
    setCurrentDate(curDate);
    // const [page, setPage] = useState(1);
    // const [size, setSize] = useState(20);


    console.log("Fetch Eve :::", props);
    setCurrentMonth(moment(curDate).format("MMMM"));
    setCurrentYear(moment(curDate).format("YYYY"))
    const firstDayOfMonth = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    );

    let pro = { ...props };
    pro.isPostallSelected = isPostallSelected;
    pro.isRequestedSelected = isRequestedSelected;
    pro.isBookingSelected = isBookingSelected;
    pro.isyourPostSelected = isyourPostSelected;
    pro.isyourPostBookSelected = isyourPostBookSelected;
    pro.size = size;
    console.log("Fetch Eve :::", pro);

    let res = fetchEventsEvn(firstDayOfMonth, lastDayOfMonth, pro, setEvents, setEventsAll);
    console.log("IntoUseEffectJobCalendarView", curDate, res);

    //setEvents(res.payload)
    //props.fetchEvents();
  }, [
    props.reviewss,
    props.languages,
    props.locations,
    props.platforms,
    props.categorys,
    props.startDate,
    props.endDate,
    props.jobTypes,
    props.userss,
  ]); // Empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    setCurrentMonth(moment(currentDate).format("MMMM"));
    setCurrentYear(moment(currentDate).format("YYYY"));

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    let pro = { ...props };
    pro.isPostallSelected = isPostallSelected;
    pro.isRequestedSelected = isRequestedSelected;
    pro.isBookingSelected = isBookingSelected;
    pro.isyourPostSelected = isyourPostSelected;
    pro.isyourPostBookSelected = isyourPostBookSelected;
    pro.size = size
    console.log("Fetch Eve :::", pro);

    let res = fetchEventsEvn(firstDayOfMonth, lastDayOfMonth, pro, setEvents, setEventsAll);
    console.log("IntoUseEffectJobCalendarView", currentDate, res);

    //setEvents(res.payload)
    //props.fetchEvents();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const currentMonthV = (date) => {
    setCurrentMonth(moment(date).format("MMMM"));
    setCurrentYear(moment(date).format("YYYY"));
  };

  // Function to handle month change and fetch events
  const handleNavigate = (view , date) => {
    // Check if the view has changed to 'month'
    console.log("Into HandleNavigate :: ", date, view);
    if (view === 'NEXT') {
      date = addMonths(currentDate, 1)
      setCurrentDate((prevDate) => addMonths(prevDate, 1));
    } else if (view === 'PREV') {
      date = subMonths(currentDate, 1);
      setCurrentDate((prevDate) => subMonths(prevDate, 1));
    } else {
      date = currentDate
    }
    currentMonthV(date)
    const start = moment(date).startOf("month").toDate();
    const end = moment(date).endOf("month").toDate();

    // Fetch events for the new month
    // fetchEvents(start, end);
    let pro = { ...props };
    pro.isPostallSelected = isPostallSelected;
    pro.isRequestedSelected = isRequestedSelected;
    pro.isBookingSelected = isBookingSelected;
    pro.isyourPostSelected = isyourPostSelected;
    pro.isyourPostBookSelected = isyourPostBookSelected;
    pro.size = size
    console.log("Fetch Eve handleNavigate :::", pro);
    let res = fetchEventsEvn(start, end, pro, setEvents, setEventsAll);
  };

  const fetchEve = (isSelected, type) => {
    const start = moment(currentDate).startOf("month").toDate();
    const end = moment(currentDate).endOf("month").toDate();
    let pro = { ...props };
    // pro.isPostallSelected =
    //   type === "ALL-POST" ? isSelected : isPostallSelected;
    // pro.isRequestedSelected =
    //   type === "REQUESTED" ? isSelected : isRequestedSelected;
    // pro.isBookingSelected =
    //   type === "YOUR-BOOK" ? isSelected : isBookingSelected;
    // pro.isyourPostSelected =
    //   type === "YOUR-POST" ? isSelected : isyourPostSelected;
    // pro.isyourPostBookSelected =
    //   type === "BOOK-POST" ? isSelected : isyourPostBookSelected;
    switch (type) {
      case "ALL-POST":
        pro.isPostallSelected = true
        pro.isRequestedSelected = false
        pro.isBookingSelected = false
        pro.isyourPostSelected = false
        pro.isyourPostBookSelected = false
        break;
      case "REQUESTED":
        pro.isPostallSelected = false
        pro.isRequestedSelected = true
        pro.isBookingSelected = false
        pro.isyourPostSelected = false
        pro.isyourPostBookSelected = false
        break;
      case "YOUR-BOOK":
        pro.isPostallSelected = false
        pro.isRequestedSelected = false
        pro.isBookingSelected = true
        pro.isyourPostSelected = false
        pro.isyourPostBookSelected = false
        break;
      case "YOUR-POST":
        pro.isPostallSelected = false
        pro.isRequestedSelected = false
        pro.isBookingSelected = false
        pro.isyourPostSelected = true
        pro.isyourPostBookSelected = false
        break;
      case "BOOK-POST":
        pro.isPostallSelected = false
        pro.isRequestedSelected = false
        pro.isBookingSelected = false
        pro.isyourPostSelected = false
        pro.isyourPostBookSelected = true
        break;
    }
    pro.page = page;
    pro.size = size;
    console.log("Fetch Eve fetchEve :::", pro, type, isSelected);
    // Fetch events for the new month
    // fetchEvents(start, end);
    let res = fetchEventsEvn(start, end, pro, setEvents, setEventsAll);
  };

  const fetchEve12 = (type, page) => {
    const start = moment(currentDate).startOf("month").toDate();
    const end = moment(currentDate).endOf("month").toDate();
    let pro = { ...props };
    pro.isPostallSelected = type === "ALL-POST" ? true : false;
    pro.isRequestedSelected = type === "REQUESTED" ? true : false;
    pro.isBookingSelected = type === "YOUR-BOOK" ? true : false;
    pro.isyourPostSelected = type === "YOUR-POST" ? true : false;
    pro.isyourPostBookSelected = type === "BOOK-POST" ? true : false;
    pro.page = page;
    pro.size = size;
    console.log("Fetch Eve fetchEve12 Requested :::", pro, type);
    // Fetch events for the new month
    // fetchEvents(start, end);
    let res = fetchEventsEvn(start, end, pro, setEvents, setEventsAll);
  };

  const fetchEve1 = (page) => {
    const start = moment(currentDate).startOf("month").toDate();
    const end = moment(currentDate).endOf("month").toDate();
    let pro = { ...props };
    pro.isPostallSelected = isPostallSelected;
    pro.isRequestedSelected = isRequestedSelected;
    pro.isBookingSelected = isBookingSelected;
    pro.isyourPostSelected = isyourPostSelected;
    pro.isyourPostBookSelected = isyourPostBookSelected;
    pro.page = page;
    pro.size = size;
    console.log("Fetch Eve  fetchEve1 :::", pro);
    // Fetch events for the new month
    // fetchEvents(start, end);
    let res = fetchEventsEvn(start, end, pro, setEvents, setEventsAll);
  };

  //   const [a, setA] = useState(false);
  //   const [optionLoading, setOptionLoading] = useState(false);
  //   const [data, setData] = useState([]);
  //   const [dataTwo, setDataTwo] = useState([]);

  //   const [allJobPostings, setAllJobPostings] = useState(true);
  //   const [postedByYou, setPostedByYou] = useState(false);
  //   const [requests, setRequests] = useState(false);
  //   const [yourBookings, setYourBookings] = useState(false);
  //   const [bookingForAds, setBookingForAds] = useState(false);

  const [checkboxValue, setCheckboxValue] = useState("allJobPostings");

  //   useEffect(() => {
  //     getPostedJobList();
  //   }, []);

  //   const getPostedJobList = () => {
  //     setOptionLoading(true);
  //     rentalService
  //       .allPostedJobList()
  //       .then((res) => {
  //         if (res.data.message) {
  //           setData(res.data.message.jobDefinitionBOs);
  //           setOptionLoading(false);
  //           console.log(1);
  //           console.log(data);
  //         }
  //       })
  //       .catch(() => {
  //         setOptionLoading(false);
  //       });
  //   };

  //   const getYourBookingList = () => {
  //     setOptionLoading(true);
  //     rentalService
  //       .yourBookingList()
  //       .then((res) => {
  //         if (res.data.message) {
  //           setData(res.data.message.jobBOs);
  //           setOptionLoading(false);
  //           console.log(1);
  //           console.log(data);
  //         }
  //       })
  //       .catch(() => {
  //         setOptionLoading(false);
  //       });
  //   };

  //   const imageSlider = [
  //     {
  //       url: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     },
  //     {
  //       url: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       url: "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       url: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       url: "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //     {
  //       url: "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     },
  //   ];
  const imageSliderTyle = {
    // width: "300px",
    width: '100%',
    height: "600px",
    margin: "0 auto",
    padding: "6px",
    //backgroundColor : 'blue',
  };

  const ExpandableTable = (props) => {
    return (
      <>
        {console.log('Into ExplandableTable', props)}
        <div style={imageSliderTyle}>
          <DemoSlider imageSlider={props.data.jobImageLinks} propsVal={props} />
        </div>
      </>
    );
  };

  const handleClick = (e) => {
    console.log(e.target.jobDefinitionId);
  };

  const openCreatePost = (id, type, action) => {
    let ac = action.toLowerCase()
    if (isPostallSelected || isyourPostSelected) {
      navigate(
        {
          pathname: "/createNewPost",
          search: `?action=${ac}&action_type=JOB_DEFINITION&id=${id}`,
        },
        { state: { jobType: type, jobCat: props.jobCat } }
      );
    } else if (isRequestedSelected) {
      navigate(
        {
          pathname: "/createNewPost",
          search: `?action=${ac}&action_type=JOB_REQUEST&id=${id}`,
        },
        { state: { jobType: type, jobCat: props.jobCat } }
      );
    } else if (isBookingSelected || isyourPostBookSelected) {
      navigate(
        {
          pathname: "/createNewPost",
          search: `?action=${ac}&action_type=JOB&id=${id}`,
        },
        { state: { jobType: type, jobCat: props.jobCat } }
      );
    }
  };

  const popupUserDetails = (label, image, partnerId) => {
    modelPartnerId = partnerId
    setModelUserId(modelPartnerId)
    setUserModelVisible(true)
    //console.log('UserModalForAllPopups Into Popup User Details' ,modelPartnerId , data )
  }

  const formatUserOptionLabel = (label, image, partnerId) => (
    <>
      {console.log('Into format UserOptionLabel', label, image, partnerId)}
      <Card
        style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', height: '45px', border: 'none' }}
        onClick={() => popupUserDetails(label, image, partnerId)}
        bodyStyle={{ padding: '0px', display: 'flex', alignItems: 'center', border: 'none' }}
      >
        <img
          src={image}
          alt={label}
          style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
        />
        {/* {console.log('Intp formatUserOptionLabel', data.label)} */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{label}</div>
          {/* <div style={{ color: '#666', fontSize: '8px' }}>
                <div>{data.stakeHolderType}</div>
                <div style={{ marginLeft: '8px', fontSize: '8px' }}>{data.skillSet}</div>
            </div> */}
        </div>
      </Card>
    </>
  );

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
          <Box>
            <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>Job type: </b> {row.jobType}
            </div>
            <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>Amount: </b> {row.amount/100}
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
          // <>
          //   <div className="tag-list" style={{ fontSize: "14px" }}>
          //     <b>Amount: </b> {row.amount}
          //   </div>
          // </>
          <Box>
            {/* <div className="tag-list" style={{ fontSize: "14px" }}>
            
            <b>Poster Name: </b> {row.posterPartnerName}
          </div> */}
            <>
              {formatUserOptionLabel(row.posterPartnerName, row.posterPartnerImageLink, row.posterPartnerId)}
            </>
            <>
              {formatUserOptionLabel(row.acceptorPartnerName, row.acceptorPartnerImageLink, row.acceptorPartnerId)}
            </>

            {/* <div className="tag-list" style={{ fontSize: "14px" }}>
              <b>User Name: </b> {row.acceptorPartnerName }
            </div> */}
            <UserModalForAllPopups isVisible={userModelVisible} partnerId={modelUserId} closeModal={() => {
              modelPartnerId = ''
              setUserModelVisible(false)
            }} />
          </Box>
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
            {!isPostallSelected && !( (isBookingSelected || isyourPostBookSelected) && (row.currentPendingStatus !== 'CHECK-IN' && row.currentPendingStatus !== 'CHECK-OUT') )  && (
              <Button
                type="primary"
                onClick={() => {
                  if (isPostallSelected) {
                    openCreatePost(row.jobDefinitionId, row.jobType, 'Book');
                  } else if (isRequestedSelected) {
                    openCreatePost(row.jobRequestID, row.jobType, 'Reject');
                  } else if (isyourPostSelected) {
                    openCreatePost(row.jobDefinitionId, row.jobType, 'Edit');
                  } else if (isBookingSelected) {
                    openCreatePost(row.jobID, row.jobType, 'Update');
                  } else {
                    openCreatePost(row.jobID, row.jobType, 'Cancel');
                  }
                }}
              >
                {isPostallSelected && 'Book'}
                {isRequestedSelected && 'Cancel'}
                {isyourPostSelected && 'Edit'}
                {isBookingSelected && 'View'}
                {isyourPostBookSelected && 'Cancel'}

              </Button>
            )}
            <Button
              type="primary"
              onClick={() => {
                if (isPostallSelected) {
                  openCreatePost(row.jobDefinitionId, row.jobType, 'Book');
                } else if (isRequestedSelected) {
                  openCreatePost(row.jobRequestID, row.jobType, 'Approve');
                } else if (isyourPostSelected) {
                  openCreatePost(row.jobDefinitionId, row.jobType, 'Edit');
                } else if (isBookingSelected) {
                  openCreatePost(row.jobDefinitionId, row.jobType, 'Cancel');
                } else {
                  openCreatePost(row.jobID, row.jobType, 'Update');
                }
              }}
            >
              {isPostallSelected && 'Book'}
              {isRequestedSelected && 'Approve'}
              {isyourPostSelected && 'Delete'}
              {isBookingSelected && 'Cancel'}
              {isyourPostBookSelected && ((row.currentPendingStatus === undefined || row.currentPendingStatus === null || row.currentPendingStatus === '') ? 'View ': row.currentPendingStatus)}

            </Button>
          </div>
        );
      },
    },
  ];

  const onCheckboxChange = (e) => {
    switch (e.target.value) {
      case "allJobPostings":
        setIsPostallSelected(true);
        setIsRequestedSelected(false);
        setIsBookingSelected(false);
        setIsYourPostSelected(false);
        setIsYourPostBookSelected(false);
        fetchEve12("ALL-POST", 0);
        // getPostedJobList();
        // setAllJobPostings(true);
        // setPostedByYou(false);
        // setRequests(false);
        // setBookingForAds(false);
        // setYourBookings(false);
        break;

      case "postedByYou":
        setIsPostallSelected(false);
        setIsRequestedSelected(false);
        setIsBookingSelected(false);
        setIsYourPostSelected(true);
        setIsYourPostBookSelected(false);
        fetchEve12("YOUR-POST", 0);
        break;

      case "requests":
        setIsPostallSelected(false);
        setIsRequestedSelected(true);
        setIsBookingSelected(false);
        setIsYourPostSelected(false);
        setIsYourPostBookSelected(false);
        fetchEve12("REQUESTED", 0);
        break;

      case "yourBookings":
        setIsPostallSelected(false);
        setIsRequestedSelected(false);
        setIsBookingSelected(true);
        setIsYourPostSelected(false);
        setIsYourPostBookSelected(false);
        fetchEve12("YOUR-BOOK", 0);
        break;

      case "bookingForAds":
        setIsPostallSelected(false);
        setIsRequestedSelected(false);
        setIsBookingSelected(false);
        setIsYourPostSelected(false);
        setIsYourPostBookSelected(true);
        fetchEve12("BOOK-POST", 0);
        break;

      default:
    }

    setCheckboxValue(e.target.value);
    console.log(checkboxValue);
    //setCheckboxValue("");
  };

  const handlePageChange = (e, selected) => {
    console.log('Into handlePageChange :::', selected)
    setPage(selected);
    setCurrentPagePostAll(selected);
    fetchEve1(selected);
  };
  const onTableChange1 = (action, tableState) => {
    // Handle DataTable pagination changes
    console.log('Into OnTableChanges ::::', action, tableState)
    if (action === 'changePage') {
      handlePageChange(tableState.page);
    }
  };

  const paginationOptions = {
    rowsPerPageText: 'Rows per page:',
    rangeSeparatorText: 'of',
    selectAllRowsItem: false,
    selectAllRowsItemText: 'All',
    onTableChange: (action, tableState) => {
      // Handle DataTable pagination changes
      console.log('Into OnTableChanges ::::', action, tableState)
      if (action === 'changePage') {
        handlePageChange(tableState.page);
      }
    },
  };

  const CustomPagination = (props) => {
    return (
      <div className="dataTable-footer">
        {console.log('Custom Pagination ::::: ', props, props.paginationTotalRows)}
        <Pagination
          count={parseInt(Math.ceil(props.rowCount / size) || 1)}
          page={currentPagePostAll}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          shape="rounded"
          style={{
            listStyle: 'none',
            flex: '0 0 0 0%',
          }}
        />
      </div>
    )
  }

  return (
    <>
      {(false) && (
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
            checked={isPostallSelected}
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
            checked={isyourPostSelected}
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
            checked={isRequestedSelected}
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
            checked={isBookingSelected}
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
            checked={isyourPostBookSelected}
          >
            Bookings for Ads
          </Checkbox>
        </Stack>
      )}
      <JobCalendarToolbar
        setIsPostallSelected={setIsPostallSelected}
        setIsRequestedSelected={setIsRequestedSelected}
        setIsBookingSelected={setIsBookingSelected}
        setIsYourPostSelected={setIsYourPostSelected}
        setIsYourPostBookSelected={setIsYourPostBookSelected}
        isPostallSelected={isPostallSelected}
        isRequestedSelected={isRequestedSelected}
        isBookingSelected={isBookingSelected}
        isyourPostSelected={isyourPostSelected}
        isyourPostBookSelected={isyourPostBookSelected}
        label={currentMonth + ' - ' + currentYear}
        messages={currentMonth}
        fetchEve={fetchEve}
        onNavigate={handleNavigate}
      />

      {isPostallSelected && (
        <>
          {eventsAll.length > 0 &&
            isPostallSelected != undefined &&
            isPostallSelected && (

              <>
                {console.log(
                  "Into Listing Data Tables1111 ",
                  eventsAll,
                  isPostallSelected
                )}
                {eventsAll?.map((eventDay, index) => {
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  };
                  //const formattedDate = eventDay.start.toLocaleDateString(undefined, options);
                  const formattedDate = "Postings";
                  //const [isPaymentExpanded, setIsPaymentExpanded] = useState(true)
                  let isPaymentExpanded = true;
                  const count =
                    eventDay.jobsOwnByYouCount +
                    eventDay.jobsBookedByYouCount +
                    eventDay.jobRequestForyouCount +
                    eventDay.postedJobsByYouCount +
                    eventDay.postedJobsCount;
                  const toggleIsWorkflowExpand = (id) => {
                    //setIsPaymentExpanded(!isPaymentExpanded)
                    isPaymentExpanded = !isPaymentExpanded;
                  };

                  return (
                    <>
                      <Collapse
                        size="small"
                        onChange={toggleIsWorkflowExpand}
                        defaultActiveKey={formattedDate}
                      >
                        <Panel
                          key={formattedDate}
                          header={
                            <Space.Compact
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "30px",
                              }}
                            >
                              <h4 style={{ width: "95%", textAlign: "center" }}>
                                {/* <span style={{  width: '100%' , alignItems: 'center' , backgroundColor : 'blue'}}> */}
                                {formattedDate}
                                {/* </span> */}
                              </h4>
                              {isPaymentExpanded ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </Space.Compact>
                          }
                          showArrow={false}
                          size="small"
                        >
                          <div>
                            <DataTable
                              columns={columns}
                              data={eventDay.event}
                              expandableRows
                              expandOnRowClicked
                              expandableRowsComponent={ExpandableTable}
                              pagination
                              striped
                              paginationPerPage={size} // Number of items per page
                              paginationRowsPerPageOptions={[2, 5, 10]}
                              paginationDefaultPage={currentPagePostAll + 1}
                              paginationTotalRows={Math.ceil(count) || 1}
                              //paginationComponentOptions={paginationOptions}
                              className="react-dataTable"
                              paginationComponent={CustomPagination}
                              subHeaderComponent={
                                <div className="datatable-subHeader">
                                  {/* <h1>Payments</h1>
                                 <OutlinedInput type="text" className="datatable-input" /> */}
                                </div>
                              }
                            />

                            {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(count / size)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(e) => handlePageChange(e)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          /> */}
                          </div>
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
        </>
      )}

      {/* posted by you */}

      {isyourPostSelected && (
        <>
          {eventsAll.length > 0 &&
            isyourPostSelected != undefined &&
            isyourPostSelected && (
              <>
                {console.log(
                  "Into Listing Data Tables1111 ",
                  eventsAll,
                  isyourPostSelected
                )}
                {eventsAll?.map((eventDay, index) => {
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  };
                  //const formattedDate = eventDay.start.toLocaleDateString(undefined, options);
                  const formattedDate = 'Your Posting';
                  //const [isPaymentExpanded, setIsPaymentExpanded] = useState(true)
                  let isPaymentExpanded = true;
                  const count =
                    eventDay.jobsOwnByYouCount +
                    eventDay.jobsBookedByYouCount +
                    eventDay.jobRequestForyouCount +
                    eventDay.postedJobsByYouCount +
                    eventDay.postedJobsCount;
                  const toggleIsWorkflowExpand = (id) => {
                    //setIsPaymentExpanded(!isPaymentExpanded)
                    isPaymentExpanded = !isPaymentExpanded;
                  };

                  return (
                    <>
                      <Collapse
                        size="small"
                        onChange={toggleIsWorkflowExpand}
                        defaultActiveKey={eventDay.start}
                      >
                        <Panel
                          key={eventDay.start}
                          header={
                            <Space.Compact
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "30px",
                              }}
                            >
                              <h4 style={{ width: "95%", textAlign: "center" }}>
                                {/* <span style={{  width: '100%' , alignItems: 'center' , backgroundColor : 'blue'}}> */}
                                {formattedDate}
                                {/* </span> */}
                              </h4>
                              {isPaymentExpanded ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </Space.Compact>
                          }
                          showArrow={false}
                          size="small"
                        >
                          <DataTable
                            columns={columns}
                            data={eventDay.event}
                            expandableRows
                            expandOnRowClicked
                            expandableRowsComponent={ExpandableTable}
                            pagination
                            paginationPerPage={size} // Number of items per page
                            paginationRowsPerPageOptions={[2, 5, 10]}
                            paginationTotalRows={Math.ceil(count) || 1}
                            paginationComponentOptions={paginationOptions}
                          />
                          {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(count / size)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          /> */}
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
        </>
      )}


      {/* requests */}


      {isRequestedSelected && (
        <>
          {events.length > 0 &&
            isRequestedSelected != undefined &&
            isRequestedSelected && (
              <>
                {console.log(
                  "Into Listing Data Tables1111 ",
                  events,
                  isyourPostSelected
                )}
                {events?.map((eventDay, index) => {
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  };
                  //const formattedDate = eventDay.start.toLocaleDateString(undefined, options);
                  const formattedDate = eventDay.displayDate;
                  //const [isPaymentExpanded, setIsPaymentExpanded] = useState(true)
                  let isPaymentExpanded = true;
                  const count =
                    eventDay.jobsOwnByYouCount +
                    eventDay.jobsBookedByYouCount +
                    eventDay.jobRequestForyouCount +
                    eventDay.postedJobsByYouCount +
                    eventDay.postedJobsCount;
                  const toggleIsWorkflowExpand = (id) => {
                    //setIsPaymentExpanded(!isPaymentExpanded)
                    isPaymentExpanded = !isPaymentExpanded;
                  };

                  return (
                    <>
                      <Collapse
                        size="small"
                        onChange={toggleIsWorkflowExpand}
                        defaultActiveKey={eventDay.start}
                      >
                        <Panel
                          key={eventDay.start}
                          header={
                            <Space.Compact
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "30px",
                              }}
                            >
                              <h4 style={{ width: "95%", textAlign: "center" }}>
                                {/* <span style={{  width: '100%' , alignItems: 'center' , backgroundColor : 'blue'}}> */}
                                {formattedDate}
                                {/* </span> */}
                              </h4>
                              {isPaymentExpanded ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </Space.Compact>
                          }
                          showArrow={false}
                          size="small"
                        >
                          <DataTable
                            columns={columns}
                            data={eventDay.event}
                            expandableRows
                            expandOnRowClicked
                            expandableRowsComponent={ExpandableTable}
                            pagination
                            paginationPerPage={size} // Number of items per page
                            paginationRowsPerPageOptions={[2, 5, 10]}
                            paginationTotalRows={(Math.ceil(count) || 1)}
                            paginationComponentOptions={paginationOptions}
                          />
                          {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(count / size)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          /> */}
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
        </>
      )}


      {/* bookings */}


      {isBookingSelected && (
        <>
          {events.length > 0 &&
            isBookingSelected != undefined &&
            isBookingSelected && (
              <>
                {console.log(
                  "Into Listing Data Tables1111 ",
                  events,
                  isyourPostSelected
                )}
                {events?.map((eventDay, index) => {
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  };
                  //const formattedDate = eventDay.start.toLocaleDateString(undefined, options);
                  const formattedDate = eventDay.displayDate;
                  //const [isPaymentExpanded, setIsPaymentExpanded] = useState(true)
                  let isPaymentExpanded = true;
                  const count =
                    eventDay.jobsOwnByYouCount +
                    eventDay.jobsBookedByYouCount +
                    eventDay.jobRequestForyouCount +
                    eventDay.postedJobsByYouCount +
                    eventDay.postedJobsCount;
                  const toggleIsWorkflowExpand = (id) => {
                    //setIsPaymentExpanded(!isPaymentExpanded)
                    isPaymentExpanded = !isPaymentExpanded;
                  };

                  return (
                    <>
                      <Collapse
                        size="small"
                        onChange={toggleIsWorkflowExpand}
                        defaultActiveKey={eventDay.start}
                      >
                        <Panel
                          key={eventDay.start}
                          header={
                            <Space.Compact
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "30px",
                              }}
                            >
                              <h4 style={{ width: "95%", textAlign: "center" }}>
                                {/* <span style={{  width: '100%' , alignItems: 'center' , backgroundColor : 'blue'}}> */}
                                {formattedDate}
                                {/* </span> */}
                              </h4>
                              {isPaymentExpanded ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </Space.Compact>
                          }
                          showArrow={false}
                          size="small"
                        >
                          <DataTable
                            columns={columns}
                            data={eventDay.event}
                            expandableRows
                            expandOnRowClicked
                            expandableRowsComponent={ExpandableTable}
                            pagination
                            paginationPerPage={size} // Number of items per page
                            paginationRowsPerPageOptions={[2, 5, 10]}
                            paginationTotalRows={(Math.ceil(count) || 1)}
                            paginationComponentOptions={paginationOptions}
                          />
                          {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(count / size)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          /> */}
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
        </>
      )}



      {/* booking for ads */}

      {isyourPostBookSelected && (
        <>
          {events.length > 0 &&
            isyourPostBookSelected != undefined &&
            isyourPostBookSelected && (
              <>
                {console.log(
                  "Into Listing Data Tables1111 ",
                  events,
                  isyourPostSelected
                )}
                {events?.map((eventDay, index) => {
                  const options = {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  };
                  //const formattedDate = eventDay.start.toLocaleDateString(undefined, options);
                  const formattedDate = eventDay.displayDate;
                  //const [isPaymentExpanded, setIsPaymentExpanded] = useState(true)
                  let isPaymentExpanded = true;
                  const count =
                    eventDay.jobsOwnByYouCount +
                    eventDay.jobsBookedByYouCount +
                    eventDay.jobRequestForyouCount +
                    eventDay.postedJobsByYouCount +
                    eventDay.postedJobsCount;
                  const toggleIsWorkflowExpand = (id) => {
                    //setIsPaymentExpanded(!isPaymentExpanded)
                    isPaymentExpanded = !isPaymentExpanded;
                  };

                  return (
                    <>
                      <Collapse
                        size="small"
                        onChange={toggleIsWorkflowExpand}
                        defaultActiveKey={eventDay.start}
                      >
                        <Panel
                          key={eventDay.start}
                          header={
                            <Space.Compact
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "30px",
                              }}
                            >
                              <h4 style={{ width: "95%", textAlign: "center" }}>
                                {/* <span style={{  width: '100%' , alignItems: 'center' , backgroundColor : 'blue'}}> */}
                                {formattedDate}
                                {/* </span> */}
                              </h4>
                              {isPaymentExpanded ? (
                                <CaretUpOutlined />
                              ) : (
                                <CaretDownOutlined />
                              )}
                            </Space.Compact>
                          }
                          showArrow={false}
                          size="small"
                        >
                          <DataTable
                            columns={columns}
                            data={eventDay.event}
                            expandableRows
                            expandOnRowClicked
                            expandableRowsComponent={ExpandableTable}
                            pagination
                            paginationPerPage={size} // Number of items per page
                            paginationRowsPerPageOptions={[2, 5, 10]}
                            paginationTotalRows={(Math.ceil(count) || 1)}
                            paginationComponentOptions={paginationOptions}
                          />
                          {/* <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(count / size)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                          /> */}
                        </Panel>
                      </Collapse>
                    </>
                  );
                })}
              </>
            )}
        </>
      )}
      {/* <CommentForm /> */}
    </>
  );
};

export default JobListView;