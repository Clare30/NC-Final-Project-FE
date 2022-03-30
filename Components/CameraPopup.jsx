import { View, Text, Modal, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Image } from "react-native";
import postPhoto from "../firestoreCalls/users/firestore.postPhoto";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { useContext, useState } from "react";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";
import { MaterialCommunityIcons, Fontisto, AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { HStack, Pressable, useToast, Heading } from "native-base";

export default function CameraPopup({ setCameraModalVisible, cameraModalVisible, uri, base64 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const { user } = useAuthentication();
  const { animalCounts, setAnimalCounts } = useContext(AnimalCountContext);
  const toast = useToast();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={cameraModalVisible}
        onRequestClose={() => {
          setCameraModalVisible(false);
          setIsMatch(false);
        }}
      >
        {isMatch === null ? (
          <View style={styles.modalView}>
            <View style={styles.background}>
              <Heading style={styles.text}>We can't find this animal</Heading>
              <Entypo name="emoji-sad" size={24} color="black" />
              <Image style={{ height: 200, width: 200, borderRadius: 20, margin: 20 }} source={{ uri }} />
              <Heading style={styles.text}>Try taking a new photo</Heading>
              <Pressable
                onPress={() => {
                  setCameraModalVisible(false);
                  setIsMatch(false);
                }}
              >
                <Feather name="camera" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        ) : isMatch ? (
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setCameraModalVisible(false);
                setIsMatch(false);
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
            <Heading style={styles.text}>It's a {isMatch}!</Heading>
            <Image style={styles.image} source={{ uri }} />
            <Heading style={styles.text}>You've caught {animalCounts[isMatch]} so far!</Heading>
          </View>
        ) : (
          <View style={styles.modalView}>
            <Image style={styles.image} source={{ uri }} />
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <HStack space={10} mt="4">
                <Pressable
                  onPress={() => {
                    setIsLoading(true);
                    postPhoto(user.uid, uri, base64, animalCounts, setAnimalCounts, setIsMatch, setIsLoading)
                      .then(() => {
                        setIsLoading(false);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  <Fontisto name="save" size={24} color="black" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setCameraModalVisible(false);
                    toast.show({
                      title: "Discarded",
                      placement: "bottom",
                    });
                  }}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </Pressable>
              </HStack>
            )}
          </View>
        )}
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  text: {
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
  background: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
