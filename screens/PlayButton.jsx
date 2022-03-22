import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ImageBackground, Text, Image, View } from "react-native-web";
import * as splashMainBackground from "../assets/farm.jpg";
import * as playButton from "../assets/playButton.png";

const PlayButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.splashBackground}
        resizeMode="cover"
        source={splashMainBackground}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        >
          <Image source={playButton} style={styles.playButton}></Image>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashBackground: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  playButton: {
    flex: 1,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
});
export default PlayButton;
