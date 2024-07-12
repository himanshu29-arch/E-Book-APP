import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/beforeLogin/login/Login';
import SignUp from '../../screens/beforeLogin/signUp/SignUp';
import Otp from '../../screens/beforeLogin/otp/Otp';
import ForgotPass from '../../screens/beforeLogin/forgotPass/forgotPass';
import AfterLoginStack from './AfterLoginStack';
import ResetPass from '../../screens/beforeLogin/resetPass/ResetPass';

const Stack = createStackNavigator();
const BeforeLoginStack = route => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPass"
        component={ResetPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AfterLoginStack"
        component={AfterLoginStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default BeforeLoginStack;
