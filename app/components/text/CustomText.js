import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {color} from '../../constants/colors/colors';
import {typography} from '../../assets/fonts/typography';
import {fp} from '../../helpers/resDimension';

const CustomText = ({
  type = '',
  bold = false,
  italic = false,
  style = {},
  ...props
}) => {
  return (
    <>
      <Text
        style={StyleSheet.flatten([getTextStyle(type, bold, italic), style])}
        {...props}
      />
    </>
  );
};
export default CustomText;
const getTextStyle = (type, bold, italic) => {
  let style = '';
  switch (type) {
    case 'heading':
      style = styles.textBold;
      break;
    case 'sub_heading':
      style = styles.textSemiBold;
      break;
    default:
      style = styles.textRegular;
  }
  if (bold) {
    style = {...style, fontWeight: 'bold'};
  }

  if (italic) {
    style = {...style, fontStyle: 'italic'};
  }
  return style;
};

const styles = StyleSheet.create({
  textRegular: {
    fontFamily: typography.Inter_Regular,
    color: color.DIM_WHITE,
    fontSize: fp(1.7),
  },
  textBold: {
    fontFamily: typography.Inter_Medium,
    color: color.WHITE,
    fontSize: fp(2.6),
  },
  textSemiBold: {
    fontFamily: typography.Inter_Regular,
    color: color.DIM_WHITE,
    fontSize: fp(1.6),
  },
});
