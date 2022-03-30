import React, { useContext } from "react";
import { StyleSheet, View, ScrollView, Dimensions, ImageBackground } from "react-native";
import BadgeCard from "../Components/BadgeCard";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";
import splashMainBackground from "../graphics/scenes/sign-in-up-backdrop.png";

import animals from "../graphics/animals";

export default function Badges() {
  const { animalCounts: counts } = useContext(AnimalCountContext);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.splashBackground} resizeMode="cover" source={splashMainBackground}>
        {counts && (
          <ScrollView style={styles.control}>
            {Object.keys(animals).map((count) => {
              if (count !== "total_count") return <BadgeCard key={count} count={{ count: counts[count] || 0, name: count }} />;
            })}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  control: {
    flex: 1,
    width: Dimensions.get("window").width,
    marginTop: 10,
    paddingTop: 20,
  },
  splashBackground: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
