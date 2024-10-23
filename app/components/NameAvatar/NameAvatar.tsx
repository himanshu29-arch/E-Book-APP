import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../../constants/colors/colors';
import {typography} from '../../assets/fonts/typography';
import {fp} from '../../helpers/resDimension';

const NameAvatar = ({name}) => {
  // Function to get initials from a full name
  const getInitials = fullName => {
    if (!fullName) return '';

    const nameParts = fullName.trim().split(' '); // Split by space
    const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : '';
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1][0].toUpperCase()
        : '';

    return firstInitial + lastInitial;
  };

  return (
    <View style={styles.circle}>
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: fp(7),
    height: fp(7),
    borderRadius: fp(5), // Makes the view circular
    backgroundColor: color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#3D2D2D',
    fontSize: fp(3),
    fontFamily: typography.Inter_Medium,
  },
});

export default NameAvatar;
