import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {typography} from '../../../assets/fonts/typography';
import {BookCoverImg, headerBg} from '../../../assets/images/index';
import Header from '../../../components/header/Header';
import SearchTextInput from '../../../components/searchTextInput/SearchTextInput';
import CustomText from '../../../components/text/CustomText';
import {color, colorArray} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {endpoints} from '../../../constants/colors/endpoints';
import {apiClient} from '../../../helpers/apiClient';
import Snackbar from 'react-native-snackbar';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const BookBundles = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [classData, setClassData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onRightPress() {
    navigation.navigate('ProfileMenu');
    // navigation.navigate('Chat');
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      handleGetCategories();
    });

    // Clean up the listener on component unmount
    return () => {
      focusListener();
    };
  }, [navigation]);

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
        if (bookCategories.length > 0) {
          setClassData(bookCategories);
          console.log(
            '🚀 ~ handleGetCategories ~ bookCategories:',
            bookCategories,
          );
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
  function handleClassPress(item) {
    navigation.navigate('PdfBooks', {category_data: item});
  }

  const HEADER_COLOR = 'rgba(0, 0, 255, 1)'; // Blue
  const BACKGROUND_OPACITY = 0.2; // 30% opacity
  function renderClasses({item, index}) {
    return (
      <Pressable
        onPress={() => handleClassPress(item)}
        style={{
          height: hp(10),
          width: wp(43),
          backgroundColor: 'white',
          marginTop: hp(2),
          alignSelf: 'center',
          borderRadius: fp(2),
          // borderColor: colorArray[index].rgb,
          // borderWidth: fp(0.1),
          marginLeft: wp(2),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: fp(2.5),
            color: 'black',
            alignSelf: 'center',
            // marginTop: hp(2),
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {item.name} books
        </Text>
      </Pressable>
    );
  }
  function handleSearchTextChange(e) {
    setSearchText(e);
  }
  const handleSearch = () => {
    // Perform search functionality here
    console.log('Searching for:', searchText);
  };
  return (
    <View style={{flex: 1}}>
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
          title={'Books'}
          // onPress={onLeftPress}
          onRightPress={onRightPress}
          leftIcon={false}
        />
        {/* <View
          style={{
            borderTopWidth: fp(0.2),
            borderColor: color.WHITE,
            marginBottom: hp(1),
          }}></View> */}
        {/* <CustomText
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
      </ImageBackground>
      <KeyboardAwareScrollView>
        <Text
          style={{
            fontSize: fp(2.6),
            color: color.GREY,
            alignSelf: 'center',
            marginTop: hp(2),
          }}>
          Class: (1-10) Books
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <FlatList
            data={classData}
            renderItem={renderClasses}
            numColumns={2}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default BookBundles;
