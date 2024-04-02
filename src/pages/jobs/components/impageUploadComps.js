import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload , message } from 'antd';
import { useEffect } from "react";
import fileUploadService from "../../../services/fileUploadService";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUploadComponent = ( props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  console.log('Into ImageUploadComponent ::::' , props)
  let imageSlider = (props?.jobData?.imageSlider === undefined) ? [] : props?.jobData?.imageSlider.split(',')
  const [fileList, setFileList] = useState([])
  const [fileMap, setFileMap] = useState(new Map())
  useEffect(() => {
    let filel = [] 
    let fileM = new Map()
    for (let i =0 ; i < imageSlider.length ; i++) {
        let imageNameWithExtension = imageSlider[i].split('/').pop()
        let file = {
                       uid: ''+i,
                       name: imageNameWithExtension,
                       status: 'done',
                       url: imageSlider,
                       processed:'done',
        }
        fileM.set(file.uid, file)
        filel = [...filel , file]
    }
    setFileList(filel)
    setFileMap(fileM)
}, []);
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-2',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-3',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-4',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-xxx',
//       percent: 50,
//       name: 'image.png',
//       status: 'uploading',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-5',
//       name: 'image.png',
//       status: 'error',
//     },
//   ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const updateLink = ( documentLink, isRemoved , file) => {
    console.log('intoUpdateDocumentLink ' , documentLink)
    
    if (props.jobData.images1 === undefined) {
        props.jobData.images1 = []
    }
    props.jobData.images1 = []
    for (const [key, value] of documentLink) {
        console.log('Into values DocumentLink13123asdasdasd' , key, value , value.status)
        if (value.status === "done") {
            props.jobData.images1 = [...props.jobData.images1, value.url]
        }

    }
    console.log('Into Image Data Listing::::' ,props.jobData )

    fileMap.has(file.uid)
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log('Into file Upload Changes :::' , newFileList)
    let imageString = ""
    for(let i = 0 ; i < newFileList.length ; i ++) {
        console.log('Into HandleChangeInto FileUpload' , newFileList[i])
        //fileUploadService.uploadFileAWSUrl(newFileList[i] , )
    }
    setFileList(newFileList)
  };
  const uploadAction = (e) => {
    console.log('Into Action file ::::' , e)
    e.status = 'uploading'
    let data = {file:e }
    try {
    fileUploadService.uploadFileAWSUrl(data , updateLink ,  fileMap, true , setLoading)
    }catch(exp) {
        console.log('Upload Action failed :::: ' , exp)
    }
    return {
        "success": true
        };
  }

  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log('Into Action file ::::' , file)
    file.status = 'uploading'
    let data = {file:file }
    try {
    fileUploadService.uploadFileAWSUrl(data , updateLink ,  fileMap, true , setLoading)
      onSuccess(data.file);
      message.success('File uploaded successfully');
    } catch (error) {
      // If there's an error, call onError with the error message
      console.log('Into Action file Error ::::' , error)
      onError(error);
      message.error('File upload failed');
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        //action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        //action={uploadAction}
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default ImageUploadComponent;