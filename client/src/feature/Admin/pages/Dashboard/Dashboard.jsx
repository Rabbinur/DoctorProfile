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
    keepPreviousData: true
  });
  const allData=data || [];
//  console.log(allData.totalReviews);
  const cardData = [
    {
      icon: <TbReportAnalytics size={25} />,
      total: allData?.totalAppointments || 0,
      title: "Total Appointments",
    },
    {
      icon: <FaUsers size={25} />,
      total: allData?.totalBlogs || 0,
      title: "Total Blogs",
    },
    {
      icon: <BsFillQuestionCircleFill size={25} />,
      total: allData?.totalReviews || 0,
      title: "Total Reviews",
    },
    {
      icon: <BsFillQuestionCircleFill size={25} />,
      total: allData?.totalChambers || 0,
      title: "Total Chambers",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1
       md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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
