import { FlatList, Text, View } from "react-native";
import { times as TimesType } from "../screens/panelScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/times";

interface TimesProps {
  times: TimesType[];
  canRemove?: boolean;
  onRemove?: (id: string) => void;
}

const Times = ({ times, canRemove = false, onRemove }: TimesProps) => {
  console.log(times);

  const getItem = ({ item }: { item: TimesType }) => (
    <View key={item.id} style={styles.itemContainer}>
      <Ionicons
        name="baseball-sharp"
        size={20}
        color="#fff"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.courtName}>{item.court}</Text>
        <Text style={styles.time}>
          {item.date} às {item.hour}:00
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={times}
        renderItem={getItem}
        keyExtractor={(item) => item.id + Math.random().toString()}
        contentContainerStyle={styles.timeList}
      />
    </View>
  );
};

export default Times;
