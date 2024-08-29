import * as React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useSelector} from 'react-redux';
import {store} from './app/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';
import RootNavigation from './RootNavigation';
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait; // Lock the app to landscape orientation
    return () => {
      Orientation.unlockAllOrientations(); // Ensure orientation is unlocked when component unmounts
    };
  }, []);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
const AppContent = () => {
  // Assuming you have a logged-in state in your Redux store
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Replace with your actual state
  const [IS_USER, setIS_USER] = React.useState('no');
  useEffect(() => {
    const checkToken = async () => {
      // const TOKEN = await AsyncStorage.getItem('token');
      const isUserLoggedin = await AsyncStorage.getItem('isLoggedIn');
      console.log('🚀 ~ checkToken ~ isUserLoggedin:', isUserLoggedin);
      setIS_USER(isUserLoggedin);
    };

    checkToken();
    console.log('🚀 ~ RootNavigation ~ isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return <RootNavigation isLoggedIn={isLoggedIn} IS_USER={IS_USER} />;
};
