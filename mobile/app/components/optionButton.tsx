import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import styles from "../styles/optionButton";

interface OptionButtonProps {
  icon?: React.ReactNode;
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  dark?: boolean;
}

const OptionButton = ({
  icon,
  text,
  onPress,
  style,
  dark,
}: OptionButtonProps) => {
  const getStyles = {
    button: dark ? styles.buttonDark : styles.button,
    iconContainer: dark ? styles.iconContainer : styles.iconContainer,
    textContainer: dark ? styles.textContainer : styles.textContainer,
    buttonText: dark ? styles.buttonTextDark : styles.buttonText,
  };

  return (
    <TouchableOpacity style={[getStyles.button, style]} onPress={onPress}>
      <View style={getStyles.iconContainer}>{icon}</View>
      <View style={getStyles.textContainer}>
        <Text style={getStyles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionButton;
