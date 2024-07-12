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
import {headerBg} from '../../../assets/images/index';
import Header from '../../../components/header/Header';
import {color, colorArray} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {endpoints} from '../../../constants/colors/endpoints';
import {apiClient} from '../../../helpers/apiClient';
import Snackbar from 'react-native-snackbar';
import {FlatList} from 'react-native-gesture-handler';

const UserBooks = ({navigation, route}) => {
  const {categoryArray} = route.params;
  console.log('🚀 ~ UserBooks ~ categoryArray:', categoryArray);
  const [searchText, setSearchText] = useState('');
  const [classData, setClassData] = useState(categoryArray);
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
    console.log('🚀 ~ renderClasses ~ item:', item);
    return (
      <Pressable
        onPress={() => handleClassPress(item)}
        style={{
          height: hp(10),
          width: wp(43),
          backgroundColor: color.WHITE,
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
    <View style={{flex: 1, backgroundColor: color.DIM_WHITE}}>
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
        <Header
          title={'User Books'}
          // onPress={onLeftPress}
          onRightPress={onRightPress}
          leftIcon={false}
        />
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
            data={categoryArray}
            renderItem={renderClasses}
            numColumns={2}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default UserBooks;
