import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import getAnimalCounts from "../firestoreCalls/users/firestore.animalCounts";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import SingleAnimalGalleryCard from "../Components/SingleAnimalGalleryCard";
import splashMainBackground from "../graphics/scenes/sign-in-up-backdrop.png";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const GalleryPage = () => {
  const [animals, setAnimals] = useState([]);
  const [animalGallery, setAnimalGallery] = useState([]);
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
  splashBackground: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
