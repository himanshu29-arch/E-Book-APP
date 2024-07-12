import {StyleSheet} from 'react-native';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.PRIMARY_BLUE,
  },
  illustrationContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: fp(4),
    width: wp(100),
    alignItems: 'center',
    height: hp(40),
    borderBottomRightRadius: fp(4),
  },
  illustrationImg: {height: fp(30), width: fp(40), marginTop: hp(3)},
  headingContainer: {marginLeft: wp(6), marginTop: hp(6)},
  btnContainer: {alignItems: 'center', marginTop: hp(6)},
});
