import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Loading from '../components/Loading';
import { GET_MESSAGE } from '../Redux/Actions/Actions';

const socket = io('http://192.168.100.6:4000/chat');
const ChatScreen = () => {
  const message = useSelector((state) => state.User.message);
  const [receive, setReceive] = useState([]);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [scrollRef, setScrollRef] = useState();
  const User = useSelector((state) => state.User.TOKEN);
  const msg = useSelector((state) => state.User.msg);
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: params.name,
    });

    navigation.addListener('focus', () => {
      setLoading(false);
      dispatch(
        GET_MESSAGE(params.order, () => {
          setTimeout(() => {
            setLoading(true);
          }, 3000);
        })
      );
    });
    if (msg) {
      setReceive(msg);
    }
  }, [msg]);
  useEffect(() => {
    socket.on('receive', (msg) => {
      if (msg.session_id === params.order) {
        setReceive([...receive, msg.msg]);
        console.log('o2');
        setText('');
        scrollRef?.scrollToEnd({ animated: true });
      }
    });
  }, [receive]);
  if (!loading) {
    return <Loading />;
  } else
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(r) => setScrollRef(r)}
          onContentSizeChange={() => scrollRef.scrollToEnd({ animated: true })}
        >
          <View
            style={{
              marginTop: 5,
              flex: 1,
              alignItems: 'flex-end',
              marginHorizontal: 25,
            }}
          >
            {receive.map((i, index) => {
              scrollRef?.scrollToEnd({ animated: true });
              return (
                <View
                  key={index}
                  style={{
                    alignSelf:
                      User.id === i.sender.id ? 'flex-end' : 'flex-start',
                    backgroundColor:
                      User.id === i.sender.id ? '#2196f3' : '#e0e0e0',

                    justifyContent: 'center',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      textAlign: User.id === i.sender.id ? 'left' : 'right',
                      color: User.id === i.sender.id ? '#fff' : '#000',
                    }}
                  >
                    {User.id === i.sender.id ? 'You' : i.sender.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: User.id === i.sender.id ? 'left' : 'right',
                      color: User.id === i.sender.id ? '#fff' : '#000',
                    }}
                  >
                    {i.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
          }}
        >
          <Input
            placeholder='Type a message'
            value={text}
            inputContainerStyle={{
              alignSelf: 'center',
              borderRadius: 12,
              borderWidth: 2,
            }}
            inputStyle={{ paddingLeft: 12 }}
            containerStyle={{
              display: 'flex',
              flexDirection: 'row',
              flexShrink: 1,
            }}
            onChangeText={(text) => setText(text)}
          />
          <FAB
            small
            style={{ height: 40 }}
            icon={(props) => (
              <Icon
                name='sc-telegram'
                type='evilicon'
                {...props}
                size={28}
                style={{ marginLeft: -2 }}
              />
            )}
            onPress={() => {
              let data = {
                session_id: params.order,
                msg: {
                  text,
                  sender: {
                    name: User.name,
                    id: User.id,
                    time: new Date(),
                  },
                  receiver: {
                    name: params.name,
                    id: params.id,
                    time: new Date(),
                  },
                },
              };
              socket.emit('send', data);
            }}
          />
        </View>
      </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
