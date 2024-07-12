import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../components/text/CustomText';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import Header from '../../../components/header/Header';
import {dummyRecommend, headerBg} from '../../../assets/images';
import {typography} from '../../../assets/fonts/typography';
import CourseCard from '../../../components/courseCard/CourseCard';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import Snackbar from 'react-native-snackbar';
import {FlatList} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

const Home = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [courses, setCourses] = useState([]);
  const [res, setRes] = useState([]);

  const [latestCategory, setLatestCategory] = useState({});
  const handleSearch = () => {
    // Perform search functionality here
    console.log('Searching for:', searchText);
  };

  const handleGetCategories = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`${endpoints.GET_CATEGORIES}`);
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(
          '🚀 ~ handleGetBooks ~ response?.data?.books:',
          response?.data?.books,
        );
        const categories = response?.data?.categories;
        const bookCategories = categories.filter(
          (category: {type: string}) => category.type === 'Book',
        );
        console.log(
          '🚀 ~ handleGetCategories ~ bookCategories:',
          bookCategories,
        );
        if (bookCategories.length > 0) {
          const latestCategory = bookCategories.shift();
          setLatestCategory(latestCategory);
          handleGetBooksByCategoryId(latestCategory?.id);
        } else {
          // Handle case where there are no book categories
          console.log('No categories of type "Book" found.');
        }

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

  const handleGetBooksByCategoryId = async category_id => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_BOOKS_BY_CATEGORY_ID}${category_id}`,
      );
      if (response.status === 200) {
        console.log(
          '🚀 ~ handleGetBooksByCategoryId ~ response?.data:',
          response?.data,
        );
        setRes(response?.data);
      }
    } catch (error) {
      console.log('Error:', error.message);
      Snackbar.show({
        text: error.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      console.log('focusListener works');
      handleGetBooks();
      handleGetCourses();
      handleGetCategories();
    });

    // Clean up the listener on component unmount
    return () => {
      focusListener();
    };
  }, [navigation]);

  useEffect(() => {
    handleGetBooks();
    handleGetCourses();
    handleGetCategories();
  }, []);

  const handleGetBooks = async () => {
    console.log('🚀 ~ handleGetBooks ~ handleGetBooks:');
    try {
      setIsLoading(true);
      const response = await apiClient.get(`${endpoints.GET_BOOKS}`);
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(
          '🚀 ~ handleGetBooks ~ response?.data?.books:',
          response?.data?.books,
        );

        setBookDetails(response?.data?.books);
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

  const renderBooks = ({item}) => {
    console.log('🚀 ~ renderBooks ~ item:', item);
    return (
      <Pressable
        style={{elevation: 2}}
        onPress={() =>
          navigation.navigate('PdfBooks', {category_data: latestCategory})
        }>
        <View
          style={{
            backgroundColor: color.WHITE,
            height: hp(30.5),
            width: wp(43),
            borderRadius: fp(1),
            marginRight: wp(3),
          }}>
          <Image
            source={{
              uri: `${item.cover_pic}`,
            }}
            style={{
              height: hp(22),
              width: wp(41.5),
              marginTop: hp(0.5),
              borderRadius: fp(1),
              alignSelf: 'center',
            }}
          />
          <View style={{marginLeft: wp(1)}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.6),
                color: '#334344',
                marginTop: hp(0.5),
              }}>
              {item.title}
            </CustomText>
            {/* {showAuthor && ( */}
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                color: '#A0A0A0',
                fontSize: fp(1.2),
                marginLeft: wp(0.5),
              }}>
              Author: Sohoj Pora
            </CustomText>
            {/* )} */}
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: color.PRIMARY_BLUE,
                // marginTop: hp(0.5),
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
    navigation.navigate('ProfileMenu');
  }

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
  function handleSearchTextChange(e) {
    setSearchText(e);
  }

  return (
    <View style={{flex: 1, backgroundColor: color.WHITE}}>
      {/* <StatusBar
        backgroundColor={color.PRIMARY_BLUE}
        barStyle="light-content"
      /> */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
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
          title={'SOHOJ PORA'}
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

      {/* <View style={{marginTop: hp(2)}}>
      <RecommendedList recommendData={recommendImgList} />
    </View> */}
      <ScrollView>
        <View
          style={{
            backgroundColor: color.DIM_WHITE,
            height: hp(80),
            borderTopLeftRadius: fp(2),
            borderTopRightRadius: fp(2),
            marginTop: hp(3),
          }}>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: color.DIM_BLACK,
                fontSize: fp(1.8),
              }}>
              {latestCategory.name}
            </Text>

            <Pressable
              onPress={() => {
                navigation.navigate('BookBundles');
                // navigation.navigate('VideoPlayerEx');
                // navigation.navigate('BookVideos');
              }}>
              <Text
                style={{
                  fontFamily: typography.Inter_SemiBold,
                  color: color.PRIMARY_BLUE,
                  textDecorationLine: 'underline',
                  fontSize: fp(1.6),
                }}>
                See All
              </Text>
            </Pressable>
          </View>
          <View style={{marginTop: hp(1), marginHorizontal: wp(5)}}>
            <FlatList
              data={res}
              renderItem={renderBooks}
              horizontal
              scrollEnabled={false}
            />
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: typography.Inter_SemiBold,
                  color: color.DIM_BLACK,
                }}>
                Popular Course
              </Text>

              <Pressable>
                <Text
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    color: color.PRIMARY_BLUE,
                    textDecorationLine: 'underline',
                  }}>
                  See All
                </Text>
              </Pressable>
            </View>
            <View style={{marginTop: hp(2)}}>
              {/* <Pressable onPress={() => console.log('course Card pressed')}> */}
              {/* <CourseCard courseDetails={courseDetails} /> */}
              <FlatList
                data={courses}
                renderItem={renderCourses}
                scrollEnabled={false}
              />
              {/* </Pressable> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
