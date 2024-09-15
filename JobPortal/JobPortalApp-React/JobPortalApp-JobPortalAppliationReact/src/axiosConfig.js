// src/axiosConfig.js
import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or Redux state
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., show notification, logout user)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
