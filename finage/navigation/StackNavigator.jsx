import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { IconButton } from "react-native-paper";

import CategoryScreen from "../screens/CategoryScreen";
import ComplaintBox from "../screens/ComplaintBox";
import History from "../screens/Profile/History";
import Notification from "../screens/Profile/Notification";
import Setting from "../screens/Profile/Setting";
import OnlineTraining from "../screens/Profile/OnlineTraining";
import Wallet from "../screens/Profile/Wallet";
import Reviews from "../screens/Profile/Reviews";
import Task from "../screens/Profile/Task";
import ProfileScreen from "../screens/ProfileScreen";
import WorkerApplication from "../screens/WorkerApplication";
import Language from "../screens/Language";
import PhoneNumberScreen from "../screens/Auth/PhoneNumberScreen";
import PhoneVerification from "../screens/Auth/PhoneVerification";
import SelectedCategory from "../components/SelectedCategory";
import AddOrder from "../screens/AddOrder";
import ItemDetails from "../components/Card/ItemDetails";
import WorkerDetails from "../components/Card/WorkerDetails";
import Amount from "../components/Amount";
import ChatScreen from "../screens/ChatScreen";
import AssignedTask from "../screens/Profile/AssignedTask";
import PromoCode from "../screens/Profile/PromoCode";
import Stripe from "../components/Stripe";
import Map from "../components/Map";
import Favorites from "../screens/Profile/Favorites";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default StackNavigator;

const HeaderOption = ({ navigation }) => {
  return {
    headerStyle: { backgroundColor: "#2196f3" },
    headerTitleStyle: { color: "#fff" },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerShown: true,
  };
};

const options = ({ navigation }) => {
  return {
    headerLeft: () => (
      <IconButton
        icon="menu"
        color="#fff"
        size={32}
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
};
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={HeaderOption}>
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={options}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={options}
      />
      <Stack.Screen name="Application" component={WorkerApplication} />
      <Stack.Screen name="Task" component={Task} />
      <Stack.Screen name="Assigned Task" component={AssignedTask} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Online Training" component={OnlineTraining} />
      <Stack.Screen name="Complaint Box" component={ComplaintBox} />
      <Stack.Screen name="Add Phone" component={PhoneNumberScreen} />
      <Stack.Screen name="Verification" component={PhoneVerification} />
      <Stack.Screen name="Selected Category" component={SelectedCategory} />
      <Stack.Screen name="Add Order" component={AddOrder} />
      <Stack.Screen name="Order Details" component={ItemDetails} />
      <Stack.Screen name="Worker Details" component={WorkerDetails} />
      <Stack.Screen name="Amount" component={Amount} />
      <Stack.Screen name="Stripe" component={Stripe} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Promo" component={PromoCode} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
