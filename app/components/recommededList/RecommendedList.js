import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {fp, hp, wp} from '../../helpers/resDimension';
import {typography} from '../../assets/fonts/typography';
import {color} from '../../constants/colors/colors';
import {dummyRecommend} from '../../assets/images';

const RecommendedList = ({recommendData}) => {
  return (
    <View
      style={{
        height: hp(15),
        justifyContent: 'center',
      }}>
      <View style={{marginLeft: wp(4)}}>
        <Text
          style={{
            fontFamily: typography.Inter_SemiBold,
            color: color.DIM_BLACK,
            fontSize: fp(2),
          }}>
          Recommended for you
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: wp(1)}}>
        {recommendData.map(item => {
          return (
            <Pressable>
              <ImageBackground
                source={item}
                style={{
                  height: fp(14),
                  width: fp(15),
                  marginRight: -wp(2),
                }}></ImageBackground>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RecommendedList;

const styles = StyleSheet.create({});
