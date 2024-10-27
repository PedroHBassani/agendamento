import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getUserData, logout } from "../services/auth";
import Loading from "../components/loading";

import styles from "../styles/authScreen";
import Login from "../components/login";
import Register from "../components/register";
import HomeScreen from "./homeScreen";

export type formType = {
  name: string;
  email: string;
  password: string;
};

export type userType = {
  name: string;
  email: string;
  role: string;
  token: string;
  _id?: string;
};

const AuthScreen = () => {
  const [page, setPage] = useState<string>("login");
  const [form, setForm] = useState({
    name: "Pedro",
    email: "pedro@gmail.com",
    password: "123456",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<userType>({
    name: "",
    email: "",
    role: "",
    token: "",
  });

  useEffect(() => {
    setLoading(true);
    getUserData().then((res) => {
      setLoading(false);
      if (res?.name) {
        setPage("home");
        setUserData(res as userType);
      }
    });
  }, [page]);

  return (
    <View style={styles.container}>
      <Loading enabled={loading}>
        {page === "login" && (
          <Login
            form={form}
            changeForm={(e) => setForm(e)}
            changePage={setPage}
          />
        )}
        {page === "register" && (
          <Register
            form={form}
            changeForm={(e) => setForm(e)}
            changePage={setPage}
          />
        )}
        {page === "home" && (
          <HomeScreen
            user={userData}
            onLogout={() => {
              logout();
              setPage("login");
            }}
          />
        )}
      </Loading>
    </View>
  );
};

export default AuthScreen;
