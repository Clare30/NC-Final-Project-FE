import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import login from "../screens/Login";
import SignOut from "../screens/SignUp";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Sign In" component={login} />
        <Stack.Screen name="Sign Up" component={SignOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
