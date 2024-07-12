import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {BASE_URL} from '../../../constants/storageKeys';
import Pdf from 'react-native-pdf';
import Header from '../../../components/header/Header';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {
  CameraIcon,
  DummyProfImg,
  User,
  UserIcon,
  headerBg,
} from '../../../assets/images';
import {ProfileInput} from '../../../components/input/ProfileInput';
import {typography} from '../../../assets/fonts/typography';
import ButtonComp from '../../../components/button/Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomText from '../../../components/text/CustomText';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {endpoints} from '../../../constants/colors/endpoints';
import {ImageAsset, ProfileData} from '../../../constants/types/profile';
import {apiClient} from '../../../helpers/apiClient';
import ImagePicker from 'react-native-image-crop-picker';
import {useFocusEffect} from '@react-navigation/native';
import {EditProfile} from '../../../assets/ProfileMenu';

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [imageResponse, setImageResponse] = useState<ImageAsset | {}>({});
  const [userProfile, setUserProfile] = useState({});
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function onNameChange(name: string) {
    setName(name);
  }
  function onPhoneChange(phone: string) {
    setPhone(phone);
  }
  function onAddressChange(address: string) {
    setAddress(address);
  }
  function onPasswordChange(password: string) {
    setPassword(password);
  }
  function onEmailChange(email: string) {
    setEmail(email);
  }
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      handleGetProfile();
    });

    // Clean up the listener on component unmount
    return () => {
      focusListener();
    };
  }, [navigation]);

  // useEffect(() => {

  // }, []);

  const handleOpenCamera = async () => {
    console.log('🚀 ~ handleOpenCamera ~ handleOpenCamera:');
    const isCameraPermitted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (isCameraPermitted) {
      try {
        await launchCamera(
          {
            mediaType: 'photo',
          },
          response => {
            console.log(response);
            setImageResponse(response?.assets[0]);
            if (response.didCancel) {
              Alert.alert('Information', 'Operation Cancelled');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              Alert.alert('Information', 'Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              Alert.alert('Information', 'Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              Alert.alert('Information', response.errorMessage);
              return;
            }
          },
        );
      } catch (error) {
        console.error('Error launching camera:', error);
      }
      setShowAddPhotoModal(false);
    }
  };

  const handleOpenGallery = async () => {
    const isStoragePermitted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your device storage to read files.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (isStoragePermitted) {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          setImageResponse(response?.assets[0]);
          if (response.didCancel) {
            Alert.alert('Information', 'Operation Cancelled');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            Alert.alert('Information', 'Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            Alert.alert('Information', 'Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            Alert.alert('Information', response.errorMessage);
            return;
          }
        },
      );
    }
    setShowAddPhotoModal(false);
  };

  function handleAddPhotoClick() {
    setShowAddPhotoModal(true);
  }

  const handleValidateProfile = () => {
    const errors: Partial<ProfileData> = {};
    console.log(name, email, phone, address);
    // Validate Name
    if (!name.trim()) {
      console.log('name empty');
      errors.name = 'Name is required';
    }

    // Validate Phone Number
    const phoneRegex = /^[0-9]{11}$/;
    if (!phone.trim()) {
      console.log('phone empty');
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.trim())) {
      console.log('phone invalid');
      errors.phone = 'Invalid phone number';
    }

    // Validate Password
    // if (!password.trim()) {
    //   console.log('pass empty');
    //   errors.password = 'Password is required';
    // } else if (password.trim().length < 6) {
    //   console.log('pass invalid');
    //   errors.password = 'Password must be at least 6 characters';
    // }
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      console.log('email empty');
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      console.log('email invlaid');
      errors.email = 'Invalid email address';
    }
    // Validate Address
    if (!address.trim()) {
      console.log('address empty');
      errors.address = 'Address is required';
    }

    return errors;
  };

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
        setName(response?.data?.data?.name);
        setEmail(response?.data?.data?.email);
        setPhone(response?.data?.data?.mobile_number);
        setAddress(
          response?.data?.data?.address ? response?.data?.data?.address : '',
        );
        setIsLoading(false);
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

  async function handleUpdateProfile() {
    const errors = handleValidateProfile();
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      if (Object.keys(imageResponse).length != 0) {
        formData.append('profile_image', {
          uri: imageResponse.uri,
          name: imageResponse.fileName,
          type: imageResponse.type,
        });
      }

      formData.append('name', name);
      formData.append('mobile_number', phone);
      formData.append('address', address);
      // formData.append('password', password);
      console.log(formData, 'formData');
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoading(true);
        const response = await axios.post(
          `${BASE_URL}${endpoints.UPDATE_PROFILE}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response?.status);
        if (response?.status === 200) {
          Snackbar.show({
            text: response?.data?.message,
            duration: 2000,
            backgroundColor: color.PRIMARY_BLUE,
          });
          navigation.goBack();
        }
      } catch (error) {
        console.log('🚀 ~ handleUpdateProfile ~ error:', error);
        Snackbar.show({
          text: response?.data?.message,
          duration: 2000,
          backgroundColor: color.RED,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log(errors);
      let errorMessage = '';
      for (let field in errors) {
        errorMessage += `${errors[field]}`;
      }
      Snackbar.show({
        text: errorMessage,
        backgroundColor: color.PRIMARY_BLUE,
      });
    }
  }
  function onLeftPress() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <ImageBackground
          source={headerBg}
          style={{height: hp(10), width: wp(100), alignSelf: 'center'}}
          resizeMode="cover"
          imageStyle={
            {
              // borderBottomLeftRadius: fp(3),
              // borderBottomRightRadius: fp(2),
            }
          }>
          {/* <View style={{marginTop: hp(4)}}> */}
          <Header
            title={'Edit Profile'}
            rightIcon={false}
            onPress={onLeftPress}
            leftIconName="leftArrow"
            // onRightPress={onRightPress}
          />

          {/* </View> */}
        </ImageBackground>
        <View
          style={{
            alignSelf: 'center',
            borderRadius: fp(10),
            marginTop: hp(4),
            // backgroundColor: 'grey',
          }}>
          <Pressable onPress={handleAddPhotoClick}>
            <Image
              source={CameraIcon}
              style={{
                height: fp(5),
                width: fp(5),
                position: 'absolute',
                right: -10,
              }}
            />
          </Pressable>

          {Object.keys(imageResponse).length > 0 ? (
            <Image
              source={{uri: imageResponse?.uri}}
              style={{
                height: fp(14),
                width: fp(14),
                zIndex: -1,
                borderRadius: fp(10),
              }}
            />
          ) : userProfile?.profile_image ? (
            <Image
              source={{uri: userProfile?.profile_image}}
              style={{
                height: fp(14),
                width: fp(14),
                zIndex: -1,
                borderRadius: fp(10),
              }}
            />
          ) : (
            <Image
              source={UserIcon}
              style={{
                height: fp(14),
                width: fp(10),
                zIndex: -1,
                // borderRadius: fp(10),
              }}
              resizeMode="contain"
              tintColor={color.PRIMARY_BLUE}
            />
          )}
        </View>

        <Text
          style={{
            color: '#434343',
            fontFamily: typography.Inter_SemiBold,
            fontSize: fp(2),
            marginHorizontal: wp(5.5),
            marginTop: hp(4),
          }}>
          Personal Information
        </Text>
        <View>
          <ProfileInput
            value={name}
            onChangeText={onNameChange}
            placeholder="Ali farhat"
            heading="Full Name"
          />
          <ProfileInput
            value={phone}
            onChangeText={onPhoneChange}
            placeholder="+880 125 125 2020"
            heading="Phone Number"
          />
          <ProfileInput
            value={email}
            onChangeText={onEmailChange}
            placeholder="AliFarhat@Sohojpora.com"
            heading="Email Address"
            keyboardType="email-address"
          />
          {/* <ProfileInput
            value={password}
            onChangeText={onPasswordChange}
            placeholder="*********"
            heading="Password"
          /> */}
          <ProfileInput
            value={address}
            onChangeText={onAddressChange}
            placeholder="Street Road, NSA"
            heading="Address"
          />
        </View>
        <View style={{width: wp(80), alignSelf: 'center', marginTop: hp(5)}}>
          <ButtonComp
            title="Update -->"
            fontSize={fp(2.4)}
            onPress={handleUpdateProfile}
          />
        </View>
      </ScrollView>

      {showAddPhotoModal ? (
        <Pressable
          onPress={() => setShowAddPhotoModal(false)}
          style={{
            position: 'absolute',
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(100),
            width: wp(100),
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              height: hp(28),
              width: wp(75),
              borderRadius: fp(2),
              position: 'absolute',
              backgroundColor: 'white',
              // bottom: 0,
              top: hp(20),
              marginHorizontal: wp(10),
              alignSelf: 'center',
              // left: 0,
              // right: 0,
            }}>
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Bold,
                fontSize: fp(2.2),
                color: color.PRIMARY_BLUE,
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Add Photo
            </CustomText>
            <View style={{borderTopWidth: fp(0.2), borderColor: color.GREY}} />
            <CustomText
              type={'typeRegular'}
              onPress={handleOpenCamera}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Camera
            </CustomText>
            <View style={{borderTopWidth: fp(0.1), borderColor: color.GREY}} />
            <CustomText
              onPress={handleOpenGallery}
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Gallery
            </CustomText>
            <View style={{borderTopWidth: fp(0.1), borderColor: color.GREY}} />
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Close
            </CustomText>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
