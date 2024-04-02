import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import dropImage from "../../../assets/images/common/Feed.png";
import { Stack } from "@mui/material";
import DemoSlider from "./imageUploader";


const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  height: "100%",
  width: "100%",
};

const uploadIcon = {
  width: "120px",

  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // border: "1px solid grey",
};

const dropBox = {
  position: "absolute",
  width: "200px",
  height: "300px",
  display: "flex",
  bottom: "0px",
  left: "15%",
  marginBottom: 6,
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid black",
  marginTop: "50%",
};

function Previews(props) {
  const [files, setFiles] = useState([]);
console.log('Into Previews :::' , props)
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
          <DemoSlider imageSlider={props.jobData.jobImageLinks}  jobData= {props.jobData} action={props.action} />

    
    {/* <section className="container">
      <aside style={thumbsContainer}>{thumbs}</aside>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />

        <div style={dropBox}>
          <div style={uploadIcon}>
            <Stack sx={{ display: "flex", textAlign: "center" }}>
              <img
                src={dropImage}
                alt="drop image"
                width={"70"}
                style={{ alignSelf: "center" }}
              />
              <div style={{ fontSize: 10, marginTop: 2 }}>
                Drag n drop some files here, or click to select files
              </div>
            </Stack>
          </div>
        </div>
      </div> 
    </section> */}
    </>
  );
}

export default Previews;
