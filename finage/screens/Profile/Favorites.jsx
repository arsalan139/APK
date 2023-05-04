import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import {
  Button,
  Caption,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SavingModel from "../../components/SavingModel";
import {
  GET_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../../Redux/Actions/Actions";

const Favorites = () => {
  const favorites = useSelector((state) => state.User.favorites);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  const User = useSelector((state) => state.User.TOKEN);
  const [model, setModel] = useState(false);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.profile.favorites });
  }, [lang]);
  useEffect(() => {
    dispatch(GET_FAVORITES(User.id, () => setLoading(true)));
  }, []);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <SavingModel visible={model} title="Removing" />
        <ScrollView>
          {favorites.map((item, i) => (
            <Surface
              key={i}
              style={{ margin: 20, padding: 12, borderRadius: 12 }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar size={80} rounded source={{ uri: item.pic }} />
                <Title style={{ flexGrow: 1, marginLeft: 12 }}>
                  {item.user.name}
                </Title>
                <Icon
                  name="trash"
                  type="font-awesome-5"
                  color="red"
                  onPress={() => {
                    setModel(true);
                    dispatch(
                      REMOVE_FROM_FAVORITES(
                        { id: User.id, worker: item.user._id },
                        () => {
                          setModel(false);
                        }
                      )
                    );
                  }}
                />
              </View>
              <Subheading style={{ textAlign: "center" }}>
                {item.user?.email}
              </Subheading>
              <Subheading>Gender: {item.user?.gender}</Subheading>
              <Subheading>Category: {item.category}</Subheading>
              <Caption>
                {!item.restrict ? "Available" : "Not Available"}
              </Caption>
              <Button
                mode="contained"
                style={{ width: "100%", marginVertical: 7 }}
                disabled={item.restrict}
                onPress={() =>
                  navigation.navigate("Add Order", {
                    worker: item._id,
                    category: item.category,
                    gender: item.gender,
                  })
                }
              >
                {lang.selected_category.order}
              </Button>
            </Surface>
          ))}
        </ScrollView>
      </View>
    );
};

export default Favorites;
