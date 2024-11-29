// // import { useState } from "react";
// // import logo from "../../../assets/logo.png";
// // import { Link, NavLink, useLocation } from "react-router-dom";
// // import { header } from "../../../constants/constants";
// // import Container from "../Container/Container";
// // import Icon from "../Icon/Icon";

// // const Header = () => {
// //   const location = useLocation();
// //   const [menuShow, setmenuShow] = useState(false);
// //   const active = location.pathname;

// //   return (
// //     <>
// //       <div
// //         className={`py-2 bg-white border-b border-lightgray/20 sticky top-0 z-20 ${
// //           menuShow ? "" : "bg-white"
// //         }`} // Ensure background color changes when menu is shown
// //       >
// //         <Container>
// //           <div className="flex justify-between items-center">
// //             {/* Mobile Menu Button */}
// //             <div
// //               className="lg:hidden flex flex-col gap-2 group cursor-pointer"
// //               onClick={() => setmenuShow(!menuShow)}
// //             >
// //               <div className="bg-gray w-[25px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
// //               <div className="bg-gray w-[18px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
// //               <div className="bg-gray w-[15px] h-[1px] group-hover:bg-primary group-hover:w-[25px] duration-500"></div>
// //             </div>

// //             {/* Logo */}
// //             <div className="">
// //               <picture>
// //                 <img
// //                   src={logo}
// //                   alt="logo"
// //                   className="w-full h-[60px] object-contain"
// //                 />
// //               </picture>
// //             </div>

// //             {/* Mobile Menu */}
// //             <div
// //               className={`absolute lg:static top-0
// //                  left-0 w-[70%]
// //                   lg:w-auto h-full lg:h-auto transition-transform transform duration-500 z-10 ${
// //                     menuShow
// //                       ? `translate-x-0  z-50 border-r bg-white h-auto border-gray/20 lg:border-none`
// //                       : "-translate-x-full  z-50 shadow-2xl"
// //                   } lg:translate-x-0 grid items-center`}
// //             >
// //               <ul
// //                 className="flex lg:flex-row flex-col h-screen lg:h-auto justify-center
// // lg:gap-5 gap-10 px-10"
// //               >
// //                 {header?.map((item, index) => (
// //                   <li
// //                     key={index}
// //                     className={`overflow-hidden ${
// //                       active === item.to
// //                         ? "border-b border-primary lg:border-none"
// //                         : ""
// //                     }`}
// //                     onClick={() => setmenuShow(false)}
// //                   >
// //                     <NavLink
// //                       to={item.to}
// //                       className={`text-gray font-medium capitalize hover:text-primary duration-500 relative before:absolute overflow-hidden before:bg-primary lg:before:w-full before:w-0 before:h-[1px] before:bottom-0 before:left-[-100%] hover:before:left-[100%] before:duration-500 ${
// //                         active === item.to ? "text-primary before:left-[0]" : ""
// //                       }`}
// //                     >
// //                       {item.keys}
// //                     </NavLink>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Appointment Button */}
// //             <div className="">
// //               <Link className="border border-primary group relative px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-primary">
// //                 Appointment
// //               </Link>
// //             </div>
// //           </div>
// //         </Container>

// //         {/* Close Icon for Mobile Menu */}
// //         <div
// //           className={`absolute top-[20px]  right-[40%] duration-500
// //              text-black z-[99] block lg:hidden  ${
// //                menuShow
// //                  ? "opacity-100 delay-500 cursor-pointer"
// //                  : "opacity-0 pointer-events-none"
// //              }`}
// //           onClick={() => setmenuShow(false)}
// //         >
// //           <Icon type="close" className="text-4xl text-primary" />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Header;

// import { useEffect, useState } from "react";
// import logo from "../../../assets/logo.png";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { header } from "../../../constants/constants";
// import Container from "../Container/Container";
// import Icon from "../Icon/Icon";

// const Header = () => {
//   const location = useLocation();
//   const [menuShow, setmenuShow] = useState(false);
//   const [has,setHash]=useState('')
//   const [active, setActive] = useState("");
//   console.log(active);
//   const handleSmoothScroll = (id) => {
//     const target = document.querySelector(id);
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth" });
//     }
//     setmenuShow(false); // Close the mobile menu after clicking
//   };
//   useEffect(() => {
//     // Set the hash on initial render
//     setHash(window.location.hash);

//     // Add an event listener to listen for hash changes
//     const handleHashChange = () => {
//       setHash(window.location.hash);
//     };

//     window.addEventListener("hashchange", handleHashChange);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("hashchange", handleHashChange);
//     };
//   }, []);
//   console.log(has);
//   return (
//     <>
//       <div
//         className={`py-2 bg-white border-b border-lightgray/20 sticky top-0 z-20 ${
//           menuShow ? "" : "bg-white"
//         }`}
//       >
//         <Container>
//           <div className="flex justify-between items-center">
//             {/* Mobile Menu Button */}
//             <div
//               className="lg:hidden flex flex-col gap-2 z-50
//                group cursor-pointer"
//               onClick={() => setmenuShow(!menuShow)}
//             >
//               <div className="bg-black w-[25px] h-[1px]
//                group-hover:bg-primary duration-500"></div>
//               <div className="bg-black 
//               w-[18px] h-[1px]
//                group-hover:bg-primary duration-500"></div>
//               <div className="bg-black
//                w-[15px] h-[1px] group-hover:bg-primary 
//                duration-500"></div>
//             </div>
//             {/* Logo */}
//             <div>
//               <picture>
//                 <img
//                   src={logo}
//                   alt="logo"
//                   className="w-full h-[60px] object-contain"
//                 />
//               </picture>
//             </div>

