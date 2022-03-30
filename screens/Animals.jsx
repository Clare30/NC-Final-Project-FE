import { StyleSheet, View, ScrollView, Dimensions, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AnimalCard from "../Components/AnimalCard";
import getAllAnimals from "../firestoreCalls/animals/firestore.animals";
import splashMainBackground from "../graphics/scenes/sign-in-up-backdrop.png";
import { Text } from "native-base";

export default function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(async () => {
    setAnimals(await getAllAnimals());
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.splashBackground} resizeMode="cover" source={splashMainBackground}>
        <ScrollView style={styles.control}>
          {Object.keys(animals).map((animal) => {
            return <AnimalCard key={animal} animal={animals[animal]} />;
          })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  control: {
    flex: 1,
    width: Dimensions.get("window").width,
    marginTop: 10,
  },

  text: {
    textAlign: "center",
    textTransform: "uppercase",
    // fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
    color: "#fff",
    fontSize: 20,
  },

  splashBackground: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
