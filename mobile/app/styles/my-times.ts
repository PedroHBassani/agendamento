import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  timesContainer: {
    flex: 1,
    marginTop: 45,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
    marginBottom: 8,
    borderRadius: 8,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  courtName: {
    fontSize: 16,
    color: "#fff",
  },
  time: {
    fontSize: 14,
    color: "#ccc",
  },
  noTimes: {
    textAlign: "center",
    color: "#999",
    marginTop: 16,
  },
  timeList: {
    paddingBottom: 16,
  },
  cancel: {
    marginLeft: 16,
  },
});

export default styles;
