import * as React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from './app/redux/Store';
import Orientation from 'react-native-orientation-locker';
import RootNavigation from './RootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Appearance} from 'react-native';

export default function App() {
  useEffect(() => {
    Appearance.setColorScheme('light');
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
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
const AppContent = () => {
  // Assuming you have a logged-in state in your Redux store
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Replace with your actual state
  console.log('🚀 ~ AppContent ~ isLoggedIn:', isLoggedIn);

  useEffect(() => {}, [isLoggedIn]);

  return <RootNavigation isLoggedIn={isLoggedIn} />;
};
