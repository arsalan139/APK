import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Image, Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Surface, TextInput, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import SavingModel from '../components/SavingModel';
import { ScrollView } from 'react-native';
import { APPLICATION, GET_APPLICATION_STATUS } from '../Redux/Actions/Actions';
import { registrationSchema, Validation } from '../schema/ValidationScheme';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import Loading from '../components/Loading';
import * as Location from 'expo-location';
import { Picker } from 'native-base';
const WorkerApplication = () => {
  const [type, setType] = useState('');
  const [model, setModel] = useState(false);
  const [visible, setVisible] = useState(false);
  const [picVisible, setPicVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [pic, setPic] = useState('');
  const User = useSelector((state) => state.User.TOKEN);
  const category = useSelector((state) => state.User.category);
  const request_status = useSelector((state) => state.User.request_status);
  const lang = useSelector((state) => state.User.selected_language);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const initial = {
    user: User?.id,
    category: '',
    pic: null,
    cnic: {
      number: '',
      front_pic: null,
      back_pic: null,
    },
    address: {
      place: '',
      lng: 0,
      lat: 0,
      city: '',
    },
    working_rate: 0,
    parent_cinc: '',
  };
  const [form, setForm] = useState(initial);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const togglePicOverlay = (type) => {
    let a;
    if (type === 'pic') {
      a = form.pic;
    } else if (type === 'front_cnic') {
      a = form.cnic.front_pic;
    } else if (type === 'back_cnic') {
      a = form.cnic.back_pic;
    }
    setPic(a);
    setPicVisible(!picVisible);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });
      if (!result.cancelled) {
        let a = { ...form };
        if (type === 'pic') {
          a.pic = 'data:image/png;base64,' + result.base64;
        } else if (type === 'front_pic') {
          a.cnic.front_pic = 'data:image/png;base64,' + result.base64;
        } else if (type === 'back_pic') {
          a.cnic.back_pic = 'data:image/png;base64,' + result.base64;
        }
        setForm(a);
        setVisible(!visible);
      }
    } catch (E) {
      alert(E);
    }
  };

  const pickCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        aspect: [1, 1],
        allowsEditing: true,
        base64: true,
      });
      if (!result.cancelled) {
        let a = { ...form };

        if (type === 'pic') {
          a.pic = 'data:image/png;base64,' + result.base64;
        } else if (type === 'front_pic') {
          a.cnic.front_pic = 'data:image/png;base64,' + result.base64;
        } else if (type === 'back_pic') {
          a.cnic.back_pic = 'data:image/png;base64,' + result.base64;
        }
        setForm(a);
        setVisible(!visible);
      }
    } catch (E) {
      alert(E);
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.application.title });
  }, [lang]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      dispatch(
        GET_APPLICATION_STATUS(
          User.id,
          async (s) => {
            if (s !== 'pending' || s !== 'verified') {
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
              } else {
                let location = await Location.getCurrentPositionAsync({
                  options: { accuracy: Location.LocationAccuracy.Highest },
                });
                setLocation({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }
            }
          },
          () => {}
        )
      );
    });
  }, [request_status]);
  console.log(location);
  if (request_status === 'pending' || request_status === 'verified') {
    return (
      <Surface style={{ margin: 20, borderRadius: 7, elevation: 8 }}>
        <Text style={{ padding: 10, textAlign: 'center' }}>
          Your Application is {request_status} For Approval
        </Text>
      </Surface>
    );
  } else if (!location) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
            <Title style={{}}>{lang.application.category}</Title>
            <Picker
              selectedValue={form.category}
              onValueChange={(itemValue, itemIndex) =>
                setForm({ ...form, category: itemValue })
              }
              mode='dropdown'
              note
              placeholder='Select a category'
            >
              {category.map((value, index) => (
                <Picker.Item
                  key={index}
                  label={value.name}
                  value={value.name}
                />
              ))}
            </Picker>
          </View>
          <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
            <Title style={{ color: 'gray' }}>
              {lang.application.upload_image}
            </Title>
            {!form.pic ? (
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  borderColor: 'gray',
                }}
                onPress={() => {
                  toggleOverlay();
                  setType('pic');
                }}
              >
                <Icon
                  name='add-a-photo'
                  type='material'
                  size={54}
                  color='gray'
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 150, height: 150 }}>
                <Image
                  source={{ uri: form.pic }}
                  style={{ width: 150, height: 150 }}
                  onPress={toggleOverlay}
                  onLongPress={() => togglePicOverlay('pic')}
                />
                <Icon
                  name='close'
                  type='evilicon'
                  size={32}
                  color='red'
                  containerStyle={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                  }}
                  onPress={() => setForm({ ...form, pic: null })}
                />
              </View>
            )}
          </View>
          <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
            <Title style={{ color: 'gray' }}>
              {lang.application.upload_cnic_front}
            </Title>
            {!form.cnic.front_pic ? (
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  borderColor: 'gray',
                }}
                onPress={() => {
                  toggleOverlay();
                  setType('front_pic');
                }}
              >
                <Icon
                  name='add-a-photo'
                  type='material'
                  size={54}
                  color='gray'
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 150, height: 150 }}>
                <Image
                  source={{
                    uri: form.cnic.front_pic,
                  }}
                  style={{ width: 150, height: 150 }}
                  onPress={toggleOverlay}
                  onLongPress={() => togglePicOverlay('front_pic')}
                />
                <Icon
                  name='close'
                  type='evilicon'
                  size={32}
                  color='red'
                  containerStyle={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                  }}
                  onPress={() => {
                    let a = { ...form };
                    a.cnic.front_pic = null;
                    setForm(a);
                  }}
                />
              </View>
            )}
          </View>
          <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
            <Title style={{ color: 'gray' }}>
              {lang.application.upload_cnic_back}
            </Title>
            {!form.cnic.back_pic ? (
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 1,
                  justifyContent: 'center',
                  display: 'flex',
                  borderColor: 'gray',
                }}
                onPress={() => {
                  toggleOverlay();
                  setType('back_pic');
                }}
              >
                <Icon
                  name='add-a-photo'
                  type='material'
                  size={54}
                  color='gray'
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 150, height: 150 }}>
                <Image
                  source={{
                    uri: form.cnic.back_pic,
                  }}
                  style={{ width: 150, height: 150 }}
                  onPress={toggleOverlay}
                  onLongPress={() => togglePicOverlay('back_pic')}
                />
                <Icon
                  name='close'
                  type='evilicon'
                  size={32}
                  color='red'
                  containerStyle={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                  }}
                  onPress={() => {
                    let a = { ...form };
                    a.cnic.back_pic = null;
                    setForm(a);
                  }}
                />
              </View>
            )}
          </View>
          <TextInput
            mode='outlined'
            value={form.cnic.number}
            placeholder={lang.application.cnic_number}
            label={lang.application.cnic_number}
            keyboardType='number-pad'
            onChangeText={(text) => {
              let a = { ...form };
              a.cnic.number = text;
              setForm(a);
            }}
            autoCapitalize='none'
            style={{ marginVertical: 7, marginHorizontal: 20 }}
          />
          <TextInput
            mode='outlined'
            value={form.parent_cinc}
            placeholder={lang.application.parent_cinc}
            label={lang.application.parent_cinc}
            keyboardType='number-pad'
            onChangeText={(text) => {
              let a = { ...form };
              a.parent_cinc = text;
              setForm(a);
            }}
            autoCapitalize='none'
            style={{ marginVertical: 7, marginHorizontal: 20 }}
          />
          <TextInput
            mode='outlined'
            value={'' + form.working_rate}
            placeholder={lang.application.working_rate}
            label={lang.application.working_rate}
            keyboardType='number-pad'
            onChangeText={(text) => {
              let a = { ...form };
              a.working_rate = text;
              setForm(a);
            }}
            autoCapitalize='none'
            style={{ marginVertical: 7, marginHorizontal: 20 }}
          />
          <TextInput
            mode='outlined'
            value={form.address.place}
            placeholder={lang.application.address}
            label={lang.application.address}
            onChangeText={(text) => {
              let a = { ...form };
              a.address.place = text;
              setForm(a);
            }}
            autoCapitalize='none'
            style={{ marginVertical: 7, marginHorizontal: 20 }}
          />
          <TextInput
            mode='outlined'
            value={form.address.city}
            placeholder={lang.application.city}
            label={lang.application.city}
            onChangeText={(text) => {
              let a = { ...form };
              a.address.city = text;
              setForm(a);
            }}
            autoCapitalize='none'
            style={{ marginVertical: 7, marginHorizontal: 20 }}
          />
          <View style={{ marginVertical: 7, marginHorizontal: 20 }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ height: 350 }}
              showsUserLocation={true}
              initialRegion={location}
              onPress={({ nativeEvent: { coordinate } }) => {
                let a = { ...form };
                a.address.lat = coordinate.latitude;
                a.address.lng = coordinate.longitude;
                setForm(a);
              }}
            >
              {form.address.lat !== 0 && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(form.address.lat),
                    longitude: parseFloat(form.address.lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              )}
            </MapView>
          </View>
          <Button
            onPress={() => {
              Validation(registrationSchema, form, (v) => {
                setModel(true);
                dispatch(
                  APPLICATION(
                    form,
                    () => {
                      setTimeout(() => {
                        setModel(false);
                        setForm(initial);
                      }, 3000);
                    },
                    () => {
                      setModel(false);
                    }
                  )
                );
              });
            }}
            buttonStyle={{ marginVertical: 10, marginHorizontal: 20 }}
            title={lang.application.submit_form}
          />
        </ScrollView>
        <SavingModel visible={model} title='Submitting' />
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Icon
              name='close'
              type='evilicon'
              size={32}
              containerStyle={{ alignSelf: 'flex-end' }}
              onPress={toggleOverlay}
            />
            <Title style={{ alignSelf: 'center' }}>Select Image</Title>
            <Button
              icon={
                <Icon
                  name='camera'
                  size={20}
                  color='#fff'
                  style={{ margin: 7 }}
                  type='font-awesome-5'
                />
              }
              onPress={pickCamera}
              buttonStyle={{ marginVertical: 10 }}
              title='Upload from Camera'
            />
            <Button
              icon={
                <Icon
                  name='md-images'
                  type='ionicon'
                  size={24}
                  color='#03a9f4'
                  style={{ margin: 7 }}
                />
              }
              buttonStyle={{ marginVertical: 10 }}
              titleStyle={{ color: '#2196f3' }}
              type='clear'
              title='Open Gallery'
              onPress={pickImage}
            />
          </View>
        </Overlay>
        <Overlay
          isVisible={picVisible}
          onBackdropPress={togglePicOverlay}
          overlayStyle={{}}
        >
          <View style={{ flex: 1, width: 400 }}>
            <ImageViewer
              imageUrls={[{ url: 'data:image/jpeg;base64,' + pic }]}
              index={0}
              renderIndicator={() => null}
              renderHeader={() => (
                <Icon
                  name='close'
                  type='evilicon'
                  size={32}
                  containerStyle={{ alignSelf: 'flex-end' }}
                  onPress={togglePicOverlay}
                />
              )}
              renderFooter={() => null}
              backgroundColor='white'
            />
          </View>
        </Overlay>
      </View>
    );
};

export default WorkerApplication;

const styles = StyleSheet.create({});
