import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import {
  Button,
  Card,
  Headline,
  Subheading,
  Surface,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COMPLAINT_BOX, COMPLETED_ORDER } from "../Redux/Actions/Actions";
import SavingModel from "../components/SavingModel";

const ComplaintBox = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.TOKEN);
  const { params } = useRoute();
  const navigation = useNavigation();
  const [model, setModel] = useState(false);
  const [msg, setMsg] = useState("");
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.complaint.title });
  }, [lang]);
  const Details = (props) => {
    return (
      <View style={{ margin: 10 }}>
        <Card.Title
          title={props.name}
          subtitle={props.email}
          left={(p) => (
            <Avatar
              {...p}
              source={
                props.gender === "Male"
                  ? require("../assets/images/man.png")
                  : require("../assets/images/woman.png")
              }
              containerStyle={{ backgroundColor: "#1de9b6" }}
              rounded
            />
          )}
        />
        <Subheading>
          {lang.complaint.phone}: {props.phone}
        </Subheading>
        <Subheading>
          {lang.complaint.gender}: {props.gender}
        </Subheading>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <Headline style={{ textAlign: "center" }}>
            {lang.complaint.subheading}: {params.category}
          </Headline>
          <Surface style={styles.surface}>
            <Subheading>Complaint To: </Subheading>
            <Details
              {...(params.user._id !== User.id ? params.user : params.worker)}
              image={
                params.user.gender === "Male"
                  ? require("../assets/images/man.png")
                  : require("../assets/images/woman.png")
              }
              type={params.user._id === User.id}
              status={params.status}
            />
          </Surface>
          <Surface style={styles.surface}>
            <Subheading>{lang.complaint.title}</Subheading>
            <TextInput
              label={lang.complaint.title}
              placeholder={lang.complaint.title}
              value={msg}
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => setMsg(text)}
              mode="outlined"
            />
          </Surface>

          <Button
            mode="contained"
            style={{ marginVertical: 7 }}
            onPress={() => {
              setModel(true);
              let data = {};
              if (params.user._id === User.id) {
                data["from"] = params.user._id;
                data["to"] = params.worker._id;
              } else {
                data["to"] = params.user._id;
                data["from"] = params.worker._id;
              }
              data["message"] = msg;
              data["order"] = params._id;
              data["category"] = params.category;
              dispatch(
                COMPLAINT_BOX(
                  data,
                  () => {
                    setModel(false);
                    navigation.goBack();
                  },
                  () => {
                    setModel(false);
                  }
                )
              );
            }}
          >
            {lang.complaint.submit}
          </Button>
        </View>
        <SavingModel visible={model} title="Completing" />
      </ScrollView>
    </View>
  );
};

export default ComplaintBox;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    marginVertical: 7,
  },
});
