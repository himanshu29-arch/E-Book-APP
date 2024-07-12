import {FlatList, Image, StatusBar} from 'react-native';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {color} from '../../../constants/colors/colors';
import {StyleSheet} from 'react-native';
import Header from '../../../components/header/Header';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {BookCoverImg} from '../../../assets/images';
import {typography} from '../../../assets/fonts/typography';
import CustomText from '../../../components/text/CustomText';

const MyOrders = () => {
  const orderData = [{}, {}, {}, {}];
  const renderOrderDetails = () => {
    return (
      <View
        style={{
          backgroundColor: color.WHITE,
          height: hp(20),
          width: wp(90),
          alignItems: 'center',
          borderRadius: fp(2),
          justifyContent: 'space-around',
          flexDirection: 'row',
          margin: hp(1),
          elevation: fp(0.5),
        }}>
        <Image
          source={BookCoverImg}
          style={{
            height: hp(18),
            width: wp(28),
            borderRadius: fp(2),
            marginHorizontal: wp(1.5),
          }}
        />
        <View>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_SemiBold,
              fontSize: fp(1.5),
              color: 'black',
              marginTop: hp(0.5),
              width: wp(50),
            }}>
            Class 5 Bangladesh o Bisho Porichoy
          </CustomText>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.4),
              color: color.GREY,
              marginTop: hp(1.5),
            }}>
            #21547858
          </CustomText>
          <CustomText
            type={'textRegular'}
            style={{
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
              color: 'black',
              marginTop: hp(1.2),
            }}>
            113.0
          </CustomText>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: color.WHITE}}>
      <KeyboardAwareScrollView>
        <StatusBar
          backgroundColor={color.PRIMARY_BLUE}
          barStyle="light-content"
        />
        <Header
          title={'My Orders'}
          backgroundColor={color.PRIMARY_BLUE}
          font={'regular'}
          leftIconName="leftArrow"
        />
        <View style={{alignItems: 'center'}}>
          <FlatList data={orderData} renderItem={renderOrderDetails} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default MyOrders;

const styles = StyleSheet.create({});
