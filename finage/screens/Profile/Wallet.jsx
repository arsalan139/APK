import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Headline, Surface, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import { GET_WALLET, PAY_PENDING_WALLET } from "../../Redux/Actions/Actions";

const Wallet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const User = useSelector((state) => state.User.TOKEN);
  const wallet = useSelector((state) => state.User.wallet);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.wallet.title });
  }, [lang]);
  useEffect(() => {
    dispatch(GET_WALLET(User.id, () => setLoading(true)));
  }, []);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <SavingModel visible={model} title="Paying" />
        <Surface style={styles.surface}>
          <Title style={{ textAlign: "center" }}>{lang.wallet.title}</Title>
          {wallet ? (
            <View>
              <Headline style={{ margin: 20 }}>
                {lang.wallet.current_wallet}: Rs. {wallet.current} \-
              </Headline>
            </View>
          ) : (
            <Headline style={{ textAlign: "center", margin: 7 }}>
              {lang.wallet.add_wallet}
            </Headline>
          )}
        </Surface>

        {User.role.includes("Worker") && (
          <Surface style={styles.surface}>
            <Title style={{ textAlign: "center" }}>
              {lang.wallet.pending_amount}
            </Title>
            <Headline style={{ margin: 20 }}>
              {lang.wallet.amount}: Rs. {wallet?.pending_amount} \-
            </Headline>
            {wallet?.pending_amount > 0 && (
              <Button
                mode="outlined"
                style={{ margin: 20, borderWidth: 1, borderColor: "#00e676" }}
                uppercase={false}
                color="#00e676"
                onPress={() => {
                  setModel(true);
                  dispatch(
                    PAY_PENDING_WALLET(User.id, () => {
                      setModel(false);
                    })
                  );
                }}
              >
                {lang.wallet.pay}
              </Button>
            )}
          </Surface>
        )}

        <Button
          mode="contained"
          style={{ margin: 20 }}
          uppercase={false}
          onPress={() => navigation.navigate("Amount")}
        >
          {lang.wallet.add_wallet}
        </Button>
        {/* <Button uppercase={false}>Withdraw Amount</Button> */}
      </View>
    );
};

export default Wallet;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    margin: 20,
  },
});
