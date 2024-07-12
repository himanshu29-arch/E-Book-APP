import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../../constants/colors/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/header/Header';
import {
  ClockIcon,
  CourseCoverImg,
  PlayButton,
  headerBg,
} from '../../../assets/images';
import {fp, hp, wp} from '../../../helpers/resDimension';
import CustomText from '../../../components/text/CustomText';
import {typography} from '../../../assets/fonts/typography';
import ButtonComp from '../../../components/button/Button';
import {Pressable} from 'react-native';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import Snackbar from 'react-native-snackbar';

const CourseDetails = ({navigation, route}) => {
  const {course_id} = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState(false);

  useEffect(() => {
    handleGetCourseDetail();
  }, []);

  const handleGetCourseDetail = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_COURSE_DETAILS}/${course_id}`,
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(
          response?.data?.course?.chapters,
          'response?.data course details ',
        );
        setCourseDetails(response?.data?.course);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('inside catch', error?.message);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setIsLoading(false);
    }
  };
  function handleChapterPlay(item) {
    navigation.navigate('ChapterVideo', {chapter_data: item});
  }
  const videoDetails = [{}, {}, {}, {}];
  const renderDetails = ({item, index}) => {
    console.log('🚀 ~ renderDetails ~ item:', item);
    return (
      <View
        style={{
          backgroundColor: '#EBEEF5',
          height: hp(10),
          width: wp(90),
          alignSelf: 'center',
          borderRadius: fp(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: hp(0.75),
        }}>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(2.5),
              color: '#41539C',
              padding: fp(3),
            }}>
            {index < 9 ? `0${index}` : `${index}`}
          </CustomText>
          <View style={{paddingTop: hp(1)}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                fontSize: fp(1.6),
                color: '#41539C',
                paddingVertical: hp(0.75),
              }}>
              {item?.title}
            </CustomText>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={ClockIcon}
                style={{
                  height: fp(1.5),
                  width: fp(1.5),
                  borderRadius: fp(1),
                  alignSelf: 'center',
                }}
              />
              <CustomText
                type={'textRegular'}
                style={{
                  fontFamily: typography.Inter_Medium,
                  fontSize: fp(1.5),
                  color: '#535353',
                  marginLeft: wp(1),
                }}>
                10 min
              </CustomText>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => handleChapterPlay(item)}
          style={{alignSelf: 'center', marginRight: hp(2)}}>
          <Image
            source={PlayButton}
            style={{
              height: fp(5),
              width: fp(5),
              borderRadius: fp(1),
            }}
          />
        </Pressable>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: color.WHITE}}>
      <Image
        source={headerBg}
        style={{height: hp(8), width: wp(100)}}
        resizeMode="cover"
      />
      <View style={{position: 'absolute'}}>
        <Header
          title={'COURSE DETAILS'}
          // font={'regular'}
          leftIconName={'Menu'}
        />
      </View>
      <KeyboardAwareScrollView>
        <View style={{paddingTop: hp(3), paddingHorizontal: hp(2.5)}}>
          <Image
            source={{uri: courseDetails?.cover_pic}}
            style={{
              height: hp(25),
              width: wp(90),
              borderRadius: fp(1),
              alignSelf: 'center',
            }}
          />
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(1.8),
              color: '#374C9F',
              marginVertical: hp(1),
            }}>
            {courseDetails?.title}
          </CustomText>
          <View
            style={{
              backgroundColor: '#E6E6E6',
              height: hp(0.2),
              width: wp(90),
            }}></View>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(1.5),
              color: '#535353',
              marginVertical: hp(1.2),
            }}>
            About This Course
          </CustomText>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_Regular,
              fontSize: fp(1.5),
              color: '#565656',
            }}>
            {courseDetails?.description}
          </CustomText>
          <View
            style={{
              backgroundColor: '#E6E6E6',
              height: hp(0.2),
              width: wp(90),
              marginVertical: hp(2),
            }}></View>

          <FlatList data={courseDetails?.chapters} renderItem={renderDetails} />
        </View>
        <View
          style={{
            backgroundColor: '#E6E6E6',
            height: hp(0.2),
            width: wp(100),
          }}></View>
      </KeyboardAwareScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: wp(100),
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: hp(10),
          alignContent: 'center',
          paddingHorizontal: wp(5),
        }}>
        <CustomText
          type={'textRegular'}
          style={{
            fontFamily: typography.Inter_SemiBold,
            fontSize: fp(3),
            color: '#364B9F',
            marginVertical: hp(1.2),
            alignSelf: 'center',
          }}>
          ৳ {courseDetails?.price}
        </CustomText>
        <Pressable
          style={{
            width: wp(32),
            height: hp(5),
            alignSelf: 'center',
            backgroundColor: '#364B9F',
            borderRadius: fp(1),
          }}>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.5),
              color: color.WHITE,
              marginVertical: hp(1.2),
              alignSelf: 'center',
            }}>
            Enroll Course
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});
