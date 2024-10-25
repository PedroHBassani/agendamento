import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 48,
    textAlign: "center",
    color: "#9C9C9C",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 8,
    color: "#fff",
    borderRadius: 4,
    marginTop: 5, // espaço entre o label e o input
  },
  button: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    marginTop: 12,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 16,
    textAlign: "center",
    color: "#9C9C9C",
    fontSize: 16,
  },
  highlight: {
    color: "#fff",
    textDecorationLine: "none",
  },
  error: {
    color: "#f00",
    textAlign: "center",
    marginBottom: 16,
  },
});
