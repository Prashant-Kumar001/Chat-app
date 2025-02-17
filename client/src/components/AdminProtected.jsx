import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const userRole = localStorage.getItem("role"); // Check role from localStorage

  return userRole === "admin" ? children : <Navigate to="/admin-login" replace />;
};

export default AdminProtected;
