import {Image, ScrollView, View} from 'react-native';
import {typography} from '../../assets/fonts/typography';
import {CourseCoverImg, dummy_course} from '../../assets/images/index';
import {color} from '../../constants/colors/colors';
import {fp, hp, wp} from '../../helpers/resDimension';
import CustomText from '../text/CustomText';

const CourseCard = ({courseDetails}) => {
  return (
    <ScrollView horizontal scrollEnabled>
      {courseDetails.map(item => (
        <View
          style={{
            backgroundColor: color.WHITE,
            height: hp(20.5),
            width: wp(45),
            borderRadius: fp(0.5),
            marginRight: wp(3),
          }}>
          <Image
            source={item?.img ? item?.img : CourseCoverImg}
            style={{
              height: hp(12),
              width: wp(45),
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
                marginTop: hp(0.8),
              }}>
              {item.title}
            </CustomText>
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

export default CourseCard;
