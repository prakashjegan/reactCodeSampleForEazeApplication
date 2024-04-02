import React, { Component, useRef, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { Button, Grid, Paper , IconButton} from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";
import { useEffect } from "react";
import abc from "../../../assets/images/supportPerson/avatar.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import NoImage from '../../../assets/images/common/No-Image-Placeholder.png';
import CloseIcon from '@mui/icons-material/Close';


import { EffectCoverflow, Pagination, Navigation, FreeMode, Thumbs } from 'swiper/modules';
import ImageUploadComponent from "./impageUploadComps";



const DemoSlider = ({ imageSlider , jobData , action }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thumbsSwiper1, setThumbsSwiper1] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [images , setImages] = useState([])
    const[hasImage, setHasImage] = useState(false)


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    //setHasImage((imageSlider !== undefined))
    //imageSlider = (jobData.jobImageLinks === undefined) ? [NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage] : jobData.jobImageLinks.split(',')
    imageSlider = (jobData.jobImageLinks === undefined || jobData.jobImageLinks === '') ? [] : jobData.jobImageLinks.split(',')
    console.log('Into DemoSlider:::', imageSlider )
    //let sample = [NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage]
   // let sample = [NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage]
   const [imageSider , setImageSider] = useState([...imageSlider])
    //imageSlider = [...imageSlider, NoImage]
    jobData.images = [...imageSlider]
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [rerenderSlider , setRenderSlider] = useState(0);


    const onDrop = useCallback((acceptedFiles) => {
        jobData.images = (prevImages) => [...prevImages, ...acceptedFiles]
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
        //Only those files.
        //setImageSider((prevImages) => [...prevImages, ...acceptedFiles])
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        //return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
        setImageSider([...imageSlider])
        jobData.images = [...imageSlider]
      }, []);

    const removeImage = (index) => {
        console.log('Into remove Images ::: Before ' , jobData.images , index)

        jobData.images = jobData.images.filter((_, i) => i !== index)
        console.log('Into remove Images ::: ' , jobData.images)
        setImages(jobData.images);
        setImageSider(jobData.images)
        imageSlider = jobData.images
        jobData.jobImageLinks = jobData.images.join(",")
        setRenderSlider(rerenderSlider+10)
    };
    const slideStyles = {
        //height: "100%",
        //width: "300px",
        //height: "300px",
        position: "relative",
        //backgroundColor : "blue",

    };

    const sliderstyles = {
        width: "100%",
        height: "100%",
        //width: "300px",
        //height: "300px",
        //backgroundImage: `url(${imageSlider[currentIndex].url})`,
        borderRaduis: "6px",
        backgroundSize: "cover",
        backgroundPosition: "cover",
        //backgroundColor : "blue",
    };

    const leftArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "10px",
        fontSize: "20px",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const rightArrowStyles = {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "5px",
        fontSize: "20opppx",
        color: "#fff",
        zIndex: 1,
        cursor: "pointer",
    };

    const imageSliderTyle = {
        width: "300px",
        height: "300px",
        margin: "0 auto",
        padding: "6px",
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imageSlider.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    const handleViewAllImages = (e) => {
        console.log('Into handle View All Images')
        openModal()
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === imageSlider.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <>
            
            <div className="container" style={{ width: '90%', height: '80%', paddingLeft: 10 }} >
            {((action === 'create' || action === 'edit')) && (
            <div>
            <ImageUploadComponent jobData={jobData} action={action} /> 
            </div>
            )}
            {(!(action === 'create' && imageSlider.length > 0)) && (
                <>
                <Swiper value={rerenderSlider}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    // spaceBetween={10}
                    //loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        // slideShadows: true,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}

                    //modules={[EffectCoverflow, Pagination]}
                    //className="swiper_container"
                    className="mySwiper2"
                    //style={{ width: '100%', height: '100%' }}
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                //   spaceBetween={10}
                //   navigation={true}
                //   thumbs={{ swiper: thumbsSwiper  && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                //   modules={[FreeMode, Navigation, Thumbs]}
                //   className="mySwiper2"
                >
                    {imageSlider.map((image, index) => (
                        <SwiperSlide key={index} >
                            <div
                                className="swiper-image-container"
                                onMouseEnter={() => {
                                    console.log('Into Mouse Enter' , index)
                                    setSelectedImageIndex(index)
                                    setShowDelete(true)
                                }}
                                onMouseLeave={() => {
                                    console.log('Into Mouse Leave' , index)
                                    //setSelectedImageIndex(null)
                                    setShowDelete(false)
                                }}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                            >
                                {selectedImageIndex === index && showDelete && (action === 'create' || action === 'edit' || action === 'delete' ) && (
                                    <div className="delete-button-container" style={{ position: 'absolute', top: 0, right: 110 }} >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setPopupOpen(true)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                )}
                                <img src={image} alt={`slide_image_${index + 1}`} style={{ width: '85%', height: '100%', paddingLeft: 100 }} />
                            </div>

                        </SwiperSlide>
                    ))}
                    {/* <SwiperSlide key='view-all' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div onClick={(e) => {
              handleViewAllImages(e)
            }
            } >
              <>
                <span>View All</span>
                <Link>
                  <EastOutlined />
                </Link>
              </>
            </div>
          </SwiperSlide> */}
                    {/* <div className="slider-controler"  >
            <div className="swiper-button-prev slider-arrow" style={{width: 220}}>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>            
            <div className="swiper-button-next slider-arrow" style={{width: 180 }}>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div> */}
                </Swiper>
                <Swiper value={rerenderSlider}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={1}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {imageSlider.map((image, index) => (
                        <SwiperSlide key={index} >
                            <img src={image} alt={`slide_image_${index + 1}`} style={{ width: '98%', height: '100%', paddingLeft: 10, paddingRight: 10 }} />
                        </SwiperSlide>
                    ))}
                    
                    <div className="slider-controler"  >
                        <div className="swiper-button-prev slider-arrow" style={{ width: 220 }}>
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow" style={{ width: 180 }}>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
                </>
            )}
            </div>
            
            <Popup
                open={popupOpen}
                closeOnDocumentClick
                onClose={() => setPopupOpen(false)}
                contentStyle={{
                    width: 'fit-content',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
            >
                <div className="popup-container">
                    <div className="popup-header" style={{ textAlign: 'center', padding: '20px' }}>
                        <IconButton
                            onClick={() => setPopupOpen(false)}
                            style={{ position: 'absolute', top: '8px', right: '8px' }}
>
                            <CloseIcon />
                        </IconButton>
                        <h2 style={{ margin: '0 0 10px' }}>Confirm Deletion</h2>
                        <div className="popup-content">
                            <p style={{ margin: '0 0 20px' }}>Are you sure you want to delete this image?</p>
                        </div>
                        <div className="popup-footer">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    removeImage(selectedImageIndex);
                                    setPopupOpen(false);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default DemoSlider;
