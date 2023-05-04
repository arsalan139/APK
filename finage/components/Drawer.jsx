import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Divider,
} from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { USER_STATUS_OUT } from "../Redux/Actions/Actions";

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const lang = useSelector((state) => state.User.selected_language);
  const list = [
    {
      name: lang.drawer.home,
      icon: "home",
      type: "font-awesome-5",
      screen: "Category",
      show: true,
    },
    {
      name: lang.drawer.language,
      icon: "language",
      type: "entypo",
      screen: "Language",
      show: true,
    },
    {
      name: lang.drawer.application,
      icon: "wpforms",
      type: "font-awesome-5",
      screen: "Application",
      show: !User?.role.includes("Worker"),
    },
    {
      name: lang.drawer.profile,
      icon: "profile",
      type: "ant-design",
      screen: "Profile",
      show: true,
    },
    {
      name: lang.drawer.sign_out,
      icon: "logout",
      type: "ant-design",
      screen: "Profile",
      show: true,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
            }}
          >
            <Avatar.Image
              source={
                User?.gender === "Male"
                  ? require("../assets/images/man.png")
                  : require("../assets/images/woman.png")
              }
              size={40}
              style={{ backgroundColor: "#03a9f4", margin: 7 }}
            />
            <Title style={styles.title}>{User?.email}</Title>
          </View>
          <Divider style={{ margin: 7 }} color="#f4f4f4" />

          {list.map(
            (item, i) =>
              item.show && (
                <Drawer.Section style={styles.drawerSection} {...props} key={i}>
                  <TouchableRipple
                    onPress={() => {
                      if (item.name === lang.drawer.sign_out) {
                        props.navigation.closeDrawer();
                        dispatch(USER_STATUS_OUT());
                      } else props.navigation.navigate(item.screen);
                    }}
                    style={{ paddingVertical: 6 }}
                  >
                    <View
                      style={[
                        styles.row,
                        {
                          marginHorizontal: 17,
                          marginVertical: 7,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Icon type={item.type} name={item.icon} color="#fff" />
                      <Text
                        style={{
                          paddingLeft: 32,
                          color: "#ffff",
                          flexGrow: 1,
                          fontSize: 16,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableRipple>
                </Drawer.Section>
              )
          )}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 3,
    color: "#fff",
    fontSize: 12,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomColor: "#f4f4f4",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#e0e0e0",
  },
});
