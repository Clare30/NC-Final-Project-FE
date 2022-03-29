import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import login from "../screens/Login";
import Signup from "../screens/SignUp";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Sign In">
      <Stack.Screen name="Sign In" component={login} />
      <Stack.Screen name="Sign Up" component={Signup} />
    </Stack.Navigator>
  );
}
