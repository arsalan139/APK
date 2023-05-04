import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import cryptoJs from "crypto-js";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import {
  ActivityIndicator,
  Button,
  Headline,
  Subheading,
  Surface,
  TextInput,
} from "react-native-paper";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_WITH_API } from "../Redux/Actions/Actions";
import SavingModel from "./SavingModel";
import { Image } from "react-native-elements";
const Amount = () => {
  const User = useSelector((state) => state.User.TOKEN);
  const IntegritySalt = "t0sx41a1z5";
  let initial = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: "MC19175",
    pp_Password: "s5u4x9811v",
    pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
    pp_Amount: "",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
    pp_BillReference: "billRef",
    pp_Description: "Add Points to wallet",
    pp_TxnExpiryDateTime: moment()
      .add(1, "d")
      .format("YYYYMMDDHHmmss")
      .toString(),
    pp_ReturnURL:
      "https://fyp-admin-panel.herokuapp.com/api/wallet/?id=" + User.id,
    pp_SecureHash: "",
    ppmpf_1: "",
  };
  const navigation = useNavigation();
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initial);
  const dispatch = useDispatch();

  const handelSubmit = () => {
    let a = { ...data };
    a.pp_Amount = a.pp_Amount + "00";
    let hashString =
      IntegritySalt +
      "&" +
      a.pp_Amount +
      "&" +
      a.pp_BillReference +
      "&" +
      a.pp_Description +
      "&" +
      a.pp_Language +
      "&" +
      a.pp_MerchantID +
      "&" +
      a.pp_Password +
      "&" +
      a.pp_ReturnURL +
      "&" +
      a.pp_TxnCurrency +
      "&" +
      a.pp_TxnDateTime +
      "&" +
      a.pp_TxnExpiryDateTime +
      "&" +
      a.pp_TxnRefNo +
      "&" +
      a.pp_TxnType +
      "&" +
      a.pp_Version +
      "&" +
      a.ppmpf_1;
    let hash = cryptoJs.HmacSHA256(hashString, IntegritySalt).toString();
    a.pp_SecureHash = hash;
    setModel(true);
    dispatch(
      PAYMENT_WITH_API(User.id, a, () => {
        setModel(false);
        setData(initial);
      })
    );
  };
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.add_wallet.title });
  }, [lang]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Surface style={styles.surface}>
            <Headline
              style={{
                textAlign: "center",
                marginVertical: 7,
                color: "#c4151c",
              }}
            >
              Jazz cash
            </Headline>
            <Subheading
              style={{ textAlign: "center", marginVertical: 7, color: "gray" }}
            >
              Add Amount to Account
            </Subheading>
            <Image
              source={{
                uri: "https://seeklogo.com/images/J/jazz-cash-logo-829841352F-seeklogo.com.jpg",
              }}
              style={{ height: 200, resizeMode: "contain", marginVertical: 7 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <TextInput
              label={lang.add_wallet.amount}
              placeholder={lang.add_wallet.amount}
              value={data.pp_Amount}
              dense
              mode="outlined"
              keyboardType="number-pad"
              style={{ marginVertical: 7 }}
              onChangeText={(text) => setData({ ...data, pp_Amount: text })}
            />
            <TextInput
              label={lang.setting.phone}
              placeholder={lang.setting.phone}
              value={data.ppmpf_1}
              dense
              mode="outlined"
              onChangeText={(text) => setData({ ...data, ppmpf_1: text })}
              style={{ marginVertical: 7 }}
              keyboardType="number-pad"
            />
            <Button
              onPress={handelSubmit}
              style={{ marginVertical: 7 }}
              color="#c4151c"
              mode="contained"
            >
              {lang.add_wallet.add}
            </Button>
          </Surface>
        </ScrollView>

        <SavingModel visible={model} title="Adding Amount" />
      </View>
    );
};

export default Amount;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
