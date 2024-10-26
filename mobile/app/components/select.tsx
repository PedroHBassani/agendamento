import React from "react";
import { View, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "@/app/styles/select";

interface SelectInputProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const SelectInput = ({
  label,
  selectedValue,
  onValueChange,
  options,
}: SelectInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#fff"
          mode={Platform.OS === "android" ? "dropdown" : "dialog"}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectInput;
