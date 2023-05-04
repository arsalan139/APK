import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { AppState, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LANGUAGES_BY_ID, USER_STATUS_IN } from '../Redux/Actions/Actions';
import jwtdecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
const status = io('http://192.168.100.6:4000/status', {
  autoConnect: true,
});
status.onAny((event, ...args) => {
  console.log('socket event', event);
});
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const dispatch = useDispatch();
  // Load any resources or data that we need prior to rendering the app
  const User = async () => {
    let token = await AsyncStorage.getItem('Token');
    if (token !== null) {
      token = jwtdecode(token);
      return token;
    }
    return false;
  };

  const _handleAppStateChange = async (nextAppState) => {
    let data = await User();
    if (data) {
      if (nextAppState === 'active' && data.role.includes('Worker')) {
        status.emit('online', {
          id: data.id,
          role: data.role,
          name: data.name,
        });
      }
      if (nextAppState === 'background' && data.role.includes('Worker')) {
        status.emit('offline', {
          id: data.id,
          role: data.role,
          name: data.name,
        });
      }
    }
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        dispatch(GET_LANGUAGES_BY_ID());
        dispatch(USER_STATUS_IN());
        SplashScreen.show();
        AppState.addEventListener('change', _handleAppStateChange);

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
