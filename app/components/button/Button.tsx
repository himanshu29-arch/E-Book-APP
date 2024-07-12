import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
import CustomText from '../text/CustomText';
import {typography} from '../../assets/fonts/typography';

const ButtonComp = ({
  title,
  onPress,
  fontSize = fp(1.8),
  marginTop = hp(2),
  padding = fp(1.6),
}) => {
  return (
    <Pressable
      style={{
        backgroundColor: color.PRIMARY_BLUE,
        // height: hp(5),
        // width: wp(30),
        padding: padding,
        borderRadius: fp(0.5),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: marginTop,
      }}
      onPress={onPress}>
      <CustomText
        type={'typeRegular'}
        style={{
          fontFamily: typography.Inter_Medium,
          fontSize: fontSize,
          color: color.WHITE,
        }}>
        {title}
      </CustomText>
    </Pressable>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({});
