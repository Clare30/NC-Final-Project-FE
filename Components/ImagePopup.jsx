import React, { useState } from "react";
import { Text, View, Image, Modal, Pressable, StyleSheet } from "react-native";

export const ImagePopup = ({ animalPic, index }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View key={index}>
      <Pressable
        style={{ width: 150, height: 150 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: animalPic }} style={styles.image}></Image>
      </Pressable>

      <Modal
        key={index}
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
          <Image source={{ uri: animalPic }} style={styles.image}></Image>
        </View>
      </Modal>
    </View>
  );
};

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
