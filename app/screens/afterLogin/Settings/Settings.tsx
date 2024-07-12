import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Realm from 'realm';
import RNFS from 'react-native-fs';

// Define your schema
const FileSchema = {
  name: 'File',
  properties: {
    name: 'string',
    data: 'data',
  },
};
// Open Realm
async function openRealm() {
  return await Realm.open({schema: [FileSchema]});
}

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
