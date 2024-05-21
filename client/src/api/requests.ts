import axios from "axios";

const API_URL = "http://localhost:3002";

export const getCourts = async () => {
  const { data } = await axios.get(`${API_URL}/courts`);
  return data.data;
};

export const getFreeTimes = async (court: string) => {
  const { data } = await axios.get(`${API_URL}/times/free/${court}`);
  return data.data;
};

export const getTimesByUser = async (user: string) => {
  const { data } = await axios.get(`${API_URL}/times/user/${user}`);
  return data.data;
};

export const addTime = async (time: any, user: string) => {
  const body = {
    user,
    court: time.court,
    date: time.date,
    hour: time.hour,
  };
  const { data } = await axios.post(`${API_URL}/times`, body);
  return data.data;
};

export const removeTime = async (id: any) => {
  const { data } = await axios.delete(`${API_URL}/times/${id}`);
  return data.data;
};

export const userLogin = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/user/login`, data);
    return res.data.data;
  } catch (error: any) {
    return {
      error: true,
      message: error?.response.data.message,
    };
  }
};

export const userRegister = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/user/register`, data);
    return res.data;
  } catch (error: any) {
    return {
      error: true,
      message: error?.response.data.message,
    };
  }
};

export const getUsersAndTimes = async () => {
  const { data } = await axios.get(`${API_URL}/admin`);
  return data.data;
};

export const newCourt = async (court: any) => {
  const { data } = await axios.post(`${API_URL}/courts`, court);
  return data.data;
};
