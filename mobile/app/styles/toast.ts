import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export default StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 50,
    left: "10%",
    right: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 1000,
  } as ViewStyle,
  text: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    textAlign: "center",
  } as TextStyle,
  icon: {
    marginRight: 10,
  },
});
