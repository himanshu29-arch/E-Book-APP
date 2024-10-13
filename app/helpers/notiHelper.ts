import messaging from '@react-native-firebase/messaging';
import {Alert, Linking} from 'react-native';
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {PermissionStatusType} from '../utils/notiUtils/NotiUtils';

// export async function checkAndUploadFCMPermission() {
//   const enabled = await messaging().hasPermission();
//   if (enabled === 1) {
//     // If permission is already granted, upload the FCM token
//     await uploadFcmToken();
//   } else {
//     const authStatus = await checkNotifications();
//     const permissionEnabled =
//       authStatus.status === PermissionStatusType.Granted ||
//       authStatus.status === PermissionStatusType.Limited;

//     if (permissionEnabled) {
//       // Request permission and upload the FCM token
//       await uploadFcmToken();
//     } else {
//       // If permission not granted, show alert to go to settings
//       showSettingsAlert();
//       return Promise.reject(new Error("Notification permission not granted"));
//     }
//   }
// }
export async function checkAndUploadFCMPermission() {
  const authStatus = await checkNotifications();
  const permissionEnabled =
    authStatus.status === PermissionStatusType.Granted ||
    authStatus.status === PermissionStatusType.Limited;

  if (permissionEnabled) {
    // Request permission and upload the FCM token
    await uploadFcmToken();
  } else {
    // If permission not granted, show alert to go to settings
    showSettingsAlert();
    return Promise.reject(new Error('Notification permission not granted'));
  }
}
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    uploadFcmToken();
  } else {
    showSettingsAlert();
  }
}

export const requestPermissionAndroid = async () => {
  console.log('request user permission andorid');
  const checkPermission = await checkNotificationPermission();
  console.log(
    '🚀 ~ requestPermissionAndroid ~ checkPermission:',
    checkPermission,
  );

  if (checkPermission !== RESULTS.GRANTED) {
    const request = await requestNotificationPermissionAndroid();
    if (request !== RESULTS.GRANTED) {
      // permission not granted
      showSettingsAlert();
    } else {
      console.log('notification permission granted');
      uploadFcmToken();
    }
  } else {
    uploadFcmToken();
  }
};
const requestNotificationPermissionAndroid = async () => {
  const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

const checkNotificationPermission = async () => {
  const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return result;
};

const showSettingsAlert = () => {
  Alert.alert('Please allow notification permission from settings.');
};

export const uploadFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmtoken', fcmToken);
    }
  } catch (error) {
    console.error('Failed to upload FCM token:', error);
    return null;
  }
};

const handleRequestNotificationAction = (elementName: string) => {
  if (elementName == 'setting') {
    Linking.openSettings();
  }
};

export const requestNotificationPermission = async () => {
  const {status} = await requestNotifications(['alert', 'sound']);
  return (
    status === PermissionStatusType.Granted ||
    status === PermissionStatusType.Limited
  );
};

export const NotificationListener = () => {
  PushNotification.createChannel(
    {
      channelId: 'specialid', // (required)
      channelName: 'Special messasge', // (required)
      channelDescription: 'Notification for special message', // (optional) default: undefined.
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  messaging().onNotificationOpenedApp(remoteMessage => {});
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });
  messaging().onMessage(async remotemessage => {
    console.log('🚀 ~ messaging ~ remotemessage: onMessage', remotemessage);
    // hitLocalNoti(remotemessage);
    PushNotification.localNotification({
      title: remotemessage.notification.title,
      message: remotemessage.notification.body,
      channelId: 'specialid',
    });
    // navigate("Notifications");
  });
  messaging().onNotificationOpenedApp(remotemessage => {
    console.log(
      '🚀 ~ messaging ~ remotemessage: onNotificationOpenedApp',
      remotemessage,
    );
    PushNotification.localNotification({
      title: remotemessage.notification.title,
      message: remotemessage.notification.body,
      channelId: 'specialid',
    });
    // navigate("Notifications");
  });
};

const hitLocalNoti = remoteMessage => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      console.log(
        'you pressed on the local notification',
        'remoteMessage:' + remoteMessage.data.payload,
      );

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};
