import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
  containerAdd: {
    flex: 1,
    padding: 16,
    marginTop: 35,
  },
  list: {
    flex: 1,
    marginTop: 15,
  },
  button: {
    marginTop: 45,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#292929",
    color: "#fff",
  },
  name: {
    fontSize: 18,
    color: "#fff",
  },
  saveButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default styles;
