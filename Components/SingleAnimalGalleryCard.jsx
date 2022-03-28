import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { ImagePopup } from "./ImagePopup";

export default function SingleAnimalGalleryCard({ animalName, animalUrls }) {
  return (
    <View>
      {animalUrls && (
        <View style={styles.container}>
          <Card>
            <Text>
              {animalName}: {animalUrls.length}
            </Text>
            {animalUrls.map((animalPic, index) => {
              return <ImagePopup animalPic={animalPic} index={index} />;
            })}
          </Card>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
});
