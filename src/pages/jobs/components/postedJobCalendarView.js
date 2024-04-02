import { Box, Grid, Stack } from "@mui/material";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SimpleImageSlider from "react-simple-image-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/images/platformIcons/Instagram.png";
import DemoCarousel from "./ImageSlider";
import DemoSlider from "./ImageSlider";
import rentalService from "../../../services/rentalService";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import './style.scss';

const PostedJobCalendarView = () => {
  const [a, setA] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);
  const [data, setData] = useState([]);
  const localizer = momentLocalizer(moment);

  const events = [
    {
      id: 1, // Unique identifier for the event
      title: 'Event 1',
      start: new Date(2023, 8, 5, 10, 0), // Start date and time
      end: new Date(2023, 8, 5, 12, 0),   // End date and time
      type: 'All Posting', // Event type (e.g., 'All Posting', 'Requested', etc.)
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 8, 10, 14, 0),
      end: new Date(2023, 8, 10, 16, 0),
      type: 'Requested',
    },
    // Add more events as needed
  ];
  
  useEffect(() => {
    getPostedJobList();
  }, []);

  const getPostedJobList = () => {
    setOptionLoading(true);
    rentalService
      .postedJobList()
      .then((res) => {
        if (res.data.message) {
          setData(res.data.message.postedJobs);
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

  const columns = [
    {
      name: "",
      sortable: true,
      width: "30%",
      selector: (row) => {
        return (
          <Box>
            <div className="tag-list">
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

  // Function to fetch events from the backend API based on the start and end dates
  const fetchEvents = (start, end) => {
    // Make an API request to fetch events based on the start and end dates
    // You can use a library like axios or fetch for this purpose
    // Example:
    /*
    axios.get(`/api/events?start=${start}&end=${end}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
    */
  };

  // Function to handle month change and fetch events
  const handleNavigate = (date, view) => {
    // Check if the view has changed to 'month'
    if (view === 'month') {
      const start = moment(date).startOf('month').toDate();
      const end = moment(date).endOf('month').toDate();

      // Fetch events for the new month
      fetchEvents(start, end);
    }
  };

  const renderEvent = ({ event }) => {
    const eventColors = {
      'All Posting': '#C1B11C',
      'Requested': '#2C73DE',
      'Your Booking': '#1CC19A',
      'Posted by You': '#F94DC8',
      'Booking for Ads': '#008000',
    };

    return (
      <div
        className="custom-event"
        style={{ backgroundColor: eventColors[event.type] }}
      >
        {event.title}
      </div>
    );
  };

  useEffect(() => {
    // Fetch events for the initial view (e.g., the current month) when the component mounts
    const currentDate = moment().toDate();
    const start = moment(currentDate).startOf('month').toDate();
    const end = moment(currentDate).endOf('month').toDate();
    fetchEvents(start, end);
  }, []); // Empty dependency array to fetch events only once on component mount

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        components={{
          event: renderEvent,
        }}
        popup
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default PostedJobCalendarView;
