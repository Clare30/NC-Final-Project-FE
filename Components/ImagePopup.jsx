import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import deleteImage from "../firestoreCalls/users/firestore.deleteImage";
import SingleAnimalGalleryCard from "./SingleAnimalGalleryCard";

export const ImagePopup = ({
  imageUrl,
  index,
  user,
  animalName,
  setAnimalUrls,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <View key={index} style={styles.box}>
      <Pressable
        style={styles.shadow}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image}></Image>
      </Pressable>
      <Modal
        style={styles.modalView}
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
            <View style={styles.button}>
              <Text>Close</Text>
            </View>
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
            <View style={styles.modalView}>
              <Text>Are you sure you want to delete this photo?</Text>
              <View style={styles.flexContainer}>
                <Pressable
                  onPress={() => {
                    // console.log(user)
                    deleteImage(user, imageUrl, animalName);
                    setAnimalUrls((animalUrls) => {
                      const copyUrls = [...animalUrls];
                      copyUrls.splice(index, 1);
                      return copyUrls;
                    });
                    setDeleteModalVisible(false);
                  }}
                >
                  <Text style={styles.emoji}>✅</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setDeleteModalVisible(false);
                  }}
                >
                  <Text style={styles.emoji}>❌</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Image source={{ uri: imageUrl }} style={styles.modalImage}></Image>
          <Pressable
            onPress={() => {
              setDeleteModalVisible(true);
            }}
          >
            <Text style={styles.emoji}>🗑️</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    borderColor: "#339999",
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
    width: 135,
    height: 135,
    borderRadius: 5,
  },
  modalImage: {
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").width * 1.3333 * 0.75,
    borderRadius: 5,
    marginTop: 20,
  },
  shadow: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 28,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  flexContainer: { flex: 1, flexDirection: "row", flexWrap: "wrap" },
  button: {
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#339999",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
