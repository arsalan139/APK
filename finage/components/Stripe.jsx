import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { ADD_WALLET, PAYMENT_INTENT } from "../Redux/Actions/Actions";
import { Toast } from "native-base";
import SavingModel from "./SavingModel";
import { parse } from "expo-linking";
export default function Stripe() {
  const [card, setCard] = useState(null);
  const [amount, setAmount] = useState("");
  const { confirmPayment } = useConfirmPayment();
  const [model, setModel] = useState(false);
  const User = useSelector((state) => state.User.TOKEN);
  const lang = useSelector((state) => state.User.selected_language);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.add_wallet.title });
  }, [lang]);
  console.log(amount);
  const handlePayPress = async () => {
    if (!card) {
      Toast.show({
        text: "Card is not Provided",
        type: "danger",
        style: { margin: 10, borderRadius: 7 },
        textStyle: { textAlign: "center" },
      });
    }
    setModel(true);
    const billingDetails = {
      email: User.email,
      id: User.id,
      name: User.name,
    };

    // Fetch the intent client secret from the backend
    dispatch(
      PAYMENT_INTENT({ amount }, async (v) => {
        const clientSecret = v.clientSecret;
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails,
        });

        if (error) {
          console.log("Payment confirmation error", error);
          setModel(false);
          Toast.show({
            text: error.message,
            type: "danger",
            style: { margin: 10, borderRadius: 7 },
            textStyle: { textAlign: "center" },
          });
        } else if (paymentIntent) {
          console.log("Success from promise", paymentIntent);
          let d = {
            user: User.id,
            amount,
            transaction_id: paymentIntent.paymentMethodId,
            method: "Card",
          };
          dispatch(
            ADD_WALLET(d, paymentIntent.status, () => {
              setModel(false);
              navigation.goBack();
            })
          );
        }
      })
    );
  };
  return (
    <View style={{ flex: 1, margin: 20 }}>
      <SavingModel visible={model} title="Adding payment" />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          display: "flex",
          flexDirection: "column",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
          console.log(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <TextInput
        label={lang.add_wallet.amount}
        placeholder={lang.add_wallet.amount}
        value={"" + amount}
        dense
        mode="outlined"
        keyboardType="number-pad"
        style={{ marginVertical: 7 }}
        onChangeText={(text) => {
          if (text === "Na") {
            setAmount("");
          } else setAmount(parseInt(text));
        }}
      />
      <Button onPress={handlePayPress}>add</Button>
    </View>
  );
}
