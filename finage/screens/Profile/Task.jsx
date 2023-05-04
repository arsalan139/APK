import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, List, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import {
  ACCEPTED_ORDER,
  CANCEL_ORDER,
  GET_ORDER,
  REJECT_ORDER,
} from "../../Redux/Actions/Actions";

const Task = () => {
  const orders = useSelector((state) => state.User.orders);
  const User = useSelector((state) => state.User.TOKEN);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [title, setTitle] = useState("");
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.placedTask.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(GET_ORDER(User.id, () => setLoading(true)));
    });
  }, []);

  const Task = (data, order, type) => (
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
          title={data?.name}
          description={order.category}
          left={(props) => <List.Icon {...props} icon="account-box" />}
        />
        <List.Item
          title={lang.placedTask.price}
          description={order.amount}
          left={(props) => (
            <List.Icon {...props} icon="wallet" color="orange" />
          )}
        />
        <List.Item
          title={lang.placedTask.hours}
          description={order.working_hour}
          left={(props) => (
            <List.Icon {...props} icon="timer-sand" color="#1de9b6" />
          )}
        />
        {type === "user" ? (
          <>
            <List.Section
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                mode="contained"
                onPress={() => navigation.navigate("Order Details", order)}
              >
                {lang.placedTask.view_details}
              </Button>
              {order.worker_status === "pending" && (
                <>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: "#1de9b6" }}
                    onPress={() => {
                      setModel(true);
                      setTitle("Accepting");
                      dispatch(
                        ACCEPTED_ORDER(
                          User.id,
                          order._id,
                          () => {
                            setModel(false);
                          },
                          () => {
                            setModel(false);
                          }
                        )
                      );
                    }}
                  >
                    {lang.placedTask.accept}
                  </Button>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: "#f50057" }}
                    labelStyle={{ color: "white" }}
                    onPress={() => {
                      setModel(true);
                      setTitle("Rejecting");
                      dispatch(
                        REJECT_ORDER(
                          User.id,
                          order._id,
                          () => {
                            setModel(false);
                          },
                          () => {
                            setModel(false);
                          }
                        )
                      );
                    }}
                  >
                    {lang.placedTask.reject}
                  </Button>
                </>
              )}
            </List.Section>
          </>
        ) : (
          <List.Section
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Order Details", order)}
            >
              {lang.placedTask.view_details}
            </Button>
            <Button
              mode="contained"
              style={{
                backgroundColor: "#f50057",
              }}
              labelStyle={{ color: "white" }}
              onPress={() => {
                setModel(true);
                setTitle("Canceling");
                dispatch(
                  CANCEL_ORDER(
                    User.id,
                    order._id,
                    () => {
                      setModel(false);
                    },
                    () => {
                      setModel(false);
                    }
                  )
                );
              }}
            >
              {lang.placedTask.cancel}
            </Button>
          </List.Section>
        )}
      </List.Accordion>
    </>
  );

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SavingModel visible={model} title={title} />
          <List.Section title={lang.placedTask.my_task}>
            {orders.map((item, i) => (
              <View key={i}>
                {item?.user?._id === User.id &&
                  Task(item.worker, item, "worker")}
              </View>
            ))}
          </List.Section>
        </ScrollView>
      </View>
    );
};

export default Task;

const styles = StyleSheet.create({});
