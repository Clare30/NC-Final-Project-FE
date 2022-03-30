import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions, Button, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react/cjs/react.development";
import CameraPopup from "../Components/CameraPopup";
import { manipulateAsync } from "expo-image-manipulator";
import { Entypo } from "@expo/vector-icons";

function CameraPage({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
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
        quality: 0.5,
        base64: true,
        fixOrientation: false,
        exif: true,
        skipProcessing: true,
      };
      await camera.takePictureAsync(options).then(async (photo) => {
        const compressedImage = await manipulateAsync(photo.uri, [], { compress: 0.5, base64: true });
        setImageUri(compressedImage.uri);
        setBase64(compressedImage.base64);
        setCameraModalVisible(true);
      });
    }
  }
  return (
    <SafeAreaView>
      <Camera style={styles.camera} type={type} ref={setCamera}></Camera>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            snapPhoto();
          }}
        >
          <Entypo name="camera" size={34} color="white" style={styles.takePhoto} />
        </Pressable>
      </View>

      <CameraPopup cameraModalVisible={cameraModalVisible} setCameraModalVisible={setCameraModalVisible} uri={imageUri} base64={base64} />
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
    height: Dimensions.get("window").width * 1.3333,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    margin: 40,
  },
  button: {
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
  takePhoto: {
    backgroundColor: "#339999",
    borderRadius: 50,
    padding: 20,
  },
  pressable: {
    height: 50,
    width: 50,
  },
});

export default CameraPage;
