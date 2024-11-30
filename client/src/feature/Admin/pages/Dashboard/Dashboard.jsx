import React from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { TbReport, TbReportAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
const Dashbaord = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ItemCard icon={<TbReportAnalytics size={25} />} total={100}>
          {" "}
          Total Reports{" "}
        </ItemCard>
        <ItemCard icon={<FaUsers size={25} />} total={100}>
          {" "}
          Total Users{" "}
        </ItemCard>
        <ItemCard icon={<BsFillQuestionCircleFill size={25} />} total={100}>
          {" "}
          Total Questions{" "}
        </ItemCard>
      </div>
    </div>
  );
};

export default Dashbaord;