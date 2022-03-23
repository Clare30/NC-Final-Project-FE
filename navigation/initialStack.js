import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlayButton from "../screens/PlayButton";
import RootNavigation from ".";

const Stack = createStackNavigator();

export default function InitialStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Play">
        <Stack.Screen name="Play" component={PlayButton} />
        <Stack.Screen name="Route Logic" component={RootNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
