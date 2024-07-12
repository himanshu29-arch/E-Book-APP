import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {headerBg} from '../../../assets/images';
import {hp, wp} from '../../../helpers/resDimension';
import Header from '../../../components/header/Header';

const FullImageView = ({route, navigation}) => {
  function onLeftPress() {
    navigation.goBack();
  }
  const {imgRes} = route.params;
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={headerBg}
        style={{height: hp(10), width: wp(100), alignSelf: 'center'}}
        resizeMode="cover"
        imageStyle={
          {
            // borderBottomLeftRadius: fp(3),
            // borderBottomRightRadius: fp(2),
          }
        }>
        {/* <View style={{marginTop: hp(4)}}> */}
        <Header
          title={''}
          rightIcon={false}
          onPress={onLeftPress}
          leftIconName="leftArrow"
          // onRightPress={onRightPress}
        />

        {/* </View> */}
      </ImageBackground>
      <Image
        source={{uri: imgRes?.uri}}
        resizeMode="contain"
        style={{height: hp(90), width: wp(100)}}
      />
    </View>
  );
};

export default FullImageView;

const styles = StyleSheet.create({});
