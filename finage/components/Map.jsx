import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import Loading from "./Loading";
const Map = () => {
  let { params } = useRoute();
  console.log(params.address);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    let map = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({
          options: { accuracy: Location.LocationAccuracy.Highest },
        });
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };
    map();
  }, []);
  if (!location) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={location}
        showsCompass={true}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(params.address.lat),
            longitude: parseFloat(params.address.lng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            setSelected(i);
            setVisible(true);
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;
