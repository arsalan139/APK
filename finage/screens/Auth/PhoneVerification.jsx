/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import { Animated, Image, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CODE_VERIFICATION } from "../../Redux/Actions/Actions";
import { IconButton } from "react-native-paper";
import SavingModel from "../../components/SavingModel";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const PhoneVerification = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };
  const [model, setModel] = useState(false);
  const User = useSelector((state) => state.User.TOKEN);
  const verification_from = useSelector(
    (state) => state.User.verification_from
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { params } = useRoute();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "7.5%",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="arrow-left"
          color="#000"
          size={32}
          style={{}}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
        Please enter the verification code{"\n"}
        we send to your email address
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          setModel(true);
          let data = {
            id: User.id,
            phone: params.phone,
            code: value,
            from: verification_from,
          };
          console.log(data);
          dispatch(
            CODE_VERIFICATION(data, () => {
              setModel(false);
              if (verification_from === "Setting") {
                navigation.navigate("Profile");
              }
            })
          );
        }}
      >
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity>
      <SavingModel visible={model} title="Verifying" />
    </SafeAreaView>
  );
};

export default PhoneVerification;
