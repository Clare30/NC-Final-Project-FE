import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import animalImages from "../graphics/animals";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  View,
  Image,
} from "react-native";

export default function Map({ animals, showMap, setShowMap }) {
  const [location, setLocation] = useState({});
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

  return (
    <Modal visible={showMap}>
      {!animals || !location.latitude ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Pressable
            onPress={() => {
              setShowMap(false);
            }}
          >
            <Text style={styles.text}>x close</Text>
          </Pressable>
          <MapView maxZoom={12} initialRegion={location} style={styles.map}>
            {Object.keys(animals).map((animal) => {
              return animals[animal].map((animalData, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: animalData.location[0],
                      longitude: animalData.location[1],
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.05,
                    }}
                  >
                    <Image style={styles.pin} source={animalImages[animal]} />
                    <Callout style={styles.callOut}>
                      <Text>
                        <Image
                          resizeMode="cover"
                          style={styles.photo}
                          source={{ uri: animalData.imageURL }}
                        />
                      </Text>
                    </Callout>
                  </Marker>
                );
              });
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
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  callOut: {
    width: 250,
    height: 250,
  },
  photo: {
    width: 250,
    height: 250,
  },
});
