import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your search icon library
import {wp} from '../../helpers/resDimension';
import {color} from '../../constants/colors/colors';

const SearchTextInput = ({
  value,
  onChangeText,
  onSearch,
  elevation = 0,
  ...props
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        alignSelf: 'center',
        width: wp(90),
        elevation: elevation,
      }}>
      <TextInput
        style={{flex: 1, paddingVertical: 8, paddingRight: 30}} // Adjust padding as needed
        placeholder="Search..."
        placeholderTextColor={color.DIM_BLACK}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      <TouchableOpacity
        onPress={onSearch}
        style={{position: 'absolute', right: 10}}>
        <Icon name="search" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchTextInput;
