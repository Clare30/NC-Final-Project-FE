import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
        console.log(data);
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

  console.log(animals);

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
    </View>
  );
};

// const styles = StyleSheet.create({});
export default GalleryPage;
