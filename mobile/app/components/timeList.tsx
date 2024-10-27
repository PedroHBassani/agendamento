import React from "react";
import { FlatList, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { times as TimesType } from "@/app/screens/panelScreen";
import styles from "@/app/styles/my-times";

interface TimesListProps {
  times: TimesType[];
  canCancel?: boolean;
  onCancel?: (id: string) => void;
}

const TimesList = ({ times, canCancel, onCancel }: TimesListProps) => {
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
      {canCancel && (
        <Ionicons
          name="trash"
          size={20}
          color="#fff"
          style={styles.cancel}
          onPress={() => onCancel && onCancel(item.id)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.timesContainer}>
      {times.length > 0 ? (
        <FlatList
          data={times}
          renderItem={getItem}
          keyExtractor={(item) => item.id + Math.random().toString()}
          contentContainerStyle={styles.timeList}
        />
      ) : (
        <Text style={styles.noTimes}>Você não possui horários reservados</Text>
      )}
    </View>
  );
};

export default TimesList;
