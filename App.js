import { ThemeProvider } from "react-native-elements";
import "./config/firebase";
import React from "react";
import "react-native-gesture-handler";
import InitialStack from "./navigation/initialStack";
import "./config/firestore";
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import CustomTheme from "./CustomTheme";
import { LogBox } from "react-native";

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans/";

export default function App() {


  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  return (
    <NativeBaseProvider theme={CustomTheme}>
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
