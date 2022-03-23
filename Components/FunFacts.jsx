import React from "react";
import { View, Text, Modal, StyleSheet, Pressable, Image } from "react-native";
import animalImages from "../graphics/animals";
import YoutubeEmbed from "./YoutubeEmbed";

export default function FunFacts({ animal, modalVisible, setModalVisible }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        propagateSwipe={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>X</Text>
          </Pressable>
          <Text>{animal.name}</Text>
          <Image style={{ width: 150, height: 150 }} source={animalImages[animal.name]} />
          <Text>Fun Fact: {animal.fun_fact}</Text>
          <Text>What they eat: {animal.what_they_eat}</Text>

          {Array.isArray(animal.video_url) ? (
            animal.video_url.map((url) => {
              return <YoutubeEmbed key={url} video_url={url} />;
            })
          ) : (
            <YoutubeEmbed video_url={animal.video_url} />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
