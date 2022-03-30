import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { signOut, getAuth } from "firebase/auth";
import bronze from "../graphics/icons/bronze-badge.png";
import silver from "../graphics/icons/silver-badge.png";
import gold from "../graphics/icons/gold-badge.png";
import { MaterialIcons } from "@expo/vector-icons";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";

export default function ActionBarImage() {
  const auth = getAuth();
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
        <Text style={styles.text}>{badgeCount.bronze}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={silver}>
        <Text style={styles.text}>{badgeCount.silver}</Text>
      </ImageBackground>
      <ImageBackground style={styles.badgeImage} source={gold}>
        <Text style={styles.text}>{badgeCount.gold}</Text>
      </ImageBackground>
      <View style={styles.logout}>
        <MaterialIcons name="logout" size={24} color="white" onPress={() => signOut(auth)} />
      </View>
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
    marginLeft: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  logout: {
    marginLeft: 10,
  },
});
