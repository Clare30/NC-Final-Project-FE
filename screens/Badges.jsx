import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import BadgeCard from "../Components/BadgeCard";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";
import animals from "../graphics/animals";
export default function Badges() {
  const { animalCounts: counts } = useContext(AnimalCountContext);
  return (
    <View style={styles.container}>
      {counts && (
        <ScrollView style={styles.control}>
          {Object.keys(animals).map((count) => {
            if (count !== "total_count") return <BadgeCard key={count} count={{ count: counts[count] || 0, name: count }} />;
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  control: {
    flex: 1,
    width: Dimensions.get("window").width,
    marginTop: 10,
  },
});
