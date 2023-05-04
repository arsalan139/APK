import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import {
  Button,
  Caption,
  Subheading,
  TextInput,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import { ADD_PROMO_CODE, GET_PROMOS_BY_ID } from "../../Redux/Actions/Actions";

const PromoCode = () => {
  const promos = useSelector((state) => state.User.promos);
  const User = useSelector((state) => state.User.TOKEN);
  const lang = useSelector((state) => state.User.selected_language);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.profile.promo });
    dispatch(GET_PROMOS_BY_ID(User.id, () => setLoading(true)));
  }, []);
  const isExpired = (endDate) => {
    let a = moment(endDate);
    let b = moment(new Date());
    if (a.diff(b, "days") < 0) {
      return lang.promo.expired;
    } else return lang.promo.not_expired;
  };
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SavingModel visible={model} title="Adding" />
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              margin: 12,
              alignItems: "center",
            }}
          >
            <TextInput
              label={lang.promo.title}
              placeholder={lang.promo.title}
              value={code}
              dense
              style={{ flexGrow: 1, margin: 7 }}
              onChangeText={(text) => setCode(text)}
              mode="outlined"
            />
            <Icon
              name="plus"
              type="entypo"
              color="#2196f3"
              size={50}
              onPress={() => {
                if (code !== "") {
                  setModel(true);
                  dispatch(
                    ADD_PROMO_CODE(User.id, code, () => {
                      setModel(false);
                    })
                  );
                }
              }}
            />
          </View>
          {promos.map((item, i) => (
            <View
              key={i}
              style={{
                margin: 12,
                backgroundColor: "#fff",
                padding: 7,
                borderRadius: 12,
                elevation: 12,
              }}
            >
              <View style={{ marginLeft: 12 }}>
                <Title>
                  {lang.promo.title}: {item.code}
                </Title>
                <Subheading>
                  {lang.promo.expires}
                  {moment(item.endDate).format("YYYY/MM/DD hh:mm A ")}
                </Subheading>
                <Subheading>
                  {lang.promo.status}:
                  {item.used ? lang.promo.used : lang.promo.not_used}
                </Subheading>
                <Caption>{isExpired(item.endDate)}</Caption>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
};

export default PromoCode;
