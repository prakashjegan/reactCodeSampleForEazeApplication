import React, { Component } from "react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";
import { useEffect } from "react";
import abc from "../../../assets/images/supportPerson/avatar.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from "react-router-dom"
import { EastOutlined, ReplayCircleFilledOutlined } from "@mui/icons-material"

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import NoImage from '../../../assets/images/common/No-Image-Placeholder.png';
// Direct React component imports
//import { Swiper, SwiperSlide } from 'swiper/swiper-react.mjs';

// Styles must use direct files imports
// import 'swiper/swiper.scss'; // core Swiper
// import 'swiper/modules/navigation.scss'; // Navigation module
// import 'swiper/modules/pagination.scss'; // Pagination module
// import 'swiper/modules/effect-coverflow.scss'; // effect-coverflow module



import { EffectCoverflow, Pagination, Navigation , FreeMode, Thumbs } from 'swiper/modules';


// const DemoCarousel = ({ images }) => {

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(()=>{
//     console.log("images slider refreshed");
//   },[])

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + 1 === images.length ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
//     );
//   };
//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <>
//       <div className="carousel" style={{width: "25%", margin: "auto", marginTop: "5px"}}>
//         <img key={currentIndex} src={images[currentIndex]} />
//         <div className="slide_direction">
//           <div className="left" onClick={handlePrevious}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="20"
//               viewBox="0 96 960 960"
//               width="20"
//             >
//               <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
//             </svg>
//           </div>
//           <div className="right" onClick={handleNext}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="20"
//               viewBox="0 96 960 960"
//               width="20"
//             >
//               <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
//             </svg>
//           </div>
//         </div>
//         <div className="indicator">
//           {images.map((_, index) => (
//             <div
//               key={index}
//               className={`dot ${currentIndex === index ? "active" : ""}`}
//               onClick={() => handleDotClick(index)}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DemoCarousel;

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import abc from "../../../assets/images/common/uploadIcon.png";

// const DemoSlider = () => {
//   return (
//     <Carousel width={100}>
//       <div>
//         <img src={abc} />
//         <p className="legend">Legend 1</p>
//       </div>
//       <div>
//         <img src={abc} />
//         <p className="legend">Legend 2</p>
//       </div>
//       <div>
//         <img src={abc} />
//         <p className="legend">Legend 3</p>
//       </div>
//     </Carousel>
//   );
// };

// export default DemoSlider;

// const DemoSlider = ({ imageSlider }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slideStyles = {
//     height: "100%",
//     position: "relative",
//   };

//   const sliderstyles = {
//     width: "100%",
//     height: "100%",
//     backgroundImage: `url(${imageSlider[currentIndex].url})`,
//     borderRaduis: "6px",
//     backgroundSize: "cover",
//     backgroundPosition: "cover",
//   };

//   const leftArrowStyles = {
//     position: "absolute",
//     top: "50%",
//     transform: "translate(0, -50%)",
//     left: "10px",
//     fontSize: "20px",
//     color: "#fff",
//     zIndex: 1,
//     cursor: "pointer",
//   };

//   const rightArrowStyles = {
//     position: "absolute",
//     top: "50%",
//     transform: "translate(0, -50%)",
//     right: "10px",
//     fontSize: "20px",
//     color: "#fff",
//     zIndex: 1,
//     cursor: "pointer",
//   };

//   const goToPrevious = ()=>{
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? imageSlider.length - 1 :currentIndex-1;
//     setCurrentIndex(newIndex)
//   }

//   const goToNext = ()=>{
//     const isLastSlide = currentIndex === imageSlider.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   }

//   return (
//     <>
//       <div style={slideStyles}>
//         <div style={leftArrowStyles} onClick={goToPrevious}>&lt;</div>
//         <div style={rightArrowStyles} onClick={goToNext}>&gt;</div>

//         <div style={sliderstyles}></div>
//       </div>
//     </>
//   );
// };

// export default DemoSlider;


const DemoSlider = ({ imageSlider , propsVal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbsSwiper1, setThumbsSwiper1] = useState(null);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  imageSlider = (imageSlider === undefined) ? [NoImage, NoImage, NoImage,NoImage, NoImage, NoImage, NoImage] : imageSlider.split(',')

  console.log('Into DemoSliderImageSlider:::', imageSlider , propsVal)
  //let sample = [NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage, NoImage]
  //let sample = [NoImage, NoImage, NoImage,NoImage, NoImage, NoImage, NoImage]
  imageSlider = [...imageSlider]
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
      <div className="container" style={{ width: '100%', height: '100%', paddingLeft: 50 }} >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          // spaceBetween={10}
          loop={true}
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
          modules={[EffectCoverflow, Pagination, Navigation]}
          //modules={[EffectCoverflow, Pagination]}
          className="swiper_container"
          //className="mySwiper"
          style={{ width: '100%', height: '100%' }}
        >
          {imageSlider.map((image, index) => (
            <SwiperSlide key={index} >
              <img src={image} alt={`slide_image_${index + 1}`} style={{ width: '85%', height: '100%', paddingLeft: 100 }} />
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
          <div className="slider-controler"  >
            <div className="swiper-button-prev slider-arrow" style={{width: 220}}>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>            
            <div className="swiper-button-next slider-arrow" style={{width: 180 }}>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
      {console.log('into Modal isModalOpen :::' , isModalOpen)}
      {isModalOpen && (
        <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-close" onClick={closeModal}>
            X
          </div>
          <div>
          <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        //thumbs={{ swiper: thumbsSwiper1 }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {console.log('into Modal :::' , imageSlider)}
        {imageSlider.map((image, index) => (
            <SwiperSlide key={index} >
              <img src={image} alt={`slide_image_${index + 1}`} style={{ width: '85%', height: '100%' }} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper1}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {imageSlider.map((image, index) => (
            <SwiperSlide key={index} >
              <img src={image} alt={`slide_image_${index + 1}`} style={{ width: '85%', height: '100%' }} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default DemoSlider;
