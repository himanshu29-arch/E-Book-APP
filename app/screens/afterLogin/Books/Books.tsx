import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {typography} from '../../../assets/fonts/typography';
import {
  BookCoverImg,
  PaymentAlertIllus,
  headerBg,
} from '../../../assets/images/index';
import Header from '../../../components/header/Header';
import SearchTextInput from '../../../components/searchTextInput/SearchTextInput';
import CustomText from '../../../components/text/CustomText';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {endpoints} from '../../../constants/colors/endpoints';
import {apiClient} from '../../../helpers/apiClient';
import Snackbar from 'react-native-snackbar';
import {FlatList} from 'react-native-gesture-handler';
import ButtonComp from '../../../components/button/Button';
import CustomAlert from '../../../components/alerts/CustomAlert';

const Books = ({route, navigation}) => {
  const {category_data} = route.params;
  console.log('🚀 ~ Books ~ category_data:', category_data);
  const [searchText, setSearchText] = useState('');
  const [bookDetails, setBookDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = () => {
    // Perform search functionality here
    console.log('Searching for:', searchText);
  };

  const handleGetBooksByCategoryId = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_BOOKS_BY_CATEGORY_ID}${category_data.id}`,
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(
          '🚀 ~ handleGetBooksByCategoryId ~ response?.data?.books:',
          response?.data,
        );

        setBookDetails(response?.data);
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
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  useEffect(() => {
    handleGetBooksByCategoryId();
  }, []);
  function navigateToBookDetails(item) {
    Alert.alert(
      'Information',
      'You need to buy the class bundle in order to access and read the book.',
      [{text: 'OK'}],
    );
    // navigation.navigate('BookDetails', {BookDetails: item});
  }
  const renderBooks = ({item}) => {
    return (
      <Pressable onPress={item => navigateToBookDetails(item)}>
        <View
          style={{
            backgroundColor: color.WHITE,
            height: hp(28),
            width: wp(45),
            borderRadius: fp(1),
            marginRight: wp(3),
          }}>
          <Image
            source={{uri: `${item.cover_pic}`}}
            style={{
              height: hp(22),
              width: wp(43.4),
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
                color: '#333333',
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
                fontSize: fp(1.4),
                marginLeft: wp(0.5),
              }}>
              Author: Sohoj Pora
            </CustomText>
            {/* )} */}
            {/* <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: color.PRIMARY_BLUE,
                marginTop: hp(0.5),
                fontSize: fp(1.65),
              }}>
              ৳ {item?.price}
            </CustomText> */}
          </View>
        </View>
      </Pressable>
    );
  };
  function onRightPress() {
    navigation.navigate('ProfileMenu');
    // navigation.navigate('Chat');
  }
  function handleSearchTextChange(e) {
    setSearchText(e);
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={headerBg}
        style={{height: hp(22), width: wp(100), alignSelf: 'center'}}
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
        <View
          style={{
            borderTopWidth: fp(0.2),
            borderColor: color.WHITE,
            marginBottom: hp(1),
          }}></View>
        <CustomText
          type="heading"
          style={{marginLeft: wp(5), fontSize: fp(1.7), marginBottom: hp(2)}}>
          Find a book want to learn
        </CustomText>
        <SearchTextInput
          value={searchText}
          onChangeText={handleSearchTextChange}
          onSearch={handleSearch}
          style={{color: color.DIM_BLACK, width: wp(80), height: hp(4)}}
        />
        {/* </View> */}
      </ImageBackground>
      <KeyboardAwareScrollView>
        <View style={{backgroundColor: color.WHITE}}>
          <View
            style={{
              backgroundColor: color.DIM_WHITE,
              height: hp(80),
              borderTopLeftRadius: fp(2),
              borderTopRightRadius: fp(2),
              marginTop: hp(2.4),
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
                  fontSize: fp(2),
                }}>
                {category_data.name}
              </Text>
            </View>
            <View style={{marginTop: hp(1), marginHorizontal: wp(5)}}>
              <FlatList
                data={bookDetails}
                renderItem={renderBooks}
                horizontal
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: color.WHITE,
          borderTopWidth: fp(0.25),
          borderTopColor: '#F2F2F2',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: wp(5),
          paddingVertical: hp(1),
          height: hp(10),
        }}>
        <CustomText
          type={'typeRegular'}
          style={{
            fontFamily: typography.Inter_SemiBold,
            fontSize: fp(2.35),
            color: color.PRIMARY_BLUE,
            lineHeight: fp(2.7),
            // marginTop: hp(3),
            alignSelf: 'center',
          }}>
          {' '}
          ৳ {bookDetails[0]?.price}
        </CustomText>
        <ButtonComp
          marginTop={0}
          title="Buy Now"
          onPress={() => {
            setShowPaymentAlert(true);
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPaymentAlert}
        onRequestClose={() => setShowPaymentAlert(false)}>
        <CustomAlert
          title="Secure Payment Process"
          subTitle="Secure payment gateway that keeps you safe from fraudsters and thieves"
          img={PaymentAlertIllus}
          onPress={() => {
            setShowPaymentAlert(false);
            navigation.navigate('AnalogPaymentForm', {
              category_id: category_data.id,
            });
          }}
          onClosePress={() => {
            setShowPaymentAlert(false);
          }}
          btnTitle="Make Payment"
        />
      </Modal>
    </View>
  );
};

export default Books;
