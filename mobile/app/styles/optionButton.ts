import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  buttonDark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#292929",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
  buttonTextDark: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
  },
});
