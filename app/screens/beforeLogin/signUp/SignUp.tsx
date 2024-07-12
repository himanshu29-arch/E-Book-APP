import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {login_illustration} from '../../../assets/images';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {color} from '../../../constants/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MainButton from '../../../components/button/MainButton';
import {Input} from '../../../components/input/Input';
import CustomText from '../../../components/text/CustomText';
import {styles} from './styles';
import {getAndroidId} from 'react-native-device-info';
import {loadString, saveString} from '../../../storage/storage';
import axios from 'axios';
import {endpoints} from '../../../constants/colors/endpoints';
import {apiClient} from '../../../helpers/apiClient';
import ErrorMsg from '../../../components/errorMsg/ErrorMsg';
import {regex} from '../../../constants/regex';
import {useIcon} from '../../../assets/icons/useIcon';
import DrawerIcons from '../../../assets/DrawerAssets';
import Snackbar from 'react-native-snackbar';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../../redux/authSlice';
import TnCFooter from '../../../components/navigators/TnCFooter';

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState({});
  const [androidDeviceId, setAndroidDeviceId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [phomeNoErrorMsg, setPhomeNoErrorMsg] = useState('');
  const [confirmPassErrorMsg, setConfirmPassErrorMsg] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  useEffect(() => {
    getAndroidDeviceId();
  }, []);

  const getAndroidDeviceId = () => {
    getAndroidId().then(androidId => {
      setAndroidDeviceId(androidId);
      // androidId here
      // console.log('🚀 ~ getAndroidId ~ androidId:', typeof androidId);
    });
  };

  const handleUserName = (text: string) => {
    setUserName(text);
    // if (!/^[a-zA-Z]+$/g.test(text)) {
    //   setNameErrorMsg('Enter valid name');
    // }
  };
  // const handlePhoneNo = (text: string) => setPhoneNo(text);

  const handleEmail = (text: React.SetStateAction<string>) => {
    const trimmedText = text.trim().replace(/\s/g, '');
    setEmail(trimmedText);
    setEmailErrorMsg(
      trimmedText === ''
        ? 'Email is required'
        : !regex.EMAIL.test(trimmedText)
        ? 'Email is invalid'
        : '',
    );
  };
  const handlePhoneNo = (text: React.SetStateAction<string>) => {
    const trimmedText = text.trim().replace(/\s/g, '');
    setPhoneNo(trimmedText);
    setPhomeNoErrorMsg(
      trimmedText === ''
        ? 'Mobile number is required'
        : !regex.MOBILE.test(trimmedText)
        ? 'Mobile number is invalid'
        : '',
    );
  };
  const handlePassword = (text: React.SetStateAction<string>) => {
    setPassword(text);
    validatePassword(text);
  };
  const handleConfirmPassword = (text: string) => {
    if (text != password) {
      setConfirmPassErrorMsg('Confirm password should match password');
    } else {
      setConfirmPassErrorMsg('');
      setConfirmPassword(text);
    }
  };
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const validatePassword = password => {
    if (!password) {
      setPasswordErrorMsg('Password is required');
    } else if (password.length < 10) {
      setPasswordErrorMsg('Password should be atleast 10 characters long');
    } else if (!password.match(/[a-z]/)) {
      setPasswordErrorMsg(
        'Password should contain at least one lowercase letter',
      );
    } else if (!password.match(/[A-Z]/)) {
      setPasswordErrorMsg(
        'Password should contain at least one uppercase letter',
      );
    } else if (password.match(/\s/)) {
      setPasswordErrorMsg('Password should not contain any spaces');
    } else if (!password.match(/.*[!@#$%^&*(),.?":{}|<>].*/)) {
      setPasswordErrorMsg('Password should contain special characters');
    } else if (!password.match(/\d/)) {
      setPasswordErrorMsg('Password should contain atleast one number.');
    } else if (!password.match(regex.PASSWORD)) {
      setPasswordErrorMsg('Password is invalid');
    } else {
      setPasswordErrorMsg('');
    }
  };

  const handleSignUp = async () => {
    if (checkboxState === true) {
      saveString('email_for_remember_me', email);
      saveString('password_for_remember_me', password);
    }

    try {
      setIsLoading(true);
      const response = await apiClient.post(`${endpoints.SIGN_UP}`, {
        name: userName,
        email: email,
        mobile_number: phoneNo,
        password: confirmPassword,
        device_id: androidDeviceId,
      });
      // console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(response?.data, 'signUp Response');
        setRes(response.data);
        Alert.alert('Info', `${response.data.message}`, [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Otp', {
                email: email,
                phoneNo: phoneNo,
                previousRoute: 'signup',
              }),
          },
        ]);
      }
    } catch (error) {
      console.log('inside catch', error.message);
      // if (error.message == 'Request failed with status code 500') {
      Alert.alert(
        'Information',
        `${error?.response?.data?.errors?.email} \nPlease try again later`,
      );
      // Snackbar.show({
      //   text: error?.response?.data?.message,
      //   duration: 4000,
      //   backgroundColor: colors.RED,
      // });
      // }
    } finally {
      setIsLoading(false);
    }
  };
  const handleRememberMe = () => {
    setCheckboxState(!checkboxState);
  };
  async function userSignupWithGoogle(userId, email, name) {
    try {
      setIsLoading(true);
      console.log('🚀 ~ userSignupWithGoogle ~ name:', name);
      console.log('🚀 ~ userSignupWithGoogle ~ email:', email);
      console.log('🚀 ~ userSignupWithGoogle ~ userId:', userId);
      const response = await axios.post(
        'http://43.204.161.117/api/auth/google/callback',
        {
          google_id: userId,
          email: email,
          name: name,
        },
      );
      console.log('google login response', response?.data);
      if (response.status === 200) {
        console.log('google login response', response?.data);
        setRes(response.data);
        await AsyncStorage.setItem('loginType', 'google');
        await AsyncStorage.setItem('token', response?.data?.token);
        await AsyncStorage.setItem(
          'user_id',
          response?.data?.user?.id.toString(),
        );
        dispatch(
          login({
            userName: response?.data?.name,
            userEmail: response?.data?.email,
          }),
        );
      }
    } catch (error) {
      console.log('inside catch', error.message);
      // if (error.message == 'Request failed with status code 500') {
      Alert.alert('Information', `${error?.response?.data?.message}`);
      // Snackbar.show({
      //   text: error?.response?.data?.message,
      //   duration: 4000,
      //   backgroundColor: colors.RED,
      // });
      // }
    } finally {
      setIsLoading(false);
    }
  }
  const onGoogleButtonPress = async () => {
    console.log('🚀 ~ onGoogleButtonPress ~ onGoogleButtonPress:');
    GoogleSignin.configure({
      webClientId:
        '723565053960-od53ug0qkd44176je7067hhijuqoie8v.apps.googleusercontent.com',
      offlineAccess: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log('🚀 ~ onGoogleButtonPress ~ idToken:', idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const currentUser = auth().currentUser;
      if (currentUser) {
        console.log('User ID:', currentUser.uid);
        console.log('Email:', currentUser.email);
        console.log('Display Name:', currentUser.displayName);
        console.log('Profile Picture:', currentUser.photoURL);
        console.log('idToken:', idToken);
        userSignupWithGoogle(
          currentUser.uid,
          currentUser.email,
          currentUser.displayName,
        );
      } else {
        console.log('No user is currently signed in.');
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
        Snackbar.show({
          text: 'User cancelled the sign-in process',
          duration: 4000,
          backgroundColor: color.RED,
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in process is already in progress
        Snackbar.show({
          text: 'Sign-in process is already in progress',
          duration: 4000,
          backgroundColor: color.RED,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play Services not available or outdated
        Snackbar.show({
          text: 'Play Services not available or outdated',
          duration: 4000,
          backgroundColor: color.RED,
        });
      } else {
        // Other error occurred
        Snackbar.show({
          text: 'Other error occurred',
          duration: 4000,
          backgroundColor: color.RED,
        });
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.mainContainer}
      contentContainerStyle={{paddingBottom: hp(5)}}>
      <StatusBar backgroundColor={color.WHITE} barStyle="light-content" />
      <View style={styles.illustrationContainer}>
        <Image source={login_illustration} style={styles.illustrationImg} />
      </View>
      <View style={styles.headingContainer}>
        <CustomText type={'heading'}>Sign Up</CustomText>
        <CustomText type={'textRegular'}>Please Create New Account</CustomText>
      </View>
      <Input
        isLeftIcon={true}
        leftIconName="UserOutline"
        placeholder="Name"
        onChangeText={handleUserName}
      />
      {/* {nameErrorMsg && <ErrorMsg error={nameErrorMsg} />} */}

      <Input
        isLeftIcon={true}
        leftIconName="phone"
        placeholder="Phone Number"
        onChangeText={handlePhoneNo}
        keyboardType="number-pad"
      />
      {phomeNoErrorMsg && <ErrorMsg error={phomeNoErrorMsg} />}
      <Input
        isLeftIcon={true}
        leftIconName="email"
        placeholder="Email"
        onChangeText={handleEmail}
      />
      {emailErrorMsg && <ErrorMsg error={emailErrorMsg} />}
      <Input
        isLeftIcon={true}
        leftIconName="LockOutline"
        isRightIcon={true}
        rightIconName={'password'}
        placeholder="Password"
        onChangeText={handlePassword}
      />
      {passwordErrorMsg && <ErrorMsg error={passwordErrorMsg} />}
      <Input
        isLeftIcon={true}
        leftIconName="LockOutline"
        isRightIcon={true}
        rightIconName={'password'}
        placeholder="Confirm Password"
        onChangeText={handleConfirmPassword}
      />
      {confirmPassErrorMsg && <ErrorMsg error={confirmPassErrorMsg} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(6),
          marginTop: hp(2),
        }}>
        <Pressable
          onPress={() => {
            handleRememberMe();
          }}>
          {checkboxState ? useIcon.FilledCheckbox() : useIcon.BlankCheckbox()}
        </Pressable>

        <CustomText type={'textRegular'}>Remember me</CustomText>
      </View>
      <View style={styles.btnContainer}>
        <MainButton _onPress={handleSignUp} _title="Sign Up" />
      </View>
      <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
        {/* <Text style={styles.text}>Continue with Google</Text> */}
        <Image
          source={DrawerIcons.GoogleIcon}
          style={{
            height: fp(3.4),
            width: fp(3.4),
            alignSelf: 'center',
            // marginLeft: wp(2),
            // marginTop: hp(2),
          }}
        />
      </TouchableOpacity>

      <View style={styles.bottomText}>
        <CustomText type={'textRegular'}>Already have an account? </CustomText>
        <CustomText
          type={'textRegular'}
          style={styles.underline}
          onPress={handleLoginPress}>
          Login
        </CustomText>
      </View>
      <TnCFooter bottom={hp(1)} />
      {/* loading modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        onRequestClose={() => console.log('no close allowed')}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <ActivityIndicator size="large" color={color.WHITE} />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
