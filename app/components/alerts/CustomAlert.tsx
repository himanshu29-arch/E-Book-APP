import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {color} from '../../constants/colors/colors';
import {fp, hp, wp} from '../../helpers/resDimension';

import CustomText from '../text/CustomText';
import ButtonComp from '../button/Button';
import {useIcon} from '../../assets/icons/useIcon';
import {PaymentAlertIllus} from '../../assets/images';
import LottieView from 'lottie-react-native';
import {isDisplayZoomed} from 'react-native-device-info';
const CustomAlert = ({
  btnTitle,
  title,
  subTitle,
  img,
  onPress,
  onClosePress,
  isImg,
}) => {
  const lottieRef = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current?.play();
    }
  }, [lottieRef.current]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.PRIMARY_COVER,
      }}>
      <View
        style={{
          backgroundColor: color.WHITE,
          // height: hp(45),
          padding: fp(2),
          borderRadius: fp(2),
          width: wp(85),
          alignItems: 'center',
        }}>
        {/* <View style={{flexDirection: 'row'}}> */}
        {isImg ? (
          <Pressable
            style={{position: 'absolute', top: hp(1), right: wp(2)}}
            onPress={onClosePress}>
            {useIcon.CloseIcon()}
          </Pressable>
        ) : null}

        {isImg ? (
          <Image
            source={img}
            resizeMode="cover"
            style={{height: fp(25), width: fp(25), marginTop: hp(2)}}
          />
        ) : (
          <LottieView
            ref={lottieRef}
            source={require('../../assets/lottie_animations/Animation_smallConfetti.json')}
            style={{
              width: '1000%',
              height: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}
            autoPlay={false}
            loop={false}
          />
        )}

        <View style={{marginTop: hp(2)}}>
          {title ? (
            <CustomText
              bold={true}
              style={{color: color.PRIMARY_BLUE, fontSize: fp(2)}}>
              {title}
            </CustomText>
          ) : null}

          <CustomText
            style={{
              fontSize: isImg ? fp(1.7) : fp(2),
              color: '#727272',
              width: wp(55),
              textAlign: 'center',
              marginTop: hp(0.2),
            }}>
            {subTitle}
          </CustomText>
        </View>

        <ButtonComp title={btnTitle} onPress={onPress} />
      </View>
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});
