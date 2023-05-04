import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "../../components/Card/ReviewCard";
import Loading from "../../components/Loading";
import { GET_REVIEW } from "../../Redux/Actions/Actions";

const Reviews = () => {
  const paper = useTheme();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState(null);
  const user = useSelector((state) => state.User.TOKEN);
  const review = useSelector((state) => state.User.review);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.reviews.title });
  }, [lang]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(
        GET_REVIEW(user.id, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
  }, [review]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ backgroundColor: paper.colors.surface, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {review ? (
            review?.review.map((item, i) => <ReviewCard key={i} data={item} />)
          ) : (
            <Title>No Result</Title>
          )}
        </ScrollView>
      </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({});
