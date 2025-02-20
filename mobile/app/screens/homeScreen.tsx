import { View } from "react-native";
import { useState } from "react";
import { userType } from "../screens/authScreen";
import Title from "../components/title";

import styles from "../styles/homeScreen";
import HomeMenu from "../components/menus/home";
import PanelScreen from "./panelScreen";
import Reserve from "./home/reserveScreen";
import MyTimes from "./home/my-times";

interface HomeProps {
  user: userType;
  onLogout: () => void;
}

const HomeScreen = ({ user, onLogout }: HomeProps) => {
  const [page, setPage] = useState<string>("home");

  return (
    <View style={styles.container}>
      {page === "home" && user && (
        <Title title={"Olá, " + user.name.split(" ")[0]} />
      )}

      {getPage(user, page, setPage, { user, onLogout })}
    </View>
  );
};

const getPage = (
  user: userType,
  page: string,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  props: HomeProps
) => {
  switch (page) {
    case "reserve":
      return <Reserve setPage={setPage} />;
    case "times":
      return <MyTimes user={user} setPage={setPage} />;
    case "admin":
      if (user && user.role == "admin")
        return <PanelScreen changePage={setPage} />;
      else
        return (
          <HomeMenu setPage={setPage} onLogout={props.onLogout} user={user} />
        );
    default:
      return (
        <HomeMenu setPage={setPage} onLogout={props.onLogout} user={user} />
      );
  }
};

export default HomeScreen;
