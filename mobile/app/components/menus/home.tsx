import OptionButton from "../optionButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Awesome from "react-native-vector-icons/FontAwesome5";
import MCommunity from "react-native-vector-icons/MaterialCommunityIcons";

interface HomeMenuProps {
  setPage: (page: string) => void;
  onLogout: () => void;
}

const HomeMenu = ({ setPage, onLogout }: HomeMenuProps) => {
  return (
    <>
      <OptionButton
        icon={<Ionicons name="calendar" size={20} color="#000" />}
        text={"Reservar Horário"}
        onPress={() => setPage("reserve")}
      />
      <OptionButton
        icon={<Feather name="clock" size={20} color="#000" />}
        text={"Meus Horários"}
        onPress={() => setPage("times")}
      />
      <OptionButton
        icon={<Awesome name="key" size={20} color="#000" />}
        text={"Painel"}
        onPress={() => setPage("admin")}
      />
      <OptionButton
        icon={<MCommunity name="logout" size={20} color="#000" />}
        text={"Sair"}
        onPress={() => {
          onLogout();
        }}
      />
    </>
  );
};

export default HomeMenu;
