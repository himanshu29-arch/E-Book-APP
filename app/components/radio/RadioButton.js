import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp, wp} from '../../helpers/resDimension';
import {typography} from '../../assets/fonts/typography';
import {color} from '../../constants/colors/colors';
import {RadioButton} from 'react-native-paper';

const CRadioButton = ({text, RBcolor, RBvalue, RBstatus, RBonPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(90),
      }}>
      <Text
        style={{
          color: color.DIM_BLACK,
          fontFamily: typography.Inter_Regular,
          fontSize: fp(1.7),
        }}>
        {text}
      </Text>
      <RadioButton
        value={RBvalue}
        status={RBstatus}
        onPress={RBonPress}
        color={RBcolor}
      />
    </View>
  );
};

export default CRadioButton;

const styles = StyleSheet.create({});
