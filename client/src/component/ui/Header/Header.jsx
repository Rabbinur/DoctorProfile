import { useState } from "react";
import logo from "../../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { header } from "../../../constants/constants";
import Container from "../Container/Container";
import Icon from "../Icon/Icon";

const Header = () => {
  const location = useLocation();
  const [menuShow, setmenuShow] = useState(false);
  const active = location.pathname;

  return (
    <>
      <div
        className={`py-2 bg-white border-b border-lightgray/20 sticky top-0 z-20 ${
          menuShow ? "" : "bg-white"
        }`} // Ensure background color changes when menu is shown
      >
        <Container>
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <div
              className="lg:hidden flex flex-col gap-2 group cursor-pointer"
              onClick={() => setmenuShow(!menuShow)}
            >
              <div className="bg-gray w-[25px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
              <div className="bg-gray w-[18px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
              <div className="bg-gray w-[15px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
            </div>

            {/* Logo */}
            <div className="">
              <picture>
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-[60px] object-contain"
                />
              </picture>
            </div>

            {/* Mobile Menu */}
            <div
              className={`absolute lg:static top-0 
                 left-0 w-[70%]
                  lg:w-auto h-full lg:h-auto transition-transform transform duration-500 z-10 ${
                    menuShow
                      ? `translate-x-0  z-50 border-r bg-white h-auto border-gray/20 lg:border-none`
                      : "-translate-x-full  z-50 shadow-2xl"
                  } lg:translate-x-0 grid items-center`}
            >
              <ul
                className="flex lg:flex-row flex-col h-screen lg:h-auto justify-center
lg:gap-5 gap-10 px-10"
              >
                {header?.map((item, index) => (
                  <li
                    key={index}
                    className={`overflow-hidden ${
                      active === item.to
                        ? "border-b border-primary lg:border-none"
                        : ""
                    }`}
                    onClick={() => setmenuShow(false)}
                  >
                    <NavLink
                      to={item.to}
                      className={`text-gray font-medium capitalize hover:text-primary duration-500 relative before:absolute overflow-hidden before:bg-primary lg:before:w-full before:w-0 before:h-[1px] before:bottom-0 before:left-[-100%] hover:before:left-[100%] before:duration-500 ${
                        active === item.to ? "text-primary before:left-[0]" : ""
                      }`}
                    >
                      {item.keys}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Appointment Button */}
            <div className="">
              <Link className="border border-primary group relative px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-primary">
                Appointment
              </Link>
            </div>
          </div>
        </Container>

        {/* Close Icon for Mobile Menu */}
        <div
          className={`absolute top-[20px]  right-[40%] duration-500
             text-black z-[99] block lg:hidden  ${
               menuShow
                 ? "opacity-100 delay-500 cursor-pointer"
                 : "opacity-0 pointer-events-none"
             }`}
          onClick={() => setmenuShow(false)}
        >
          <Icon type="close" className="text-4xl text-primary" />
        </div>
      </div>
    </>
  );
};

export default Header;
