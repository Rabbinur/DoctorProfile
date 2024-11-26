import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "../ui/Container/Container";
import image from "../../assets/map.png";
import user from "../../assets/user.jpeg";

const feedback = [
  {
    name: "Md Rabbinur Muktar",
    desc: "A smile adorns a person. I am glad that I can decorate people even in this way. Dentistry is not expensive, neglect is Being a famous designer is like being a famous dentist.",
  },
  {
    name: "Rabbinur Muktar",
    desc: "A smile adorns a person. I am glad that I can decorate people even in this way. Dentistry is not expensive, neglect is Being a famous designer is like being a famous dentist.",
  },
];

const Testomonial = () => {
  return (
    <div className="py-20"
      style={{
        backgroundImage: `url(${image})`,

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div >
          <Swiper
            className="relative group"
            modules={[Autoplay]}
            autoplay={true}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
          >
            {feedback.map((item, i) => (
              <SwiperSlide key={i}>
                <div className=" max-w-2xl text-center mx-auto group border-gray-300 shadow-sm px-3 py-6 rounded-md   duration-300 cursor-pointer">
                  <img
                    src={user}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full mx-auto group-hover:scale-105 duration-300"
                  />
                  <h1 className="text-lg text-center font-medium mt-4 mb-2 group-hover:text-[#85b839] duration-300">
                    {item.name}
                  </h1>
                  <p>{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <div className="max-w-2xl mx-auto py-10">
            {/* Appointment Button */}
            <div className="flex justify-center">
              <button
                className="border font-medium uppercase
               border-primary group relative px-4 py-2 
                text-primary transition-colors duration-[400ms] hover:bg-primary hover:text-white"
              >
                Write Review Here 
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testomonial;
