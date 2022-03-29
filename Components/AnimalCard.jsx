import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import animalImages from "../graphics/animals";
import FunFacts from "./FunFacts";

export default function AnimalCard({ animal }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      onStartShouldSetResponder={() => {
        setModalVisible(true);
      }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.text}>{animal.name}</Text>
        <Image
          style={styles.animalImage}
          source={animalImages[animal.name]}
          resizeMode="cover"
        />
      </View>

      <FunFacts
        animal={animal}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  animalImage: {
    width: 100,
    height: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#339999",
    borderRadius: 20,
    width: 250,
    paddingLeft: 20,
    paddingRight: 20,
    boxShadow: "0px 2px 4px",
    backgroundColor: "#ffffff",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: 700,
    marginLeft: 40,
  }
});
