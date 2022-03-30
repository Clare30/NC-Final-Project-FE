import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import addNewUser from "../firestoreCalls/users/firestore.users.js";
import {
  Box,
  Center,
  FormControl,
  Heading,
  VStack,
  Button,
  Input,
  Text,
} from "native-base";
import signInBackground from "../graphics/scenes/sign-in-up-backdrop.png";
import signInBox from "../graphics/scenes/sign-in-box.png";

const auth = getAuth();
const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const uid = newUser.user.uid;
      addNewUser(uid);
      navigation.navigate("Sign In");
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

          {!!value.error && (
            <View style={styles.error}>
              <Text>{value.error}</Text>
            </View>
          )}

          <VStack space={3} mt="20" style={styles.vstack}>
            <Center w="100%" h="270">
              <ImageBackground
                source={signInBox}
                style={styles.owlBox}
                alt="BackImageBackground"
              >
                <Center w="50%">
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      w="100%"
                      value={value.email}
                      onChangeText={(text) =>
                        setValue({ ...value, email: text })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      secureTextEntry={true}
                      w="100%"
                      type="password"
                      value={value.password}
                      onChangeText={(text) =>
                        setValue({ ...value, password: text })
                      }
                    />
                  </FormControl>
                  <Button mt="2" colorScheme="indigo" onPress={signUp}>
                    Sign Up
                  </Button>
                </Center>
              </ImageBackground>
            </Center>
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
    alignItems: "center",
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
  owlBox: {
    height: 550,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
