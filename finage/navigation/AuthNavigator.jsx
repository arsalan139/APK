import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Auth/LoginScreen";
import SignUp from "../screens/Auth/SignUpScreen";
import PhoneNumberScreen from "../screens/Auth/PhoneNumberScreen";
import PhoneVerification from "../screens/Auth/PhoneVerification";
import ForgetScreen from "../screens/Auth/ForgetScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Add Phone" component={PhoneNumberScreen} />
        <Stack.Screen name="Verification" component={PhoneVerification} />
        <Stack.Screen name="Forget" component={ForgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
