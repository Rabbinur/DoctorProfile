import React from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../../hooks/usefetch";


const Dashboard = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
 console.log(data.totalReviews);
  const cardData = [
    {
      icon: <TbReportAnalytics size={25} />,
      total: data?.totalAppointments || 0,
      title: "Total Reports",
    },
    {
      icon: <FaUsers size={25} />,
      total: data?.totalBlogs || 0,
      title: "Total Blogs",
    },
    {
      icon: <BsFillQuestionCircleFill size={25} />,
      total: data?.totalReviews || 0,
      title: "Total Reviews",
    },
    {
      icon: <BsFillQuestionCircleFill size={25} />,
      total: data?.totalChambers || 0,
      title: "Total Chambers",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* {isFetching ? (
          `Loading`
        ) : (
         
        )} */}
         <>
            {cardData.map((card, index) => (
              <ItemCard key={index} icon={card.icon} total={card.total}>
                {card.title}
              </ItemCard>
            ))}
          </>
      </div>
    </div>
  );
};

export default Dashboard;
