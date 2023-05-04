import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Button, List, TextInput, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import {
  ACCEPTED_ORDER,
  CANCEL_ORDER,
  GET_ORDER,
  REJECT_ORDER,
} from "../../Redux/Actions/Actions";

const AssignedTask = () => {
  const orders = useSelector((state) => state.User.orders);
  const User = useSelector((state) => state.User.TOKEN);
  const [accept, setAccept] = useState(false);
  const [index, setIndex] = useState(null);
  const [hours, setHours] = useState("");
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

  const Task = (data, order, type, i) => (
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
          title={lang.placedTask.description}
          description={order?.description}
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
                onPress={() =>
                  navigation.navigate("Order Details", { id: order._id })
                }
              >
                {lang.placedTask.view_details}
              </Button>
              {order.worker_status === "pending" && (
                <>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: "#1de9b6" }}
                    onPress={() => {
                      setAccept(true);
                      setIndex(i);
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
      <View>
        <ScrollView>
          <Overlay
            isVisible={accept}
            overlayStyle={{
              borderRadius: 10,
              padding: 20,
              width: 250,
            }}
          >
            <View
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ flexGrow: 1, textAlign: "center" }}>
                {lang.add_order.working_hour}
              </Text>
              <Icon
                name="close"
                type="antdesign"
                onPress={() => setAccept(false)}
              />
            </View>
            <TextInput
              label={lang.add_order.working_hour}
              placeholder={lang.add_order.working_hour}
              value={"" + hours}
              multiline={true}
              dense
              style={{ marginVertical: 7 }}
              onChangeText={(text) => {
                setHours(text);
              }}
              keyboardType="number-pad"
              mode="outlined"
            />
            <Button
              mode="contained"
              style={{ backgroundColor: "#1de9b6" }}
              onPress={() => {
                if (hours !== "" && hours !== "0") {
                  setModel(true);
                  setTitle("Accepting");
                  dispatch(
                    ACCEPTED_ORDER(
                      User.id,
                      orders[index]._id,
                      hours,
                      () => {
                        setModel(false);
                        setAccept(false);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                } else {
                  alert("Hours Not Added");
                }
              }}
            >
              {lang.placedTask.accept}
            </Button>
          </Overlay>
          <SavingModel visible={model} title={title} />
          <List.Section title={lang.placedTask.assigned_task}>
            {orders.map(
              (item, i) =>
                item.worker_status !== "rejected" && (
                  <View key={i}>
                    {item.worker._id === User.id &&
                      Task(item.user, item, "user", i)}
                  </View>
                )
            )}
          </List.Section>
        </ScrollView>
      </View>
    );
};

export default AssignedTask;

const styles = StyleSheet.create({});
