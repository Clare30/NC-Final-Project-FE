import { View, StyleSheet, ImageBackground } from "react-native";
import { useEffect, useState, useContext } from "react";
import bronze from "../graphics/icons/bronze-badge.png";
import silver from "../graphics/icons/silver-badge.png";
import gold from "../graphics/icons/gold-badge.png";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";
import {Text} from "native-base"

export default function ActionBarImage() {
  const { animalCounts: counts } = useContext(AnimalCountContext);
  const [badgeCount, setBadgeCount] = useState({
    bronze: 0,
    silver: 0,
    gold: 0,
  });

  useEffect(() => {
    const newBadgeCount = { bronze: 0, silver: 0, gold: 0 };
    Object.keys(counts).forEach((count) => {
      if (count !== "total_count")
        if (counts[count] >= 10) {
          newBadgeCount.gold++;
        } else if (counts[count] >= 5) {
          newBadgeCount.silver++;
        } else if (counts[count] >= 1) {
          newBadgeCount.bronze++;
        }
    });
    setBadgeCount(newBadgeCount);
  }, [counts]);

  return (
    <View style={styles.view}>
      <ImageBackground style={styles.badgeImage} source={bronze}>
        <Text fontFamily="body" fontWeight={600} color="white" style={styles.text}>{badgeCount.bronze}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={silver}>
        <Text fontFamily="body" fontWeight={600} color="white" style={styles.text}>{badgeCount.silver}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={gold}>
        <Text fontFamily="body" fontWeight={600} color="white" style={styles.text}>{badgeCount.gold}</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    marginRight: 10,
  },
  badgeImage: {
    width: 25,
    height: 25,
    borderRadius: 40 / 2,
    marginLeft: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
