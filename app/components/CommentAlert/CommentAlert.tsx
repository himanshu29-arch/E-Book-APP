import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {CommentAlertCheck, CommentAlertCross} from '../../assets/images';
import CustomText from '../text/CustomText';
import {typography} from '../../assets/fonts/typography';

const CommentAlert = ({handleClosePress}) => {
  return (
    <View
      style={{
        borderColor: '#ABE4BD',
        borderWidth: fp(0.1),
        width: wp(90),
        height: hp(5),
        backgroundColor: '#E7FFEC',
        alignSelf: 'center',
        borderRadius: fp(0.4),
        marginBottom: hp(2),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fp(2),
        alignItems: 'center',
        bottom: 0,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={CommentAlertCheck}
          style={{height: fp(3), width: fp(3)}}
          resizeMode="contain"
        />
        <CustomText
          type={'typeRegular'}
          style={{
            fontFamily: typography.Inter_Medium,
            fontSize: fp(1.6),
            color: '#319B51',
            marginLeft: wp(2),
            alignSelf: 'center',
          }}>
          Your comment successfully uploaded
        </CustomText>
      </View>

      <Pressable hitSlop={fp(2)} style={{}} onPress={handleClosePress}>
        <Image
          source={CommentAlertCross}
          style={{height: fp(2), width: fp(2)}}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default CommentAlert;

const styles = StyleSheet.create({});
