import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    width: "100%",
    height: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#292929",
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  courtName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  time: {
    color: "#C9C9C9",
    fontSize: 14,
  },
  timeList: {
    paddingTop: 150,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
