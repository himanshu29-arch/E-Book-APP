import {Image, Pressable, StatusBar, View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {color} from '../../../constants/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomText from '../../../components/text/CustomText';
import {otp_illustration} from '../../../assets/images/index';
import {OtpInput} from 'react-native-otp-entry';
import {typography} from '../../../assets/fonts/typography';
import {styles} from './styles';
import MainButton from '../../../components/button/MainButton';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {login} from '../../../redux/authSlice';
import Snackbar from 'react-native-snackbar';

const Otp = ({navigation, route}) => {
  const {phoneNo, email, previousRoute, name} = route.params;
  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 ~ handleResetPassword ~ email:', email);
      const response = await apiClient.post(endpoints.REQUEST_OTP, {
        email: email,
      });
      if (response.status === 200) {
        console.log(response?.data);

        Snackbar.show({
          text: response?.data?.message,
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('inside catch', error?.message);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    }
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState({});
  const [currentOtp, setCurrentOtp] = useState('');
  async function onAlertOK(params: type) {
    if (previousRoute == 'signup') {
      navigation.navigate('Login');
    } else if (previousRoute == 'forgetPass') {
      navigation?.navigate('ResetPass', {email: email, otp: currentOtp});
    } else {
      dispatch(
        login({
          userName: name,
          userEmail: email,
        }),
      );
      //    await AsyncStorage.setItem('loginType', 'mannual');
      // navigation?.navigate('Home');
    }
  }
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.post(`${endpoints.VERIFY_OTP}`, {
        email: email,
        otp: currentOtp,
      });
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        await AsyncStorage.setItem('isLogged', 'yes');
        console.log(response?.data);
        setRes(response.data);
        Alert.alert(
          'Information',
          `Otp Verified\n${
            previousRoute == 'signup'
              ? 'Sign up successful'
              : previousRoute == 'signup'
              ? 'Login successful'
              : 'Reset your password.'
          }`,
          [
            {
              text: 'Ok',
              onPress: onAlertOK,
              style: 'default',
            },
          ],
        );
        // console.log('🚀 ~ file: Flow.tsx:120 ~ Flow ~ token:', token);
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
  function handleResetPass() {
    navigation?.navigate('ResetPass', {email: email, otp: currentOtp});
  }
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.WHITE} barStyle="light-content" />
      <View style={styles.illustrationContainer}>
        <Image source={otp_illustration} style={styles.illustrationImg} />
      </View>
      <View style={styles.headingContainer}>
        <CustomText type={'heading'}>Verification Code</CustomText>
        <CustomText type={'textRegular'} style={{marginTop: fp(1)}}>
          Please type the verification code
        </CustomText>
        <CustomText type={'textRegular'}>
          send to{' '}
          <Text style={{fontFamily: typography?.Inter_Medium}}>{email}</Text>
        </CustomText>
      </View>
      <View style={{alignItems: 'center'}}>
        <OtpInput
          autoFocus
          numberOfDigits={4}
          focusColor="white"
          focusStickBlinkingDuration={500}
          onTextChange={text => console.log(text)}
          onFilled={text => setCurrentOtp(text)}
          theme={{
            // containerStyle: styles.container,
            containerStyle: {
              marginTop: hp(3),
              width: wp(90),
            },
            // inputsContainerStyle: styles.inputsContainer,
            inputsContainerStyle: {},
            // pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeContainerStyle: {
              height: hp(5),
              width: wp(14),
              borderRadius: fp(0.5),
              borderWidth: fp(0.1),
            },
            // pinCodeTextStyle: styles.pinCodeText,
            pinCodeTextStyle: {
              fontFamily: typography.Inter_SemiBold,
              color: color.WHITE,
            },
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <MainButton
          _onPress={
            previousRoute == 'forgetPass' ? handleResetPass : handleVerifyOtp
          }
          _title={
            previousRoute == 'forgetPass' ? 'Reset Password' : 'Verify Now '
          }
        />
      </View>
      <View style={styles.bottomText}>
        <CustomText
          type={'textRegular'}
          style={styles.underline}
          onPress={handleResendCode}>
          Resend Code
        </CustomText>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Otp;
