import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import React from "react";
import "react-native-gesture-handler";
import InitialStack from "./navigation/initialStack";
import "./config/firestore";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
// Import the functions you need from the SDKs you need

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ThemeProvider>
          <NavigationContainer>
            <InitialStack />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
