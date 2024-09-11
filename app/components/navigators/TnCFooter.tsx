/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {Linking} from 'react-native';
import {typography} from '../../assets/fonts/typography';

const TnCFooter = props => {
  const {bottom = hp(10), color = 'rgb(230, 230, 230)'} = props;
  return (
    <View
      style={{
        alignSelf: 'center',
        // position: 'absolute',
        marginTop: hp(2),
        // bottom: bottom,
      }}>
      <Text
        style={{
          fontFamily: typography?.Inter_Medium,
          textAlign: 'center',
          fontSize: fp(1.7),
          color: color,
          paddingBottom: hp(0.5),
        }}>
        By signing up you agree to SohojPora's
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          onPress={() =>
            Linking.openURL(
              'https://sohojporaprod.s3.ap-south-1.amazonaws.com/policy/htmlCode+(2).pdf',
            )
          }
          style={{
            fontFamily: typography?.Inter_Medium,
            color: color,
            fontSize: fp(1.7),
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          Terms of use
        </Text>
        <Text
          style={{
            fontFamily: typography?.Inter_Medium,
            marginHorizontal: wp(1),
            color: color,
            textAlign: 'center',
          }}>
          and
        </Text>
        <Text
          onPress={() => {
            Linking.openURL('https://sohojpora.com/home/privacy_policy');
          }}
          style={{
            fontFamily: typography?.Inter_Medium,
            fontSize: fp(1.7),
            color: color,
            textDecorationLine: 'underline',
          }}>
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default TnCFooter;
