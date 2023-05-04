import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { GET_LANGUAGE, SELECTED_LANGUAGES } from "../Redux/Actions/Actions";
import { useNavigation } from "@react-navigation/core";
import { English } from "../constants/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Language = () => {
  const language = useSelector((state) => state.User.language);
  const lang = useSelector((state) => state.User.selected_language);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(GET_LANGUAGE(() => setLoading(true)));
    navigation.setOptions({ headerTitle: lang.language.title });
  }, [lang]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <Headline style={{ marginBottom: 10, marginHorizontal: 20 }}>
              {lang.language.subheading}
            </Headline>
            <ListItem
              bottomDivider
              onPress={async () => {
                console.log("english");
                dispatch(SELECTED_LANGUAGES(English));
                await AsyncStorage.removeItem("Language");
              }}
            >
              <ListItem.Content>
                <ListItem.Title>English</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {language.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={async () => {
                  console.log(item._id, item.name);
                  dispatch(SELECTED_LANGUAGES(item.terms));
                  await AsyncStorage.setItem("Language", item._id);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    );
};

export default Language;

const styles = StyleSheet.create({});
