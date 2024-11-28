import React from "react";

import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

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
                  <Link>
                    <Icon
                      type="FaFacebookF"
                      className=" lg:text-2xl text-xl "
                    />
                  </Link>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <Link>
                    <Icon
                      type="PiInstagramLogoThin"
                      className=" lg:text-2xl text-xl "
                    />
                  </Link>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <Link>
                    <Icon type="CiTwitter" className=" lg:text-2xl text-xl " />
                  </Link>
                </li>
                <li className="bg-primary/10 hover:scale-105 duration-500 lg:w-[50px] w-[30px] lg:h-[50px] h-[30px] flex justify-center items-center rounded-full">
                  <Link>
                    <Icon type="TbWorld" className=" lg:text-2xl text-xl" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="md:text-xl text-base font-medium text-center md:text-left">
                Help & Information
              </h2>
              <ul className="lg:pt-5 pt-2 flex flex-col gap-2 text-center md:text-left">
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    home
                  </Link>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/about"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    about
                  </Link>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/shop"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/feature"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                 Appointment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="md:text-xl text-base font-medium text-center md:text-left">
                About us
              </h2>
              <ul className="lg:pt-5 pt-2 flex flex-col gap-2 text-center md:text-left">
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                  Contact 
                  </Link>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                    Reviews
                  </Link>
                </li>
                <li className="text-gray text-sm lg:text-base capitalize font-medium ">
                  <Link
                    to="/"
                    className="hover:pl-3 duration-500 hover:text-primary"
                  >
                 Services 
                  </Link>
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