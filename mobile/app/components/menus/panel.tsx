import OptionButton from "../optionButton";
import Feather from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome6";

interface PanelMenuProps {
  setPage: (page: string) => void;
}

const PanelMenu = ({ setPage }: PanelMenuProps) => {
  return (
    <>
      <OptionButton
        icon={<Feather name="user" size={20} color="#000" />}
        text={"Usuários"}
        onPress={() => setPage("users")}
      />
      <OptionButton
        icon={<AwesomeIcon name="volleyball" size={20} color="#000" />}
        text={"Quadras"}
        onPress={() => setPage("reserve")}
      />
      <OptionButton
        icon={<Feather name="clock" size={20} color="#000" />}
        text={"Horários"}
        onPress={() => setPage("mySchedules")}
      />
    </>
  );
};

export default PanelMenu;
