import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/axios";
import axios, { AxiosError } from "axios";

export const auth = async (email: string, password: string) => {
  try {
    const response = await api.post("/user/login", { email, password });

    if (!response.data.data.user) {
      return {
        error: response.data.data.message,
      };
    }

    const token = response.data.data.token;
    const { name, role, email: userEmail, _id } = response.data.data.user;

    await AsyncStorage.multiSet([
      ["authToken", token],
      ["userName", name],
      ["userEmail", userEmail],
      ["userRole", role],
      ["userId", _id],
    ]);

    return {
      token,
      user: { name, userEmail, role },
    };
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.message };
    } else return { error: "Ocorreu um erro inesperado, tente novamente" };
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/user/register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error))
      return { error: error.response?.data?.message };
    else return { error: "Ocorreu um erro inesperado, tente novamente" };
  }
};

export const getUserData = async () => {
  try {
    const [[_, token], [__, name], [___, email], [____, role], [_____, id]] =
      await AsyncStorage.multiGet([
        "authToken",
        "userName",
        "userEmail",
        "userRole",
        "userId",
      ]);
    return { token, name, email, role, _id: id };
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
    return null;
  }
};

export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (error) {
    console.error("Failed to retrieve user token:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([
      "authToken",
      "userName",
      "userEmail",
      "userRole",
      "userId",
    ]);
  } catch (error) {
    console.error("Failed to logout:", error);
  }
};
