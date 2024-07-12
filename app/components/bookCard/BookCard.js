import {Image, View} from 'react-native';
import {typography} from '../../assets/fonts/typography';
import {BookCoverImg, dummy_class} from '../../assets/images/index';
import {color} from '../../constants/colors/colors';
import {fp, hp, wp} from '../../helpers/resDimension';
import CustomText from '../text/CustomText';
import {ScrollView} from 'react-native-gesture-handler';

const BookCard = ({bookDetails, showAuthor}) => {
  console.log('🚀 ~ BookCard ~ bookDetails:', bookDetails);
  return (
    <ScrollView horizontal scrollEnabled={false}>
      {bookDetails.map(item => (
        <View
          style={{
            backgroundColor: color.WHITE,
            height: hp(30.5),
            width: wp(45),
            borderRadius: fp(1),
            marginRight: wp(3),
          }}>
          <Image
            source={item?.img ? item?.img : BookCoverImg}
            style={{
              height: hp(22),
              width: wp(38),
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
                fontSize: fp(1.4),
                color: '#333333',
                marginTop: hp(0.5),
              }}>
              {item.title}
            </CustomText>
            {showAuthor && (
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
            )}

            <CustomText
              type={'textRegular'}
              style={{
                fontFamily: typography.Inter_SemiBold,
                color: color.PRIMARY_BLUE,
                marginTop: hp(0.5),
                fontSize: fp(1.65),
              }}>
              ৳ {item.price}
            </CustomText>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default React.memo(BookCard);
