import React from 'react'
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Set your base URL here
    Production_url: process.env.REACT_APP_BACKEND_URL
  });

export default axiosInstance
