import { Text, View, Image } from "react-native";
import React, { Component, useEffect, useState } from "react";
import AnimalCard from "../Components/AnimalCard";

export default function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    setAnimals([
      { name: "fox", fun_fact: "rocks are harder than foxes" },
      { name: "owl", fun_fact: "owls are cooler than jeff" },
    ]);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text>Animals</Text>
      <View>
        {animals.map((animal) => {
          return <AnimalCard key={animal.name} animal={animal} />;
        })}
      </View>
    </View>
  );
}
