import { getUserData } from "@/app/services/auth";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.83:3002",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const userData = await getUserData();
    if (userData?.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
