import React, { useState } from "react";
import { Text, View, Image, Modal, Pressable, StyleSheet } from "react-native";
import deleteImage from "../firestoreCalls/users/firestore.deleteImage";
import SingleAnimalGalleryCard from "./SingleAnimalGalleryCard";

export const ImagePopup = ({ imageUrl, index, user, animalName, setAnimalUrls }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <View key={index}>
      <Pressable
        style={{ width: 150, height: 150 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image}></Image>
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

          <Modal
            key={index}
            animationType="fade"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => {
              setDeleteModalVisible(false);
            }}
          >
            <View>
              <Text>Are you sure you want to delete image?</Text>
              <Pressable
                onPress={() => {
                  // console.log(user)
                  deleteImage(user, imageUrl, animalName)
                  setAnimalUrls((animalUrls)=>{
                    const copyUrls = [...animalUrls]
                    copyUrls.splice(index, 1)
                    return copyUrls
                  })
                  setDeleteModalVisible(false);
                }}
              >
                <Text>Yes</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setDeleteModalVisible(false);
                }}
              >
                <Text>NO</Text>
              </Pressable>
            </View>
          </Modal>

          <Pressable
            onPress={() => {
              
              setDeleteModalVisible(true);
            }}
          >
            <Text>Delete Image</Text>
          </Pressable>

          <Image source={{ uri: imageUrl }} style={styles.image}></Image>
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
