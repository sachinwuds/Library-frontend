// src/axiosInstance.js
import axios from 'axios';
import config from './config';
const baseURL = config.baseURL;

const axiosInstance = axios.create({
  baseURL: baseURL ,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;