import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import React from "react";
import "react-native-gesture-handler";
import InitialStack from "./navigation/initialStack";
import "./config/firestore";
import { NativeBaseProvider, Text, Box } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

// Import the functions you need from the SDKs you need

export default function App() {
  return (
    // <View style={styles.container}>
    //   <ThemeProvider>
    //     <NavigationContainer>
    //       <InitialStack />
    //     </NavigationContainer>
    //   </ThemeProvider>
    // </View>
    <NativeBaseProvider>
      <ThemeProvider>
        <NavigationContainer>
          <InitialStack />
        </NavigationContainer>
      </ThemeProvider>
    </NativeBaseProvider>
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
