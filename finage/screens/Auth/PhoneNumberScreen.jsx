import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { Button, IconButton, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import SavingModel from "../../components/SavingModel";
import { PHONE_VERIFICATION } from "../../Redux/Actions/Actions";

const PhoneNumberScreen = () => {
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={{}}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "7.5%",
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
            marginHorizontal: 20,
          }}
        >
          <Image
            source={require("../../assets/images/verification.png")}
            style={{ height: 220, width: 220, alignItems: "center" }}
          />
        </View>

        <Title style={{ textAlign: "center", marginHorizontal: 20 }}>
          Enter the phone number for verification
        </Title>
        <View style={{ marginHorizontal: 20 }}>
          <TextInput
            mode="outlined"
            value={phone}
            placeholder="Enter Phone number"
            label="Phone Number"
            keyboardType="number-pad"
            onChangeText={(text) => setPhone(text)}
            autoCapitalize="none"
            style={{ marginVertical: 7 }}
          />
          <Button
            uppercase={false}
            style={{
              width: "100%",
              marginVertical: 7,
            }}
            labelStyle={{ color: "white" }}
            mode="contained"
            disabled={model}
            onPress={() => {
              setModel(true);
              dispatch(
                PHONE_VERIFICATION(
                  { phone },
                  () => {
                    setModel(false);
                    navigation.navigate("Verification", { phone });
                  },
                  () => {
                    setModel(false);
                  }
                )
              );
            }}
          >
            Send code
          </Button>
        </View>

        <SavingModel visible={model} title="Sending Text" />
      </View>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({});
