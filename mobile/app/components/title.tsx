import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import styles from "../styles/title";

interface TitleProps {
  back?: boolean;
  title: string;
  onBack?: () => void;
}

const Title = ({ back = false, title, onBack }: TitleProps) => {
  return (
    <View style={styles.titleContainer}>
      {back && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Icon name="arrow-left" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Title;
