import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import getAnimalCounts from "../firestoreCalls/users/firestore.animalCounts";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";
import { useAuthentication } from "../utils/hooks/useAuthentication";
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
        const allCounts = Object.entries(data).filter(
          (arr) => "total_count" !== arr[0]
        );
        setAnimals(allCounts);
      });
    }
  }, [user]);

  return (
    <View style={styles.background}>
      {user && (
        <ScrollView>
          {animals.map((animal) => {
            if (animalGallery[animal[0]] && animalGallery[animal[0]].length)
              return (
                <SingleAnimalGalleryCard
                  key={animal[0]}
                  animalName={animal[0]}
                  animalUrlList={animalGallery[animal[0]]}
                  user={user}
                />
              );
          })}
          <Pressable
            style={{ width: 150, height: 150 }}
            onPress={() => {
              setShowMap(true);
            }}
          >
            <Text>Map</Text>
          </Pressable>
          <Map
            showMap={showMap}
            animals={animalGallery}
            setShowMap={setShowMap}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default GalleryPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F2F2F2",
  },
})