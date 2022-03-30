import { View, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import animalImages from "../graphics/animals";
import bronze from "../graphics/icons/badges/bronze.png";
import silver from "../graphics/icons/badges/silver.png";
import gold from "../graphics/icons/badges/gold.png";
import defaultBadge from "../graphics/icons/badges/no_badge.png";
import { Text } from "native-base";

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
      <View style={styles.card}>
        <ImageBackground source={badgeColour} style={styles.splashBackground} resizeMode="cover">
          <Image style={styles.animalImage} source={animalImages[count.name]} />
          <Text fontFamily="body" fontWeight={600} style={styles.countNumber} >{count.count}</Text>
        </ImageBackground>
      </View>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#339999",
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  splashBackground: {
    width: 150,
    height: 150,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  animalImage: {
    width: 100,
    height: 100,
  },
  countNumber: {
    color: "#fff",
    fontSize: 18
  }
});
