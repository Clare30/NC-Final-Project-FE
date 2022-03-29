import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Text, View, Image, Modal, Pressable, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default function SingleAnimalGalleryCard({ animalName, animalUrls }) {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuthentication();
  const auth = getAuth();
  let currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
    }
  });

  // useEffect(() => {
  //   getAnimalsByUserId(currentUser).then((data) => {
  //     console.log("here in data", data);
  //   });
  // }, []);

  // console.log("animal gallery", animalGallery);

  return (
    <View>
      <Card>
        <Text>
          {animalName}: {animalUrls.length}
        </Text>

        {animalUrls.map((animalPic, index) => {
          return (
            <View key={index}>
              <Pressable
                style={{ width: 150, height: 150 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image
                  source={animalPic.imageURL}
                  style={{ width: 150, height: 150 }}
                ></Image>
              </Pressable>

              <Modal
                key={index}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
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
                  <Image
                    source={animalPic.imageURL}
                    style={{ width: 150, height: 150 }}
                  ></Image>
                </View>
              </Modal>
            </View>
          );
        })}
      </Card>
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
});
