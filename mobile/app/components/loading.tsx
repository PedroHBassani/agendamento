import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

interface LoadingProps {
  enabled: boolean;
  children?: React.ReactNode;
}

const Loading = ({ enabled, children }: LoadingProps) => {
  const positionValue = useRef(new Animated.Value(0)).current;

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(positionValue, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(positionValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (enabled) {
      startBounceAnimation();
    } else {
      positionValue.stopAnimation();
    }

    return () => {
      positionValue.stopAnimation();
    };
  }, [enabled]);

  const animatedStyle = {
    transform: [{ translateY: positionValue }],
  };

  return enabled ? (
    <View style={styles.loadingContainer}>
      <Animated.View style={animatedStyle}>
        <Icon name="volleyball" size={50} color="#fff" />
      </Animated.View>
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  ) : (
    children
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});
