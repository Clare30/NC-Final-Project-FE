import { View, Text, Image } from "react-native";
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
    >
      <Text>{animal.name}</Text>
      <Image
        style={{ width: 150, height: 150 }}
        source={animalImages[animal.name]}
      />
      <FunFacts
        animal={animal}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
