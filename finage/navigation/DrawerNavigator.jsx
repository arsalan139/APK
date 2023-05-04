import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/Drawer";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerStyle={{
          backgroundColor: "#03a9f4",
          borderBottomEndRadius: 50,
          borderTopEndRadius: 50,
        }}
        drawerContentOptions={{
          inactiveTintColor: "#009688",
          contentContainerStyle: {
            flex: 1,
          },
        }}
        openByDefault={false}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Main"
          component={StackNavigator}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
