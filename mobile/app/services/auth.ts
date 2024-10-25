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
    const { name, role, email: userEmail } = response.data.data.user;

    await AsyncStorage.multiSet([
      ["authToken", token],
      ["userName", name],
      ["userEmail", userEmail],
      ["userRole", role],
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
    const token = await AsyncStorage.getItem("authToken");
    const name = await AsyncStorage.getItem("userName");
    const email = await AsyncStorage.getItem("userEmail");
    const role = await AsyncStorage.getItem("userRole");

    return { token, name, email, role };
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
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
    ]);
  } catch (error) {
    console.error("Failed to logout:", error);
  }
};
