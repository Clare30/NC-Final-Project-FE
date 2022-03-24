import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import animalImages from "../graphics/animals";
import bronze from "../graphics/icons/bronze-badge.png";
import silver from "../graphics/icons/silver-badge.png";
import gold from "../graphics/icons/gold-badge.png";
import defaultBadge from "../graphics/icons/info.png";

export default function BadgeCard({ count }) {
  let badgeColour;
  if (count.count < 2) {
    badgeColour = defaultBadge;
  } else if (count.count < 3) {
    badgeColour = bronze;
  } else if (count.count < 11) {
    badgeColour = silver;
  } else {
    badgeColour = gold;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={badgeColour}
        style={styles.splashBackground}
        resizeMode="cover"
      >
        <Image style={styles.animalImage} source={animalImages[count.name]} />
        <Text>{count.count}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
