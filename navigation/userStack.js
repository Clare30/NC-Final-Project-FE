import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import Animals from "../screens/Animals";
import Badges from "../screens/Badges";
import CameraPage from "../screens/CameraPage";
import ActionBarImage from "../Components/ActionBarImage";
import { useEffect, useState } from "react";
import getAnimalCounts from "../firestoreCalls/animals/firestore.animalCounts";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import GalleryPage from "../screens/CameraGallery";
const Drawer = createDrawerNavigator();

export default function UserStack() {
  const { user } = useAuthentication();
  const [animalCounts, setAnimalCounts] = useState({});
  useEffect(() => {
    if (user) getAnimalCounts(user).then(setAnimalCounts);
  }, [user]);

  return (
    <AnimalCountContext.Provider value={{ animalCounts, setAnimalCounts }}>
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
    </AnimalCountContext.Provider>
  );
}
