import React, { Pressable, useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import animalImages from "../graphics/animals";

export default function Map({ animals, showMap }) {
  const [location, setLocation] = useState({});
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      });
    })();
  }, []);
  let markerArray = [];
  return (
    <Modal visible={showMap}>
      {errorMsg ? (
        errorMsg
      ) : !location.latitude ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {animals &&
            Object.keys(animals).forEach((animal) => {
              animals[animal].forEach((animalData) => {
                markerArray.push({
                  image: animal,
                  coords: {
                    latitude: animalData.location[0],
                    longitude: animalData.location[1],
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                  },
                });
              });
            })}{" "}
          {setMarkers(markerArray)}
          <MapView initialRegion={location} style={styles.map}>
            {markers.map(({ image, coords }, index) => {
              return (
                <Marker key={index} coordinate={coords}>
                  <Image style={styles.pin} source={animalImages[image]} />
                </Marker>
              );
            })}
          </MapView>
        </View>
      )}
    </Modal>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pin: {
    height: 50,
    width: 50,
    justifyContent: "center",
  },
});
