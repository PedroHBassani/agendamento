import { View } from "react-native";
import { useState } from "react";
import { userType } from "../screens/authScreen";
import Title from "../components/title";

import styles from "../styles/homeScreen";
import HomeMenu from "../components/menus/home";
import PanelScreen from "./panelScreen";

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

      {getPage(page, setPage, { user, onLogout })}
    </View>
  );
};

const getPage = (
  page: string,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  props: HomeProps
) => {
  switch (page) {
    case "reserve":
      return "Reserve";
    case "mySchedules":
      return "MySchedules";
    case "admin":
      return <PanelScreen changePage={setPage} />;
    default:
      return <HomeMenu setPage={setPage} onLogout={props.onLogout} />;
  }
};

export default HomeScreen;
