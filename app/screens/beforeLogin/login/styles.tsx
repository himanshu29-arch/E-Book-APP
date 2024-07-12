import {StyleSheet} from 'react-native';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {typography} from '../../../assets/fonts/typography';

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
    marginTop: hp(1),
  },
  illustrationContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: fp(4),
    width: wp(100),
    alignItems: 'center',
    // height: hp(30),
    borderBottomRightRadius: fp(4),
  },
  forgotTextContainer: {
    alignItems: 'flex-end',
    marginRight: wp(6),
    marginTop: hp(1),
  },
  headingContainer: {marginLeft: wp(6), marginTop: hp(2)},
  illustrationImg: {height: fp(30), width: fp(40), marginTop: hp(0)},
  underline: {textDecorationLine: 'underline'},
  btnContainer: {alignItems: 'center', marginTop: hp(4)},
  button: {
    backgroundColor: 'transparent',
    paddingLeft: wp(12),
    paddingRight: wp(12),
    paddingTop: wp(3),
    paddingBottom: wp(3),
    borderRadius: 5,
    borderColor: 'rgba(248,248,248,0.3)',
    borderWidth: 2,
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  text: {
    fontFamily: typography.Inter_Bold,
    color: color.PRIMARY_BLUE,
    fontSize: 16,
  },
  orText: {
    fontFamily: typography.Inter_Regular,
    color: color.DIM_WHITE,
    fontSize: 12,
    marginHorizontal: 15,
  },
});
