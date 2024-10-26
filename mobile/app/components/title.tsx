import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import styles from "../styles/title";

interface TitleProps {
  back?: boolean;
  title: string;
  onBack?: () => void;
  reload?: boolean;
  onReload?: () => void;
}

const Title = ({
  back = false,
  title,
  onBack,
  reload,
  onReload,
}: TitleProps) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.leftContainer}>
        {back && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon
              name="arrow-left"
              size={24}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {reload && (
        <TouchableOpacity style={styles.reloadButton} onPress={onReload}>
          <Icon name="refresh-cw" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Title;
