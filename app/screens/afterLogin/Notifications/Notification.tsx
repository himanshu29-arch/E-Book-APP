import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp} from '../../../helpers/resDimension';
import {color} from '../../../constants/colors/colors';

const Notification = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: fp(3), color: color.PRIMARY_BLUE}}>
        Notification
      </Text>
      <Text style={{fontSize: fp(3), color: color.PRIMARY_BLUE}}>
        Under Development
      </Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
