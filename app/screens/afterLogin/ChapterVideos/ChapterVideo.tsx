import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import VideoPlayerEx from '../../../components/VideoPlayer/VideoPlayer';
import CustomText from '../../../components/text/CustomText';
import {typography} from '../../../assets/fonts/typography';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {color} from '../../../constants/colors/colors';
const ChapterVideo = ({route}) => {
  const {chapter_data} = route?.params;
  console.log('🚀 ~ ChapterVideo ~ chapter_data:', chapter_data);

  const [IsLandscape, setIsLandscape] = useState(false);
  const handleIsLandscapeCb = (params: type) => {
    console.log('🚀 ~ handleIsLandscapeCb ~ params:', params);
    setIsLandscape(params);
  };
  return (
    <View>
      <VideoPlayerEx
        uri={chapter_data?.video_url}
        handleIsLandscapeCb={handleIsLandscapeCb}
      />
      <CustomText
        type={'textRegular'}
        style={{
          fontFamily: typography.Inter_Bold,
          fontSize: fp(2.8),
          color: '#374C9F',
          marginTop: hp(1),
          marginHorizontal: wp(2),
        }}>
        {chapter_data?.title}
      </CustomText>
      {/* <CustomText
        type={'textRegular'}
        style={{
          fontFamily: typography.Inter_SemiBold,
          fontSize: fp(1.8),
          color: color.PRIMARY_COVER,
          marginVertical: hp(0.5),
          marginHorizontal: wp(2),
        }}>
        {chapter_data?.description}
      </CustomText> */}
    </View>
  );
};

export default ChapterVideo;

const styles = StyleSheet.create({});
