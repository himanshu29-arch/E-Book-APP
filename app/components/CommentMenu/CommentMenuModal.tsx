import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {CommentDeleteIcon, CommentEditIcon} from '../../assets/images';
import CustomText from '../text/CustomText';
import {typography} from '../../assets/fonts/typography';

const CommentMenuModal = ({handleCommentEdit, handleCommentDelete}) => {
  return (
    <View
      style={{
        position: 'absolute',
        // height: hp(4),
        width: wp(30),
        backgroundColor: '#ffffff',
        // marginLeft: wp(10),
        elevation: 2,
        borderRadius: fp(1),
        right: 20,
        top: 20,
        zIndex: 10,
        // padding: fp(1),
      }}>
      <Pressable
        onPress={handleCommentEdit}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          width: wp(30),
          height: hp(4),
        }}>
        <Image
          source={CommentEditIcon}
          style={{
            height: fp(1.4),
            width: fp(1.4),
            marginLeft: wp(2),
          }}
        />
        <CustomText
          type={'typeRegular'}
          style={{
            fontFamily: typography.Inter_Medium,
            fontSize: fp(1.4),
            color: '#565555',
          }}>
          {'   '}Edit
        </CustomText>
      </Pressable>
      <View
        style={{
          borderTopColor: '#F2F2F2',
          borderTopWidth: fp(0.2),
          width: '100%',
        }}
      />
      <Pressable
        onPress={handleCommentDelete}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          width: wp(30),
          height: hp(4),
        }}>
        <Image
          source={CommentDeleteIcon}
          style={{
            height: fp(1.4),
            width: fp(1.4),
            marginLeft: wp(2),
          }}
          resizeMode="contain"
        />
        <CustomText
          type={'typeRegular'}
          style={{
            fontFamily: typography.Inter_Medium,
            fontSize: fp(1.4),
            color: '#565555',
          }}>
          {'   '}Delete
        </CustomText>
      </Pressable>
    </View>
  );
};

export default React.memo(CommentMenuModal);

const styles = StyleSheet.create({});
