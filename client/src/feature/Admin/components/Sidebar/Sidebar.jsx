import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../../../assets/logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineReviews } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";

const Sidebar = ({
  isCollapsed,
  setIsSidebarOpen,
  setIsCollapsed,
  isSidebarOpen,
}) => {
  const location = useLocation();

  const links = [
    {
      id: "admin",
      title: "MENU",
      label: "Dashboard",
      icon: <MdDashboardCustomize size={25} />,
      path: "/admin",
    },
   
    {
      id: "Appointment",
      label: "Appointment",
      icon: <IoPersonAdd size={25} />,
      path: "/admin/appointment",
    },
    {
      id: "about",
      label: "About",
      icon: <BiDetail size={25} />,
      path: "/admin/about",
    },
    // {
    //   id: "contact",
    //   label: "Contact",
    //   icon: <MdContactPhone size={25} />,
    //   path: "/admin/contact",
    // },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MdOutlineReviews size={25} />,
      path: "/admin/reviews",
    },
    {
      id: "blogs",
      label: "Blogs",
      icon: <MdOutlineReviews size={25} />,
      path: "/admin/blogs",
    },
    {
      id: "Banner",
      label: "Banner",
      icon: <LuImagePlus size={25} />,
      path: "/admin/banner",
    },
    // {
    //   id: "user",
    //   title: "User Settings",
    //   label: "User Access",
    //   icon: <IoSettings size={23} />,
    //   path: "/user-access",
    // },
  ];

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 700);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-[18rem] p-3"} ${
        isSidebarOpen ? "block h-screen" : "hidden"
      } border md:block fixed md:relative z-20 md:z-auto bg-gray-100 transition-width duration-300`}
    >
      <div className="flex items-center justify-center p-3 bg-gray-100">
        {!isCollapsed && <img src={logo} alt="Logo" />}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`text-gray-500 absolute top-3 right-5 focus:outline-none ${
            window.innerWidth <= 700 ? "block" : "hidden"
          }`}
        >
          {isSidebarOpen ? (
            <FaTimes size={25} />
          ) : (
            <FaBarsStaggered size={25} />
          )}
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-100 shadow-md">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:text-white hover:bg-primary/90 duration-500 rounded-lg p-2 mb-10 focus:outline-none"
          >
            <FaBarsStaggered size={25} />
          </button>

          {links.map((link) => (
            <div key={link.id}>
              {link.title && (
                <div className="mb-4">
                  <span
                    className={`font-bold ${
                      isCollapsed ? `text-[12px]` : `sm:text-md`
                    }`}
                  >
                    {link.title}
                  </span>
                  <hr className="border-gray-300" />
                </div>
              )}
              <Link
                to={link.path}
                className={`cursor-pointer flex 
                                    items-center gap-2 p-2 mb-3 ${
                                      location.pathname === link.path
                                        ? `bg-primary/90
                                     text-white font-semibold rounded-md`
                                        : `text-gray-700
                                      hover:text-white hover:bg-primary/80 rounded-lg duration-500`
                                    }`}
              >
                {link.icon}
                {!isCollapsed && <span className="ml-2">{link.label}</span>}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
