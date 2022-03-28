import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import getAnimalCounts from "../firestoreCalls/animals/firestore.animalCounts";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";

const GalleryPage = () => {
  const [animals, setAnimals] = useState([]);
  const [animalGallery, setAnimalGallery] = useState([]);
  const auth = getAuth();
  let currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
    }
  });

  useEffect(() => {
    if (currentUser) {
      getAnimalsByUserId(currentUser).then((data) => {
        setAnimalGallery(data);
      });
    }
  }, []);

  useEffect(() => {
    getAnimalCounts(currentUser).then((data) => {
      const allCounts = Object.entries(data).filter(
        (arr) => "total_count" !== arr[0]
      );
      setAnimals(allCounts);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {animals.map((animal) => {
          return (
            <SingleAnimalGalleryCard
              key={animal[0]}
              animalName={animal[0]}
              animalUrls={animalGallery[animal[0]]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({});
export default GalleryPage;
