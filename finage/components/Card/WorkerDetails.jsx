import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Avatar, Icon } from "react-native-elements";
import {
  Card,
  Divider,
  Headline,
  List,
  Subheading,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_REVIEW,
  GET_WORKER_INFORMATION,
} from "../../Redux/Actions/Actions";
import Loading from "../Loading";
import ReviewCard from "./ReviewCard";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SavingModel from "../SavingModel";
import * as Location from "expo-location";
const WorkerDetails = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const info = useSelector((state) => state.User.info);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [count, setCount] = useState(1);
  const [location, setLocation] = useState(null);
  const [review, setReview] = useState({
    rating: 5,
    msg: "",
  });
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_WORKER_INFORMATION(params.id, async () => {
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
            setLoading(true);
          }
        })
      );
    });
  }, []);

  const avgRating = () => {
    let rating = 0;
    if (info.review?.review.length > 0) {
      for (var i of info?.review?.review) {
        rating = rating + i.rating;
      }
      rating = rating / info?.review?.review.length;
      return Math.round(rating);
    }
    return "No Reviews";
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <Surface style={styles.surface}>
              <Headline style={{ textAlign: "center" }}>Information </Headline>
              <View style={{ margin: 10 }}>
                <Card.Title
                  title={info.user.name}
                  subtitle={info.user.email}
                  left={(p) => (
                    <Avatar
                      {...p}
                      source={{ uri: info.pic }}
                      containerStyle={{ backgroundColor: "#1de9b6" }}
                      size={50}
                      rounded
                    />
                  )}
                  right={(p) => (
                    <View
                      style={{
                        marginHorizontal: 7,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="star"
                        type="antdesign"
                        color="#ffc107"
                        size={20}
                      />
                      <Text
                        style={{ marginLeft: 7, color: "#000", fontSize: 18 }}
                      >
                        {avgRating()}
                      </Text>
                    </View>
                  )}
                />
                <List.Section>
                  <List.Item
                    title="Gender"
                    description={info.user.gender}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon={
                          info.user.gender === "Male"
                            ? "gender-male"
                            : "gender-male"
                        }
                        color={
                          info.user.gender === "Male" ? "#2196f3" : "#f50057"
                        }
                      />
                    )}
                  />
                  <List.Item
                    title={`Account ${
                      info.user.restrict ? "is" : "is not"
                    } restricted`}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon={info.user.restrict ? "minus-circle" : "circle"}
                        color={info.user.restrict ? "red" : "green"}
                      />
                    )}
                  />
                </List.Section>
              </View>
            </Surface>
            <Surface style={styles.surface}>
              <Headline style={{ textAlign: "center" }}>Details </Headline>
              <View style={{ margin: 10 }}>
                <List.Section>
                  <List.Item
                    title="Category"
                    description={info.category}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="hammer-screwdriver"
                        color="#ffc400"
                      />
                    )}
                  />
                  <List.Item
                    title="Cnic"
                    description={info.cnic.number}
                    left={(props) => (
                      <List.Icon {...props} icon="smart-card" color="#d500f9" />
                    )}
                  />
                  <List.Item
                    title="Address"
                    description={info.address.place}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="home-account"
                        color="#ff9100"
                      />
                    )}
                  />
                </List.Section>
              </View>
            </Surface>
            <Surface style={styles.surface}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: 350, marginBottom: count, marginTop: count }}
                showsUserLocation={true}
                showsCompass={true}
                showsMyLocationButton={true}
                showsScale={true}
                initialRegion={location}
                onMapReady={() => {
                  setCount(0);
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(info.address.lat),
                    longitude: parseFloat(info.address.lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </MapView>
            </Surface>
            <Surface style={styles.surface}>
              <View style={[styles.row, { alignItems: "center" }]}>
                <Icon
                  name="rate-review"
                  type="material"
                  color="#009688"
                  style={{ marginRight: 5 }}
                />
                <Title>Reviews</Title>
              </View>
              <Divider style={{ height: 2 }} />
              <View>
                {info.review !== null &&
                  info.review?.review?.map((item, i) => (
                    <ReviewCard key={i} data={item} />
                  ))}
              </View>
            </Surface>
          </View>
          <SavingModel visible={model} />
        </ScrollView>
      </View>
    );
};

export default WorkerDetails;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    marginVertical: 7,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
