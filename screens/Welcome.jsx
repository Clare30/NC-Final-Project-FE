import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>

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
