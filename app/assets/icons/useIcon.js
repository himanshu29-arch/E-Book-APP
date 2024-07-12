import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fp, hp, wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';
export const useIcon = {
  EyeOff: () => (
    <FeatherIcon
      name="eye-off"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  Eye: () => (
    <FeatherIcon
      name="eye"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  LockOutline: () => (
    <MaterialIcons
      name="lock-outline"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  UserOutline: () => (
    <FontAwesome5
      name="user"
      size={fp(2)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  ArrowRight: () => (
    <FontAwesome6
      name="arrow-right-long"
      size={fp(3)}
      color={color.PRIMARY_BLUE}
    />
  ),
  Phone: () => (
    <FeatherIcon
      name="phone"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  Email: () => (
    <Fontisto
      name="email"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  BlankCheckbox: () => (
    <MaterialCommunityIcons
      name="checkbox-blank-outline"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  FilledCheckbox: () => (
    <MaterialCommunityIcons
      name="checkbox-marked"
      size={fp(2.5)}
      color={color.WHITE}
      style={{marginRight: wp(2)}}
    />
  ),
  BlankCheckbox_black: () => (
    <MaterialCommunityIcons
      name="checkbox-blank-outline"
      size={fp(2.5)}
      color={'black'}
      style={{marginRight: wp(2)}}
    />
  ),
  FilledCheckbox_black: () => (
    <MaterialCommunityIcons
      name="checkbox-marked"
      size={fp(2.5)}
      color={'black'}
      style={{marginRight: wp(2)}}
    />
  ),
  Menu: () => (
    <Ionicons
      name="menu-outline"
      size={fp(3.2)}
      color={color.WHITE}
      // style={{marginRight: wp(2)}}
    />
  ),
  UserIcon: () => (
    <FontAwesome6 name="circle-user" size={fp(3.2)} color={color.WHITE} />
  ),
  CloseIcon: () => (
    <AntDesign name="closecircleo" size={fp(3.2)} color={color.PRIMARY_BLUE} />
  ),
  RightArrowShort: size => <AntDesign name="right" size={size} color="black" />,
  // RightArrowShort: (size) => (
  //   <AntDesign name="right" size={fp(3.4)} color="black" />
  // ),
  ArrowLeft: () => (
    <AntDesign name="arrowleft" size={fp(3.2)} color={color.WHITE} />
  ),
  SendIcon: () => (
    <Ionicons
      name="send"
      size={fp(3.2)}
      color={'#828282'}
      // style={{marginRight: wp(2)}}
    />
  ),
  ContentCopy: () => (
    <MaterialIcons name="content-copy" size={fp(3.2)} color={'#828282'} />
  ),
};
