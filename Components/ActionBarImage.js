import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import bronze from "../graphics/icons/bronze-badge.png";
import silver from "../graphics/icons/silver-badge.png";
import gold from "../graphics/icons/gold-badge.png";

export default function ActionBarImage() {
  const [badgeCount, setBadgeCount] = useState([]);

  useEffect(() => {
    setBadgeCount({
      bronze: 3,
      silver: 10,
      gold: 20,
    });
  }, []);

  return (
    <View style={styles.view}>
      <ImageBackground style={styles.badgeImage} source={bronze}>
        <Text style={styles.text}>{badgeCount.bronze}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={silver}>
        <Text style={styles.text}>{badgeCount.silver}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={gold}>
        <Text style={styles.text}>{badgeCount.gold}</Text>
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
