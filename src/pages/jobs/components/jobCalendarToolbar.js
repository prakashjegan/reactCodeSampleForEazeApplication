import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, pastEvents, upcomingEvents } from "./jobCalendarEvents";
import { log } from "@antv/g2plot/lib/utils";
//import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css'

const navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE",
};

const styles = {
  selectedButton: {
    boxShadow: "1px 1px 10px 0px blue",
  },
};

class JobCalendarToolbar extends Component {
  onClickAllEvents() {
    this.props.fetchEvents();
  }

  onClickPastEvents() {
    this.props.pastEvents();
  }

  onClickUpcomingEvents() {
    this.props.upcomingEvents();
  }

  onClickEvents(type) {
    
    console.log(this.props.isPostallSelected);
    console.log(this.props.isRequestedSelected);
    console.log(this.props.isBookingSelected);

    console.log(this.props.isyourPostBookSelected);
    console.log(this.props.isyourPostSelected);
    console.log("Into OnClick Events", type, this.props);
    let vl = false;
    let vl1 = false;
    let vl2 = false;
    let vl3 = false;
    let vl4 = false;

    switch (type) {
      case "ALL-POST":
        //vl = !this.props.isPostallSelected;
        vl = true
        this.props.setIsPostallSelected(vl);
        this.props.fetchEve(vl, type);
        this.props.setIsRequestedSelected(false);
        this.props.setIsBookingSelected(false);
        this.props.setIsYourPostSelected(false);
        this.props.setIsYourPostBookSelected(false);

        break;
      case "REQUESTED":
        this.setState({ selectedView: "REQUESTED" });
        //vl1 = !this.props.isRequestedSelected;
        vl1 = true
        this.props.setIsRequestedSelected(vl1);
        this.props.fetchEve(vl1, type);
        this.props.setIsPostallSelected(false);
        this.props.setIsBookingSelected(false);
        this.props.setIsYourPostSelected(false);
        this.props.setIsYourPostBookSelected(false);
        break;
      case "YOUR-BOOK":
        //vl2 = !this.props.isBookingSelected;
        vl2 = true
        console.log(this.props.isBookingSelected);
        this.props.setIsBookingSelected(vl2);
        this.props.fetchEve(vl2, type);
        this.props.setIsRequestedSelected(false);
        this.props.setIsPostallSelected(false);
        this.props.setIsYourPostSelected(false);
        this.props.setIsYourPostBookSelected(false);
        break;
      case "YOUR-POST":
        // console.log(this.props.isyourPostBookSelected);
        // this.props.setIsYourPostSelected(vl3);
        // this.props.fetchEve(vl3, type);
        // this.props.setIsRequestedSelected(true);
        // this.props.setIsBookingSelected(true);
        // this.props.setIsPostallSelected(true);
        // this.props.setIsYourPostBookSelected(false);



        //vl3 = !this.props.isyourPostSelected;
        vl3 = true
        console.log("See");
        console.log(vl3);
        this.props.setIsYourPostSelected(vl3);
        this.props.fetchEve(vl, type);
        this.props.setIsRequestedSelected(false);
        this.props.setIsBookingSelected(false);
        this.props.setIsPostallSelected(false);
        this.props.setIsYourPostBookSelected(false);
        console.log("Into OnClick EventsYourPost", type);

        break;
      case "BOOK-POST":
        //vl2 = !this.props.isYourPostBookSelected;
        vl4 = true
        console.log(this.props.isYourPostBookSelected);
        console.log("Into OnClick EventsYourPost", type , this.props);

        this.props.setIsYourPostBookSelected(vl4);
        this.props.fetchEve(vl4, type);
        this.props.setIsRequestedSelected(false);
        this.props.setIsPostallSelected(false);
        this.props.setIsYourPostSelected(false);
        this.props.setIsBookingSelected(false);
        console.log("Into OnClick EventsYourPost", type);

        break;
      default:
        break;
    }
  }

  onClickPrevious() {
    this.navigate.bind(null, navigate.PREVIOUS);
  }

  render() {
    let {
      //localizer:  { messages },
      label,
    } = this.props;
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {/* <button type="button" className="btn btn-control" onClick={(e) => this.onClickPrevious('ALL-POST')}><i className="fa fa-arrow-left"></i> Prev</button> */}
          <button
            type="button"
            className="btn btn-control"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <i className="fa fa-arrow-left"></i> Prev
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className="btn btn-control"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            Next <i className="fa fa-arrow-right"></i>
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        {console.log('Into this.props.isPostallSelected' , this.props.isPostallSelected)}
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-postall ${
              this.props.isPostallSelected ? "selected" : ""
            }`}
            onClick={(e) => this.onClickEvents("ALL-POST")}
            style={this.props.isPostallSelected ? styles.selectedButton : {}}
          >
            All Posting
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-requested ${
              this.props.isRequestedSelected ? "selected" : ""
            }`}
            onClick={(e) => this.onClickEvents("REQUESTED")}
            style={this.props.isRequestedSelected ? styles.selectedButton : {}}
          >
            Requested
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-booking ${
              this.props.isBookingSelected ? "selected" : ""
            }`}
            onClick={(e) => this.onClickEvents("YOUR-BOOK")}
            style={this.props.isBookingSelected ? styles.selectedButton : {}}
          >
            YourBook
          </button>
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-yourpost ${
              this.props.isyourPostSelected ? "selected" : ""
            }`}
            onClick={(e) => this.onClickEvents("YOUR-POST")}
            style={this.props.isyourPostSelected ? styles.selectedButton : {}}
          >
            Posted By You
          </button>
        </span>
        {console.log('Into this.props.isyourPostBookSelected' , this.props.isyourPostBookSelected , this.props)}
        <span className="rbc-btn-group">
          <button
            type="button"
            className={` btn btn-postbook ${
              this.props.isyourPostBookSelected ? "selected" : ""
            }`}
            onClick={(e) => this.onClickEvents("BOOK-POST")}
            style={
              this.props.isyourPostBookSelected ? styles.selectedButton : {}
            }
          >
            PostBook
          </button>
        </span>
      </div>
    );
  }
  navigate = (action) => {
    this.props.onNavigate(action);
  };
}

