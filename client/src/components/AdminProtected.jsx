import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const userRole = localStorage.getItem("role"); // Fetch role from localStorage

  // if (userRole !== "admin") {
  //   return <Navigate to="/admin-login" />;
  // }

  return children;
};

export default AdminProtected;
