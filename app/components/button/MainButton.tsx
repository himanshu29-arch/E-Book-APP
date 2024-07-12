/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {memo} from 'react';
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
import {typography} from '../../assets/fonts/typography';
import {useIcon} from '../../assets/icons/useIcon';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

const transparent = ['transparent', 'transparent'];
interface ButtonProps {
  _onPress?: VoidFunction;
  _fontSize?: number;
  _TextColor?: string;
  _title?: string;
  _borderColor?: string;
  _borderWidth?: number;
  _borderRadius?: number;
  _padding?: number;
  _bgColor?: string;
  _width?: number;
  _height?: number;
  _fontFamily?: string;
  _GradColorArray?: string[];
  _marginV?: number;
  _disabled?: boolean;
}

const defaultProps: ButtonProps = {
  _onPress: () => {
    console.log(defaultProps._title, 'pressed');
  },
  _fontSize: fp(2.3),
  _TextColor: color.PRIMARY_BLUE,
  _title: 'Button',
  _bgColor: color.WHITE,
  _width: wp(90),
  _height: hp(6),
  _GradColorArray: transparent,
  _borderRadius: fp(1),
  _fontFamily: typography.Inter_Medium,
  _disabled: false,
};
const Button: React.FC<ButtonProps> = ButtonProps => {
  // grab the props
  type ButtonProps = {
    _onPress: VoidFunction;
    _fontSize: number;
    _TextColor: string;
    _title: string;
    _borderColor: string;
    _borderWidth: number;
    _borderRadius: number;
    _padding: number;
    _bgColor: string;
    _width: number;
    _height: number;
    _fontFamily: string;
    _GradColorArray: string[];
    _marginV?: number;
    _disabled?: boolean;
  };

  return (
    <TouchableOpacity
      onPress={ButtonProps._onPress}
      disabled={ButtonProps._disabled}>
      <View
        style={{
          backgroundColor: ButtonProps._bgColor,
          borderRadius: ButtonProps._borderRadius,
          width: ButtonProps._width,
          height: ButtonProps._height,
          justifyContent: 'center',
          borderColor: ButtonProps._borderColor,
          borderWidth: ButtonProps._borderWidth,
          marginVertical: ButtonProps._marginV,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: ButtonProps._fontSize,
            color: ButtonProps._TextColor,
            fontFamily: ButtonProps._fontFamily,
            textAlign: 'center',
          }}>
          {ButtonProps._title}
        </Text>
        <View style={{marginLeft: wp(2)}}>{useIcon.ArrowRight()}</View>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = defaultProps;
// export default memo(Button)
export default memo(Button);
