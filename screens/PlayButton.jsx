import React from "react";
import {
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from "react-native";
import splashMainBackground from "../graphics/scenes/play-backdrop.png";
import playButton from "../graphics/icons/buttons/home_play.png";
import FadeInAnimation from "../Components/FadeInAnimation";

const PlayButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.splashBackground}
        resizeMode="cover"
        source={splashMainBackground}
      >
        <FadeInAnimation>
          <Pressable
            onPress={() => {
              navigation.navigate("Route Logic");
            }}
          >
            <Image source={playButton} style={styles.playButton}></Image>
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
    height: 200,
    width: 200,
    marginRight: 100,
  },
});
export default PlayButton;
