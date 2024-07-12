import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommentIcon, DislikeIcon, LikeIcon} from '../../assets/images';
import {fp, hp} from '../../helpers/resDimension';
import CustomText from '../text/CustomText';
import {typography} from '../../assets/fonts/typography';
import {color} from '../../constants/colors/colors';
import {useSelector} from 'react-redux';
import {selectLikeDislike} from '../../redux/likeSlice';
const DislikeButton = ({imgName, count, onPress}) => {
  const likeDislike = useSelector(selectLikeDislike);
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.likeContainer,
        {
          width: imgName == 'like' ? fp(10) : fp(14),
          borderColor: likeDislike.dislike ? color.RED : '#ECECEC',
          backgroundColor: likeDislike.dislike ? color.RED : 'white',
        },
      ]}>
      <Image
        source={
          imgName == 'like'
            ? LikeIcon
            : imgName == 'comment'
            ? CommentIcon
            : DislikeIcon
        }
        style={{
          height: fp(1.4),
          width: fp(1.4),
          tintColor: likeDislike.dislike ? 'white' : null,
        }}
        resizeMode="contain"
      />
      <CustomText
        type={'typeRegular'}
        style={[
          styles.likeText,
          {color: likeDislike.dislike ? 'white' : '#565555'},
        ]}>
        {imgName == 'like'
          ? 'Like'
          : imgName == 'comment'
          ? 'Comments'
          : 'Dislike'}
      </CustomText>
      <CustomText
        type={'typeRegular'}
        style={[
          styles.likeText,
          {color: likeDislike.dislike ? 'white' : '#565555'},
        ]}>
        {count}
      </CustomText>
    </Pressable>
  );
};

export default React.memo(DislikeButton);

const styles = StyleSheet.create({
  likeContainer: {
    borderWidth: fp(0.1),

    height: fp(4),

    marginTop: hp(1),
    borderRadius: fp(2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: fp(0.2),
  },
  likeText: {
    fontFamily: typography.Inter_Medium,
    fontSize: fp(1.4),
  },
});
