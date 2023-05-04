import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  Button,
  Headline,
  IconButton,
  Title,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { USER_STATUS_OUT } from "../Redux/Actions/Actions";
export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const lang = useSelector((state) => state.User.selected_language);
  const list = [
    {
      name: lang.profile.placed_task,
      icon: "tasks",
      type: "font-awesome",
      backgroundColor: "#03a9f4",
      color: "",
      screen: "Task",
      show: true,
    },
    {
      name: lang.profile.assigned_task,
      icon: "tasks",
      backgroundColor: "#00bcd4",
      type: "font-awesome",
      screen: "Assigned Task",
      show: User.role.includes("Worker"),
    },
    {
      name: lang.profile.wallet,
      icon: "payment",
      backgroundColor: "#009688",
      type: "material",
      screen: "Wallet",
      show: true,
    },
    {
      name: lang.profile.history,
      icon: "history",
      backgroundColor: "#607d8b",
      type: "font-awesome-5",
      screen: "History",
      show: true,
    },
    {
      name: lang.profile.reviews,
      icon: "star",
      type: "antdesign",
      backgroundColor: "#ffc107",
      screen: "Reviews",
      show: User.role.includes("Worker"),
    },
    {
      name: lang.profile.favorites,
      icon: "heart",
      type: "antdesign",
      backgroundColor: "red",
      screen: "Favorites",
      show: true,
    },
    {
      name: lang.profile.online_training,
      icon: "class",
      type: "material",
      screen: "Online Training",
      backgroundColor: "#9c27b0",
      show: User.role.includes("Worker"),
    },
    {
      name: lang.profile.promo,
      icon: "tag",
      type: "font-awesome",
      backgroundColor: "#ff1744",
      screen: "Promo",
      show: true,
    },
    {
      name: lang.profile.notification,
      icon: "bell",
      type: "font-awesome",
      backgroundColor: "#4caf50",
      screen: "Notification",
      show: true,
    },
    {
      name: lang.profile.setting,
      icon: "gear",
      type: "font-awesome",
      backgroundColor: "#9e9e9e",
      screen: "Setting",
      show: true,
    },
  ];
  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "9%",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="menu"
            color="#fff"
            size={38}
            style={{}}
            onPress={() => navigation.openDrawer()}
          />
        </View>

        <Avatar
          size={150}
          overlayContainerStyle={{
            borderRadius: 15,
          }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{ alignSelf: "center" }}
          source={
            User?.gender === "Male"
              ? require("../assets/images/man.png")
              : require("../assets/images/woman.png")
          }
        />
        <View>
          <Text
            style={{
              fontSize: 38,
              textAlign: "center",
              marginVertical: 7,
              color: "#000",
            }}
          >
            {User.name}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderTopEndRadius: 45,
            borderTopStartRadius: 45,
          }}
        >
          {list.map(
            (item, i) =>
              item.show && (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate(item.screen);
                  }}
                >
                  <ListItem
                    bottomDivider
                    containerStyle={{
                      backgroundColor: "#FFF",
                    }}
                  >
                    <Icon
                      name={item.icon}
                      type={item.type}
                      color="#fff"
                      size={28}
                      style={{
                        backgroundColor: item.backgroundColor,
                        padding: 8,
                        borderRadius: 8,
                        width: 50,
                      }}
                    />
                    <ListItem.Content>
                      <Title>{item.name}</Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={42} />
                  </ListItem>
                </TouchableOpacity>
              )
          )}
          <Button
            uppercase={false}
            color="#2196f3"
            mode="outlined"
            style={{
              borderWidth: 2,
              borderColor: "#2196f3",
              margin: 15,
              borderRadius: 7,
            }}
            onPress={() => {
              dispatch(USER_STATUS_OUT());
            }}
          >
            {lang.profile.sign_out}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#03a9f4",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  shawdow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
    backgroundColor: "#FFF",
  },
});
