import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import { useSelector } from "react-redux";
import CategoryList from "../components/Card/CategoryList";
import { useNavigation } from "@react-navigation/core";
const CategoryScreen = () => {
  const lang = useSelector((state) => state.User.selected_language);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.home.title });
  }, [lang]);
  return (
    <View style={styles.container}>
      <CategoryList />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
