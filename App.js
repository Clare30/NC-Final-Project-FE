import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import InitialStack from "./navigation/initialStack";

// Import the functions you need from the SDKs you need

export default function App() {
  return (
    <ThemeProvider>
      <InitialStack />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
