import React from "react";
import { Navigate } from "react-router-dom";  // Use Navigate for redirection in React Router v6+

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;  // If token exists, user is authenticated
  };
const PrivateRoute = ({ children, isAuthenticated1 }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;