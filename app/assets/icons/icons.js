import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Icon = props => {
  const {type, name, style, size, color, onPress} = props;

  const getIcon = () => {
    let retElement = <View />;
    switch (type) {
      case 'AntDesign':
        retElement = (
          <AntDesign
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Entypo':
        retElement = (
          <Entypo
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'EvilIcons':
        retElement = (
          <EvilIcons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Feather':
        retElement = (
          <Feather
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'FontAwesome':
        retElement = (
          <FontAwesome
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'FontAwesome5':
        retElement = (
          <FontAwesome5
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Fontisto':
        retElement = (
          <Fontisto
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Foundation':
        retElement = (
          <Foundation
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Ionicons':
        retElement = (
          <Ionicons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'MaterialIcons':
        retElement = (
          <MaterialIcons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'MaterialCommunityIcons':
        retElement = (
          <MaterialCommunityIcons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Octicons':
        retElement = (
          <Octicons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'Zocial':
        retElement = (
          <Zocial
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
      case 'SimpleLineIcons':
        retElement = (
          <SimpleLineIcons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;

      default:
        retElement = (
          <MaterialIcons
            name={name}
            size={size}
            style={style}
            color={color}
            onPress={onPress}
          />
        );
        break;
    }
    return retElement;
  };

  return getIcon();
};

export default Icon;
