import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator initialRootName="Home">
      <Drawer.Screen focused="true" name="Home" component={HomeScreen} />
      <Drawer.Screen name="Login" component={LoginScreen}/>
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
