import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";

const GalleryPage = () => {
  const [animals, setAnimals] = useState([]);
  const { user } = useAuthentication();
  const auth = getAuth();
  let currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      console.log(currentUser);
    }
  });

  useEffect(() => {
    // setAnimals([
    //   { name: "frog", count: 2 },
    //   { name: "robin", count: 1 },
    //   { name: "deer", count: 2 },
    // ]);
    getAnimalsByUserId(currentUser).then((data) => {
      console.log("function return", data);
    });
  }, []);

  console.log("animal list", animals);
  return (
    <View>
      {animals.map((animal) => {
        return (
          <SingleAnimalGalleryCard
            key={animal.name}
            animal={animal}
            currentUser={currentUser}
          />
        );
      })}
    </View>
  );
};

// const styles = StyleSheet.create({});
export default GalleryPage;