//             {/* Mobile Menu */}
//             <div
//               className={`absolute lg:static top-0 
//                  left-0 w-[70%]
//                   lg:w-auto h-full lg:h-auto transition-transform 
//                   transform duration-500 z-10 ${
//                     menuShow
//                       ? `translate-x-0  border-r bg-white 
//                       h-full border-gray/20 lg:border-none z-[9999]`
//                       : "-translate-x-full  z- 50 shadow-2xl"
//                   } lg:translate-x-0 grid items-center`}
//             >
//  <div className="absolute top-10 left-10 lg:hidden">
//               <picture>
//                 <img
//                   src={logo}
//                   alt="logo"
//                   className="w-full h-[60px] object-contain"
//                 />
//               </picture>
//             </div>

//               <ul
//                 className="flex lg:flex-row flex-col h-screen bg-white
//                  lg:h-auto justify-center
// lg:gap-5 gap-10 px-10"
//               >
//                 {header?.map((item, index) => (
//                   <li
//                     key={index}
//                     className={`overflow-hidden ${
//                       has === item.to
//                         ? "border-b border-primary lg:border-none"
//                         : ""
//                     }`}
//                   >
//                     <NavLink
//                       to={item.to}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleSmoothScroll(item.to);
//                         setActive(item.to);
//                       }}
//                       className={`text-gray font-medium capitalize hover:text-primary duration-500 relative before:absolute overflow-hidden before:bg-primary lg:before:w-full before:w-0 before:h-[1px] before:bottom-0 before:left-[-100%] hover:before:left-[100%] before:duration-500 ${
//                         has === item.to ? "text-primary before:left-[0]" : ""
//                       }`}
//                     >
//                       {item.keys}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Appointment Button */}
//             <div>
//               <NavLink
//                 className="border border-primary group relative px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-primary"
//                 to="#appointment"
//               >
//                 Appointment
//               </NavLink>
//             </div>
//           </div>
//         </Container>

//         {/* Close Icon for Mobile Menu */}
//         <div
//           className={`absolute top-[40px] right-[40%] duration-500
//              text-black   z-[99999] block lg:hidden ${
//                menuShow
//                  ? "opacity-100 delay-500 cursor-pointer"
//                  : "opacity-0 pointer-events-none"
//              }`}
//           onClick={() => setmenuShow(false)}
//         >
//           <Icon type="close" className="text-[35px] text-primary" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;

import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { header } from "../../../constants/constants";
import Container from "../Container/Container";
import Icon from "../Icon/Icon";

const Header = () => {
  const [menuShow, setmenuShow] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleSmoothScroll = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setmenuShow(false); // Close the mobile menu after clicking
  };

  useEffect(() => {
    const sectionIds = header.map((item) => item.to); // Extract section IDs from the header array
    const sections = sectionIds.map((id) => document.querySelector(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.5, // Activate when 50% of the section is visible
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      // Cleanup observer on unmount
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div
      className={`py-2 bg-white border-b border-lightgray/20 sticky top-0 z-20 ${
        menuShow ? "" : "bg-white"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div
            className="lg:hidden flex flex-col gap-2 group cursor-pointer"
            onClick={() => setmenuShow(!menuShow)}
          >
            <div className="bg-black w-[25px] h-[1px] group-hover:bg-primary duration-500"></div>
            <div className="bg-black w-[18px] h-[1px] group-hover:bg-primary duration-500"></div>
            <div className="bg-black w-[15px] h-[1px] group-hover:bg-primary duration-500"></div>
          </div>

          {/* Logo */}
          <div>
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
            className={`absolute lg:static top-0 left-0 w-[70%] lg:w-auto h-full lg:h-auto transition-transform transform duration-500 z-10 ${
              menuShow
                ? `translate-x-0 border-r bg-white h-full border-gray/20 lg:border-none z-[9999]`
                : "-translate-x-full z-50 shadow-2xl"
            } lg:translate-x-0 grid items-center`}
          >
            <ul className="flex lg:flex-row flex-col h-screen bg-white lg:h-auto justify-center lg:gap-5 gap-10 px-10">
              {header.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.to);
                    }}
                    className={`relative text-gray font-medium capitalize hover:text-primary duration-500 
                      before:absolute before:bg-primary before:h-[1px] before:w-0 before:bottom-0 before:left-0 
                      hover:before:w-full before:transition-all before:duration-500 ${
                        activeSection === item.to.slice(1)
                          ? "text-primary before:w-full"
                          : ""
                      }`}
                  >
                    {item.keys}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Appointment Button */}
          <div>
            <NavLink
              className="border border-primary group relative px-4 py-2 font-medium text-black transition-colors duration-[400ms] hover:text-primary"
              to="#appointment"
            >
              Appointment
            </NavLink>
          </div>
        </div>
      </Container>

      {/* Close Icon for Mobile Menu */}
      <div
        className={`absolute top-[40px] right-[40%] duration-500 text-black z-[99999] block lg:hidden ${
          menuShow
            ? "opacity-100 delay-500 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setmenuShow(false)}
      >
        <Icon type="close" className="text-[35px] text-primary" />
      </div>
    </div>
  );
};

export default Header;
