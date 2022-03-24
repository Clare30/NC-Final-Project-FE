import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Button } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { useEffect, useState } from "react/cjs/react.development";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function snapPhoto() {
    if (camera) {
      const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
      await camera.takePictureAsync(options).then(async (photo) => {
        photo.exif.Orientation = 1;
        const { uri } = photo;
      });
    }
  }
  return (
    <SafeAreaView>
      <Camera
        style={styles.camera}
        type={type}
        //ref causes an error when working with live code so you will have to restart your connection to the app
        //Not yet found an alternative that works
        ref={setCamera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(Camera.Constants.Type.back);
            }}
          >
            <Button
              title="Take picture"
              onPress={() => {
                snapPhoto();
              }}
            ></Button>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  camera: {
    marginTop: 0,

    width: Dimensions.get("window").width,
    // height: 300,
    height: Dimensions.get("window").width * 1.3333,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "column-reverse",
    margin: 20,
  },
  button: {
    // flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  control: {
    marginTop: 10,
  },
});
