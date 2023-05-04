import React, { createRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput, RadioButton } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import SavingModel from '../../components/SavingModel';
import { KeyboardAvoidingView } from 'react-native';
import { Toast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTRATION, VERIFICATION_FROM } from '../../Redux/Actions/Actions';
import { TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';
const ProfileForm = () => {
  const initial = {
    name: '',
    email: '',
    password: '',
    cPassword: '',
    gender: '',
  };
  const [offer, setOffer] = useState(initial);
  const [model, setModel] = useState(false);
  const expo_token = useSelector((state) => state.User.expo_token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const list = [
    {
      name: `Enter Name`,
      label: `Name`,
      value: offer.name,
      ref: createRef(),
      blur: false,
      submitType: 'next',
      change: (text) => setOffer({ ...offer, name: text }),
      show: true,
      secureTextEntry: false,
      nextIndex: 1,
    },
    {
      name: 'Enter Email Address',
      label: 'Email Address',
      value: offer.email,
      ref: createRef(),
      blur: false,
      submitType: 'next',
      change: (text) => setOffer({ ...offer, email: text }),
      show: true,
      secureTextEntry: false,
      nextIndex: 2,
    },
    {
      name: 'Enter Password',
      value: offer.password,
      label: 'Password',
      ref: createRef(),
      blur: false,
      submitType: 'next',
      change: (text) => setOffer({ ...offer, password: text }),
      show: true,
      secureTextEntry: true,
      nextIndex: 3,
    },
    {
      name: 'Confirm Password',
      value: offer.cPassword,
      label: 'Confirm Password',
      ref: createRef(),
      blur: true,
      submitType: 'done',
      change: (text) => setOffer({ ...offer, cPassword: text }),
      show: true,
      secureTextEntry: true,
      nextIndex: -1,
    },
  ];

  const signInAsync = async () => {
    console.log('LoginScreen.js 6 | loggin in');
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId:
          '651020308795-vglopok5j71rihh51gibbjkrb8b0462q.apps.googleusercontent.com',
        androidStandaloneAppClientId: `651020308795-30r99da22e4v08jp1b37fpdo1hki6gt2.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        // Then you can use the Google REST API
        console.log(
          'LoginScreen.js 17 | success, navigating to profile',
          user,
          type
        );
        let a = { ...offer };
        a.email = user.email;
        a.name = user.name;
        setOffer(a);
      }
    } catch (error) {
      console.log('LoginScreen.js 19 | error with login', error);
    }
  };

  const handelData = () => {
    if (offer.cPassword === offer.password) {
      let data = {
        email: offer.email.toLowerCase(),
        password: offer.password,
        name: offer.name,
        gender: offer.gender,
        token: expo_token || 'o7823yobduo4ybou2y42ou4f 2o4gf 2o4ugf ',
      };
      console.log(expo_token);
      setModel(true);
      dispatch(
        REGISTRATION(
          data,
          () => {
            setModel(false);
            dispatch(VERIFICATION_FROM('SignUp'));
            navigation.navigate('Add Phone');
          },
          () => {
            setModel(false);
          }
        )
      );
    } else {
      Toast.show({
        text: 'Password Not matched!',
        style: { margin: 10, borderRadius: 7 },
        textStyle: { textAlign: 'center' },
        type: 'success',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView
        style={{ marginTop: '12%' }}
        contentContainerStyle={{ display: 'flex' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ margin: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginVertical: 7,
              }}
            >
              Create Account.
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 7,
                color: 'gray',
              }}
            >
              Sign Up to get started!
            </Text>
            <View style={{ height: 70 }}></View>

            {list.map(
              (item, i) =>
                item.show && (
                  <View key={i} style={{ marginVertical: 7 }}>
                    <TextInput
                      label={item.label}
                      placeholder={item.name}
                      value={item.value}
                      dense
                      onChangeText={item.change}
                      ref={item.ref}
                      onSubmitEditing={() => {
                        item.nextIndex !== -1 &&
                          list[item.nextIndex].ref.current.focus();
                      }}
                      mode='outlined'
                      blurOnSubmit={item.blur}
                      returnKeyType={item.submitType}
                      secureTextEntry={item.secureTextEntry}
                    />
                  </View>
                )
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ flexGrow: 1 }}>Gender:</Text>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setOffer({ ...offer, gender: 'Female' })}
              >
                <Text>Female</Text>
                <RadioButton
                  value='Female'
                  status={offer.gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => setOffer({ ...offer, gender: 'Female' })}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOffer({ ...offer, gender: 'Male' })}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text>Male</Text>
                <RadioButton
                  value='Male'
                  status={offer.gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => setOffer({ ...offer, gender: 'Male' })}
                />
              </TouchableOpacity>
            </View>

            <View style={{ height: 20 }}></View>

            <Button
              uppercase={false}
              style={{
                marginVertical: 7,
                backgroundColor: '#2196f3',
              }}
              labelStyle={{ color: 'white' }}
              mode='contained'
              disabled={model}
              onPress={handelData}
            >
              Sign Up
            </Button>
          </View>
        </View>
        <Button
          uppercase={false}
          style={{
            marginHorizontal: 12,
          }}
          mode='text'
          onPress={signInAsync}
          labelStyle={{ color: '#ff1467' }}
          color='#ff1467'
        >
          <Text style={{ color: '#5d7280' }}>Sign Up with </Text>Google
        </Button>
        <Button
          uppercase={false}
          style={{
            marginHorizontal: 12,
          }}
          mode='text'
          onPress={() => navigation.goBack()}
          labelStyle={{ color: '#2196f3' }}
          color='#2196f3'
        >
          <Text style={{ color: '#5d7280' }}>Already signed up? </Text>Log In
        </Button>
      </ScrollView>

      <SavingModel visible={model} />
    </KeyboardAvoidingView>
  );
};

export default ProfileForm;
