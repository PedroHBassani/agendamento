import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/optionButton";

interface OptionButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}

const OptionButton = ({ icon, text, onPress }: OptionButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionButton;
