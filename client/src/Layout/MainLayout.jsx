import React from "react";
import Header from "../component/ui/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Top from "../component/ui/Top/Top";
import Footer from "../component/ui/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Top />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
