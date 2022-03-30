import React from "react";
import { ImageBackground, StyleSheet, Image, View, Pressable } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import splashMainBackground from "../graphics/scenes/play-backdrop.png";
import buttons from "../graphics/icons/buttons";

export default function Home({ navigation }) {
  const { user } = useAuthentication();
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <ImageBackground source={splashMainBackground} resizeMode="cover" style={styles.splashBackground}>
        <View style={{ paddingTop: 75 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Ani-Dex");
            }}
          >
            <Image source={buttons.anidex} style={styles.navButtons} />
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("Take Photo");
            }}
          >
            <Image source={buttons.takePhoto} style={styles.navButtons} />
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("My Animon");
            }}
          >
            <Image source={buttons.myAnimon} style={styles.navButtons} />
          </Pressable>

          <Pressable
            style={styles.dropShadow}
            onPress={() => {
              navigation.navigate("My Badges");
            }}
          >
            <Image source={buttons.myBadges} style={styles.navButtons} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

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
  navButtons: {
    height: 100,
    width: 100,
    marginRight: 150,
    paddingTop: 5,
    marginTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
  },
});

{
  /* <Text>Welcome {user?.email}!</Text> */
}

{
  /* <Button
          title="Sign Out"
          style={styles.button}
          onPress={() => signOut(auth)}
        /> */
}
