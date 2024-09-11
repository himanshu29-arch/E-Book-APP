import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fp, hp, wp} from '../../../../helpers/resDimension';
import {FullBg, PaymentAlertIllus, UserIcon} from '../../../../assets/images';
import {typography} from '../../../../assets/fonts/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from '../../../../helpers/apiClient';
import {endpoints} from '../../../../constants/colors/endpoints';
import Snackbar from 'react-native-snackbar';
import {color} from '../../../../constants/colors/colors';
import {List} from 'react-native-paper';
import {
  Chat,
  EditProfile,
  Logout,
  PaymentMethods,
  RightArrow,
  Settings,
} from '../../../../assets/ProfileMenu';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../../redux/authSlice';
import axios from 'axios';
import {BASE_URL} from '../../../../constants/storageKeys';
import CustomAlert from '../../../../components/alerts/CustomAlert';

const ProfileMenu = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const handleGetProfile = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await apiClient.get(`${endpoints.GET_PROFILE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserProfile(response?.data?.data); // Assuming the user profile data is inside the `data` property
        setIsLoading(false);
        console.log(
          '🚀 ~ handleGetProfile ~ response?.data?.data:',
          response?.data?.data,
        );
      }
    } catch (error) {
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
  useEffect(() => {
    handleGetProfile();
  }, []);

  const getUserPaymentDetails = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      console.log('🚀 ~ handleGetPaymentHistory ~ user_id:', user_id);
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_PAYMENT_HISTORY_BY_USER_ID}${user_id}`,
      );
      if (response.status === 200) {
        console.log(response.data);
        let categoryArray = response?.data.map(item => item.category);
        console.log(
          '🚀 ~ getUserPaymentDetails ~ categoryArray:',
          categoryArray,
        );
        if (categoryArray.length <= 0) {
          Alert.alert(`You haven't purchased any book bundle yet.`);
        } else {
          navigation.navigate('UserBooks', {
            categoryArray: categoryArray,
          });
        }

        // const isPurchased = response?.data?.some(
        //   item => item.category_id === category_data?.id,
        // );
        // setIsPurchased(isPurchased);
      }
    } catch (error) {
      console.log('🚀 ~ handleGetPaymentHistory ~ error:', error?.message);

      Snackbar.show({
        text: error.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // function getUserPaymentDetails(params: type) {

  // navigation.navigate('BookBundles');
  // }
  function handleEditProfile() {
    navigation.navigate('Profile');
  }
  function handleChat() {
    navigation.navigate('Chat');
  }
  function handlePaymentMethods() {
    Alert.alert('Under Development');
    // navigation.navigate('AnalogPaymentForm');
  }

  async function handleSignOut(params: type) {
    Alert.alert(
      'Just Checking!',
      `Hey there! It looks like you're trying to sign out. Are you sure you want to proceed?`,
      [
        {
          text: 'Yes, Sign Out',
          onPress: OnSignOutAlertOK,
        },
        {
          text: 'No, Stay Signed In',
        },
      ],
    );
  }
  async function handleAccountDelete(params: type) {
    Alert.alert(
      'Just Checking!',
      `Hey there! It looks like you're trying to delete account. Are you sure you want to proceed?`,
      [
        {
          text: 'Yes, Delete account',
          onPress: OnDeleteAccountAlertOk,
        },
        {
          text: 'Cancel',
        },
      ],
    );
  }
  const dispatch = useDispatch();
  let type = '';
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Replace with your actual state

  async function OnSignOutAlertOK() {
    try {
      // Configure Google Sign-In
      GoogleSignin.configure({
        webClientId:
          '723565053960-od53ug0qkd44176je7067hhijuqoie8v.apps.googleusercontent.com',
        offlineAccess: true,
      });

      // Get the login type from AsyncStorage
      const loginType = await AsyncStorage.getItem('loginType');
      console.log('🚀 ~ OnSignOutAlertOK ~ loginType:', loginType);

      // Perform logout based on login type
      if (loginType === 'google') {
        console.log('Google sign out');

        // Sign out from Google
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        console.log('Manual sign out');
      }

      // Dispatch logout action
      dispatch(logout());

      console.log('🚀 ~ OnSignOutAlertOK ~ inside logout:', loginType);

      // Optionally clear all AsyncStorage (commented out)
      // await AsyncStorage.clear();

      // Optionally navigate to the Login screen (commented out)
      // navigation.navigate('Login');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }
  async function OnDeleteAccountAlertOk() {
    console.log('🚀 ~ OnDeleteAccountAlertOk ~ Start:');
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);

      const response = await axios.delete(
        `${BASE_URL}${endpoints.DELETE_ACCOUNT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // Update AsyncStorage before dispatching logout

        setIsLoading(false);

        // Dispatch logout action after AsyncStorage update
        dispatch(logout());

        // Optionally clear AsyncStorage (commented out)
        // await AsyncStorage.clear();
      }
    } catch (error) {
      console.log(
        '🚀 ~ OnDeleteAccountAlertOk ~ error:',
        error?.response?.data?.message,
      );

      Snackbar.show({
        text:
          error?.response?.data?.message ||
          'Error deleting account. Please try again.',
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  }
  function handleSettings() {
    navigation.navigate('Settings');
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={FullBg}
        style={{height: hp(35), width: wp(100)}}
        resizeMode="cover"
        imageStyle={{
          borderBottomLeftRadius: fp(3),
          borderBottomRightRadius: fp(2),
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontFamily: typography.Inasnibc,
              fontSize: fp(2.4),
              letterSpacing: 0.4,
              marginTop: hp(3),
            }}>
            Profile
          </Text>

          {userProfile?.profile_image != null ? (
            <Image
              source={{uri: userProfile?.profile_image}}
              style={{
                height: fp(14),
                width: fp(14),
                borderRadius: fp(10),
                marginTop: hp(3),
              }}
            />
          ) : (
            <Image
              source={UserIcon}
              style={{
                height: fp(10),
                width: fp(10),
                // borderRadius: fp(10),
                marginTop: hp(3),
              }}
              resizeMode="contain"
            />
          )}
          <Text
            style={{
              color: 'white',
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(2.2),
              marginTop: hp(2),
            }}>
            {userProfile?.name}
          </Text>
        </View>
      </ImageBackground>
      <ScrollView contentContainerStyle={{paddingBottom: hp(2)}}>
        <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            marginTop: hp(2),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handleEditProfile}>
            <List.Item
              title="Edit Profile"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={EditProfile}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View>
        {/* <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handlePaymentMethods}>
            <List.Item
              title="Payment Methods"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={PaymentMethods}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View> */}
        {/* <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handleSettings}>
            <List.Item
              title="Settings"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={Settings}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View> */}
        <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handleChat}>
            <List.Item
              title="Help Center"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={Chat}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              // navigation.navigate('UserBooks')
              getUserPaymentDetails()
            }>
            <List.Item
              title="My Books"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={require('../../../../assets/images/MyBooks.png')}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>
          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View>

        <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={handleSignOut}>
            <List.Item
              title="Logout"
              titleStyle={{
                fontFamily: typography.Inter_Bold,
                color: 'black',
                fontSize: fp(1.8),
                justifyContent: 'center',
              }}
              left={props => (
                <Image
                  source={Logout}
                  style={{height: hp(6), width: fp(5)}}
                  resizeMode="contain"
                />
              )}
              right={props => (
                <Image
                  source={RightArrow}
                  style={{height: hp(3), width: fp(2), alignSelf: 'center'}}
                  resizeMode="contain"
                />
              )}
            />
          </TouchableOpacity>

          <View
            style={{
              height: fp(0.1),
              backgroundColor: 'rgba(0,0,0,0.05)',
              width: wp(82),
              alignSelf: 'center',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleAccountDelete}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <Text
            style={{color: '#D2042D', fontWeight: '600', fontSize: fp(1.6)}}>
            Request Account Delete
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({});
