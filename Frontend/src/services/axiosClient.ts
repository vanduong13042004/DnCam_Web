import axios from 'axios';
import { CONFIG } from '../constants/config';

// Khởi tạo instance
const axiosClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
//trc khi gui request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
//nhan response
axiosClient.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    } else if (status === 403) {
      alert('Bạn không có quyền thực hiện thao tác này!');
    }
    else if (status === 500) {
      if (error.response?.status === 500) {
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  }
)
export default axiosClient;
