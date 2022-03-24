import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import Animals from "../screens/Animals";
import Badges from "../screens/Badges";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (
    <Drawer.Navigator initialRootName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Animals" component={Animals} />
      <Drawer.Screen name="My Badges" component={Badges} />
    </Drawer.Navigator>
  );
}
