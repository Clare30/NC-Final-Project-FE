import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import getAnimalCounts from "../firestoreCalls/animals/firestore.animalCounts";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";
import Map from "./Map";

const GalleryPage = () => {
  const [animals, setAnimals] = useState([]);
  const [animalGallery, setAnimalGallery] = useState([]);
  const [showMap, setShowMap] = useState(false);
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

      // .then((data) => {
      //   Object.keys(data).forEach((animalType) => {
      //     return animalType, data[animalType];
      //   });
      //   const dataArr = Object.entries(data);
      //   //  console.log("data", dataArr);

      //   return dataArr.filter((animalItem) => {
      //     //    console.log("animalItem", animalItem);
      //     animalItem[0] === animal[0];
      //   });
      // })
      // .then((filtered) => {
      //   setAnimalGallery(filtered);
      //   //   console.log("animal gallery", animalGallery);
      // });
    }
  }, []);

  // [[fox: 1], [hedgehog: 1], [allCounts: 2]]

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
      {animals.map((animal) => {
        return (
          <SingleAnimalGalleryCard
            key={animal[0]}
            animalName={animal[0]}
            animalUrls={animalGallery[animal[0]]}
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
      <Map showMap={showMap} animals={animalGallery} />
    </View>
  );
};

// const styles = StyleSheet.create({});
export default GalleryPage;
