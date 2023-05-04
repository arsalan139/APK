import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon, Rating } from "react-native-elements";
import {
  Text,
  Subheading,
  Paragraph,
  Caption,
  useTheme,
  Surface,
} from "react-native-paper";

const ReviewCard = ({ data }) => {
  const paper = useTheme();

  const stars = () => {
    let star = [];
    for (var i = 0; i < data?.rating; i++) {
      if (i <= data?.rating) {
        star.push(
          <Icon name="star" type="antdesign" color="#ffc107" size={16} />
        );
      } else {
        star.push(
          <Icon
            name="star-outline"
            type="antdesign"
            color="#ffeb3b"
            size={16}
          />
        );
      }
    }
    return star;
  };
  return (
    <Surface style={styles.surface}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Avatar
          rounded
          size="medium"
          overlayContainerStyle={{ backgroundColor: "#009688" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{}}
          title="A"
          source={
            data?.gender === "Male"
              ? require(`../../assets/images/man.png`)
              : require(`../../assets/images/woman.png`)
          }
        />
        <Subheading style={{ paddingLeft: 8, flexGrow: 1 }}>
          {data?.name}
        </Subheading>
        <View style={[styles.row, { marginRight: 5 }]}>
          <Text style={{ marginRight: 5 }}>Rating:</Text>
          {stars().map((item, i) => (
            <View key={i}>{item}</View>
          ))}
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#9e9e9e",
          padding: 10,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Paragraph>{data?.msg}</Paragraph>
      </View>
    </Surface>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    borderRadius: 7,
    elevation: 12,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
});
