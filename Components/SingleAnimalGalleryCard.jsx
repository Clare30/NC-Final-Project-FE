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
          <Card
            containerStyle={{
              borderRadius: 10,
              borderColor: "#339999",
            }}
          >
            <Text style={styles.text}>
              {animalName}
              {animalName === "fox" ? "es" : animalName === "deer" ? "" : "s"}
            </Text>
            <View style={styles.flexBox}>
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
            </View>
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
    borderRadius: 10,
    borderColor: "#339999",
  },
  flexBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
    margin: 5,
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "600",
  },
});
