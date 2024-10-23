/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {color, colorArray} from '../../../constants/colors/colors';
import {headerBg} from '../../../assets/images';
import Header from '../../../components/header/Header';
import NameAvatar from '../../../components/nameAvatar/NameAvatar';
import {typography} from '../../../assets/fonts/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';

const Notification = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const userData = useSelector(state => state.auth.user); // Replace with your actual state
  console.log('🚀 ~ Notification ~ userData:', userData);

  useEffect(() => {
    handleGetNotifications();
  }, []);

  const handleGetNotifications = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log('🚀 ~ handleGetNotifications ~ token:', token);
      const response = await apiClient.get(`${endpoints.GET_NOTIFICATIONS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('🚀 ~ handleGetNotifications ~ response:', response);
      if (response.status === 200) {
        // Assuming the user profile data is inside the `data` property
        setIsLoading(false);
        console.log(
          '🚀 ~ handleGetNotifications ~ response?.data:',
          response?.data,
        );
        setNotificationData(response?.data);
      }
    } catch (error) {
      console.log('🚀 ~ handleGetNotifications ~ error:', error);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setIsLoading(false);
    }
  };

  function timeAgo(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate - givenDate; // difference in milliseconds

    const msInMinute = 60 * 1000;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;

    if (diffInMs < msInHour) {
      const minutes = Math.floor(diffInMs / msInMinute);
      return `${minutes}m`;
    } else if (diffInMs < msInDay) {
      const hours = Math.floor(diffInMs / msInHour);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInMs / msInDay);
      return `${days}d`;
    }
  }

  const renderNotifications = ({item, index}) => {
    return (
      <View>
        <View style={{flexDirection: 'row', padding: fp(2)}}>
          {false && <View />}
          <View style={{}}>
            <NameAvatar name={userData?.userName} />
          </View>
          <Text
            style={{
              fontFamily: typography.Inter_Regular,
              fontSize: fp(1.6),
              width: wp(68),
              alignSelf: 'center',
              color: '#000000',
              marginLeft: wp(2),
            }}>
            {item?.body}
          </Text>
          <Text
            style={{
              fontFamily: typography.Inter_Bold,
              fontSize: fp(1.4),
              width: wp(68),
              marginTop: hp(2),
              color: '#000000',
            }}>
            {timeAgo(item?.created_at)}
          </Text>
        </View>
        <View
          style={{
            height: hp(0.25),
            width: wp(100),
            backgroundColor: color.WHITE,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: color.DIM_WHITE}}>
      <StatusBar
        translucent
        backgroundColor={color.PRIMARY_BLUE}
        barStyle="light-content"
      />
      {/* <View style={{marginTop: hp(4)}}> */}
      <Header
        title={'Notifications'}
        // onPress={onLeftPress}
        // onRightPress={onRightPress}
        leftIcon={true}
        leftIconName={'leftArrow'}
        backgroundColor={color.PRIMARY_BLUE}
        notificationIcon={false}
        rightIcon={false}
      />
      {IsLoading && (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      )}
      {notificationData.length === 0 && IsLoading === false ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={{textAlign: 'center'}}>No Notifications</Text>
        </View>
      ) : (
        <FlatList data={notificationData} renderItem={renderNotifications} />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
