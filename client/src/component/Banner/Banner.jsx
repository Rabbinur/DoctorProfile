import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import bannerImg from "../../assets/slider3.jpg";
import { Link, NavLink } from "react-router-dom";
import { fetchAllBanner, getAllBlogs } from "../../hooks/usefetch";
import { Api } from "../../utils/Api";
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex); // Update the current slide index on slide change
  };

  const type="banner"
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["banners", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });
  const banners = allData?.blogs || [];
console.log(banners);
  return (
    <div id="home" className=" ">
      <div className="">
        <div className="flex items-center ">
          <Swiper
            className="relative group"
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={true}
            loop={true}
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            style={{ zIndex: "-9999999999px", overflow: "hidden" }}
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
            onSlideChange={handleSlideChange}
          >
            {banners?.map((bannerItem, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
                 "
                >
                  <div className="relative ">
                    <img
                     src={`${Api.defaults.baseURL}/uploads/${bannerItem?.url}` }
                    //  crossOrigin="anonymous"
                     alt={bannerItem?.title}
                     loading="lazy"
                  
                      className="w-full h-[55vh] lg:h-[80vh] z-20 group-hover:scale-105 duration-300 
                      object-cover object -center"
                    />
                    {/* Overlay with opacity */}
                    <div className="absolute inset-0 bg-white/20 opacity-12 z-10"></div>

                    {/* Motion div for text content */}
                    <motion.div
                      initial={{ opacity: 0, y: "200px" }}
                      whileInView={{ opacity: 1, y: "0px" }}
                      transition={{ duration: 0.5 }}
                      viewport={true}
                      className="absolute inset-0 flex flex-col justify-center px-5 md:px-0 items-center w-full h-full z-20"
                    >
                      <div
                        className="lg:text-[48px] md:text-[40px]  text-[30px] text-center
                       md:text-start duration-300 group-hover:text-primary
                        text-[#3e516a]"
                      >
                        <h1>{bannerItem.title || "Default Title"}</h1>
                      </div>
                      <p className=" text-[15px] lg:text-md py-5 text-justify text-black font-medium">
                        {bannerItem.desc ||
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                      </p>
                      <div className="flex justify-center md:justify-start">
                        <NavLink 
                          to="#appointment"
                          className="bg-primary hover:bg-black  
                         text-white rounded-md flex justify-center items-center
                          gap-2 px-5 py-3 font-bold mt-10 duration-300"
                        >
                          Appointment
                          <HiOutlineArrowSmallRight
                            size={25}
                            className="group-hover:translate-x-1 duration-300"
                          />
                        </NavLink>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div
              className="button-next-slide top-[40%] absolute z-10 w-[40px] h-[40px]
             bg-black group-hover:left-0 -left-[500px] duration-300
              cursor-pointer text-white grid place-items-center"
            >
              <FaArrowRight />
            </div>
            <div className="button-prev-slide top-[40%] absolute z-10 w-[40px] h-[40px] bg-black group-hover:right-0 -right-[500px] duration-300 cursor-pointer text-white grid place-items-center">
              <FaArrowLeft />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
