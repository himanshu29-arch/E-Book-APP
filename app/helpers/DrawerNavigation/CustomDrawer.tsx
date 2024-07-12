import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {typography} from '../../assets/fonts/typography';
import {color} from '../../constants/colors/colors';
import {fp, hp, wp} from '../resDimension';
import DrawerIcons from '../../assets/DrawerAssets';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function CustomDrawerContent({navigation}) {
  function handleDashboard(params: type) {
    navigation.navigate('Home');
  }
  function handleCourses(params: type) {
    navigation.navigate('Courses');
  }
  function handleProfile(params: type) {
    navigation.navigate('Profile');
  }
  function handleBooks(params: type) {
    navigation.navigate('Books');
  }
  function handleOrder(params: type) {
    navigation.navigate('MyOrders');
  }
  function handlePayment(params: type) {
    navigation.navigate('PaymentInfo');
  }
  function handleNotification(params: type) {
    navigation.navigate('Notification');
  }

  GoogleSignin.configure({
    webClientId:
      '723565053960-od53ug0qkd44176je7067hhijuqoie8v.apps.googleusercontent.com',
    offlineAccess: true,
  });
  async function OnSignOutAlertOK() {
    navigation.closeDrawer();
    const loginType = await AsyncStorage.getItem('loginType');
    if (loginType == 'google') {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } else {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    }
  }
  async function handleSignOut(params: type) {
    Alert.alert(
      'Just Checking!',
      `Hey there! It looks like you're trying to sign out. Are you sure you want to proceed?`,
      [
        {
          text: 'Yes, Sign Out',
          onPress: OnSignOutAlertOK,
        },
        {
          text: 'No, Stay Signed In',
        },
      ],
    );
  }

  return (
    <View>
      <Text
        style={[
          [styles.heading],
          {
            fontFamily: typography.Inasnibc,
          },
        ]}>
        SOHOJ PORA
      </Text>
      <View>
        <Item
          title="Dashboard"
          icon={DrawerIcons.DashboardIcon}
          onItemPress={handleDashboard}
        />
        <Item
          title="Courses"
          icon={DrawerIcons.CoursesIcon}
          onItemPress={handleCourses}
        />
        <Item
          title="Profile"
          icon={DrawerIcons.ProfileIcon}
          onItemPress={handleProfile}
        />
        <Item
          title="Books"
          icon={DrawerIcons.BooksIcon}
          onItemPress={handleBooks}
        />
        <Item
          title="Order History"
          icon={DrawerIcons.OrderHistoryIcon}
          onItemPress={handleOrder}
        />
        <Item
          title="Payment Information"
          icon={DrawerIcons.PaymentInfoIcon}
          onItemPress={handlePayment}
        />
        <Item
          title="Notification"
          icon={DrawerIcons.NotificationIcon}
          onItemPress={handleNotification}
        />
        <Item
          title="Sign Out"
          icon={DrawerIcons.SignOutIcon}
          onItemPress={handleSignOut}
        />
      </View>
    </View>
  );
}

function Item({title, icon, onItemPress}) {
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={{
        borderTopColor: '#E6E6E6',
        borderTopWidth: fp(0.08),
        flexDirection: 'row',
        marginTop: hp(2),
      }}>
      <Image
        source={icon}
        style={{
          height: fp(3),
          width: fp(3),
          marginLeft: wp(8),
          marginTop: hp(2),
        }}
        resizeMode="contain"
      />
      <Text
        style={[
          [styles.item],
          {
            fontFamily: typography.Inter_Medium,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: color.PRIMARY_BLUE,
    fontSize: fp(2.8),
    margin: fp(4),

    // marginLeft: Platform.OS === 'ios' ? hp(15) : hp(11),
  },
  item: {
    fontSize: fp(2),
    color: '#3D3D3D',
    marginLeft: wp(5),
    marginTop: hp(2),
  },
});
