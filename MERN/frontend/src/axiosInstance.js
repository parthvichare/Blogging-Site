import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000', // Use production URL if available, otherwise fallback to localhost
});

export default axiosInstance;
