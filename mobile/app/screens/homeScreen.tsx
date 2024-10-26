import { View } from "react-native";
import { useState } from "react";
import { userType } from "../screens/authScreen";
import Title from "../components/title";

import styles from "../styles/homeScreen";
import HomeMenu from "../components/menus/home";
import PanelScreen from "./panelScreen";
import Reserve from "./reserveScreen";

interface HomeProps {
  user: userType;
  onLogout: () => void;
}

const HomeScreen = ({ user, onLogout }: HomeProps) => {
  const [page, setPage] = useState<string>("reserve");

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
    case "mySchedules":
      return "MySchedules";
    case "admin":
      if (user && user.role == "admin")
        return <PanelScreen changePage={setPage} />;
      else return <HomeMenu setPage={setPage} onLogout={props.onLogout} />;
    default:
      return <HomeMenu setPage={setPage} onLogout={props.onLogout} />;
  }
};

export default HomeScreen;
