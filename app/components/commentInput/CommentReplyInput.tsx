import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {DummyProfImg, SendComment} from '../../assets/images';
import {fp, hp, wp} from '../../helpers/resDimension';
import {Image} from 'react-native';
import {EditProfile} from '../../assets/ProfileMenu';

const CommentReplyInput = ({
  refReplyInput,
  commentText,
  onChangeComment,
  handleSendComment,
}) => {
  return (
    <View
      style={{
        marginLeft: wp(15),
        marginHorizontal: wp(3),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -hp(1),
        marginBottom: hp(1),
      }}>
      <Image
        source={EditProfile}
        style={{height: fp(3.6), width: fp(3.6), marginTop: hp(2)}}
        resizeMode="contain"
      />
      <View
        style={{
          width: wp(65),
          height: hp(4.5),
          backgroundColor: '#F7F7F7',
          // height: fp(5),
          marginTop: fp(1.5),
          borderRadius: fp(5),
          marginLeft: wp(4),
          //   padding: fp(0.2),
        }}>
        <TextInput
          placeholder="Leave the comment"
          placeholderTextColor="#878787"
          style={{
            color: '#878787',
            width: wp(50),
            height: hp(4.5),
            marginLeft: wp(2),
          }}
          value={commentText}
          onChangeText={onChangeComment}
          ref={refReplyInput}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: hp(2),
          position: 'absolute',
          right: wp(4),
          top: hp(0.6),
        }}
        onPress={handleSendComment}>
        <Image
          source={SendComment}
          style={{
            height: fp(2.2),
            width: fp(2.2),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CommentReplyInput);

const styles = StyleSheet.create({});
