import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import getAnimalsByUserId from "../firestoreCalls/users/firestore.animalsByUser";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

export default function SingleAnimalGalleryCard({ animal, currentUser }) {
  const [animalGallery, setAnimalGallery] = useState([]);
  // const { user } = useAuthentication();
  // const auth = getAuth();
  // let currentUser;
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     currentUser = user;
  //     console.log(currentUser);
  //   }
  // });
  console.log("in single page");
  useEffect(() => {
    if (currentUser) {
      console.log("here is current user", currentUser);
      getAnimalsByUserId(currentUser)
        .then((data) => {
          console.log("data from get req", data);
          console.log("animal", animal);
          return data.filter((animalItem) => animalItem.name === animal.name);
        })
        .then((filtered) => {
          setAnimalGallery(filtered);
          console.log("animal gallery", animalGallery);
        });
    }
  }, []);

  // useEffect(() => {
  //   getAnimalsByUserId(currentUser).then((data) => {
  //     console.log("here in data", data);
  //   });
  // }, []);

  // console.log("animal gallery", animalGallery);

  return (
    <View>
      <Card>
        {/* <Text>
          {animal.name}: {animal.count}
        </Text> */}
        {animalGallery.map((animalPic) => {
          return <Image source={animalPic}></Image>;
        })}
      </Card>
    </View>
  );
}
