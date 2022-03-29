import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import animalImages from "../graphics/animals";
import bronze from "../graphics/icons/badges/bronze.png";
import silver from "../graphics/icons/badges/silver.png";
import gold from "../graphics/icons/badges/gold.png";
import defaultBadge from "../graphics/icons/badges/no_badge.png";

export default function BadgeCard({ count }) {
  let badgeColour;
  if (count.count < 1) {
    badgeColour = defaultBadge;
  } else if (count.count < 5) {
    badgeColour = bronze;
  } else if (count.count < 10) {
    badgeColour = silver;
  } else {
    badgeColour = gold;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={badgeColour} style={styles.splashBackground} resizeMode="cover">
        <Image style={styles.animalImage} source={animalImages[count.name]} />
        <Text>{count.count}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  splashBackground: {
    width: 150,
    height: 150,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  animalImage: {
    width: 100,
    height: 100,
  },
});
