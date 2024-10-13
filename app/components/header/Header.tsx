import {
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';

import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {fp, hp} from '../../helpers/resDimension';
import {useIcon} from '../../assets/icons/useIcon';
import {typography} from '../../assets/fonts/typography';
import {useDispatch, useSelector} from 'react-redux';
import {setProfilePic} from '../../redux/authSlice';

const Header = props => {
  const navigation = useNavigation();
  const profilePic = useSelector(state => state.auth.profilePic);
  const dispatch = useDispatch();

  const changeProfilePic = () => {
    // Example: update with a new image from assets
    dispatch(setProfilePic(require('../../assets/images/BookCoverImg.png')));
  };
  // useEffect(() => {
  //   changeProfilePic();
  // }, []);

  console.log('🚀 ~ Header ~ profilePic:', profilePic);
  const {
    backgroundColor = styles.headerBackgroundColor.backgroundColor,
    onPress = () => navigation.goBack(),
    leftIcon = true,
    rightIcon = true,
    leftIconName = 'arrowleft',
    title = `Getting Started`,
    onRightPress,
    // marginLeft = Platform.OS === 'ios' ? hp(11) : hp(11),
    marginLeft = hp(11),
    font,
  } = props;
  return (
    <View style={[{backgroundColor: backgroundColor}, styles.wrapper]}>
      <View style={styles.innerWrapper}>
        {leftIcon ? (
          <Pressable onPress={onPress} hitSlop={fp(3)}>
            {leftIconName == 'leftArrow' ? useIcon.ArrowLeft() : useIcon.Menu()}
          </Pressable>
        ) : (
          <View style={styles.placeHolderView} />
        )}
        <Text
          style={[
            [styles.heading],
            {
              fontFamily:
                font === 'regular'
                  ? typography.Inter_SemiBold
                  : typography.Inasnibc,
            },
          ]}>
          {title}
        </Text>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            {/* {profilePic == '' ? ( */}
            {/* // useIcon.UserIcon() */}
            {/* // ) : ( */}
            <Image
              source={{uri: profilePic}}
              style={{height: fp(4), width: fp(4), borderRadius: fp(4)}}
            />
            {/* // )} */}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeHolderView} />
        )}
      </View>
    </View>
  );
};

export default Header;
