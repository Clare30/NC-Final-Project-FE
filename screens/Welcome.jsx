import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Sign In")}>
        <Text>Sign In</Text>
      </Pressable>
      <View style={styles.buttons}>
        <Pressable onPress={() => navigation.navigate("Sign Up")}>
          <Text>Sign Up</Text>
        </Pressable>
      </View>
      <View style={styles.buttons}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Welcome;
