import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../../constants/colors/colors';
import Header from '../../../components/header/Header';
import {headerBg} from '../../../assets/images';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {typography} from '../../../assets/fonts/typography';
import {ADMIN_USER_ID, BASE_URL} from '../../../constants/storageKeys';
import {endpoints} from '../../../constants/colors/endpoints';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIcon} from '../../../assets/icons/useIcon';
import ChatAsset from '../../../assets/ChatAssets';
import Snackbar from 'react-native-snackbar';
import CustomText from '../../../components/text/CustomText';

const SenderMessage = () => {
  return (
    <View
      style={{
        marginTop: hp(2),
        marginRight: wp(4),
        maxWidth: wp(60),
        backgroundColor: 'rgba(54, 75, 159,0.2)',
        borderRadius: fp(0.5),
        padding: fp(1),
      }}>
      <Text style={{color: '#424242', fontFamily: typography.Inter_Regular}}>
        Contray to popular belief, Lorem ipsum is not simply random text. It has
        roots in a piece of classical latin
      </Text>
    </View>
  );
};

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [textMsg, setTextMsg] = useState('');
  const [userId, setUserId] = useState();
  function onChangeMsg(e) {
    setTextMsg(e);
  }
  async function handleGetAllMessages() {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const response = await axios.get(
        `${BASE_URL}${endpoints.GET_ALL_MESSAGES}/${user_id}`,
      );

      console.log('response?.data', JSON.stringify(response?.data));
      setMessages(response?.data?.messages);
    } catch (error) {}
  }
  useEffect(() => {
    async function getUserId() {
      const id = await AsyncStorage.getItem('user_id');
      setUserId(id);
    }
    getUserId();
    handleGetAllMessages();
  }, []);

  const ReceiverMessage = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: item?.user?.id == userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            marginTop: hp(2),
            marginLeft: item?.user?.id != userId ? wp(4) : null,
            marginRight: item?.user?.id == userId ? wp(4) : null,
            maxWidth: wp(60),
            backgroundColor: 'rgba(54, 75, 159,0.1)',
            borderRadius: fp(0.5),
            padding: fp(1),
          }}>
          <Text
            style={{color: '#424242', fontFamily: typography.Inter_Regular}}>
            {item?.message}
          </Text>
        </View>
      </View>
    );
  };
  async function handleSendMessage() {
    try {
      //   const user_id = await AsyncStorage.getItem('user_id');
      const sender_user_id = ADMIN_USER_ID;
      const response = await axios.post(
        `${BASE_URL}${endpoints.SEND_MESSAGE}`,
        {
          user_id: userId,
          message: textMsg,
        },
      );
      console.log(response);
      if (response?.status == 200) {
        setTextMsg('');
        handleGetAllMessages();
        Keyboard.dismiss();
        Snackbar.show({
          text: 'Sent',
          duration: 500,
          backgroundColor: color.PRIMARY_BLUE,
        });
      }
      console.log('send msg api ', response?.data);
    } catch (error) {}
  }

  function onLeftPress() {
    navigation.openDrawer();
  }

  function onRightPress() {
    navigation.navigate('ProfileMenu');
  }
  return (
    <View style={{flex: 1}}>
      {/* <Image
        source={headerBg}
        style={{height: hp(8), width: wp(100)}}
        resizeMode="cover"
      />
      <View style={{position: 'absolute'}}>
        <Header
          title={'Chat'}
          leftIconName={'Menu'}
          onRightPress={onRightPress}
          onPress={onLeftPress}
        />
      </View> */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={headerBg}
        style={{height: hp(10), width: wp(100), alignSelf: 'center'}}
        resizeMode="cover"
        imageStyle={{
          borderBottomLeftRadius: fp(3),
          borderBottomRightRadius: fp(2),
        }}>
        {/* <View style={{marginTop: hp(4)}}> */}
        <Header
          title={'Chat'}
          backgroundColor={color.PRIMARY_BLUE}
          font={'regular'}
          leftIconName={'leftArrow'}
          onRightPress={onRightPress}
        />
        {/* </View> */}
      </ImageBackground>

      <View style={{flex: 1}}>
        <FlatList data={messages} renderItem={ReceiverMessage} />
      </View>

      {/* {messages.map(item, index => (
        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <SenderMessage />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <ReceiverMessage />
          </View>
        </KeyboardAwareScrollView>
      ))} */}

      <View style={styles.inputContainer}>
        <Image
          source={ChatAsset.AddAttachment}
          style={{
            height: fp(7),
            width: fp(7),
          }}
        />
        <TextInput
          style={styles.input}
          value={textMsg}
          placeholder={'Enter message'}
          placeholderTextColor={'#9A9A9A'}
          multiline={true}
          onChangeText={onChangeMsg}
        />
        <TouchableOpacity
          style={styles.sendContainer}
          onPress={handleSendMessage}>
          {useIcon.SendIcon()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    // borderWidth: 1,
    // borderColor: color.PRIMARY_BLUE,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.1),
    justifyContent: 'space-between',
    borderRadius: fp(0.7),
    // marginLeft: wp(12),
    marginBottom: hp(2),
    // backgroundColor: '#E8E8E8',
  },
  input: {
    backgroundColor: '#E8E8E8',
    width: wp(80),
    borderRadius: fp(10),
    // height:hp(5),
    paddingHorizontal: wp(2),
    color: '#9A9A9A',
  },
  sendContainer: {
    right: wp(10),
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
