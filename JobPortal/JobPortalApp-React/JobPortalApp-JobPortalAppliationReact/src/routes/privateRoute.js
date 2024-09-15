// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import routesConfig from "../routes/route.json"; // Your routes configuration

const PrivateRoute = ({ element: Component, path }) => {
  const { isAuthenticated } = useSelector((state) => state.login);

  // Find the route configuration for the current path
  const routeConfig = routesConfig.find((route) => route.path === path);

  if (routeConfig && routeConfig.isAuthenticate && !isAuthenticated) {
    // Redirect to login page if authentication is required but user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the component if authenticated or if authentication is not required
  return Component;
};

export default PrivateRoute;
