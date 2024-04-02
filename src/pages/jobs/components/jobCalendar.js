import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './JobCalendar.scss'; // You can create this CSS file for custom styling

const localizer = momentLocalizer(moment);

const JobCalender = (props) => {
  const [events, setEvents] = useState([]); // State to store events

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

export default JobCalender;