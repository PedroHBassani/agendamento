import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
  fields: {
    flex: 1,
    marginTop: 45,
    paddingHorizontal: 16,
  },
  button: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  texts: {
    position: "absolute",
    bottom: 68,
    width: "100%",
  },
  text: {
    color: "#C9C9C9",
    fontSize: 12,
    marginLeft: 16,
    textAlign: "center",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    color: "#C9C9C9",
    marginTop: 45,
  },
});
