import {Platform, StyleSheet} from 'react-native';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
import {typography} from '../../assets/fonts/typography';

export const styles = StyleSheet.create({
  wrapper: {
    height: Platform.OS === 'ios' ? hp(12) : hp(7),
    width: wp(100),
    marginTop: hp(3),
    // flex: 1,
    // position: 'absolute',
  },
  innerWrapper: {
    marginHorizontal: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? hp(7) : hp(2),
  },
  placeHolderView: {width: wp(7.2), height: wp(7.2)},
  heading: {
    color: color.WHITE,
    fontSize: fp(2.2),
    // marginLeft: Platform.OS === 'ios' ? wp(15) : wp(30),
  },
  iconWidth: {
    width: wp(7.2),
  },
  headerBackgroundColor: {
    backgroundColor: 'transparent',
  },
});
