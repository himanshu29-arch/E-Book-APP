import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {color} from '../../../constants/colors/colors';
import Header from '../../../components/header/Header';
import {fp, hp, wp} from '../../../helpers/resDimension';
import CRadioButton from '../../../components/radio/RadioButton';
import {typography} from '../../../assets/fonts/typography';
import {useIcon} from '../../../assets/icons/useIcon';
import ButtonComp from '../../../components/button/Button';
import CustomAlert from '../../../components/alerts/CustomAlert';
import {OrderAlertIllus} from '../../../assets/images';

const Payment = ({navigation, route}) => {
  const {BookDetails} = route.params;
  console.log('🚀 ~ Payment ~ BookDetails:', BookDetails);
  const [checked, setChecked] = React.useState('first');
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [showOrderAlert, setShowOrderAlert] = React.useState(false);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Header
          title={'Payment'}
          backgroundColor={color.PRIMARY_BLUE}
          font={'regular'}
          leftIconName={'leftArrow'}
        />
        {/* //*Tax info */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: wp(90),
            marginLeft: wp(5),
            marginTop: hp(4),
          }}>
          <View>
            <Text style={{color: color.SECONDARY_BLUE}}>
              Business and tax info
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: fp(2),
                fontFamily: typography.Inter_Bold,
                marginTop: hp(0.2),
              }}>
              Business and tax info
            </Text>
            <Text
              style={{
                color: color.DIM_BLACK,
                fontSize: fp(1.6),
                fontFamily: typography.Inter_Regular,
              }}>
              Optional - Add a tax ID or address
            </Text>
          </View>
          {useIcon.RightArrowShort()}
        </View>
        <View
          style={{
            borderTopColor: color.DIM_WHITE,
            borderTopWidth: fp(0.2),
            width: wp(87),
            alignSelf: 'center',
            marginTop: hp(2),
          }}
        />

        <View style={{marginLeft: wp(5)}}>
          <Text
            style={{
              color: 'black',
              fontSize: fp(2),
              fontFamily: typography.Inter_Bold,
              marginTop: hp(2),
            }}>
            Add payment method
          </Text>
          <CRadioButton
            RBonPress={() => setChecked('Debit_or_credit_card')}
            RBvalue="Debit_or_credit_card"
            RBstatus={
              checked === 'Debit_or_credit_card' ? 'checked' : 'unchecked'
            }
            text={'Debit or credit card'}
            RBcolor={color.PRIMARY_BLUE}
          />
          <CRadioButton
            RBonPress={() => setChecked('Three_months_no_cost_credit_card_EMI')}
            RBvalue="Three_months_no_cost_credit_card_EMI"
            RBstatus={
              checked === 'Three_months_no_cost_credit_card_EMI'
                ? 'checked'
                : 'unchecked'
            }
            text={'Three-months no-cost credit card EMI'}
            RBcolor={color.PRIMARY_BLUE}
          />
          <CRadioButton
            RBonPress={() => setChecked('upi')}
            RBvalue="upi"
            RBstatus={checked === 'upi' ? 'checked' : 'unchecked'}
            text={'UPI'}
            RBcolor={color.PRIMARY_BLUE}
          />
          <CRadioButton
            RBonPress={() => setChecked('paytm')}
            RBvalue="paytm"
            RBstatus={checked === 'paytm' ? 'checked' : 'unchecked'}
            text={'PAYTM'}
            RBcolor={color.PRIMARY_BLUE}
          />
          <CRadioButton
            RBonPress={() => setChecked('net_banking')}
            RBvalue="net_banking"
            RBstatus={checked === 'net_banking' ? 'checked' : 'unchecked'}
            text={'net_banking'}
            RBcolor={color.PRIMARY_BLUE}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(5),
            marginTop: hp(3),
          }}>
          <Pressable
            onPress={() => {
              setCheckboxState(!checkboxState);
            }}>
            {checkboxState
              ? useIcon.FilledCheckbox_black()
              : useIcon.BlankCheckbox_black()}
          </Pressable>

          <Text
            style={{
              color: color.DIM_BLACK,
              fontSize: fp(1.6),
              fontFamily: typography.Inter_Regular,
            }}>
            I have an ad credit to claim.
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          width: wp(40),
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          marginLeft: wp(28), // Center horizontally
        }}>
        <ButtonComp onPress={() => setShowOrderAlert(true)} title={'Pay'} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showOrderAlert}
        onRequestClose={() => setShowOrderAlert(false)}>
        <CustomAlert
          title="Thank you for orderding"
          subTitle="when an unknown printer took 
                    a galley of type and scrambled."
          img={OrderAlertIllus}
          onPress={() => {
            setShowOrderAlert(false);
            // navigation.navigate('PdfViewer', {BookDetails: BookDetails});
            navigation.navigate('PdfBooks', {BookDetails: BookDetails});
            // navigation.navigate('BookVideos', {BookDetails: BookDetails});
          }}
          onClosePress={() => {
            setShowOrderAlert(false);
          }}
          btnTitle="Read Book"
        />
      </Modal>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
