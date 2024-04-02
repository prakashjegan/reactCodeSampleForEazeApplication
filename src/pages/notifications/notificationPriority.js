import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import profile from "../../assets/images/navbar/profile.png";
import { Button, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function PriorityNotifications({ info }) {
  const [actionList, setActionList] = useState();
  const navigate = useNavigate();
  //let profile1 = profile
  const [profile1 , setProfile1] = useState(profile);


  useEffect(() => {
    if (info.cTAActionsString) {
      setActionList(JSON.parse(info.cTAActionsString).ctaActionList);
    }
    if (info.imageUrl !== undefined) {
      setProfile1(info.imageUrl)
    }


  }, []);

  const handleActionClick = (action) => {
    navigate(`${action.webRedirect}?${action.webRedirectParam}`);
  };

  return (
    <>
      <Box>
        <Stack direction={"row"} sx={{ margin: 1 }}>
          <Box>
            <img
              src={profile1}
              style={{ width: 40, maxWidth: 40, marginRight: 8 }}
              alt="profile_img"
            />
          </Box>

          <Stack direction={"column"}>
            <p style={{ fontSize: 12, fontWeight: 500 }}>
              {info && info.title}
            </p>
            <p style={{ fontSize: 12 }}>{info && info.message}</p>
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={{ margin: 1 }}>
          {actionList &&
            actionList.map((action) => (
              <Button
                style={{ margin: 2, fontSize: 12, padding:5}}
                key={action.label}
                onClick={() => {
                  handleActionClick(action);
                }}
              >
                {action.label}
              </Button>
            ))}
        </Stack>
        <Stack sx={{ margin: 1 }}>
          <p style={{ color: "grey", fontSize: 12}}>
            {info && info.sentDateTime}
          </p>
        </Stack>
        <Divider />
      </Box>
    </>
  );
}

export default PriorityNotifications;
