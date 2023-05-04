import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { GET_NOTIFICATION } from "../../Redux/Actions/Actions";

const Notification = () => {
  const notification = useSelector((state) => state.User.notification);
  const User = useSelector((state) => state.User.TOKEN);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.notification.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(GET_NOTIFICATION(User.id, () => setLoading(true)));
    });
  }, []);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <List.Section title="Notifications">
            {notification?.notification?.map((item, i) => (
              <List.Accordion
                key={i}
                title={item.title}
                left={(props) => (
                  <List.Icon {...props} icon="bell" color="#ff9100" />
                )}
              >
                <Subheading>{item.subtitle}</Subheading>
                <Text>Message</Text>
                <Paragraph>{item.body}</Paragraph>
              </List.Accordion>
            ))}
          </List.Section>
        </ScrollView>
      </View>
    );
};

export default Notification;

const styles = StyleSheet.create({});
