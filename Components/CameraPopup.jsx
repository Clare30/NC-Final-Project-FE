import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Button, Image } from "react-native-elements";

export default function CameraPopup({ setCameraModalVisible, cameraModalVisible, uri }) {
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
              //SAVE IMAGE FUNCTION HERE
            }}
          >
            <Text>✅</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCameraModalVisible(false);
            }}
          >
            <Text>❌</Text>
          </Pressable>
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
