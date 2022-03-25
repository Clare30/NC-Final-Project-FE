import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import Animals from "../screens/Animals";
import Badges from "../screens/Badges";
import CameraPage from "../screens/CameraPage";
import ActionBarImage from "../Components/ActionBarImage";
import GalleryPage from "../screens/CameraGallery";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (
    <Drawer.Navigator
      initialRootName="Home"
      screenOptions={{ headerRight: () => <ActionBarImage /> }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Animals" component={Animals} />
      <Drawer.Screen name="My Badges" component={Badges} />
      <Drawer.Screen
        name="Camera"
        component={CameraPage}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen name="Gallery" component={GalleryPage} />
    </Drawer.Navigator>
  );
}
