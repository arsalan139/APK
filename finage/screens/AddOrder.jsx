import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Text,
  RadioButton,
  Title,
  TextInput,
  Button,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Loading from "../components/Loading";
import SavingModel from "../components/SavingModel";
import { ADD_ORDER } from "../Redux/Actions/Actions";
import { Validation, orderSchema } from "../schema/ValidationScheme";
import * as Location from "expo-location";
const AddOrder = () => {
  const User = useSelector((state) => state.User.TOKEN);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [model, setModel] = useState(false);
  const { params } = useRoute();
  const initial = {
    user: User.id,
    worker: params.worker,
    gender: "",
    category: params.category,
    amount: "",
    working_hour: "",
    description: "",
    location: {
      lat: 0,
      lng: 0,
      address: "",
    },
  };
  const [form, setForm] = useState({
    user: User.id,
    worker: params.worker,
    gender: params.gender,
    category: params.category,
    description: "",
    location: {
      lat: 0,
      lng: 0,
      address: "",
    },
  });
  const [location, setLocation] = useState(null);
  const [count, setCount] = useState(12);
  const lang = useSelector((state) => state.User.selected_language);

  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.add_order.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", async () => {
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
    });
  }, []);
  if (!location) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <Title style={{ textAlign: "center" }}>
              {lang.add_order.subheading}: {params.category}
            </Title>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <Text>
                {lang.add_order.gender}: {params.gender}
              </Text>
            </View>
            <TextInput
              label={lang.add_order.address}
              placeholder={lang.add_order.address}
              value={form.location.address}
              multiline={true}
              dense
              style={{ marginVertical: 7 }}
              onChangeText={(text) => {
                let a = { ...form };
                a.location.address = text;
                setForm(a);
              }}
              mode="outlined"
            />
            <TextInput
              label={lang.add_order.description}
              multiline={true}
              numberOfLines={3}
              placeholder={lang.add_order.description}
              value={form.description}
              multiline={true}
              dense
              style={{ marginVertical: 7 }}
              onChangeText={(text) => {
                let a = { ...form };
                a.description = text;
                setForm(a);
              }}
              mode="outlined"
            />
            <View style={{ marginVertical: 7 }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: 350, marginBottom: count, marginTop: count }}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                showsScale={true}
                initialRegion={location}
                onPress={({ nativeEvent: { coordinate } }) => {
                  let a = { ...form };
                  a.location.lat = coordinate.latitude;
                  a.location.lng = coordinate.longitude;
                  setForm(a);
                }}
                onMapReady={() => {
                  setCount(0);
                }}
              >
                {form.location.lat !== 0 && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(form.location.lat),
                      longitude: parseFloat(form.location.lng),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  />
                )}
              </MapView>
            </View>
            <Button
              onPress={() => {
                Validation(orderSchema, form, (v) => {
                  setModel(true);
                  dispatch(
                    ADD_ORDER(
                      form,
                      () => {
                        setTimeout(() => {
                          setModel(false);
                          setForm(initial);
                        }, 3000);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                });
              }}
              style={{ backgroundColor: "#f50057" }}
              labelStyle={{ color: "white" }}
              uppercase={false}
            >
              {lang.add_order.place_order}
            </Button>
          </View>
          <SavingModel visible={model} title="Placing Order" />
        </ScrollView>
      </View>
    );
};

export default AddOrder;

const styles = StyleSheet.create({});
