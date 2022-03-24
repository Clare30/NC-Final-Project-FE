import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Button } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { useEffect, useState } from "react/cjs/react.development";

export default function CameraPage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status: CameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (CameraStatus === "granted") {
        const { status: CameraRollStatus } = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(CameraRollStatus === "granted");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  async function snapPhoto() {
    if (currentCamera) {
      const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
      await currentCamera.takePictureAsync(options).then(async (photo) => {
        photo.exif.Orientation = 1;
        const { uri, base64 } = photo;
        console.log(base64.length);
        console.log(uri);
        MediaLibrary.saveToLibraryAsync(uri);
      });
    }
  }
  let currentCamera;
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        //ref causes an error when working with live code so you will have to restart your connection to the app
        //Not yet found an alternative that works
        ref={(ref) => {
          currentCamera = ref;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}
          >
            <Text style={styles.text}> Flip </Text>
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
  },
  camera: {
    marginTop: 50,
    // flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 1.3,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
