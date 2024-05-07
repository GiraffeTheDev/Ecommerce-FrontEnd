import React from "react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerItem from "./BannerItem";
const img = [
  "https://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg",
  "https://cdn.dribbble.com/users/3906861/screenshots/10737841/nike_4x.jpg",
  "https://cdn.dribbble.com/users/9135815/screenshots/20243923/media/396fe19b99e40835d16f9dab9ef4783b.jpg?resize=1000x750&vertical=center",
];
const Banner = () => {
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-[400px] mt-5 lg:h-[600px]"
      >
        {img.map((item) => (
          <SwiperSlide key={item}>
            <BannerItem url={item}></BannerItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
