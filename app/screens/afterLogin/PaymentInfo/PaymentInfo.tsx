import {FlatList, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import PaymentInfoCard from '../../../components/paymentInfoCard/PaymentInfoCard';
import {BookCoverImg, SoftEnggBookImg} from '../../../assets/images/index';
import {Image} from 'react-native';
import CustomText from '../../../components/text/CustomText';
import {typography} from '../../../assets/fonts/typography';

const PaymentInfo = ({navigation}) => {
  const data = [
    {
      id: '1',
      payment_status: 'Payment Completed',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.00',
      date: '05-01-2023',
    },
    {
      id: '2',
      payment_status: 'Payment Completed',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.0',
      date: '05-01-2023',
    },
    {
      id: '3',
      payment_status: 'Payment Completed',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.0',
      date: '05-01-2023',
    },
    {
      id: '4',
      payment_status: 'Payment Pending',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.00',
      date: '05-01-2023',
    },
    {
      id: '5',
      payment_status: 'Payment Completed',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.0',
      date: '05-01-2023',
    },
    {
      id: '6',
      payment_status: 'Payment Cancel',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.0',
      date: '05-01-2023',
    },
    {
      id: '7',
      payment_status: 'Payment Completed',
      book_image: SoftEnggBookImg,
      book_info: 'Class 5 Bangladesh O Bisho Porichoy',
      amount: '113.00',
      date: '05-01-2023',
    },
  ];

  const renderPaymentDetails = () => {
    return (
      <View
        style={{
          backgroundColor: color.WHITE,
          height: hp(13),
          width: wp(90),
          alignItems: 'center',
          borderRadius: fp(2),
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: hp(1),
          elevation: fp(0.5),
          paddingHorizontal: wp(2),
        }}>
        <Image
          source={BookCoverImg}
          style={{
            height: hp(11),
            width: wp(30),
            borderRadius: fp(2),
          }}
        />
        <View>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.5),
              color: '#49B737',
              width: wp(50),
            }}>
            Payment Completed
          </CustomText>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(1.5),
              color: '#434343',
              width: wp(50),
            }}>
            Class 5 Bangladesh O Bisho Porichoy
          </CustomText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.9),
                color: '#49B737',
                marginTop: hp(0.5),
              }}>
              113.0
            </CustomText>
            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.3),
                color: '#BFBFBF',
                marginTop: hp(0.5),
                alignSelf: 'center',
              }}>
              05-01-2023
            </CustomText>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: color.DIM_WHITE}}>
        <Header
          title={'Payment Information'}
          backgroundColor={color.PRIMARY_BLUE}
          font={'regular'}
          leftIconName={'leftArrow'}
        />
        <StatusBar
          // hidden={!isLandscape ? false : true}
          backgroundColor={color.PRIMARY_BLUE}
          barStyle="light-content"
        />
        <View style={{alignItems: 'center', marginVertical: hp(2)}}>
          <FlatList data={data} renderItem={renderPaymentDetails} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 25,
  },
});
