import React from "react";
import PropTypes from "prop-types";
import { CiSearch, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiTwitter } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { GoArrowUp } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";



const iconMap = {
  search: CiSearch,
  heart: CiHeart,
  user: CiUser,
  down:IoIosArrowRoundDown,
  email:AiOutlineMail,
  phone:MdOutlinePhone,
  map:GrMapLocation,
  cart: CiShoppingCart,
  close: IoCloseCircleOutline,
  FaFacebookF: FaFacebookF,
  PiInstagramLogoThin: PiInstagramLogoThin,
  CiTwitter: CiTwitter,
  TbWorld: TbWorld,
  uparrow: GoArrowUp,
};

const Icon = React.memo(({ type, className = "", size = 24 }) => {
  const IconComponent = iconMap[type];
  return IconComponent ? <IconComponent className={className} size={size} /> : null;
});

Icon.displayName = "Icon";

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Icon;
