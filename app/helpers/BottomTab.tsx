import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useIcon} from '../assets/icons/useIcon';
import {fp, hp} from './resDimension';
import {color} from '../constants/colors/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  books,
  booksActive,
  chatIcon,
  chatIconActive,
  courses,
  coursesActive,
  dashboard,
  dashboardActive,
  profile,
  profileActive,
} from '../assets/images';
import Books from '../screens/afterLogin/Books/Books';
import Home from '../screens/afterLogin/Home/Home';
import Courses from '../screens/afterLogin/Courses/Courses';
import Profile from '../screens/afterLogin/Profile/Profile';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import ProfileMenu from '../screens/afterLogin/Profile/ProfileMenu/ProfileMenu';
import BookBundles from '../screens/afterLogin/Books/BookBundles';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if (routeName === 'Home') {
      return true;
    }

    return false;
  };
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f5610a',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: {height: hp(7)},
        tabBarLabelStyle: {
          fontSize: fp(1.3),
          color: color.PRIMARY_BLUE,
          paddingBottom: hp(1),
        },
        tabBarIcon: ({focused}) => {
          let iconSource;

          // Determine which icon to show based on the route name
          if (route.name === 'Home') {
            iconSource = focused ? dashboardActive : dashboard; // Change the icon based on focus
          } else if (route.name === 'BookBundles') {
            iconSource = focused ? booksActive : books;
          } else if (route.name === 'Courses') {
            iconSource = focused ? coursesActive : courses;
          } else if (route.name === 'ProfileMenu') {
            iconSource = focused ? profileActive : profile;
            // } else if (route.name === 'Chat') {
            //   iconSource = focused ? chatIconActive : chatIcon;
          }

          // Return the icon component

          return (
            <Image
              source={iconSource}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: ({focused}) => {
          let labelStyle = {color: '#555'};

          // Change label color based on focus
          if (focused) {
            labelStyle.color = color.PRIMARY_BLUE;
          }

          // Return the label component
          return (
            <Text
              style={[{fontSize: fp(1.4), paddingBottom: hp(1)}, labelStyle]}>
              {route.name == 'ProfileMenu'
                ? 'Me'
                : route.name == 'BookBundles'
                ? 'Books'
                : route.name}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BookBundles"
        component={BookBundles}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileMenu"
        component={ProfileMenu}
        options={{
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  footerIcons: {width: 24, height: 24},
});
