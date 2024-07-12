import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
import {typography} from '../../assets/fonts/typography';

const ErrorMsg = props => {
  const {error} = props;
  return <Text style={styles.errorStyle}>{error}</Text>;
};

export default ErrorMsg;

const styles = StyleSheet.create({
  errorStyle: {
    // marginBottom: hp(1),
    marginBottom: -hp(0.6),
    color: color.RED,
    fontSize: fp(1.4),
    fontFamily: typography.Inter_Regular,
    opacity: 0.7,
    marginHorizontal: wp(6),
    marginTop: hp(0.3),
  },
});
