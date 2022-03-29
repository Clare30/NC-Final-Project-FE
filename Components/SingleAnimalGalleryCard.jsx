import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { ImagePopup } from "./ImagePopup";

export default function SingleAnimalGalleryCard({
  animalName,
  animalUrlList,
  user,
}) {
  const [animalUrls, setAnimalUrls] = useState(animalUrlList);
  return (
    <View>
      {animalUrls && (
        <View style={styles.container}>
          <Card>
            <Text>
              {animalName}: {animalUrls.length}
            </Text>
            {animalUrls.map((animalUrl, index) => {
              return (
                <ImagePopup
                  setAnimalUrls={setAnimalUrls}
                  imageUrl={animalUrl}
                  index={index}
                  user={user}
                  animalName={animalName}
                  key={animalUrl}
                />
              );
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
