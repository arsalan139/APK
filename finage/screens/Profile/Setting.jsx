import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Button, TextInput, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  GET_INFORMATION,
  UPDATE_INFORMATION,
  VERIFICATION_FROM,
  CHANGE_PASSWORD,
} from '../../Redux/Actions/Actions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import SavingModel from '../../components/SavingModel';
import { Toast } from 'native-base';
const Setting = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [model, setModel] = useState(false);
  const User = useSelector((state) => state.User.TOKEN);

  const initial = {
    password: '',
    cPassword: '',
  };
  const [pass, setPass] = useState(initial);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lang = useSelector((state) => state.User.selected_language);
  useEffect(() => {
    navigation.setOptions({ headerTitle: lang.setting.title });
  }, [lang]);
  useEffect(() => {
    dispatch(
      GET_INFORMATION(
        User.id,
        (data) => {
          setLoading(true);
          setInfo(data);
        },
        () => setLoading(true)
      )
    );
  }, []);
  const list = [
    {
      icon: 'user',
      type: 'font-awesome',
      value: info?.name,
      onChangeText: (text) => setInfo({ ...info, name: text }),
      label: lang.setting.name,
      keyboardType: 'default',
    },
    {
      icon: 'mail',
      type: 'ionicon',
      value: info?.email,
      onChangeText: (text) => setInfo({ ...info, email: text }),
      label: lang.setting.email,
      keyboardType: 'default',
    },
    {
      icon: 'phone',
      type: 'font-awesome',
      value: info?.phone,
      onChangeText: (text) => setInfo({ ...info, phone: text }),
      label: lang.setting.phone,
      keyboardType: 'number-pad',
    },
  ];

  const showDatepicker = () => {
    showMode('date');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === 'ios');
    let a = { ...info };
    a['dob'] = currentDate;
    setInfo(a);
  };

  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {show && (
            <DateTimePicker
              locale='es'
              testID='dateTimePicker'
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={mode}
              is24Hour={true}
              display='calendar'
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
          <View style={{ margin: 20 }}>
            <Title>Information:</Title>
            {list.map((item, i) => (
              <View
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 7,
                }}
              >
                <Icon
                  name={item.icon}
                  type={item.type}
                  color='#2196f3'
                  style={{ margin: 7 }}
                />
                <Text style={{ margin: 7, flexGrow: 2 }}>{item.label}</Text>
                {!info?.phone_verified && item.label === 'Phone' && (
                  <Button
                    uppercase={false}
                    style={{
                      marginHorizontal: 7,
                    }}
                    mode='outlined'
                    onPress={() => {
                      dispatch(VERIFICATION_FROM('Setting'));
                      navigation.navigate('Add Phone');
                    }}
                  >
                    {lang.setting.verify}
                  </Button>
                )}
                <TextInput
                  mode='outlined'
                  value={item.value}
                  placeholder={`${item.label}`}
                  label={item.label}
                  onChangeText={item.onChangeText}
                  autoCapitalize='none'
                  style={{ width: '50%' }}
                  dense
                />
              </View>
            ))}
            <View
              style={{
                margin: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onPress={showDatepicker}
              >
                <Icon
                  name='calendar-alt'
                  type='font-awesome-5'
                  color='#2196f3'
                  style={{ fontSize: 20 }}
                />
                <Text style={{ marginLeft: 5, flexGrow: 1 }}>
                  {lang.setting.dob}:
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 18,
                    color: '#2196f3',
                  }}
                >
                  {new Date(info?.dob).toDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              uppercase={false}
              style={{
                marginVertical: 20,
              }}
              mode='contained'
              onPress={() => {
                setMode(true);
                console.log(info);
                dispatch(
                  UPDATE_INFORMATION(
                    info,
                    (data) => {
                      setModel(false);
                      setInfo(data);
                    },
                    () => {
                      setModel(false);
                    }
                  )
                );
              }}
            >
              {lang.setting.update_profile}
            </Button>
            <TextInput
              mode='outlined'
              value={pass.password}
              placeholder={lang.setting.new_password}
              label={lang.setting.new_password}
              onChangeText={(text) => setPass({ ...pass, password: text })}
              autoCapitalize='none'
              secureTextEntry={true}
              dense
            />
            <TextInput
              mode='outlined'
              value={pass.cPassword}
              placeholder={lang.setting.confirm_password}
              label={lang.setting.confirm_password}
              onChangeText={(text) => setPass({ ...pass, cPassword: text })}
              autoCapitalize='none'
              secureTextEntry={true}
              dense
            />
            <Button
              uppercase={false}
              style={{
                marginVertical: 20,
              }}
              mode='contained'
              onPress={() => {
                setMode(true);
                if (pass.cPassword === pass.password) {
                  dispatch(
                    CHANGE_PASSWORD(
                      { id: info._id, password: pass.password },
                      (data) => {
                        setModel(false);
                        setPass(initial);
                      },
                      () => {
                        setModel(false);
                      }
                    )
                  );
                } else {
                  Toast.show({
                    text: 'Password not matched',
                    type: 'danger',
                    style: { margin: 10, borderRadius: 7 },
                    textStyle: { textAlign: 'center' },
                  });
                }
              }}
            >
              {lang.setting.change_password}
            </Button>
          </View>
          <SavingModel visible={model} />
        </ScrollView>
      </View>
    );
};

export default Setting;

const styles = StyleSheet.create({});
