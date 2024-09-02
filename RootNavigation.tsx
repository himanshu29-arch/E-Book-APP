// RootNavigator.js
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AfterLoginStack from './app/components/navigators/AfterLoginStack';
import BeforeLoginStack from './app/components/navigators/BeforeLoginStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigation = ({isLoggedIn}) => {
  console.log('🚀 ~ RootNavigation ~ isLoggedIn:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AfterLoginStack /> : <BeforeLoginStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
