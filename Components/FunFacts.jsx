import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import animalImages from "../graphics/animals";
import YoutubeEmbed from "./YoutubeEmbed";
import backArrow from "../graphics/icons/backArrow.png";

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
        <ScrollView>
          <View style={styles.modalView}>
            <Text style={styles.text}>{animal.name}</Text>
            <Image
              style={{ width: 150, height: 150 }}
              source={animalImages[animal.name]}
            />
            <View style={styles.card}>
              <Text style={styles.text}>🔍 Did you know?</Text>
              <Text style={styles.para}>{animal.fun_fact}</Text>
              <Text style={styles.text}>🍽 What they eat</Text>
              <Text style={styles.para}> {animal.what_they_eat}</Text>
            </View>
            {Array.isArray(animal.video_url) ? (
              animal.video_url.map((url) => {
                return <YoutubeEmbed key={url} video_url={url} />;
              })
            ) : (
              <YoutubeEmbed video_url={animal.video_url} />
            )}
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image source={backArrow} style={styles.backArrow} />
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    height: 50,
    width: 50,
  },
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
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#339999",
    borderRadius: 20,
    width: 250,
    padding: 20,
    backgroundColor: "#f1f1f1",
    marginBottom: 50,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "600",
  },
  para: {
    marginTop: 20,
    marginBottom: 20,
  },
});
