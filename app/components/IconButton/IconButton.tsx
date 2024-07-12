import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
import CustomText from '../text/CustomText';
import {typography} from '../../assets/fonts/typography';
import {Download, OpenBook, Update} from '../../assets/images';

const ButtonwIcon = ({
  title,
  onPress,
  fontSize = fp(1.8),
  marginTop = hp(2),
}) => {
  return (
    <Pressable
      style={{
        backgroundColor: color.PRIMARY_BLUE,
        // padding: fp(1.6),
        borderRadius: fp(1),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: marginTop,
        flexDirection: 'row',
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
      <Image
        source={
          title == 'Update'
            ? Update
            : title == 'Download'
            ? Download
            : title == 'Read Book'
            ? OpenBook
            : null
        }
        resizeMode="contain"
        style={{height: fp(2.2), width: fp(2.6), marginLeft: wp(2)}}
      />
    </Pressable>
  );
};

export default ButtonwIcon;

const styles = StyleSheet.create({});