function mapStateToProps(state) {
  return {
    events: state.events,
    // setIsPostallSelected  : state.setIsPostallSelected ,
    // setIsRequestedSelected  : state.setIsRequestedSelected ,
    // setIsBookingSelected  : state.setIsBookingSelected ,
    // setIsYourPostSelected  : state.setIsYourPostSelected ,
    // setIsYourPostBookSelected  : state.setIsYourPostBookSelected ,
    // isPostallSelected  : state.isPostallSelected ,
    // isRequestedSelected  : state.isRequestedSelected ,
    // isBookingSelected  : state.isBookingSelected ,
    // isYourPostSelected  : state.isyourPostSelected ,
    // isYourPostBookSelected  : state.isyourPostBookSelected ,
    // fetchEve   :  state.fetchEve,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchEvents,
      pastEvents,
      upcomingEvents,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCalendarToolbar);

//NEW
// import React, { useState, useEffect } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { fetchEvents, pastEvents, upcomingEvents } from './jobCalendarEvents';

// const navigate = {
//   PREVIOUS: 'PREV',
//   NEXT: 'NEXT',
//   TODAY: 'TODAY',
//   DATE: 'DATE',
// };

// const JobCalendarToolbar = ({ localizer, label , props }) => {
//   const [isPostallSelected, setIsPostallSelected] = useState(true);
//   const [isRequestedSelected, setIsRequestedSelected] = useState(true);
//   const [isBookingSelected, setIsBookingSelected] = useState(true);
//   const [isyourPostSelected, setIsYourPostSelected] = useState(true);
//   const [isyourPostBookSelected, setIsYourPostBookSelected] = useState(true);

//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events);

//   useEffect(() => {
//     // You can add any necessary side effects here
//   }, []);

//   const onClickAllEvents = () => {
//     dispatch(fetchEvents());
//   };

//     navigate = action => {
//         this.props.onNavigate(action)
//     }

//   const onClickPastEvents = () => {
//     dispatch(pastEvents());
//   };

//   const onClickUpcomingEvents = () => {
//     dispatch(upcomingEvents());
//   };

//   const onClickEvents = (type) => {
//     console.log('Into OnClick Events', type);
//     switch (type) {
//       case 'ALL-POST':
//         setIsPostallSelected(!isPostallSelected)
//         break;
//       case 'REQUESTED':
//         setIsRequestedSelected(!isRequestedSelected)
//         break;
//       case 'YOUR-BOOK':
//         setIsBookingSelected(!isBookingSelected)
//         break;
//       case 'YOUR-POST':
//         setIsYourPostBookSelected(!isyourPostSelected)
//         break;
//       case 'BOOK-POST':
//         setIsYourPostBookSelected(!isyourPostBookSelected)
//         break;
//       default:
//         break;
//     }
//     dispatch(fetchEvents());
//   };

//   const navigate = (action) => {
//     // Implement your navigate logic here
//   };

//   return (
//     <div className="rbc-toolbar">
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className="btn btn-control"
//           onClick={() => navigate(navigate.PREVIOUS)}
//         >
//           <i className="fa fa-arrow-left"></i> Prev
//         </button>
//       </span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className="btn btn-control"
//           onClick={() => navigate(navigate.NEXT)}
//         >
//           Next <i className="fa fa-arrow-right"></i>
//         </button>
//       </span>
//       <span className="rbc-toolbar-label">{label}</span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className={`btn btn-postall ${isPostallSelected ? 'selected' : ''}`}
//           onClick={() => onClickEvents('ALL-POST')}
//         >
//           All Posting
//         </button>
//       </span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className={`btn btn-requested ${
//             isRequestedSelected ? 'selected' : ''
//           }`}
//           onClick={() => onClickEvents('REQUESTED')}
//         >
//           Requested
//         </button>
//       </span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className={`btn btn-booking ${isBookingSelected ? 'selected' : ''}`}
//           onClick={() => onClickEvents('YOUR-BOOK')}
//         >
//           YourBook
//         </button>
//       </span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className={`btn btn-yourpost ${
//             isyourPostSelected ? 'selected' : ''
//           }`}
//           onClick={() => onClickEvents('YOUR-POST')}
//         >
//           Posted By You
//         </button>
//       </span>
//       <span className="rbc-btn-group">
//         <button
//           type="button"
//           className={`btn btn-postbook ${
//             isyourPostBookSelected ? 'selected' : ''
//           }`}
//           onClick={() => onClickEvents('BOOK-POST')}
//         >
//           PostBook
//         </button>
//       </span>
//     </div>
//   );
// };

// export default JobCalendarToolbar;
