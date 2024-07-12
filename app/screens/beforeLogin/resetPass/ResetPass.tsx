import {Image, Pressable, StatusBar, View, Text} from 'react-native';
import React, {useState} from 'react';
import {fp, hp} from '../../../helpers/resDimension';
import {color} from '../../../constants/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MainButton from '../../../components/button/MainButton';
import {Input} from '../../../components/input/Input';
import CustomText from '../../../components/text/CustomText';
import {login_illustration} from '../../../assets/images/index';
import {styles} from './styles';
import {regex} from '../../../constants/regex';
import Snackbar from 'react-native-snackbar';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import ErrorMsg from '../../../components/errorMsg/ErrorMsg';

const ResetPass = ({route, navigation}) => {
  const {otp, email} = route.params || '';

  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 ~ handleResetPassword ~ email:', email);
      console.log('🚀 ~ handleResetPassword ~ otp:', otp);
      console.log('🚀 ~ handleResetPassword ~ pass:', confirmPassword);
      const response = await apiClient.post(endpoints.RESET_PASS, {
        email: email,
        otp: otp,
        password: confirmPassword,
      });
      if (response.status === 200) {
        console.log(response?.data);
        Snackbar.show({
          text: response?.data?.message,
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
        navigation.navigate('Login');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('catch', error);
      console.log('inside catch', error?.response?.data?.message);
      Snackbar.show({
        text: error?.response?.data?.message,
        duration: 4000,
        backgroundColor: color.RED,
      });
      // }
    }
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPassErrorMsg, setConfirmPassErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [password, setPassword] = useState('');
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
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.WHITE} barStyle="light-content" />
      <View style={styles.illustrationContainer}>
        <Image source={login_illustration} style={styles.illustrationImg} />
      </View>
      <View style={styles.headingContainer}>
        <CustomText type={'heading'}>Reset Password</CustomText>
        <CustomText type={'textRegular'} style={{marginTop: fp(1)}}>
          Please enter Password
        </CustomText>
      </View>
      <View>
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
      </View>
      <View style={styles.btnContainer}>
        <MainButton _onPress={handleResetPassword} _title="Reset Password" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPass;
