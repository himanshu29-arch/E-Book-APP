import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
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
import {
  getUniqueId,
  getManufacturer,
  getAndroidId,
} from 'react-native-device-info';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import {regex} from '../../../constants/regex';
import ErrorMsg from '../../../components/errorMsg/ErrorMsg';
import {useIcon} from '../../../assets/icons/useIcon';
import {loadString, saveString} from '../../../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import DrawerIcons from '../../../assets/DrawerAssets';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../../../redux/authSlice';

const Login = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [androidDeviceId, setAndroidDeviceId] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);

  const [res, setRes] = useState({});

  const getRememberMeCredential = async () => {
    setIsLoading(true);
    const email = await loadString('email_for_remember_me');
    console.log('🚀 ~ getRememberMeCredential ~ email:', email);
    const password = await loadString('password_for_remember_me');
    if (email != undefined || email != null) {
      setCheckboxState(true);
      setEmail(email);
      setPassword(password);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getRememberMeCredential();
  }, []);

  useEffect(() => {
    getAndroidDeviceId();
  }, []);

  const getAndroidDeviceId = () => {
    getAndroidId().then(androidId => {
      setAndroidDeviceId(androidId);
    });
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

  const handleEmail = (text: React.SetStateAction<string>) => {
    const trimmedText = text.trim().replace(/\s/g, '');
    setEmail(trimmedText);
    setEmailErrorMsg(
      trimmedText === ''
        ? 'Username is required'
        : !regex.EMAIL.test(trimmedText)
        ? 'Username is invalid'
        : '',
    );
  };

  const handlePassword = (text: React.SetStateAction<string>) => {
    setPassword(text);
    validatePassword(text);
  };
  const handleSignUp = () => navigation.navigate('SignUp');

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
  const dispatch = useDispatch();
  async function onAlertOK(data) {
    console.log('🚀 ~ onAlertOK ~ data:', data);
  }
  function onOtpOkPress(response) {
    navigation.navigate('Otp', {
      phoneNo: response.data.data.mobile_number,
      email: response.data.data.email,
      name: response.data.data.name,
      previousRoute: 'login',
    });
  }
  const handleLogin = async () => {
    try {
      if (checkboxState === true) {
        saveString('email_for_remember_me', email);
        saveString('password_for_remember_me', password);
      }
      setIsLoading(true);
      const response = await apiClient.post(`${endpoints.LOGIN}`, {
        email: email,
        password: password,
        device_id: androidDeviceId,
      });
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        setRes(response.data);
        await AsyncStorage.setItem('loginType', 'mannual');
        await AsyncStorage.setItem('token', response?.data?.token);
        await AsyncStorage.setItem(
          'user_id',
          response?.data?.data?.id.toString(),
        );
        if (response.data.data.otp == null) {
          Alert.alert('Information', `${response.data.message}`, [
            {
              text: 'Ok',
              // onPress: () => onAlertOK(response?.data?.data),
              onPress: () =>
                dispatch(
                  login({
                    userName: response?.data?.name,
                    userEmail: response?.data?.email,
                  }),
                ),
              style: 'default',
            },
          ]);
        } else {
          Alert.alert('Info', `Use ${response.data.data.otp} as your OTP`, [
            {
              text: 'OK',
              onPress: () => onOtpOkPress(response),
            },
          ]);
        }
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
  };

  const handleRememberMe = () => {
    setCheckboxState(!checkboxState);
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.illustrationContainer}>
          <Image source={login_illustration} style={styles.illustrationImg} />
        </View>
        <View style={styles.headingContainer}>
          <CustomText type={'heading'}>Sign in</CustomText>
          <CustomText type={'textRegular'}>
            Please sign in to continue.
          </CustomText>
        </View>
        <Input
          isLeftIcon={true}
          leftIconName="UserOutline"
          isRightIcon={false}
          rightIconName=""
          placeholder="Enter Username"
          onChangeText={handleEmail}
          value={email}
        />
        {emailErrorMsg && <ErrorMsg error={emailErrorMsg} />}
        <Input
          isLeftIcon={true}
          leftIconName="LockOutline"
          isRightIcon={true}
          rightIconName={'password'}
          placeholder="Password"
          onChangeText={handlePassword}
          value={password}
        />
        {passwordErrorMsg && <ErrorMsg error={passwordErrorMsg} />}
        <Pressable
          // hitSlop={fp(1.6)}
          onPress={() => navigation.navigate('ForgotPass')}
          style={styles.forgotTextContainer}>
          <CustomText type={'textRegular'}>Forgot Password?</CustomText>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(6),
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
          <MainButton _onPress={handleLogin} _title="Sign in" />
        </View>
        <View
          style={{alignSelf: 'center', marginTop: hp(2), flexDirection: 'row'}}>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(248, 248, 248, 0.3)',
              width: wp(28),
              alignSelf: 'center',
            }}
          />
          <Text style={styles.orText}>Or Sign in with</Text>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(248, 248, 248, 0.3)',
              width: wp(28),
              alignSelf: 'center',
            }}
          />
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
        {/* <Pressable onPress={onGoogleButtonPress}>
          <Image
            source={DrawerIcons.GoogleIcon}
            style={{
              height: fp(3),
              width: fp(3),
              alignSelf: 'center',
              marginTop: hp(2),
            }}
          />
        </Pressable> */}

        <View style={styles.bottomText}>
          <CustomText type={'textRegular'}>Don't have an account? </CustomText>
          <CustomText
            type={'textRegular'}
            style={styles.underline}
            onPress={handleSignUp}>
            Sign Up
          </CustomText>
        </View>
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
    </View>
  );
};

export default Login;
