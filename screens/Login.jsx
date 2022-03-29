import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { Input } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Box,
  Center,
  FormControl,
  Heading,
  HStack,
  VStack,
  Button,
} from "native-base";
import signInBackground from "../graphics/scenes/sign-in-up-backdrop.png";

const auth = getAuth();

const LoginScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function login() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <ImageBackground
      resizeMode="cover"
      style={{ flex: 1 }}
      source={signInBackground}
    >
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            fontWeight={400}
            size="lg"
            color="#fff"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>
          {!!value.error && (
            <View style={styles.error}>
              <Text>{value.error}</Text>
            </View>
          )}

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={login}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                onPress={() => {
                  navigation.navigate("Sign Up");
                }}
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default LoginScreen;
