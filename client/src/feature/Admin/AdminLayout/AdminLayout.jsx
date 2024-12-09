import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <div className="flex h-screen bg-gray-50">
      <div>
        <Sidebar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col  h-screen flex-1 overflow-y-auto">
        <div className="flex sticky top-0 items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`text-gray-900 focus:outline-none z-10 focus:text-gray-700 ${
                window.innerWidth <= 700 ? "block" : "hidden"
              }`}
            >
              {isSidebarOpen ? (
                <FaTimes size={25} />
              ) : (
                <FaBarsStaggered size={25} />
              )}
            </button>
            <input
              className="mx-4 w-full border hidden rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center pr-4 ">
            <div className="bg-white w-full py-5 mb-3 pr-5 flex justify-end">
              {/* <User /> */}

              <button
                onClick={handleLogout}
                className=" bg-red-400 px-2 py-1 rounded-md text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="bg-gradient-to-b
           from-white to-gray-50 
           shadow-primary  rounded-xl shadow -lg p-6 space-y-6">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
