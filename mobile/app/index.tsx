import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AuthScreen from "./screens/authScreen";
import { ToastProvider } from "./context/toastContext";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Loading from "./components/loading";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading enabled={true} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#000000"
        barStyle="light-content"
        animated={true}
      />
      <ToastProvider>
        <AuthScreen />
      </ToastProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    fontFamily: "Roboto_400Regular",
  },
});

export default App;
