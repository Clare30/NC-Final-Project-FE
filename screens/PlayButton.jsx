import React from "react";
import { Pressable, StyleSheet, ImageBackground, Text, Image, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import * as splashMainBackground from "../assets/background.png";
import * as playButton from "../assets/playButton.png";

const PlayButton = ({ navigation }) => {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.splashBackground} resizeMode="cover" source={splashMainBackground}>
        <Pressable
          onPress={() => {
            navigation.navigate("Route Logic");
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
    marginLeft: 30,
  },
});
export default PlayButton;
