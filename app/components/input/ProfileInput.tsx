import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {fp, hp, wp} from '../../helpers/resDimension';
import {useIcon} from '../../assets/icons/useIcon';
import {useState} from 'react';
import {color} from '../../constants/colors/colors';
import {Text} from 'react-native-paper';
import {typography} from '../../assets/fonts/typography';
export const ProfileInput = ({
  onChangeText = (text: string) => console.log(text),
  isLeftIcon = false,
  leftIconName = '',
  isRightIcon = false,
  rightIconName = '',
  placeholder = 'input',
  heading = 'heading',
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: -5,
          color: '#878787',
          fontFamily: typography.Inter_Regular,
        }}>
        {heading}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        onChangeText={onChangeText}
        secureTextEntry={passwordVisible}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomColor: color.GREY,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: fp(0.2),
    marginHorizontal: wp(6),
    marginTop: hp(3),
  },
  input: {
    flex: 1,
    color: '#434343',
    fontFamily: typography.Inter_SemiBold,
    // marginLeft: wp(1),
    marginBottom: -10,
  },
});
