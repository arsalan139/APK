import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, List, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { GET_ORDER_HISTORY } from "../../Redux/Actions/Actions";

const History = () => {
  const orders = useSelector((state) => state.User.orders);
  const User = useSelector((state) => state.User.TOKEN);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.history.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(GET_ORDER_HISTORY(User.id, () => setLoading(true)));
    });
  }, []);

  const History = (data, order, type) =>
    order.status === "completed" && (
      <>
        <List.Accordion
          title={order.category}
          left={(props) => (
            <List.Icon
              {...props}
              icon={type === "worker" ? "toolbox" : "account-circle"}
              color={type !== "worker" ? "#2196f3" : "#f50057"}
            />
          )}
        >
          <List.Item
            title={data.name}
            description={order.category}
            left={(props) => <List.Icon {...props} icon="account-box" />}
          />
          <List.Item
            title={lang.history.price}
            description={order.amount}
            left={(props) => (
              <List.Icon {...props} icon="wallet" color="orange" />
            )}
          />
          <List.Item
            title={lang.history.hours}
            description={order.working_hour}
            left={(props) => (
              <List.Icon {...props} icon="timer-sand" color="#1de9b6" />
            )}
          />
          <List.Section>
            <Button
              mode="contained"
              style={{ marginRight: "15%" }}
              onPress={() => navigation.navigate("Order Details", order)}
            >
              {lang.history.view_details}
            </Button>
          </List.Section>
        </List.Accordion>
      </>
    );

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <List.Section title={lang.history.my_task}>
            {orders.map((item, i) => (
              <View key={i}>
                {item.user._id === User.id &&
                  History(item.worker, item, "worker")}
              </View>
            ))}
          </List.Section>
          {User.role.includes("Worker") && (
            <List.Section title={lang.history.assigned_task}>
              {orders.map((item, i) => (
                <View key={i}>
                  {item.worker._id === User.id &&
                    History(item.user, item, "user")}
                </View>
              ))}
            </List.Section>
          )}
        </ScrollView>
      </View>
    );
};

export default History;

const styles = StyleSheet.create({});
