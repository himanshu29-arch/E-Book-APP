import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {Pressable} from 'react-native';
import CustomText from '../../../components/text/CustomText';
import {typography} from '../../../assets/fonts/typography';
import SearchTextInput from '../../../components/searchTextInput/SearchTextInput';
import {CourseCoverImg, headerBg} from '../../../assets/images';
import Header from '../../../components/header/Header';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import Snackbar from 'react-native-snackbar';

const Courses = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const courseDetails = [{}, {}];

  const handleSearch = () => {
    // Perform search functionality here
    console.log('Searching for:', searchText);
  };

  useEffect(() => {
    handleGetCourses();
  }, []);

  const handleGetCourses = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`${endpoints.GET_COURSES}`);
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        setCourses(response?.data?.courses);
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

  const renderCourses = ({item}) => {
    console.log('🚀 ~ renderCourses ~ item:', item.name);
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('CourseDetails', {course_id: item?.id});
        }}>
        <View
          style={{
            backgroundColor: color.WHITE,
            height: hp(24),
            width: wp(48),
            borderRadius: fp(1),
            marginRight: wp(3),
          }}>
          <Image
            source={{uri: item?.cover_pic}}
            style={{
              height: hp(15),
              width: wp(48),
              borderRadius: fp(1),
              alignSelf: 'center',
            }}
            resizeMode="cover"
          />
          <View style={{marginLeft: wp(1)}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.6),
                color: '#333333',
                marginTop: hp(0.5),
              }}>
              {item?.title}
            </CustomText>
            {/* {showAuthor && ( */}
            {/* <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                color: '#A0A0A0',
                fontSize: fp(1.2),
                marginLeft: wp(0.5),
                marginTop: hp(0.3),
              }}>
              {Author: Mia shazad}
            </CustomText> */}
            {/* )} */}
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: color.PRIMARY_BLUE,
                marginTop: hp(0.5),
                fontSize: fp(1.75),
              }}>
              ৳ {item?.price}
            </CustomText>
          </View>
        </View>
      </Pressable>
    );
  };

  function onRightPress() {
    navigation.navigate('Profile');
  }
  function handleSearchTextChange(e) {
    setSearchText(e);
  }
  return (
    <View style={{flex: 1, backgroundColor: color.DIM_WHITE}}>
      <ImageBackground
        source={headerBg}
        style={{height: hp(10), width: wp(100), alignSelf: 'center'}}
        resizeMode="cover"
        imageStyle={{
          borderBottomLeftRadius: fp(3),
          borderBottomRightRadius: fp(2),
        }}>
        {/* <View style={{marginTop: hp(4)}}> */}
        <Header
          title={'Courses'}
          // onPress={onLeftPress}
          onRightPress={onRightPress}
          leftIcon={false}
        />
        {/* <View
          style={{
            borderTopWidth: fp(0.2),
            borderColor: color.WHITE,
            marginBottom: hp(1),
          }}></View>
        <CustomText
          type="heading"
          style={{marginLeft: wp(5), fontSize: fp(1.7), marginBottom: hp(2)}}>
          Find a course want to learn
        </CustomText>
        <SearchTextInput
          value={searchText}
          onChangeText={handleSearchTextChange}
          onSearch={handleSearch}
          style={{color: color.DIM_BLACK, width: wp(80), height: hp(4)}}
        /> */}
        {/* </View> */}
      </ImageBackground>

      {/* <View>
          <View
            style={{
              paddingVertical: hp(3),
              // backgroundColor: 'red',
            }}>
            <SearchTextInput
              value={searchText}
              onChangeText={setSearchText}
              onSearch={handleSearch}
              elevation={fp(1.5)}
            />
          </View>
        </View> */}
      <KeyboardAwareScrollView>
        <View
          style={{
            backgroundColor: color.DIM_WHITE,
            borderTopEndRadius: fp(3),
            borderTopLeftRadius: fp(3),
            height: hp(70),
          }}>
          {/* <View style={{paddingLeft: hp(2.5)}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: '#434343',
                marginTop: hp(0.5),
                fontSize: fp(1.9),
                paddingVertical: hp(1.5),
              }}>
              Popular Course
            </CustomText>

            <FlatList
              data={courseDetails}
              renderItem={renderCourses}
              horizontal
            />
          </View> */}
          <View style={{paddingLeft: hp(2.5), marginBottom: hp(2)}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: '#434343',
                marginTop: hp(0.5),
                fontSize: fp(1.9),
                paddingVertical: hp(1.5),
              }}>
              Latest Course
            </CustomText>
            <FlatList data={courses} renderItem={renderCourses} horizontal />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({});
