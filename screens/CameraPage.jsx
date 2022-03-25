import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { useEffect, useState } from "react/cjs/react.development";
import CameraPopup from "../Components/CameraPopup";

export default function CameraPage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [base64, setBase64] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
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
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true,
      };
      await camera.takePictureAsync(options).then(async (photo) => {
        //This forces the images orientation to protrait (exif is the image data)
        photo.exif.Orientation = 1;
        setImageUri(photo.uri);
        setBase64(photo.base64);
        setCameraModalVisible(true);
      });
    }
  }

  return (
    <SafeAreaView>
      {isFocused && (
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
                title="📸 Take picture 📸"
                onPress={() => {
                  snapPhoto();
                }}
              ></Button>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <Button
        title="unmount camera"
        onPress={() => {
          setIsFocused(false);
        }}
      ></Button>
      <Button
        title="mount camera"
        onPress={() => {
          setIsFocused(true);
        }}
      ></Button>

      <CameraPopup
        cameraModalVisible={cameraModalVisible}
        setCameraModalVisible={setCameraModalVisible}
        uri={imageUri}
        base64={base64}
      />
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
