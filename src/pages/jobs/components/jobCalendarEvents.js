import _ from 'lodash';
import moment from 'moment';
import { myPartnerId } from '../../../config/variables';
import rentalService from '../../../services/rentalService';

//EXPORT ALL ACTION TYPES
export const FETCH_EVENTS = 'fetch_events';
export const CREATE_EVENT = 'create_event';
export const UPDATE_EVENT = 'update_event';
export const DELETE_EVENT = 'delete_event';
export const PAST_EVENTS = 'past_events';
export const UPCOMING_EVENTS = 'upcoming_events';

//FETCH EVENTS FROM LOCAL STORAGE
export const eventData = [
    {
        id: 1,
        title: 'Board meeting',
        location: 'Dhaka, Bangladesh',
        jobType: 'ALL_POSTING',
        start: new Date(2023, 6, 4, 9, 0, 0),
        end: new Date(2023, 12, 4, 13, 0, 0)
    },
    {
        id: 2,
        title: 'Team lead meeting',
        location: 'Rajshahi, Bangladesh',
        start: new Date(2018, 9, 15, 9, 0, 0),
        end: new Date(2018, 9, 15, 13, 0, 0)
    },
    {
        id: 3,
        title: 'Coxbazar Tour',
        location: 'Coxbazar, Bangladesh',
        start: new Date(2018, 9, 30, 8, 30, 0),
        end: new Date(2018, 9, 30, 12, 30, 0)
    },
    {
        id: 4,
        title: "JoomShaper's Event",
        location: 'Dhanmondi, Dhaka',
        start: new Date(2018, 10, 2, 8, 30, 0),
        end: new Date(2018, 10, 2, 12, 30, 0)
    }
];

