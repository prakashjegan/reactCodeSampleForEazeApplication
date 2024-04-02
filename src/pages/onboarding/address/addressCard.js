import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRef } from "react";

function AddressCard({ addressList, setAddress }) {
  const ref = useRef(null);

  function editAddress() {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setAddress(addressList);
  }

  return (
    <>
      <Box m={1} sx={{ boxShadow: 3 }}>
        <div></div>
        <Card variant="outlined" sx={{ display: "flex", height: 150 }}>
          <CardContent className="card-content">
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              Communication Address
            </Typography>
            <div
              className="cardAddress"
              style={{
                color: "grey",
                paddingTop: 2,
                width: "70%",
                fontSize: "14px",
                paddingBottom: "10px",
              }}
            >
              <span>{addressList.streetAddress3}</span> <br></br>
              <span>{addressList.city}</span> <br></br>
              <span>{addressList.state}</span> <br></br>
              <span>{addressList.country}</span>
            </div>
          </CardContent>
        </Card>
        <Box sx={{ width: "100%", padding: 2 }}>
          <div>
            <Stack>
              <div>
                <Button
                  variant="outlined"
                  style={{ float: "left", fontSize: 13 }}
                  onClick={editAddress}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  style={{ float: "right", fontSize: 13 }}
                >
                  Delete
                </Button>
              </div>
            </Stack>
          </div>
        </Box>

        <div ref={ref}></div>
      </Box>
    </>
  );
}

export default AddressCard;
