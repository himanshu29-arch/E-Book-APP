import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {typography} from '../../../assets/fonts/typography';
import Header from '../../../components/header/Header';
import CustomText from '../../../components/text/CustomText';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {PaymentAlertIllus} from '../../../assets/images';
import {useState} from 'react';
import MainButton from '../../../components/button/MainButton';
import ButtonComp from '../../../components/button/Button';
import ReadBookAlert from '../../../components/alerts/CustomAlert';
import CustomAlert from '../../../components/alerts/CustomAlert';

const BookDetails = ({navigation, route}) => {
  const {BookDetails} = route?.params;
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <StatusBar
          translucent
          backgroundColor={color.PRIMARY_BLUE}
          barStyle="light-content"
        />
        <Header
          title={'About Book'}
          backgroundColor={color.PRIMARY_BLUE}
          font={'regular'}
          leftIconName={'leftArrow'}
        />
        <View style={{backgroundColor: color.DIM_WHITE}}>
          <View style={{position: 'absolute', zIndex: 2000}}>
            <Image
              source={{
                uri: `${BookDetails.cover_pic}`,
              }}
              style={{
                height: hp(22),
                width: wp(42),
                left: wp(29),
                top: hp(3),
                borderRadius: fp(0.7),
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: color.WHITE,
              width: wp(100),
              height: hp(70),
              marginTop: hp(13),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: fp(2),
              },
              shadowOpacity: fp(2),
              shadowRadius: fp(3),
              elevation: fp(1),
              borderTopLeftRadius: fp(3),
              borderTopRightRadius: fp(3),
            }}>
            <View style={{alignItems: 'center', marginTop: hp(13)}}>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Bold,
                  fontSize: fp(2.3),
                  color: color.PRIMARY_BLUE,
                  marginTop: hp(1),
                }}>
                {BookDetails?.title}
              </CustomText>
              <View
                style={{
                  borderStyle: 'dotted',
                  borderBottomWidth: hp(0.13),
                  width: wp(47),
                  marginTop: hp(0.5),
                  borderColor: color.PRIMARY_BLUE,
                }}></View>
            </View>

            <View
              style={{
                backgroundColor: '#F2F2F2',
                height: hp(6),
                width: wp(94),
                borderRadius: fp(1),
                alignSelf: 'center',
                marginTop: hp(4),
                justifyContent: 'center',
              }}>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_SemiBold,
                  fontSize: fp(1.8),
                  color: color.PRIMARY_BLUE,
                  alignSelf: 'center',
                }}>
                About Book
              </CustomText>
            </View>

            <View
              style={{
                backgroundColor: '#FAFAFA',
                height: hp(7),
                width: wp(94),
                borderRadius: fp(1),
                alignSelf: 'center',
                marginTop: hp(2),
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.2),
                    color: '#7D7D7D',
                    alignSelf: 'center',
                  }}>
                  Pages
                </CustomText>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.5),
                    color: '#3A3A3A',
                    alignSelf: 'center',
                  }}>
                  {BookDetails?.pages}
                </CustomText>
              </View>

              <View>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.2),
                    color: '#7D7D7D',
                    alignSelf: 'center',
                  }}>
                  File
                </CustomText>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.5),
                    color: '#3A3A3A',
                    alignSelf: 'center',
                  }}>
                  PDF
                </CustomText>
              </View>

              <View>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.2),
                    color: '#7D7D7D',
                    alignSelf: 'center',
                  }}>
                  Language
                </CustomText>
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_SemiBold,
                    fontSize: fp(1.5),
                    color: '#3A3A3A',
                    alignSelf: 'center',
                  }}>
                  {BookDetails?.language}
                </CustomText>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: wp(5),
                marginTop: hp(3),
              }}>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Medium,
                  fontSize: fp(1.5),
                  color: '#3A3A3A',
                }}>
                Description
              </CustomText>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Light,
                  fontSize: fp(1.35),
                  color: '#414141',
                  lineHeight: fp(2.7),
                  marginTop: hp(1),
                }}>
                {BookDetails?.description}
              </CustomText>
            </View>
          </View>

          <View
            style={{
              backgroundColor: color.WHITE,
              borderTopWidth: fp(0.25),
              borderTopColor: '#F2F2F2',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: wp(5),
              paddingVertical: hp(1),
              height: hp(10),
            }}>
            {/* <CustomText
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
              ৳ {BookDetails?.price}
            </CustomText> */}
            <View style={{width: wp(70)}}>
              <ButtonComp
                marginTop={0}
                title="Read Book"
                onPress={() => {
                  navigation.navigate('PdfBooks', {BookDetails: BookDetails});
                  // setShowPaymentAlert(true);
                }}
              />
            </View>
          </View>
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
              navigation.navigate('PdfBooks', {BookDetails: BookDetails});
            }}
            onClosePress={() => {
              setShowPaymentAlert(false);
            }}
            btnTitle="Make Payment"
          />
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default BookDetails;
