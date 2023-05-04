import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Caption, Card, Subheading, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon } from "react-native-elements";

const Item = ({ type, data }) => {
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  return (
    <Card style={{ marginVertical: 10 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Worker Details", { id: data._id })}
      >
        <Card.Title
          title={data.user.name}
          subtitle={data?.category}
          left={(props) => (
            <Avatar
              {...props}
              source={{ uri: data?.pic }}
              size="medium"
              title="LW"
              avatarStyle={{ borderRadius: 12 }}
              onPress={() => console.log("Works!")}
            />
          )}
          right={() => (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                display: "flex",
              }}
            >
              <Text>{data[`avgRating`]}</Text>
              <Icon
                name="star"
                type="antdesign"
                color="#ffc400"
                containerStyle={{ marginRight: 22 }}
              />
              <Icon
                name="map-marked-alt"
                type="font-awesome-5"
                color="#009688"
                containerStyle={{ marginRight: 22 }}
                onPress={() =>
                  navigation.navigate("Map", { address: data.address })
                }
              />
              <Icon
                name="primitive-dot"
                type="octicon"
                size={22}
                color={data.status === "online" ? "#00e676" : "#ff1744"}
                style={{ marginRight: 4 }}
              />
              <Subheading>{data.status}</Subheading>
            </View>
          )}
        />
        <Card.Content>
          <Title style={{ textAlign: "center" }}>{data.user.email}</Title>
          <Subheading>City: {data.address.city}</Subheading>
          <Subheading>Gender: {data.user.gender}</Subheading>
          <Caption style={{ color: !data.user.restrict ? "gray" : "red" }}>
            {data.user.restrict ? "User is in Probation!" : "Available"}
          </Caption>
        </Card.Content>
      </TouchableOpacity>
      <Card.Actions>
        <Button
          mode="contained"
          style={{ width: "100%" }}
          disabled={data.user.restrict}
          onPress={() =>
            navigation.navigate("Add Order", {
              worker: data.user._id,
              category: data.category,
              gender: data.user.gender,
            })
          }
        >
          {lang.selected_category.order}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default Item;

const styles = StyleSheet.create({});
