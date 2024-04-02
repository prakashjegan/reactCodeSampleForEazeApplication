import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SupportImg from "../../../assets/images/supportPerson/avatar.png";
import { useRef } from "react";

function SupportPersonCard({ supportPesonsList, setSupportPerson }) {
  const ref = useRef(null);

  const editSuppoerPerson = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setSupportPerson(supportPesonsList);
  };

  return (
    <>
      <Box m={1} sx={{ boxShadow: 3 }}>
        <Card variant="outlined" sx={{display: "block", width: "100%" }}>
                    <CardContent className="card-content">
                        <div style={{ textAlign: "center", paddingBottom: "9px" }}> <img src={SupportImg} alt="" /> </div>
                        <div style={{ textAlign: "center", fontSize: "12px", paddingBottom: "1px" }}>{supportPesonsList.firstName}</div>
                        <div style={{ textAlign: "center", paddingTop: 2, fontSize: "12px" }}>{supportPesonsList.ContactDateRegex} - {supportPesonsList.contactTimeRegex}</div>

                        <Divider sx={{ margin: "4px" }} />

                        <Stack>
                            <div><div style={{ float: 'left', fontSize: "12px" }}>{supportPesonsList.mobileNumber}</div>
                                <div style={{ float: 'right', fontSize: "12px" }}>{supportPesonsList.emailId}</div></div>

                        </Stack>
                        <Stack sx={{ mb: -2 }}>
                            <div><Button sx={{ float: "left", fontSize: 13 }} onClick={editSuppoerPerson}>Edit</Button><Button sx={{ float: "right", fontSize: 13 }}>Delete</Button></div>
                            <div></div>
                        </Stack>
                    </CardContent>
                </Card >

    
        <div ref={ref}></div>
      </Box>
    </>
  );
}

export default SupportPersonCard;
