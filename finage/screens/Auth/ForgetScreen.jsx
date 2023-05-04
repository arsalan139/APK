import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import SavingModel from "../../components/SavingModel";
import { FORGET } from "../../Redux/Actions/Actions";

const ForgetScreen = () => {
  const [email, setEmail] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = () => {
    let data = {
      email,
    };
    setDisabled(true);
    dispatch(
      FORGET(data, () => {
        setDisabled(false);
        setEmail("");
        navigation.goBack();
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: "9.5%",
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="arrow-left"
            color="#000"
            size={32}
            style={{}}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            source={require("../../assets/images/lock.png")}
            style={{ height: 180, width: 180 }}
          />
          <Text style={{ color: "#5d7280", fontSize: 18, marginTop: 8 }}>
            Forgot your to Finage password?
          </Text>
          <Text style={{ color: "#5d7280", fontSize: 18 }}>
            Email to recover{" "}
          </Text>
        </View>
        <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
          <TextInput
            mode="outlined"
            value={email}
            placeholder="Email Address"
            label="Email Address"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            style={{ marginVertical: 7 }}
          />
          <Button
            uppercase={false}
            style={{
              marginVertical: 2,
            }}
            mode="contained"
            onPress={handleLogin}
          >
            Send Email
          </Button>
        </View>

        <SavingModel visible={disabled} title="Sending" />
      </ScrollView>
    </View>
  );
};

export default ForgetScreen;

const styles = StyleSheet.create({});
