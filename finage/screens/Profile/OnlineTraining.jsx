import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
const OnlineTraining = () => {
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.online_training.title });
  }, [lang]);
  return (
    <View>
      <Text>Online Training</Text>
    </View>
  );
};

export default OnlineTraining;

const styles = StyleSheet.create({});
