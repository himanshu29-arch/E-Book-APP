import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CommentAttachment,
  DummyProfImg,
  SendComment,
} from '../../assets/images';
import {fp, hp, wp} from '../../helpers/resDimension';
import {EditProfile} from '../../assets/ProfileMenu';

const CommentInput = ({
  refInput,
  commentText,
  onChangeComment,
  handleSendComment,
  handleAddAttachment,
  uri,
  isLandscape,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={EditProfile}
        style={styles.profileImage}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        {uri && (
          <Image
            source={{uri: uri}}
            style={styles.attachmentImage}
            resizeMode="cover"
          />
        )}

        <TextInput
          placeholder="Leave the comment"
          placeholderTextColor="#878787"
          style={styles.input}
          value={commentText}
          onChangeText={onChangeComment}
          ref={refInput}
        />

        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={handleAddAttachment}>
          <Image
            source={CommentAttachment}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <Image
            source={SendComment}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: fp(6),
    width: fp(6),
    marginTop: hp(2),
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#F7F7F7',
    marginTop: fp(1.5),
    borderRadius: fp(2),
    marginLeft: wp(4),
    padding: fp(0.3),
    position: 'relative',
  },
  attachmentImage: {
    height: fp(10),
    width: fp(10),
    marginTop: hp(2),
    marginLeft: wp(4),
    borderRadius: fp(1),
  },
  input: {
    color: '#878787',
    width: wp(65),
    marginLeft: wp(4),
  },
  attachmentButton: {
    position: 'absolute',
    top: hp(2),
    right: wp(16),
  },
  sendButton: {
    position: 'absolute',
    top: hp(2),
    right: wp(6),
  },
  icon: {
    height: fp(2.5),
    width: fp(2.5),
  },
});

export default CommentInput;
