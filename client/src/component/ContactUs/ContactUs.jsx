import React, { useState } from "react";
import Container from "../ui/Container/Container";
import Icon from "../ui/Icon/Icon";
import Title from "../ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../hooks/usefetch";

const ContactUs = () => {
  const type = "site";
  const [page] = useState(1);
  const [limit] = useState(10);

  // Fetch site details
  const { data: allData = {}, isFetching } = useQuery({
    queryKey: ["site", type, limit, page],
    queryFn: () => getAllBlogs({ type, page, limit }),
    keepPreviousData: true,
  });

  const site = allData?.blogs || [];
  return (
    <div id="contact" className="py-10">
      <div data-aos="fade-in" data-aos-delay={200}>
        <Title>Contact With Me</Title>
      </div>
      <Container>
        <div
          className="grid grid-cols-1 pt-20 lg:mt-10
           sm:grid-cols-3 
        lg:gap-8 gap-5 py-10 lg:pt-10"
        >
          <div
            data-aos="fade-in"
            data-aos-delay={100}
            className="text-center bg-white 
          lg:p-10 p-5 shadow-2xl"
          >
            <div className=" hover:bg-primary lg:size-16 size-10  flex justify-center items-center rounded-full mx-auto group border-primary  border  duration-500">
              <Icon
                type={"map"}
                className="text-2xl group-hover:text-white text-primary   "
              />
            </div>
            <h2 className="font-oswald capitalize md:text-xl text-base lg:py-4 py-2">
              Chamber address
            </h2>
            <p className="text-gray-500 text-sm">{site[0]?.address}</p>
          </div>
          <div
            data-aos="fade-in"
            data-aos-delay={200}
            className="text-center bg-white 
          lg:p-10 p-5 shadow-2xl"
          >
            <div className=" hover:bg-primary lg:size-16 size-10  flex justify-center items-center rounded-full mx-auto group border-primary  border  duration-500">
              <Icon
                type={"email"}
                className="text-2xl group-hover:text-white text-primary   "
              />
            </div>
            <h2 className="font-oswald capitalize md:text-xl text-base lg:py-4 py-2">
              email
            </h2>
            <p className="text-gray-500 text-sm">{site[0]?.email}</p>
          </div>
          <div
            data-aos="fade-in"
            data-aos-delay={300}
            className="text-center bg-white
           lg:p-10 p-5   shadow-2xl"
          >
            <div className=" hover:bg-primary lg:size-16 size-10  flex justify-center items-center rounded-full mx-auto group border-primary  border  duration-500">
              <Icon
                type={"phone"}
                className="text-2xl group-hover:text-white text-primary   "
              />
            </div>
            <h2 className="font-oswald capitalize md:text-xl text-base lg:py-4 py-2">
              Phone
            </h2>
            <p className="text-gray-500 text-sm">{site[0]?.mobile}</p>
          </div>
        </div>
        <div data-aos="fade-in" data-aos-delay={400} className="pt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.058590761713!2d90.35288757402913!3d23.81651548623738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c118ad4293b3%3A0x35cecf1a30eee4!2s21%20Rupnagar%20Rd%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1732646315465!5m2!1sen!2sbd"
            width={`100%`}
            height={`450px`}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
