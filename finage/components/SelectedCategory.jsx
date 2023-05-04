import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Loading from './Loading';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';
import {
  GET_USER_BY_CATEGORY,
  SELECTED_CATEGORY,
} from '../Redux/Actions/Actions';
import Item from './Card/Item';
import { io } from 'socket.io-client';
import { ScrollView } from 'react-native';
const status = io('http://192.168.100.6:4000/status');
const SelectedCategory = () => {
  const [location, setLocation] = useState();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user_by_category = useSelector((state) => state.User.user_by_category);
  const User = useSelector((state) => state.User.TOKEN);
  const navigation = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();

  const _handleStatusChange = (msg) => {
    if (msg.field === params.name) {
      dispatch(SELECTED_CATEGORY(msg));
    }
  };
  const filterData = () => {
    let a = user_by_category.result.filter((item) => {
      return item.user._id !== User.id;
    });

    return a;
  };
  console.log(params.name);
  useEffect(() => {
    navigation.setOptions({ headerTitle: params.name });
    navigation.addListener('focus', () => {
      dispatch(
        GET_USER_BY_CATEGORY(
          params.name,
          () => {
            setLoading(true);
          },
          () => {
            setLoading(true);
          }
        )
      );
    });
    status.on('status-update', _handleStatusChange);
  }, []);
  console.log(user_by_category);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ margin: 20 }}>
          {user_by_category &&
            user_by_category.result
              .filter((item) => item.user._id != User.id)
              .map((item, i) => <Item key={i} data={item} />)}
        </ScrollView>
      </View>
    );
};

export default SelectedCategory;
