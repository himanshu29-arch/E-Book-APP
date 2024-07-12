import {Platform} from 'react-native';
import {hp} from '../helpers/resDimension';

export const keyboardProps = Platform.select({
  android: {
    extraScrollHeight: hp(45),
    enableOnAndroid: true,
    keyboardVerticalOffset: 0,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flexGrow: 1,
    },
  },
  ios: {
    enableAutomaticScroll: true,
    extraScrollHeight: hp(0),
    contentContainerStyle: {},
  },
});
