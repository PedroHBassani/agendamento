import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "../styles/toast";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  type?: ToastType;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 3000,
  type = "info",
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(onHide);
        }, duration);
      });
    }
  }, [visible, fadeAnim, duration, onHide]);

  if (!visible) return null;

  const { backgroundColor, iconName } = getToastStyle(type);

  return (
    <Animated.View
      style={[styles.toast, { backgroundColor, opacity: fadeAnim }]}
    >
      <Icon name={iconName} size={24} color="#fff" style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const getToastStyle = (type: ToastType) => {
  switch (type) {
    case "success":
      return { backgroundColor: "#4CAF50", iconName: "check-circle" };
    case "error":
      return { backgroundColor: "#F44336", iconName: "error" };
    case "warning":
      return { backgroundColor: "#FFC107", iconName: "warning" };
    case "info":
    default:
      return { backgroundColor: "#2196F3", iconName: "info" };
  }
};

export default Toast;