export function fetchEvents(startDate, endDate, propVal, setEvents) {
    //TODO : FETCH DATA Via Urls
    console.log("fetch Events:::::: ", startDate, endDate, propVal)

    let fetchLevel = ","
    fetchLevel = fetchLevel + ((!propVal.isPostallSelected) ? '' : 'POSTED_JOBS') + ","
    fetchLevel = fetchLevel + ((!propVal.isyourPostSelected) ? '' : 'POSTED_BY_YOU') + ","
    fetchLevel = fetchLevel + ((!propVal.isRequestedSelected) ? '' : 'REQUESTED_JOBS') + ","
    fetchLevel = fetchLevel + ((!propVal.isBookingSelected) ? '' : 'JOB_BOOKED_BY_YOU') + ","
    fetchLevel = fetchLevel + ((!propVal.isyourPostBookSelected) ? '' : 'JOB_YOU_OWN') + ","
    console.log('Into fetchEvents fetchLevels', fetchLevel)
    if (propVal?.jobCat?.JobType !== undefined) {
        console.log('Into fetchEvents JobTypes ::::', propVal.jobTypes, propVal?.jobCat?.JobType)
        propVal.jobTypes = [propVal?.jobCat?.JobType]
    }
    const payload = {
        "page": (propVal?.page === undefined) ? 1 : propVal?.page,
        "size": (propVal?.size === undefined) ? 20 : propVal?.size,
        // "fetchLevel":"JOB_YOU_OWN,POSTED_JOBS,POSTED_BY_YOU,JOB_BOOKED_BY_YOU,REQUESTED_JOBS",
        //"fetchLevel":"JOB_YOU_OWN,JOB_BOOKED_BY_YOU,REQUESTED_JOBS",
        "fetchLevel": fetchLevel,
        //"fetchLevel": propVal?.fetchLevels,
        "partnerIds": propVal?.partnerIds,
        "startDate": startDate,
        "endDate": endDate,
        "locations": propVal?.locations,
        "category": propVal?.category,
        //"type":["RentalOfStudio", "RentalOfDevices", "RentalOthers", "CameraMan_ByFreelancer", "VideoEditor_ByFreelancer", "Freelance_Others_ByFreelancer", "MeetupWithOutPostingVideo_PostedByInfluencer", "EventsWithPostingVideo_PostedByInfluencer"],
        "type": propVal?.type,
        "platforms": propVal?.platforms,
        "langauges": propVal?.langauges,
        //"jobType":["RentalOfStudio", "RentalOfDevices", "RentalOthers", "CameraMan_ByFreelancer", "VideoEditor_ByFreelancer", "Freelance_Others_ByFreelancer", "MeetupWithOutPostingVideo_PostedByInfluencer", "EventsWithPostingVideo_PostedByInfluencer"],
        "jobType": propVal?.jobTypes
    }

    let events = []
    let eventEv = []
    let eventEvAll = []
    rentalService
        .allRentalJobListing(payload)
        .then((res) => {
            console.log("Into JobCalendarEventsView Fetch Rental Service ::", res.data.message)
            if (res.data.message) {
                // JOB_YOU_OWN,
                // POSTED_JOBS,
                // POSTED_BY_YOU,
                // JOB_BOOKED_BY_YOU,
                // REQUESTED_JOBS
                console.log("Into JobCalendarEventsView Fetch Rental Service Message::", res.data.message)
                let postedJobs = []
                let postedJobsByYou = []
                let jobRequestForyou = []
                let jobsBookedByYou = []
                let jobsOwnByYou = []

                let postedJobsCount = 0
                let postedJobsByYouCount = 0
                let jobRequestForyouCount = 0
                let jobsBookedByYouCount = 0
                let jobsOwnByYouCount = 0

                postedJobsCount = res?.data?.message?.postedJobsCount
                postedJobsByYouCount = res?.data?.message?.postedJobsByYouCount
                jobRequestForyouCount = res?.data?.message?.jobRequestForyouCount
                jobsBookedByYouCount = res?.data?.message?.jobsOwnByYouCount
                jobsOwnByYouCount = res?.data?.message?.jobsOwnByYouCount

                if (res?.data?.message?.postedJobs != undefined) {

                    postedJobs = res.data.message.postedJobs.map((item) => {
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: item.jobName,
                            description: item.jobDescription,
                            logo: '',
                            typeVal: 'POSTED_JOBS',
                            start: item.tentativeStartDate,
                            end: item.tentativeEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service PostedJobs::", postedJobs)
                }
                if (res?.data?.message?.postedJobsByYou != undefined) {
                    postedJobsByYou = res.data.message.postedJobsByYou.map((item) => {
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: item.jobName,
                            description: item.jobDescription,
                            typeVal: 'POSTED_BY_YOU',
                            logo: '',
                            start: item.tentativeStartDate,
                            end: item.tentativeEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service postedJobsByYou::", postedJobsByYou)
                }
                if (res?.data?.message?.jobRequestForyou != undefined) {
                    jobRequestForyou = res.data.message.jobRequestForyou.map((item) => {

                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'REQUESTED_JOBS',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service jobRequestForyou::", jobRequestForyou)
                }
                if (res?.data?.message?.jobsBookedByYou != undefined) {
                    jobsBookedByYou = res?.data?.message?.jobsBookedByYou?.map((item) => {

                        // Add extra fields from array2 and array3
                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName

                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'JOB_BOOKED_BY_YOU',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service jobsBookedByYou::", jobsBookedByYou)

                }

                if (res?.data?.message?.jobsOwnByYou != undefined) {

                    jobsOwnByYou = res.data.message.jobsOwnByYou.map((item) => {
                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName

                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'JOB_YOU_OWN',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                }
                events = [...postedJobs, ...postedJobsByYou, ...jobRequestForyou, ...jobsBookedByYou, ...jobsOwnByYou]
                console.log("Into JobCalendarEventsView Into APP", events)
                //TODO : EachDay Bucket.


                //TODO :
                console.log("Print Events CalendarOldPros", propVal)
                let postEv = (!propVal.isPostallSelected) ? [] : generateCalendarEvents(startDate, endDate, postedJobs, 'POSTED_JOBS')
                let postedJobsByYouEv = (!propVal.isyourPostSelected) ? [] : generateCalendarEvents(startDate, endDate, postedJobsByYou, 'POSTED_BY_YOU')
                let jobRequestForyouEv = (!propVal.isRequestedSelected) ? [] : generateCalendarEvents(startDate, endDate, jobRequestForyou, 'REQUESTED_JOBS')
                let jobsBookedByYouEv = (!propVal.isBookingSelected) ? [] : generateCalendarEvents(startDate, endDate, jobsBookedByYou, 'JOB_BOOKED_BY_YOU')
                let jobsOwnByYouEv = (!propVal.isyourPostBookSelected) ? [] : generateCalendarEvents(startDate, endDate, jobsOwnByYou, 'JOB_YOU_OWN')
                eventEv = [...postEv, ...postedJobsByYouEv, ...jobRequestForyouEv, ...jobsBookedByYouEv, ...jobsOwnByYouEv]

                let postEvAll = (!propVal.isPostallSelected) ? [] : generateCalendarEventsAll(startDate, endDate, postedJobs, 'POSTED_JOBS')
                let postedJobsByYouEvAll = (!propVal.isyourPostSelected) ? [] : generateCalendarEventsAll(startDate, endDate, postedJobsByYou, 'POSTED_BY_YOU')
                let jobRequestForyouEvAll = (!propVal.isRequestedSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobRequestForyou, 'REQUESTED_JOBS')
                let jobsBookedByYouEvAll = (!propVal.isBookingSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobsBookedByYou, 'JOB_BOOKED_BY_YOU')
                let jobsOwnByYouEvAll = (!propVal.isyourPostBookSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobsOwnByYou, 'JOB_YOU_OWN')
                eventEvAll = [...postEvAll, ...postedJobsByYouEvAll, ...jobRequestForyouEvAll, ...jobsBookedByYouEvAll, ...jobsOwnByYouEvAll]


                //setEvents(events)
                //TODO : add Counts in all the list.
                eventEv.forEach((item) => {
                    item.postedJobsCount = (postedJobsCount === undefined) ? 0 : postedJobsCount
                    item.postedJobsByYouCount = (postedJobsByYouCount === undefined) ? 0 : postedJobsByYouCount
                    item.jobRequestForyouCount = (jobRequestForyouCount === undefined) ? 0 : jobRequestForyouCount
                    item.jobsBookedByYouCount = (jobsBookedByYouCount === undefined) ? 0 : jobsBookedByYouCount
                    item.jobsOwnByYouCount = (jobsOwnByYouCount === undefined) ? 0 : jobsOwnByYouCount
                })
                setEvents(eventEv)

                //console.log("Print Events CalendarOld" , events)
                console.log("Print Events Calendar", eventEv)
            }
        })
        .catch(() => {
            //setOptionLoading(false);
        });
    console.log("Into JobCalendarEventsView Return statement", events)
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

export function fetchEventsEvn(startDate, endDate, propVal, setEvents , setAllEvents) {
    //TODO : FETCH DATA Via Urls
    console.log("fetch Events:::::: ", startDate, endDate, propVal)

    let fetchLevel = ","
    fetchLevel = fetchLevel + ((!propVal.isPostallSelected) ? '' : 'POSTED_JOBS') + ","
    fetchLevel = fetchLevel + ((!propVal.isyourPostSelected) ? '' : 'POSTED_BY_YOU') + ","
    fetchLevel = fetchLevel + ((!propVal.isRequestedSelected) ? '' : 'REQUESTED_JOBS') + ","
    fetchLevel = fetchLevel + ((!propVal.isBookingSelected) ? '' : 'JOB_BOOKED_BY_YOU') + ","
    fetchLevel = fetchLevel + ((!propVal.isyourPostBookSelected) ? '' : 'JOB_YOU_OWN') + ","
    console.log('Into fetchEvents fetchLevels', fetchLevel)
    if (propVal?.jobCat?.JobType !== undefined) {
        console.log('Into fetchEvents JobTypes ::::', propVal.jobTypes, propVal?.jobCat?.JobType)
        propVal.jobTypes = [propVal?.jobCat?.JobType]
    }
    const payload = {
        "page": (propVal?.page === undefined) ? 1 : propVal?.page,
        "size": (propVal?.size === undefined) ? 20 : propVal?.size,
        // "fetchLevel":"JOB_YOU_OWN,POSTED_JOBS,POSTED_BY_YOU,JOB_BOOKED_BY_YOU,REQUESTED_JOBS",
        //"fetchLevel":"JOB_YOU_OWN,JOB_BOOKED_BY_YOU,REQUESTED_JOBS",
        "fetchLevel": fetchLevel,
        //"fetchLevel": propVal?.fetchLevels,
        "partnerIds": propVal?.partnerIds,
        "startDate": startDate,
        "endDate": endDate,
        "locations": propVal?.locations,
        "category": propVal?.category,
        //"type":["RentalOfStudio", "RentalOfDevices", "RentalOthers", "CameraMan_ByFreelancer", "VideoEditor_ByFreelancer", "Freelance_Others_ByFreelancer", "MeetupWithOutPostingVideo_PostedByInfluencer", "EventsWithPostingVideo_PostedByInfluencer"],
        "type": propVal?.type,
        "platforms": propVal?.platforms,
        "langauges": propVal?.langauges,
        //"jobType":["RentalOfStudio", "RentalOfDevices", "RentalOthers", "CameraMan_ByFreelancer", "VideoEditor_ByFreelancer", "Freelance_Others_ByFreelancer", "MeetupWithOutPostingVideo_PostedByInfluencer", "EventsWithPostingVideo_PostedByInfluencer"],
        "jobType": propVal?.jobTypes
    }

    let events = []
    let eventEv = []
    let eventEvAll = []
    rentalService
        .allRentalJobListing(payload)
        .then((res) => {
            console.log("Into JobCalendarEventsView Fetch Rental Service ::", res.data.message)
            if (res.data.message) {
                // JOB_YOU_OWN,
                // POSTED_JOBS,
                // POSTED_BY_YOU,
                // JOB_BOOKED_BY_YOU,
                // REQUESTED_JOBS
                console.log("Into JobCalendarEventsView Fetch Rental Service Message::", res.data.message)
                let postedJobs = []
                let postedJobsByYou = []
                let jobRequestForyou = []
                let jobsBookedByYou = []
                let jobsOwnByYou = []

                let postedJobsCount = 0
                let postedJobsByYouCount = 0
                let jobRequestForyouCount = 0
                let jobsBookedByYouCount = 0
                let jobsOwnByYouCount = 0

                postedJobsCount = res?.data?.message?.postedJobsCount
                postedJobsByYouCount = res?.data?.message?.postedJobsByYouCount
                jobRequestForyouCount = res?.data?.message?.jobRequestForyouCount
                jobsBookedByYouCount = res?.data?.message?.jobsOwnByYouCount
                jobsOwnByYouCount = res?.data?.message?.jobsOwnByYouCount

                if (res?.data?.message?.postedJobs != undefined) {

                    postedJobs = res.data.message.postedJobs.map((item) => {
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: item.jobName,
                            description: item.jobDescription,
                            logo: '',
                            typeVal: 'POSTED_JOBS',
                            start: item.tentativeStartDate,
                            end: item.tentativeEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service PostedJobs::", postedJobs)
                }
                if (res?.data?.message?.postedJobsByYou != undefined) {
                    postedJobsByYou = res.data.message.postedJobsByYou.map((item) => {
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: item.jobName,
                            description: item.jobDescription,
                            typeVal: 'POSTED_BY_YOU',
                            logo: '',
                            start: item.tentativeStartDate,
                            end: item.tentativeEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service postedJobsByYou::", postedJobsByYou)
                }
                if (res?.data?.message?.jobRequestForyou != undefined) {
                    jobRequestForyou = res.data.message.jobRequestForyou.map((item) => {

                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName
                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'REQUESTED_JOBS',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service jobRequestForyou::", jobRequestForyou)
                }
                if (res?.data?.message?.jobsBookedByYou != undefined) {
                    jobsBookedByYou = res?.data?.message?.jobsBookedByYou?.map((item) => {

                        // Add extra fields from array2 and array3
                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName

                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'JOB_BOOKED_BY_YOU',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                    console.log("Into JobCalendarEventsView Fetch Rental Service jobsBookedByYou::", jobsBookedByYou)

                }

                if (res?.data?.message?.jobsOwnByYou != undefined) {

                    jobsOwnByYou = res.data.message.jobsOwnByYou.map((item) => {
                        let log1 = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerImageLink : item.posterPartnerImageLink
                        let name = (myPartnerId() === item.posterPartnerId) ? item.acceptorPartnerName : item.posterPartnerName

                        return {
                            ...item,
                            id: item.jobDefinitionId,
                            title: name,
                            description: item.jobName,
                            typeVal: 'JOB_YOU_OWN',
                            logo: log1,
                            start: item.jobStartDate,
                            end: item.jobEndDate
                        };
                    });
                }
                events = [...postedJobs, ...postedJobsByYou, ...jobRequestForyou, ...jobsBookedByYou, ...jobsOwnByYou]
                console.log("Into JobCalendarEventsView Into APP", events)
                //TODO : EachDay Bucket.


                //TODO :
                console.log("Print Events CalendarOldPros", propVal)
                let postEv = (!propVal.isPostallSelected) ? [] : generateCalendarEvents(startDate, endDate, postedJobs, 'POSTED_JOBS')
                let postedJobsByYouEv = (!propVal.isyourPostSelected) ? [] : generateCalendarEvents(startDate, endDate, postedJobsByYou, 'POSTED_BY_YOU')
                let jobRequestForyouEv = (!propVal.isRequestedSelected) ? [] : generateCalendarEvents(startDate, endDate, jobRequestForyou, 'REQUESTED_JOBS')
                let jobsBookedByYouEv = (!propVal.isBookingSelected) ? [] : generateCalendarEvents(startDate, endDate, jobsBookedByYou, 'JOB_BOOKED_BY_YOU')
                let jobsOwnByYouEv = (!propVal.isyourPostBookSelected) ? [] : generateCalendarEvents(startDate, endDate, jobsOwnByYou, 'JOB_YOU_OWN')
                eventEv = [...postEv, ...postedJobsByYouEv, ...jobRequestForyouEv, ...jobsBookedByYouEv, ...jobsOwnByYouEv]

                //setEvents(events)
                //TODO : add Counts in all the list.
                eventEv.forEach((item) => {
                    item.postedJobsCount = (postedJobsCount === undefined) ? 0 : postedJobsCount
                    item.postedJobsByYouCount = (postedJobsByYouCount === undefined) ? 0 : postedJobsByYouCount
                    item.jobRequestForyouCount = (jobRequestForyouCount === undefined) ? 0 : jobRequestForyouCount
                    item.jobsBookedByYouCount = (jobsBookedByYouCount === undefined) ? 0 : jobsBookedByYouCount
                    item.jobsOwnByYouCount = (jobsOwnByYouCount === undefined) ? 0 : jobsOwnByYouCount
                })

                let postEvAll = (!propVal.isPostallSelected) ? [] : generateCalendarEventsAll(startDate, endDate, postedJobs, 'POSTED_JOBS')
                let postedJobsByYouEvAll = (!propVal.isyourPostSelected) ? [] : generateCalendarEventsAll(startDate, endDate, postedJobsByYou, 'POSTED_BY_YOU')
                let jobRequestForyouEvAll = (!propVal.isRequestedSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobRequestForyou, 'REQUESTED_JOBS')
                let jobsBookedByYouEvAll = (!propVal.isBookingSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobsBookedByYou, 'JOB_BOOKED_BY_YOU')
                let jobsOwnByYouEvAll = (!propVal.isyourPostBookSelected) ? [] : generateCalendarEventsAll(startDate, endDate, jobsOwnByYou, 'JOB_YOU_OWN')
                eventEvAll = [...postEvAll, ...postedJobsByYouEvAll, ...jobRequestForyouEvAll, ...jobsBookedByYouEvAll, ...jobsOwnByYouEvAll]

                eventEvAll.forEach((item) => {
                    item.postedJobsCount = (postedJobsCount === undefined) ? 0 : postedJobsCount
                    item.postedJobsByYouCount = (postedJobsByYouCount === undefined) ? 0 : postedJobsByYouCount
                    item.jobRequestForyouCount = (jobRequestForyouCount === undefined) ? 0 : jobRequestForyouCount
                    item.jobsBookedByYouCount = (jobsBookedByYouCount === undefined) ? 0 : jobsBookedByYouCount
                    item.jobsOwnByYouCount = (jobsOwnByYouCount === undefined) ? 0 : jobsOwnByYouCount
                })

                setEvents(eventEv)
                setAllEvents(eventEvAll)

                //console.log("Print Events CalendarOld" , events)
                console.log("Print Events Calendar", eventEv , eventEvAll)
            }
        })
        .catch(() => {
            //setOptionLoading(false);
        });
    console.log("Into JobCalendarEventsView Return statement", events)
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

function generateCalendarEventsAll(startDate, endDate, events, typeVal) {
    // Create an array to store the calendar events
    const calendarEvents = [];

    // Iterate through each date in the date range
    let currentDate = new Date(startDate);
    currentDate.setHours(currentDate.getHours() + 12);
    endDate.setHours(endDate.getHours() + 12)
    console.log('Into Generate Calendar EventsCurrentDate ', typeVal, events , currentDate)
    //while (currentDate <= endDate) {
        // Filter events that fall on the current date
        // const eventsOnDate = events.filter((event) => {
        //     let eventStartDate = new Date(event.start);
        //     eventStartDate.setHours(12);
        //     eventStartDate.setMinutes(0);
        //     eventStartDate.setSeconds(0);
        //     eventStartDate.setMilliseconds(0);
        //     //eventStartDate.setHours(currentDate.getHours())
        //     let eventEndDate = new Date(event.end); 
        //     //eventEndDate.setHours(currentDate.getHours())
        //     if (eventStartDate.getDate() === eventEndDate.getDate()) {
        //         eventEndDate.setDate(eventEndDate.getDate() + 1);
        //         eventStartDate.setHours(11);
        //         eventStartDate.setMinutes(0);
        //         eventStartDate.setSeconds(0);
        //         eventStartDate.setMilliseconds(0);
        //         console.log('Into Event End Date :::  ', eventEndDate   );
        //     } else {
        //         eventStartDate.setHours(11);
        //         eventStartDate.setMinutes(0);
        //         eventStartDate.setSeconds(0);
        //         eventStartDate.setMilliseconds(0);
        //     }
        //     console.log('Into Generate Calendar Events Events  DataSelection ', eventStartDate , eventEndDate , currentDate  );

        //     return currentDate >= eventStartDate && currentDate <= eventEndDate;
        // });

        console.log('Into Generate Calendar Events Events on date ', events)

        // Calculate the total count of events on the current date
        const totalCount = events.length;
        if (totalCount > 0) {
            // Create a new calendarEvent object
            const newCalendarEvent = {};

            // Populate the calendarEvent object
            newCalendarEvent.title = '@' + events[0].jobName;
            newCalendarEvent.description = `Total events on this day: ${totalCount}`;
            newCalendarEvent.count = totalCount;
            newCalendarEvent.event = events;
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            newCalendarEvent.displayDate = currentDate.toLocaleDateString(undefined, options);
            newCalendarEvent.start = currentDate.toISOString(); // Convert to ISO date format
            newCalendarEvent.end = currentDate.toISOString(); // Convert to ISO date format
            newCalendarEvent.type = typeVal; // Change this to your event type

            // Add the calendarEvent object to the array
            calendarEvents.push(newCalendarEvent);
        }


        // Move to the next date
        currentDate.setDate(currentDate.getDate() + 1);
        console.log('Into Generate Calendar Events2333INSIDE ', typeVal, calendarEvents)
    //}
    console.log('Into Generate Calendar Events2333 ', typeVal, calendarEvents)
    return calendarEvents;
}

function areDatesEqual(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function isGreaterThanOrEqualToIgnoringTime(date1, date2) {
    // Convert both dates to start of day (midnight) for comparison
    const startOfDayDate1 = new Date(date1);
    startOfDayDate1.setHours(0, 0, 0, 0);
    const startOfDayDate2 = new Date(date2);
    startOfDayDate2.setHours(0, 0, 0, 0);
    
    return startOfDayDate1.getTime() >= startOfDayDate2.getTime();
  }

  function isLesserThanOrEqualToIgnoringTime(date1, date2) {
    // Convert both dates to start of day (midnight) for comparison
    const startOfDayDate1 = new Date(date1);
    startOfDayDate1.setHours(0, 0, 0, 0);
    const startOfDayDate2 = new Date(date2);
    startOfDayDate2.setHours(0, 0, 0, 0);
    
    return startOfDayDate1.getTime() <= startOfDayDate2.getTime();
  }

function generateCalendarEvents(startDate, endDate, events, typeVal) {
    // Create an array to store the calendar events
    const calendarEvents = [];

    // Iterate through each date in the date range
    let currentDate = new Date(startDate);
    currentDate.setHours(currentDate.getHours() + 12);
    endDate.setHours(endDate.getHours() + 12)
    console.log('Into Generate Calendar EventsCurrentDate ', typeVal, events , currentDate)
    while (currentDate <= endDate) {
        // Filter events that fall on the current date
        const eventsOnDate = events.filter((event) => {
            let eventStartDate = new Date(event.start);
            eventStartDate.setHours(12);
            eventStartDate.setMinutes(0);
            eventStartDate.setSeconds(0);
            eventStartDate.setMilliseconds(0);
            //eventStartDate.setHours(currentDate.getHours())
            let eventEndDate = new Date(event.end); 
            //eventEndDate.setHours(currentDate.getHours())
            if (eventStartDate.getDate() === eventEndDate.getDate()) {
                //eventEndDate.setDate(eventEndDate.getDate() + 1);
                eventStartDate.setHours(11);
                eventStartDate.setMinutes(0);
                eventStartDate.setSeconds(0);
                eventStartDate.setMilliseconds(0);
                console.log('Into Event End Date :::  ', eventEndDate   );
                return areDatesEqual(currentDate , eventStartDate) ;

            } else {
                eventStartDate.setHours(11);
                eventStartDate.setMinutes(0);
                eventStartDate.setSeconds(0);
                eventStartDate.setMilliseconds(0);
            }
            console.log('Into Generate Calendar Events Events  DataSelection ', eventStartDate , eventEndDate , currentDate  );

            return isGreaterThanOrEqualToIgnoringTime( currentDate , eventStartDate)  && isLesserThanOrEqualToIgnoringTime(currentDate , eventEndDate);
        });

        console.log('Into Generate Calendar Events Events on date ', eventsOnDate)

        // Calculate the total count of events on the current date
        const totalCount = eventsOnDate.length;
        if (totalCount > 0) {
            // Create a new calendarEvent object
            const newCalendarEvent = {};

            // Populate the calendarEvent object
            newCalendarEvent.title = '@' + eventsOnDate[0].jobName;
            newCalendarEvent.description = `Total events on this day: ${totalCount}`;
            newCalendarEvent.count = totalCount;
            newCalendarEvent.event = eventsOnDate;
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            newCalendarEvent.displayDate = currentDate.toLocaleDateString(undefined, options);
            newCalendarEvent.start = currentDate.toISOString(); // Convert to ISO date format
            newCalendarEvent.end = currentDate.toISOString(); // Convert to ISO date format
            newCalendarEvent.type = typeVal; // Change this to your event type

            // Add the calendarEvent object to the array
            calendarEvents.push(newCalendarEvent);
        }


        // Move to the next date
        currentDate.setDate(currentDate.getDate() + 1);
        console.log('Into Generate Calendar Events2333INSIDE ', typeVal, calendarEvents)
    }
    console.log('Into Generate Calendar Events2333 ', typeVal, calendarEvents)
    return calendarEvents;
}

//CREATE NEW EVENT ACTION
export function createEvent(values) {
    let events = JSON.parse(localStorage.getItem('events'));
    events.push(values); //Push New Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: CREATE_EVENT,
        payload: events
    }
}

//UPDATE EVENT ACTION
export function updateEvent(values) {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    let index = _.findIndex(events, { 'id': values.id });
    events[index] = values; //Update Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: UPDATE_EVENT,
        payload: events
    }
}

//DELETE EVENT ACTION
export function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    let index = _.findIndex(events, { 'id': id });
    events.splice(index, 1); //Remove Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: DELETE_EVENT,
        payload: events
    }
}

//GET ALL PAST EVENTS ACTION
export function pastEvents() {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    events = _.filter(events, (item) => (moment().format('YYYY MM DD') > moment(item.start).format('YYYY MM DD')) ? true : false);
    return {
        type: PAST_EVENTS,
        payload: events
    }
}

//GET ALL UPCOMING EVENTS ACTION
export function upcomingEvents() {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    events = _.filter(events, (item) => (moment().format('YYYY MM DD') < moment(item.start).format('YYYY MM DD')) ? true : false);
    return {
        type: UPCOMING_EVENTS,
        payload: events
    }
}