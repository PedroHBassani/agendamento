import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
  list: {
    flex: 1,
    marginTop: 35,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    color: "#FFF",
    fontWeight: "bold",
  },
  role: {
    color: "#C9C9C9",
  },
  email: {
    color: "#FAFAFA",
  },
});

export default styles;
