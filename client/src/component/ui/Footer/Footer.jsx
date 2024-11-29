import React from "react";

import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

import Container from "../Container/Container";
import Icon from "../Icon/Icon";
const Footer = () => {
  return (
    <>
      <div className=" bg-primary/5 py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 pt-10 gap-8">
            <div>
              <picture>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[80px] w-full object-contain mx-auto md:mr-auto  "
                />
              </picture>
              <p className="text-gray py-5 md:text-left text-center text-sm lg:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, aliquid.
              </p>
              <ul className="flex md:justify-start justify-center items-center gap-5">
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <NavLink>
                    <Icon
                      type="FaFacebookF"
                      className=" lg:text-2xl text-xl "
                    />
                  </NavLink>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <NavLink>
                    <Icon
                      type="PiInstagramLogoThin"
                      className=" lg:text-2xl text-xl "
                    />
                  </NavLink>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <NavLink>
                    <Icon type="CiTwitter" className=" lg:text-2xl text-xl " />
                  </NavLink>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <NavLink>
                    <Icon type="TbWorld" className=" lg:text-2xl text-xl" />
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="md:text-xl text-base font-medium text-center md:text-left">
                Help & Information
              </h2>
              <ul className="lg:pt-5 pt-2 flex flex-col gap-2 text-center md:text-left">
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#home"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    home
                  </NavLink>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#about"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    about
                  </NavLink>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#blog"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    Blogs
                  </NavLink>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#appointment"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                 Appointment
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="md:text-xl text-base font-medium text-center md:text-left">
                About us
              </h2>
              <ul className="lg:pt-5 pt-2 flex flex-col gap-2 text-center md:text-left">
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#contact"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                  Contact 
                  </NavLink>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#reviews"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    Reviews
                  </NavLink>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <NavLink
                    to="#services"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                 Services 
                  </NavLink>
                </li>
            
              </ul>
            </div>
            <div>
              <h2 className="md:text-xl text-base font-medium text-center md:text-left">
                Contact Information
              </h2>
              <ul className="lg:pt-5 pt-2 flex flex-col gap-2 text-center md:text-left">
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <span
                    
                    className="hover:pl-3 font-bold duration-500 hover:text-primary"
                  >
                    Chamber address
                  </span>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <span
                 
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                Road-2, Mirpur-2, Dhaka
                  </span>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <span
                   
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                   Email:      contact@gmail.com
                  </span>
                </li>
               
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <span
                   
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                 Mobile: 016xxxxxx
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;