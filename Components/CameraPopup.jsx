import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Button, Image } from "react-native-elements";
import postPhoto from "../firestoreCalls/users/firestore.postPhoto";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { useContext } from "react";
import { AnimalCountContext } from "../Contexts/AnimalCountContext";

export default function CameraPopup({ setCameraModalVisible, cameraModalVisible, uri, base64 }) {
  const { user } = useAuthentication();
  const { animalCounts, setAnimalCounts } = useContext(AnimalCountContext);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={cameraModalVisible}
        onRequestClose={() => {
          setCameraModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text>CameraPopup</Text>
          {uri && <Image style={{ width: 150, height: 150 }} source={{ uri: uri }} />}
          <Pressable
            onPress={() => {
              postPhoto(user.uid, uri, base64, animalCounts, setAnimalCounts)
                .then(() => {
                  console.log("hello");
                })
                .catch((err) => console.log(err));
            }}
          >
            <Text>✅Submit</Text>
          </Pressable>
          {/* <Pressable
            onPress={() => {
              setCameraModalVisible(false);
            }}
          >
            <Text>❌REJECT</Text>
          </Pressable> */}
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
