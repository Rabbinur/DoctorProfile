import React from "react";

const ItemCard = ({ icon, title, total, children }) => {
  return (
    <div
      className="relative bg-white border border-gray-200
         rounded-lg p-6 transition-transform duration-300 ease-in-out shadow-lg
          transform hover:scale-100 hover:shadow-2xl overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 flex gap-6  items-center space-x-4">
        <div className="bg-[#f0f3fa] text-[#57bb7d] p-4 rounded-full ">
          {icon}
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">{total}</h1>
          <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
          {/* Children content */}
          <p className="relative z-10 mt-4 text-gray-600 text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;