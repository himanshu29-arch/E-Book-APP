import {StyleSheet} from 'react-native';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.PRIMARY_BLUE,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: fp(0.3),
    marginHorizontal: wp(6),
    marginTop: hp(3.5),
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: wp(1),
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2.5),
  },
  illustrationContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: fp(4),
    width: wp(100),
    alignItems: 'center',
    height: hp(40),
    borderBottomRightRadius: fp(4),
  },
  forgotTextContainer: {
    alignItems: 'flex-end',
    marginRight: wp(6),
    marginTop: hp(1),
  },
  headingContainer: {marginLeft: wp(6), marginTop: hp(6)},
  illustrationImg: {height: fp(30), width: fp(40), marginTop: hp(3)},
  underline: {textDecorationLine: 'underline'},
  btnContainer: {alignItems: 'center', marginTop: hp(6)},
});
