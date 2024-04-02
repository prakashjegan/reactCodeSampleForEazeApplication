import React, { useEffect, useState } from "react";
import { Card, Input, Typography, Button } from "antd";
import "../style.scss";
import pastJobs from "../../../assets/images/auth/pastJobs.png";
import listService from "../../../services/listService";
import { useNavigate } from "react-router-dom";
import { PaperPlaneIcon } from "../../../assets/icons/figmaIcons";
import MasterContract from "../JobPostArea/MasterContract";

const SearchHeader = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [showMasterContract, setShowMasterContract] = useState(false);
  const [showPastPostedJobs, setshowPastPostedJobs] = useState(false);

  const navigate = useNavigate();

  const eventsList = async () => {
    try {
      const res = await listService.fetchEventsList();
      setEvents(res.data.message?.jobTypeToTypeName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    eventsList();
  }, []);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleDialog = () => {
    setshowPastPostedJobs(true);
  };

  const renderedEvents = showAll
    ? Object.entries(events)
    : Object.entries(events).slice(0, 3);

  return (
    <Card className="searchHeader-container">
      <div className="search-input-wrapper">
        <img
          src={pastJobs}
          alt="Past Jobs"
          className="search-input-image"
          onClick={() => {
            //setShowMasterContract(true);
            navigate("/pastPostedJobs");
          }}
        />
        <Input
          placeholder="Clone previous posted Jobs"
          className="search-input"
          onClick={() => {
            setshowPastPostedJobs(true);
          }}
        />
        <PaperPlaneIcon handleDialog={handleDialog} onClick={handleDialog}/>
      </div>
      <div className="events-container">
        {renderedEvents.map(([keyName, description], index) => {
          return (
            <div className="event-item" key={index}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/post-a-job/JOB_TYPE/${keyName}`);
                }}
              >
                {!showAll ? (
                  <Typography className="events-style">
                    {description}
                  </Typography>
                ) : (
                  <Typography className="events-all-style">
                    {description}
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!showAll && (
        <Button className="show-all-button-styles" onClick={handleShowAll}>
          <span className="more-styles">More</span>
        </Button>
      )}
      {showAll && (
        <Button className="show-all-button-styles" onClick={handleShowAll}>
          <span className="more-styles">less</span>
        </Button>
      )}
      {showMasterContract && (
        <MasterContract
          setShowMasterContract={setShowMasterContract}
          isMasterrContractSelected={true}
        />
      )}

      {showPastPostedJobs && (
        <MasterContract
          setShowMasterContract={setshowPastPostedJobs}
          isMasterrContractSelected={false}
        />
      )}
    </Card>
  );
};

export default SearchHeader;
