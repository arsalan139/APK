import React from "react";
import { StyleSheet, View } from "react-native";
import { Overlay } from "react-native-elements";
import { ActivityIndicator, Title, useTheme } from "react-native-paper";

const SavingModel = ({ visible, title = "Saving" }) => {
  const paper = useTheme();
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={{
        borderRadius: 10,
        padding: 20,
        backgroundColor: paper.colors.surface,
      }}
    >
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ActivityIndicator
          animating={true}
          color="#186eb8"
          size={50}
          style={{ marginRight: 10 }}
        />
        <Title style={{ alignSelf: "center" }}>{title}...</Title>
      </View>
    </Overlay>
  );
};

export default SavingModel;

const styles = StyleSheet.create({});
