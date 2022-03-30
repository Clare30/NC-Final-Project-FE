import React, { useEffect, useState } from "react";

import { View, ScrollView, StyleSheet, Pressable, ImageBackground } from "react-native";
import { VStack, Text } from "native-base";
import { getAuth } from "firebase/auth";
import getAnimalCounts from "../firestoreCalls/users/firestore.animalCounts";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";
import splashMainBackground from "../graphics/scenes/sign-in-up-backdrop.png";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Entypo } from "@expo/vector-icons";

import Map from "./Map";

const GalleryPage = () => {
  const [animals, setAnimals] = useState([]);
  const [animalGallery, setAnimalGallery] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const auth = getAuth();
  const { user } = useAuthentication();

  useEffect(() => {
    if (user) {
      getAnimalsByUserId(user).then((data) => {
        setAnimalGallery(data);
      });
      getAnimalCounts(user).then((data) => {
        const allCounts = Object.entries(data).filter((arr) => "total_count" !== arr[0]);
        setAnimals(allCounts);
      });
    }
  }, [user]);

  return (
    <ImageBackground source={splashMainBackground} resizeMode="cover" style={styles.splashBackground}>
      <View>
        {user && (
          <ScrollView>
            <Pressable
              style={styles.viewMap}
              onPress={() => {
                setShowMap(true);
              }}
            >
              <VStack mt="4" style={styles.column}>
                <Text fontFamily="body" style={styles.whiteFont}>View Map</Text>
                <Entypo name="map" size={30} color="white" />
              </VStack>
            </Pressable>
            <Map showMap={showMap} animals={animalGallery} setShowMap={setShowMap} />
            {animals.map((animal) => {
              if (animalGallery[animal[0]] && animalGallery[animal[0]].length)
                return (
                  <SingleAnimalGalleryCard key={animal[0]} animalName={animal[0]} animalUrlList={animalGallery[animal[0]]} user={user} />
                );
            })}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default GalleryPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F2F2F2",
  },

  map: {
    alignContent: "center",
  },
  splashBackground: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  viewMap: {
    alignSelf: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center"
  }, 
  whiteFont: {
    color: "#fff",
    fontSize: 16
  }
});
