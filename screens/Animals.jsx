import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import AnimalCard from "../Components/AnimalCard";
import getAllAnimals from "../firestoreCalls/animals/firestore.animals";

export default function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(async () => {
    setAnimals(await getAllAnimals());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.control}>
        <Text style={styles.text}>ANI-DEX</Text>

        {Object.keys(animals).map((animal) => {
          return <AnimalCard key={animal} animal={animals[animal]} />;
        })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
    fontWeight: "600",
    marginBottom: 20,
  },
});
