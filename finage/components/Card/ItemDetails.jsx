import { useNavigation, useRoute } from "@react-navigation/core";

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AirbnbRating, Icon, Image } from "react-native-elements";
import { Avatar } from "react-native-elements";
import {
  Button,
  Card,
  Headline,
  Subheading,
  Surface,
  Title,
  List,
  RadioButton,
  Caption,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  ADD_REVIEW,
  ADD_TO_FAVORITES,
  COMPLETED_ORDER,
  GET_ORDER_BY_ID,
  REMOVE_FROM_FAVORITES,
} from "../../Redux/Actions/Actions";
import SavingModel from "../SavingModel";
import moment from "moment";
import * as Location from "expo-location";
import { Platform } from "react-native";
import { Linking } from "react-native";
const ItemDetails = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const order_details = useSelector((state) => state.User.order_details);
  const { params } = useRoute();
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [model, setModel] = useState(false);
  const [count, setCount] = useState(1);
  const [payment, setPayment] = useState("Card");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState({
    rating: 5,
    msg: "",
  });

  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.task_details.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_ORDER_BY_ID(params.id, async () => {
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
        })
      );
    });
  }, []);
  const dialCall = (phone) => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + phone;
    } else {
      phoneNumber = "telprompt:" + phone;
    }

    Linking.openURL(phoneNumber);
  };
  const Details = (props) => {
    return (
      <View style={{ margin: 10 }}>
        <Card.Title
          title={props.name}
          subtitle={props.email}
          left={(p) => (
            <Avatar
              {...p}
              source={props.image}
              containerStyle={{ backgroundColor: "#1de9b6" }}
              rounded
            />
          )}
          right={(p) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!props.type ? (
                <Button
                  mode="contained"
                  color="#ff1744"
                  onPress={() =>
                    navigation.navigate("Complaint Box", { ...order_details })
                  }
                >
                  {lang.task_details.complain}
                </Button>
              ) : (
                props.status === "active" && (
                  <Button
                    mode="contained"
                    onPress={() =>
                      navigation.navigate("Chat", {
                        order: order_details?._id,
                        name:
                          props._id === order_details?.user._id
                            ? order_details?.worker.name
                            : props._id === order_details?.worker._id &&
                              order_details?.user.name,
                        id:
                          props._id === order_details?.user._id
                            ? order_details?.worker._id
                            : props._id === order_details?.worker._id &&
                              order_details?.user._id,
                      })
                    }
                  >
                    {lang.task_details.chat}
                  </Button>
                )
              )}
            </View>
          )}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Subheading onPress={() => dialCall(props.phone)} style={{ flex: 1 }}>
            {lang.task_details.phone}: {props.phone}
          </Subheading>
          {props.worker && !props.type && (
            <Icon
              name={
                order_details?.user?.favorites?.includes(
                  order_details?.worker._id
                )
                  ? "heart"
                  : "hearto"
              }
              onPress={() => {
                setModel(true);
                if (order_details?.user.favorites) {
                  if (order_details?.user.favorites.length > 0) {
                    setTitle("Removing From Favorites");
                    dispatch(
                      REMOVE_FROM_FAVORITES(
                        {
                          id: order_details?.user._id,
                          worker: order_details?.worker._id,
                          order: order_details?._id,
                        },
                        () => {
                          setModel(false);
                        }
                      )
                    );
                  } else {
                    setTitle("Adding to Favorites");
                    dispatch(
                      ADD_TO_FAVORITES(
                        {
                          id: order_details?.user._id,
                          worker: order_details?.worker._id,
                          order: order_details?._id,
                        },
                        () => {
                          setModel(false);
                        }
                      )
                    );
                  }
                } else {
                  setTitle("Adding to Favorites");
                  dispatch(
                    ADD_TO_FAVORITES(
                      {
                        id: order_details?.user._id,
                        worker: order_details?.worker._id,
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                }
              }}
              type="antdesign"
              color="red"
              style={{ marginHorizontal: 12 }}
            />
          )}
        </View>

        <Subheading>
          {lang.task_details.gender}: {props.gender}
        </Subheading>
      </View>
    );
  };
  if (!location) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <Headline style={{ textAlign: "center" }}>
              {lang.task_details.subheading}: {order_details?.category}
            </Headline>
            <Surface style={styles.surface}>
              <Subheading>{lang.task_details.order_from} </Subheading>
              <Details
                {...order_details?.user}
                image={
                  order_details?.user.gender === "Male"
                    ? require("../../assets/images/man.png")
                    : require("../../assets/images/woman.png")
                }
                type={order_details?.user._id === User.id}
                status={order_details?.status}
              />
            </Surface>
            <Surface style={styles.surface}>
              <Subheading>{lang.task_details.description}: </Subheading>
              <List.Section>
                <List.Item
                  title={lang.task_details.price}
                  description={order_details?.amount}
                  left={(props) => (
                    <List.Icon {...props} icon="wallet" color="orange" />
                  )}
                />
                <List.Item
                  title={lang.task_details.hours}
                  description={order_details?.working_hour}
                  left={(props) => (
                    <List.Icon {...props} icon="timer-sand" color="#1de9b6" />
                  )}
                />
                <List.Item
                  title={lang.task_details.status}
                  description={order_details?.status}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="circle"
                      color={
                        order_details?.status === "active"
                          ? "#ffc107"
                          : order_details?.status === "completed"
                          ? "#00e676"
                          : "#ff1744"
                      }
                    />
                  )}
                />
                <List.Item
                  title={lang.task_details.worker_status}
                  description={order_details?.worker_status}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="circle"
                      color={
                        order_details?.worker_status === "pending"
                          ? "#ffc107"
                          : order_details?.worker_status === "accepted"
                          ? "#00e676"
                          : "#ff1744"
                      }
                    />
                  )}
                />

                {User.role.includes("Worker") && (
                  <List.Item
                    title={lang.task_details.commission}
                    description={order_details?.company_commission}
                    left={(props) => (
                      <List.Icon {...props} icon="percent" color="#d500f9" />
                    )}
                  />
                )}
                <List.Item
                  title={lang.task_details.address}
                  description={order_details?.location.address}
                  left={(props) => (
                    <List.Icon {...props} icon="map" color="#33691e" />
                  )}
                />
              </List.Section>
              <Caption>
                on{" "}
                {moment(order_details?.date)
                  .format("YYYY/MM/DD hh:mm A")
                  .toString()}
              </Caption>
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
                    latitude: parseFloat(order_details?.location.lat),
                    longitude: parseFloat(order_details?.location.lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </MapView>
            </Surface>
            <Surface style={styles.surface}>
              <Subheading>{lang.task_details.order_to}: </Subheading>
              <Details
                {...order_details?.worker}
                image={
                  order_details?.worker.gender === "Male"
                    ? require("../../assets/images/man.png")
                    : require("../../assets/images/woman.png")
                }
                type={order_details?.worker._id === User.id}
                status={order_details?.status}
                worker={true}
              />
            </Surface>
            {order_details?.status !== "completed" &&
              order_details?.user._id === User.id && (
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ flexGrow: 1 }}>Pay by:</Text>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => setPayment("Card")}
                    >
                      <Text>Jazz Cash:</Text>
                      <RadioButton
                        value="Card"
                        status={payment === "Card" ? "checked" : "unchecked"}
                        onPress={() => setPayment("Card")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setPayment("On Cash")}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text>on Cash: </Text>
                      <RadioButton
                        value="Cash"
                        status={payment === "On Cash" ? "checked" : "unchecked"}
                        onPress={() => setPayment("On Cash")}
                      />
                    </TouchableOpacity>
                  </View>

                  <Button
                    mode="contained"
                    color="#00a152"
                    style={{ marginVertical: 7 }}
                    onPress={() => {
                      setModel(true);
                      dispatch(
                        COMPLETED_ORDER(
                          order_details?._id,
                          { payment },
                          () => {
                            setModel(false);
                            navigation.goBack();
                          },
                          () => {
                            setModel(false);
                          }
                        )
                      );
                    }}
                  >
                    {lang.task_details.completed}
                  </Button>
                </View>
              )}
            {order_details?.worker._id !== User.id && (
              <Surface style={styles.surface}>
                <View style={[styles.row, { alignItems: "center" }]}>
                  <Icon
                    name="rate-review"
                    type="material"
                    color="#009688"
                    style={{ marginRight: 5 }}
                  />
                  <Title>Add Reviews</Title>
                </View>
                <View>
                  <AirbnbRating
                    count={5}
                    reviews={[
                      "Unsatisfied",
                      "Terrible",
                      "Bad",
                      "Good",
                      "Satisfied",
                    ]}
                    defaultRating={5}
                    size={20}
                    onFinishRating={(e) => setReview({ ...review, rating: e })}
                  />
                  <TextInput
                    label="Review"
                    multiline={true}
                    value={review.msg}
                    right={
                      <TextInput.Icon
                        name="message-plus"
                        style={{ marginRight: 5 }}
                        color="#009688"
                        onPress={() => {
                          let data = {
                            user: order_details?.worker._id,
                            ...review,
                            name: User.name,
                            gender: User.gender,
                            id: User.id,
                          };
                          setModel(true);
                          dispatch(
                            ADD_REVIEW(order_details?.worker._id, data, () => {
                              setTimeout(() => {
                                setModel(false);
                              }, 3000);
                            })
                          );
                        }}
                      />
                    }
                    onChangeText={(text) => setReview({ ...review, msg: text })}
                  />
                </View>
              </Surface>
            )}
          </View>
          <SavingModel visible={model} title={title} />
        </ScrollView>
      </View>
    );
};

export default ItemDetails;

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
