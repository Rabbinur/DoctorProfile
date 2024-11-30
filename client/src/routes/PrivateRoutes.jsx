// AdminRoute.js

import { Navigate } from "react-router-dom";


const AdminRoute = ({ children }) => {
  const user=  JSON.parse(localStorage.getItem('user'));

  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;