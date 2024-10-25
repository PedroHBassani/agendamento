import { View } from "react-native";
import { useState } from "react";
import { userType } from "./authScreen";
import Title from "../components/title";

import styles from "../styles/homeScreen";
import PanelMenu from "../components/menus/panel";

interface PanelProps {
  changePage: React.Dispatch<React.SetStateAction<string>>;
}

const PanelScreen = ({ changePage }: PanelProps) => {
  const [page, setPage] = useState<string>("home");

  return (
    <View style={styles.container}>
      <Title title="Painel" back={true} onBack={() => changePage("home")} />
      {getPage(page, setPage)}
    </View>
  );
};

const getPage = (
  page: string,
  setPage: React.Dispatch<React.SetStateAction<string>>
) => {
  switch (page) {
    default:
      return <PanelMenu setPage={setPage} />;
  }
};

export default PanelScreen;
