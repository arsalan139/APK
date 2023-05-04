import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import SavingModel from '../../components/SavingModel';
import { LOGIN, GOOGLE_LOGIN } from '../../Redux/Actions/Actions';
import * as Google from 'expo-google-app-auth';
const MainScreen = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = () => {
    let data = {
      email: login.username.toLowerCase(),
      password: login.password,
    };
    setDisabled(true);
    dispatch(
      LOGIN(data, () => {
        setDisabled(false);
      })
    );
  };
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
        setDisabled(true);
        dispatch(
          GOOGLE_LOGIN({ email: user.email }, () => {
            setDisabled(false);
          })
        );
      }
    } catch (error) {
      console.log('LoginScreen.js 19 | error with login', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: '9.5%',
        backgroundColor: '#fff',
      }}
    >
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <View style={{ width: 300, marginTop: 50 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginVertical: 7,
              }}
            >
              Welcome.
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 7,
                color: 'gray',
              }}
            >
              Sign In to continue!
            </Text>
            <View style={{ height: 120 }}></View>
            <TextInput
              mode='outlined'
              value={login.username}
              placeholder='Email Address*'
              label='Email Address*'
              onChangeText={(text) => setLogin({ ...login, username: text })}
              autoCapitalize='none'
              style={{ marginVertical: 7 }}
            />
            <TextInput
              mode='outlined'
              value={login.password}
              placeholder='Password*'
              label='Password*'
              secureTextEntry={true}
              onChangeText={(text) => setLogin({ ...login, password: text })}
              autoCapitalize='none'
              style={{ marginVertical: 7 }}
            />
            <Button
              uppercase={false}
              style={{
                marginBottom: 12,
                alignSelf: 'flex-end',
              }}
              labelStyle={{ color: '#2196f3' }}
              mode='text'
              onPress={() => navigation.navigate('Forget')}
            >
              Forgot Password ?
            </Button>
            <Button
              uppercase={false}
              style={{
                width: 300,
                marginVertical: 7,
                backgroundColor: '#2196f3',
              }}
              labelStyle={{ color: 'white' }}
              mode='contained'
              disabled={disabled}
              onPress={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          </View>
          <SavingModel visible={disabled} title='Authenticating...' />
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
          <Text style={{ color: '#5d7280' }}>Sign In with </Text>Google
        </Button>
        <Button
          uppercase={false}
          style={{
            marginHorizontal: 12,
          }}
          mode='text'
          onPress={() => navigation.navigate('SignUp')}
          labelStyle={{ color: '#2196f3' }}
          color='#2196f3'
        >
          <Text style={{ color: '#5d7280' }}>New to Finage? </Text>Sign Up
        </Button>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
