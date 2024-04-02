import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Popup from "react-popup";
import { Select, Space, InputNumber } from 'antd';

import {
  fetchEvents,
  pastEvents,
  upcomingEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  currentMonth,
  currentSelection,
} from "./jobCalendarEvents";

import "./style.scss";
import jobCalendarToolbar from "./jobCalendarToolbar";
import JobCalendarToolbar from "./jobCalendarToolbar";
import DownArrow from "../../../assets/images/common/down_arrow.png";

const localizer = momentLocalizer(moment);

function JobCalendarView(props) {
  const [currentMonth, setCurrentMonth] = useState(moment().format("MMMM"));
  const [currentDate, setCurrentDate] = useState(
    props.startDate === undefined ? new Date() : props.startDate
  );
  const [events, setEvents] = useState([]);

  const [isPostallSelected, setIsPostallSelected] = useState(false);
  const [isRequestedSelected, setIsRequestedSelected] = useState(false);
  const [isBookingSelected, setIsBookingSelected] = useState(true);
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

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  useEffect(() => {
    let curDate = props.startDate === undefined ? new Date() : props.startDate;
    setCurrentDate(curDate);

    setCurrentMonth(moment(curDate).format("MMMM"));
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

    console.log("Fetch Eve :::", pro);

    let res = fetchEvents(firstDayOfMonth, lastDayOfMonth, pro, setEvents);
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

    console.log("Fetch Eve :::", pro);

    let res = fetchEvents(firstDayOfMonth, lastDayOfMonth, pro, setEvents);
    console.log("IntoUseEffectJobCalendarView", currentDate, res);

    //setEvents(res.payload)
    //props.fetchEvents();
  }, []); // Empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    setCurrentMonth(moment(currentDate).format("MMMM"));
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

    console.log("Fetch Eve1222 :::", pro);

    let res = fetchEvents(firstDayOfMonth, lastDayOfMonth, pro, setEvents);
    console.log("IntoUseEffectJobCalendarView", currentDate, res);

    //setEvents(res.payload)
    //props.fetchEvents();
  }, [
    isPostallSelected,
    isRequestedSelected,
    isBookingSelected,
    isyourPostSelected,
    isyourPostBookSelected,
  ]); // Empty dependency array ensures the effect runs once on mount

  const currentMonthV = (date) => {
    setCurrentMonth(moment(date).format("MMMM"));
  };

  const handleSelectChange = (value) => {
    console.log('SELECT CHANGE' , value)
    
 };

  // Function to handle month change and fetch events
  const handleNavigate = (date, view) => {
    // Check if the view has changed to 'month'
    console.log("Into HandleNavigate :: ", date, view);
    if (view === "month") {
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

      console.log("Fetch Eve :::", pro);
      let res = fetchEvents(start, end, pro, setEvents);
    }
  };

  const fetchEve = (isSelected, type) => {
    const start = moment(currentDate).startOf("month").toDate();
    const end = moment(currentDate).endOf("month").toDate();
    let pro = { ...props };
    pro.isPostallSelected =
      type === "ALL-POST" ? isSelected : isPostallSelected;
    pro.isRequestedSelected =
      type === "REQUESTED" ? isSelected : isRequestedSelected;
    pro.isBookingSelected =
      type === "YOUR-BOOK" ? isSelected : isBookingSelected;
    pro.isyourPostSelected =
      type === "YOUR-POST" ? isSelected : isyourPostSelected;
    pro.isyourPostBookSelected =
      type === "BOOK-POST" ? isSelected : isyourPostBookSelected;

    console.log("Fetch Eveqweqwe :::", pro, type, isSelected);
    // Fetch events for the new month
    // fetchEvents(start, end);
    let res = fetchEvents(start, end, pro, setEvents);
  };

  const renderDropdownMenu = (event) => {
    return (
      <>
      {console.log('Into DropDown Menu ' , event)}
        
      </>
      
    );
  };

  const handleDropdownClose = () => {
    //setSelectedValue(`Min: ${formatNumber(minValue)}, Max: ${formatNumber(maxValue)}`);
  };

  const renderEvent = ({ event }) => {
    const eventColors = {
      POSTED_JOBS: "#C1B11C",
      REQUESTED_JOBS: "#2C73DE",
      JOB_BOOKED_BY_YOU: "#1CC19A",
      POSTED_BY_YOU: "#F94DC8",
      JOB_YOU_OWN: "#008000",
    };

    return (
      <>
        <div
          className="custom-event"
          style={{
            backgroundColor: eventColors[event.type],
            flex: "90%",
            height: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            textDecoration: "underline",
            display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
          }}
        >
           <div>{event.title}</div>
  <div style={{ paddingRight: "10px" }}>{event.count > 0 ? '+ ' + event.count : ""}
  </div>
  {/* {event.count > 0 && (
  <Select
        value={'+ ' + event.count }
        //defaultValue = 'ALL'
        onChange={handleSelectChange}
        dropdownRender={() => renderDropdownMenu(event)} 
        onBlur={handleDropdownClose}
        options={props.options}
        getOptionLabel={props.getOptionLabel}
        sx={{
            textAlign: 'center',
            ...props.sx,
           
          }}
          disabled = {false}
      >
      </Select>
  ) } */}
  
          {/* {event.title} 
          <span style = {{textAlign: "right"}}>
          {event.count > 0 ? '+ ' + event.count : ""}
          </span> */}
        </div>
        {/* <div className="custom-event" style={{ flex: '5%', display: 'flex', alignItems: 'center' , height: '100%', fontSize: '12px', fontWeight: 'bold' }}>
          +{event.count}
          {(event.count > 0) &&
            (<img src={DownArrow} alt="show-hide" style={{ marginLeft: '4px' }}  />)
          }
        </div> */}
      </>
    );
  };

  const onClickEvents = (type) => {
    console.log("Into OnClick Events", type, "TEST");
    switch (type) {
      case "ALL-POST":
        setIsPostallSelected(!isPostallSelected);
        break;
      case "REQUESTED":
        setIsRequestedSelected(!isRequestedSelected);
        break;
      case "YOUR-BOOK":
        setIsBookingSelected(!isBookingSelected);
        break;
      case "YOUR-POST":
        setIsYourPostSelected(!isyourPostSelected);
        console.log("Into OnClick EventsYourPost", type);
        break;
      case "BOOK-POST":
        setIsYourPostBookSelected(!isyourPostBookSelected);
        console.log("Into OnClick EventsbookPost", type);
        break;
      default:
        break;
    }
  };

  const onClickPrevious = () => {
    this.navigate.bind(null, navigate.PREVIOUS);
  };

  const onSelectEventHandler = (slotInfo) => {
    console.log('Into OnSelectEventHandler' , slotInfo) 

  }
  const onSelectEventSlotHandler = (slotInfo) => {
    console.log('Into onSelectEventSlotHandler' , slotInfo)
    //openPopupForm(slotInfo)
  }

  const openPopupForm = (slotInfo) => {
    let newEvent = false;
    let popupTitle = "Update Event";
    if(!slotInfo.hasOwnProperty('id')) {
        slotInfo.id = moment().format('x');  //Generate id with Unix Millisecond Timestamp
        slotInfo.title = null;
        slotInfo.location = null;
        popupTitle = "Create Event";
        newEvent = true;
    }

    let titleChange = function (value) {
        slotInfo.title = value;
    };
    let locationChange = function (value) {
        slotInfo.location = value;
    };
    
    Popup.create({
        title: popupTitle,
        content: <div>
                    <Input onChange={titleChange} placeholder="Post Event" defaultValue={slotInfo.title} />
                    <Input onChange={locationChange} placeholder="Event Location" defaultValue={slotInfo.location} />
                </div>,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                className: 'success',
                action: function () {
                    //CHECK THE ID PROPERTY FOR CREATE/UPDATE
                    if(newEvent) {
                        this.props.createEvent(slotInfo); //EVENT CREATE ACTION
                    } else {
                        this.props.updateEvent(slotInfo); //EVENT UPDATE ACTION
                    }
                    Popup.close();
                }.bind(this)
            }]
        }
    });
}

  const renderCalendarToolBar = ({ props }) => {
    console.log("Into Priod Render Calendar toolBar", props);

    useEffect(() => {
      //setEvents(res.payload)
      //props.fetchEvents();
    }, []); // Empty dependency array ensures the effect runs once on mount

    const navigate = (action) => {
      this.props.onNavigate(action);
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {/* <button type="button" className="btn btn-control" onClick={(e) => this.onClickPrevious('ALL-POST')}><i className="fa fa-arrow-left"></i> Prev</button> */}
          <button
            type="button"
            className="btn btn-control"
            onClick={handleNavigate(
              new Date().setDate(currentDate.getDate() - 30),
              "month"
            )}
          >
            <i className="fa fa-arrow-left"></i> Prev
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className="btn btn-control"
            onClick={handleNavigate(
              new Date().setDate(currentDate.getDate() + 30),
              "month"
            )}
          >
            Next<i className="fa fa-arrow-right"></i>
          </button>
        </span>
        <span className="rbc-toolbar-label">{currentMonth}</span>
        <span className="rbc-btn-group">
          <button type="button" onClick={(e) => onClickEvents("ALL-POST")}>
            All Posting
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-requested ${
              isRequestedSelected ? "selected" : ""
            }`}
            onClick={(e) => onClickEvents("REQUESTED")}
          >
            Requested
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-booking ${
              isBookingSelected ? "selected" : ""
            }`}
            onClick={(e) => onClickEvents("YOUR-BOOK")}
          >
            YourBook
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-yourpost ${
              isyourPostSelected ? "selected" : ""
            }`}
            onClick={(e) => onClickEvents("YOUR-POST")}
          >
            Posted By You
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-postbook ${
              isyourPostBookSelected ? "selected" : ""
            }`}
            onClick={(e) => onClickEvents("BOOK-POST")}
          >
            PostBook
          </button>
        </span>
      </div>
    );
  };

  // const onClickPrevious = () => {

  //   this.navigate.bind(null, navigate.PREVIOUS)
  // };

  // const renderCalendarToolBar = ({ props }) => {

  //   console.log('Into Priod Render Calendar toolBar', props)

  //   useEffect(() => {

  //     //setEvents(res.payload)
  //     //props.fetchEvents();
  //   }, []); // Empty dependency array ensures the effect runs once on mount

  //   const navigate = action => {
  //     this.props.onNavigate(action)
  //   }
  //   return (

  //     <div className="rbc-toolbar">
  //       <span className="rbc-btn-group">
  //         {/* <button type="button" className="btn btn-control" onClick={(e) => this.onClickPrevious('ALL-POST')}><i className="fa fa-arrow-left"></i> Prev</button> */}
  //         <button type="button" className="btn btn-control" onClick={handleNavigate(new Date().setDate(currentDate.getDate() - 30), "month")}><i className="fa fa-arrow-left"></i> Prev</button>

  //       </span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className="btn btn-control" onClick={handleNavigate(new Date().setDate(currentDate.getDate() + 30), "month")}>Next <i className="fa fa-arrow-right"></i></button>
  //       </span>
  //       <span className="rbc-toolbar-label">{currentMonth}</span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className={` btn btn-postall ${isPostallSelected ? 'selected' : ''}`} onClick={(e) => onClickEvents('ALL-POST')}>All Posting</button>
  //       </span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className={` btn btn-requested ${isRequestedSelected ? 'selected' : ''}`} onClick={(e) => onClickEvents('REQUESTED')}>Requested</button>
  //       </span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className={` btn btn-booking ${isBookingSelected ? 'selected' : ''}`} onClick={(e) => onClickEvents('YOUR-BOOK')}>YourBook</button>
  //       </span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className={` btn btn-yourpost ${isyourPostSelected ? 'selected' : ''}`} onClick={(e) => onClickEvents('YOUR-POST')}>Posted By You</button>
  //       </span>
  //       <span className="rbc-btn-group">
  //         <button type="button" className={` btn btn-postbook ${isyourPostBookSelected ? 'selected' : ''}`} onClick={(e) => onClickEvents('BOOK-POST')}>PostBook</button>
  //       </span>
  //     </div>
  //   );
  // };

  // Rest of your component code...

  return (
    <div className="calendar-container">
      <Calendar
        popup
        selectable
        localizer={localizer}
        defaultView={"month"}
        //components={{ event: renderEvent, toolbar: jobCalendarToolbar }}
        components={{
          event: renderEvent,
          toolbar: (toolbarProps) => (
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
              fetchEve={fetchEve}
              {...toolbarProps} // Spread the props required by the JobCalendarToolbar
            />
          ),
        }}
        //components={{ event: renderEvent, toolbar: renderCalendarToolBar }}
        views={["month"]}
        style={{ height: 600 }}
        events={events}
        //eventPropGetter={eventStyleGetter}
        onSelectEvent={(slotInfo) => onSelectEventHandler(slotInfo)}
        onSelectSlot={(slotInfo) => onSelectEventSlotHandler(slotInfo)}
        startAccessor="start"
        endAccessor="end"
        onNavigate={handleNavigate}
      />
      <Popup />
    </div>
  );
}

// function mapStateToProps(state) {
//   console.log("Into MapStateTo Props " , state)
//   return {
//     events: state.events,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       fetchEvents,
//       createEvent,
//       updateEvent,
//       deleteEvent,
//     },
//     dispatch
//   );
// }
export default JobCalendarView;
// export default connect(mapStateToProps, mapDispatchToProps)(JobCalendarView);
