import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {fp, hp, wp} from '../../helpers/resDimension';
import {useIcon} from '../../assets/icons/useIcon';
import {useState} from 'react';
export const Input = ({
  onChangeText = (text: string) => console.log(text),
  isLeftIcon = false,
  leftIconName = '',
  isRightIcon = false,
  rightIconName = '',
  placeholder = 'input',
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {isLeftIcon && (
        <View style={{marginLeft: wp(2)}}>
          {leftIconName == 'UserOutline'
            ? useIcon.UserOutline()
            : leftIconName == 'LockOutline'
            ? useIcon.LockOutline()
            : leftIconName == 'phone'
            ? useIcon.Phone()
            : leftIconName == 'email'
            ? useIcon.Email()
            : null}
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="white"
        onChangeText={onChangeText}
        secureTextEntry={passwordVisible}
        {...props}
      />
      {isRightIcon && (
        <Pressable
          hitSlop={fp(2)}
          style={{marginRight: wp(2)}}
          onPress={() => setPasswordVisible(!passwordVisible)}>
          {rightIconName === 'password'
            ? passwordVisible
              ? useIcon.EyeOff()
              : useIcon.Eye()
            : null}
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: fp(0.3),
    marginHorizontal: wp(6),
    marginTop: hp(3.5),
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: wp(1),
  },
});
