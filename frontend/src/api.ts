import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Base URL to your backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach JWT token to every request if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;