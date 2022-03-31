import React from "react";
import { Pressable, StyleSheet, ImageBackground, Image, View } from "react-native";
import splashMainBackground from "../graphics/scenes/play-backdrop.png";
import buttons from "../graphics/icons/buttons/index.js";
import FadeInAnimation from "../Components/FadeInAnimation";

const PlayButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.splashBackground} resizeMode="cover" source={splashMainBackground}>
        <FadeInAnimation>
          <Pressable
            onPress={() => {
              navigation.navigate("Route Logic");
            }}
          >
            <Image source={buttons.playButton} style={styles.playButton}></Image>
          </Pressable>
        </FadeInAnimation>
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
    alignItems: "center",
    justifyContent: "center",
  },

  playButton: {
    height: 180,
    width: 180,
    marginRight: 140,
  },
});
export default PlayButton;
