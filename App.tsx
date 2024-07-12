import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AfterLoginStack from './app/components/navigators/AfterLoginStack';
import BeforeLoginStack from './app/components/navigators/BeforeLoginStack';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useSelector} from 'react-redux';
import {store} from './app/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyOrders from './app/screens/afterLogin/MyOrders/MyOrders';
import {MyDrawer} from './app/helpers/DrawerNavigation/DrawerNavigation';
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

  useEffect(() => {
    // Add a side-effect to log the current login state
    console.log('Login state changed:', isLoggedIn);
  }, [isLoggedIn]);

  return <RootNavigation isLoggedIn={isLoggedIn} />;
};
