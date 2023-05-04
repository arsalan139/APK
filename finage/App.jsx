import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation/DrawerNavigator";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { Root } from "native-base";
import MainStore from "./Redux/Store/MainStore";
import AuthNavigator from "./navigation/AuthNavigator";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { EXPO_TOKEN } from "./Redux/Actions/Actions";
import { StripeProvider } from "@stripe/stripe-react-native";
const publishableKey =
  "pk_test_51HxYCVAV329WVpLfL00asjYMD5xHdb38ME9HXMozjL675k8BR3wgVraNFsMedRqvyW5yYatalIj5FGQ0dp12ClPO000jGLyUt7";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
//Notification registration
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

//Starting of App
export default () => {
  return (
    <ReduxProvider store={MainStore}>
      <Root>
        <StripeProvider publishableKey={publishableKey}>
          <App />
        </StripeProvider>
      </Root>
    </ReduxProvider>
  );
};
//Main App
function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isLoadingComplete = useCachedResources();
  const dispatch = useDispatch();
  //Second Main point User logged or not
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatch(EXPO_TOKEN(token));
      console.log(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {IS_LOGGED ? <Navigation /> : <AuthNavigator />}
      </SafeAreaProvider>
    );
  }
}
