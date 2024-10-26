import React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "@/app/styles/input";

interface InputProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const Input = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#fff"}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;
