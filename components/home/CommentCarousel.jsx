import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import CommentCard from "./CommentCard";

const CommentCarousel = () => {
  return (
    <div className=" mb-10">
      <Swiper
        spaceBetween={30}
        
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <CommentCard />
        </SwiperSlide>
        <SwiperSlide>
          <CommentCard />
        </SwiperSlide>
        <SwiperSlide>
          <CommentCard />
        </SwiperSlide>
        <SwiperSlide>
          <CommentCard />
        </SwiperSlide>
        <SwiperSlide>
          <CommentCard />
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default CommentCarousel;
