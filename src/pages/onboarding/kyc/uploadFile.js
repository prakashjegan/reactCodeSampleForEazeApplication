import Dragger from "antd/es/upload/Dragger";
import react, { useEffect, useState } from "react";
import { UploadCloudIcon } from "../../../assets/icons/figmaIcons";
import { Button } from "antd";
import { toast } from "react-hot-toast";
import { Box, CircularProgress, Stack } from "@mui/material";
import onboardService from "../../../services/onboardService";
import fileUploadService from "../../../services/fileUploadService";
import axios from "axios";

function UploadFile({ name, url, documentName, fetchKyc, downloadUrl }) {
  const [isUpdating, setisUpdating] = useState(false);
  const [data, setData] = useState({});

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFileName(url);
  }, []);

  const updateKyc = async () => {
    if (data.documentLink) {
      try {
        setisUpdating(true);
        const up = await onboardService.uploadKyc(data);
        fetchKyc();
      } catch (error) {
        console.log(error);
      } finally {
      }
    } else {
      toast.error("please upload kyc documents");
    }
    setisUpdating(false);
  };

  const getUploadUrl = async (e) => {
    if (e.file.status === "removed") {
      setData({ ...data, uploadLink: "" });
    } else {
      setFileName(e.file.name);
      try {
        console.log(e.file.name);
        // file.preventDefault()
        const up = await fileUploadService.gets3ConfigUrl(e.file.name, "kyc");
        console.log(up.data.message);
        const response = await axios.put(
          decodeURIComponent(up.data.message),
          e.file,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setData({
            documentName: documentName,
            documentLink: decodeURIComponent(up.data.message.split("?")[0]),
            documentSubType: documentName,
            documentType: "KYC",
          });

          return true || Upload.LIST_IGNORE;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        <Box
          sx={{
            boxShadow: 2,
            borderRadius: 2,
            padding: "8px",
            width: "200px",
            height: "300px",
            
          }}
          m={1}
        >
          <Stack sx={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                fontSize: 16,
                color: "grey",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              Upload {name}
            </p>
            <Dragger
              name="file"
              multiple={false}
              style={{ width: "150px", maxHeight: "150px", margin: "8px" }}
              beforeRemove={(e) => {
                e.preventDefault();
              }}
              showUploadList={false}
              beforeUpload={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onChange={getUploadUrl}
              className="upload-modal-dragArea"
            >
              {/* <i className="">
                  <UploadCloudIcon />
              </i> */}
              <p className="textDragger" style={{ fontSize: "16px" }}>
                Drag and drop your files here or{" "}
                <strong style={{ textDecoration: "underline" }}>Browse</strong>
              </p>
            </Dragger>
            <p style={{color: "blue", marginTop: "-90px", padding: 6}}><a href={downloadUrl && downloadUrl} style={{textDecoration: "none", cursor: 'pointer'}} target="_blank" rel="noreferrer">{fileName}</a></p>

            <div className="upload-modal-btn-grp" >
              <Button
                disabled={isUpdating}
                onClick={updateKyc}
                type="primary"
                style={{ width: "44px", fontSize: 12, padding:4 }}
              >
                Upload &nbsp;
                {isUpdating && (
                  <CircularProgress
                    style={{ height: "20px", width: "20px" }}
                    thickness={5}
                  />
                )}
              </Button>

              <Button
                primary="true"
                style={{ width: "50px", fontSize: 12, padding:4 }}
                onClick={() => {
                  setDrawer(false);
                  fetchKyc();
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default UploadFile;
