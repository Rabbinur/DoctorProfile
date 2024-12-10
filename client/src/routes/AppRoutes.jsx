import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AdminLayout from "../feature/Admin/AdminLayout/AdminLayout";
import Dashbaord from "../feature/Admin/pages/Dashboard/Dashboard";
import Review from "../feature/Admin/pages/Review/Review";
import About from "../feature/Admin/pages/About/About";
import Appoinment from "../feature/Admin/pages/Appoinment/Appoinment";
import Contact from "../feature/Admin/pages/Contact/Contact";
import Banner from "../feature/Admin/pages/Banner/Banner";
import Blogs from "../feature/Admin/pages/Blogs/Blogs";

import SignIn from "../feature/Admin/Auth/SignIn";
import AdminRoute from "./PrivateRoutes";
import AboutFormData from "../feature/Admin/components/AboutDetails/AboutFromData";
import SiteDetails from "../feature/Admin/components/Site/SiteDetails";
import EditFromData from "../feature/Admin/components/Site/editFromData";
import ChamberDetails from "../feature/Admin/components/chamberDetails/ChamberDetails";
import Chamber from "../feature/Admin/pages/Chamber/Chamber";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashbaord />,
      },
      {
        path: "/admin/about",
        element: <About />,
      },
      {
        path: "/admin/about/:id",
        element: <AboutFormData />,
      },
      {
        path: "/admin/contact",
        element: <Contact />,
      },
      {
        path: "/admin/appointment",
        element: <Appoinment />,
      },
      {
        path: "/admin/banner",
        element: <Banner />,
      },
      {
        path: "/admin/blogs",
        element: <Blogs />,
      },
      {
        path: "/admin/reviews",
        element: <Review />,
      },
      {
        path: "/admin/site",
        element: <SiteDetails />,
      },
      {
        path: "/admin/chamber",
        element: <Chamber />,
      },
      {
        path: "/admin/site/:id",
        element: <EditFromData />,
      },
    ],
  },
]);
