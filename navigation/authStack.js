import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Welcome from "../screens/Welcome";
import login from "../screens/Login";
import SignOut from "../screens/SignUp";

const Drawer = createDrawerNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Welcome" component={Welcome} />
        <Drawer.Screen name="Sign In" component={login} />
        <Drawer.Screen name="Sign Up" component={SignOut} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
