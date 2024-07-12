import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../../../components/input/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {color} from '../../../constants/colors/colors';
import Header from '../../../components/header/Header';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {typography} from '../../../assets/fonts/typography';
import ButtonComp from '../../../components/button/Button';
import CustomText from '../../../components/text/CustomText';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageAsset} from '../../../constants/types/profile';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../constants/storageKeys';
import DropDown from '../../../components/DropDownComponent/DropDown';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIcon} from '../../../assets/icons/useIcon';
import CustomAlert from '../../../components/alerts/CustomAlert';
import {PaymentAlertIllus} from '../../../assets/images';
import LottieView from 'lottie-react-native';

const AnalogPaymentForm = ({route, navigation}) => {
  const {category_data} = route.params;
  function onHeaderLeftPress() {
    navigation.goBack();
  }

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazilla, setUpazilla] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [className, setClassName] = useState('');
  const [isPaymentModeFocus, setIsPaymentModeFocus] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [allPaymentModes, setAllPaymentModes] = useState([]);
  const [paymentModeData, setPaymentModeData] = useState([]);
  const [paymentNumber, setPaymentNumber] = useState('');
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allDivisions, setAllDivisions] = useState([]);
  const [isDivisionFocus, setIsDivisionFocus] = useState(false);
  const [isDistrictFocus, setIsDistrictFocus] = useState(false);
  const [allDistricts, setAllDistricts] = useState([]);
  const [districtRes, setDistrictRes] = useState([]);
  const [allUpazilla, setAllUpazilla] = useState([]);
  const [isUpazillaFocus, setIsUpazillaFocus] = useState(false);
  const [imageResponse, setImageResponse] = useState<ImageAsset | {}>({});
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  function handleSendPress() {
    // Check if pic is available
    if (Object.keys(imageResponse).length <= 0) {
      Snackbar.show({
        text: 'Plese attach image',
        duration: 2000,
        backgroundColor: color.RED,
      });
      return; // Exit the function if pic is not available
    }
    // // Check for other form data values
    if (
      !division ||
      !district ||
      !upazilla ||
      !schoolName ||
      !className ||
      !amount ||
      !mobile ||
      !studentName ||
      !paymentNumber
    ) {
      //   // If any of the form data values are missing, show an alert
      Snackbar.show({
        text: 'Please fill all the fields',
        duration: 2000,
        backgroundColor: color.RED,
      });
      return; // Exit the function
    }

    // If all form data values are available, proceed with creating the sell trade
    handleSend();
  }
  async function handleSend() {
    const userId = await AsyncStorage.getItem('user_id');
    console.log('🚀 ~ handleSend ~ userId:', userId);
    console.log(
      '🚀 ~ file: CreateSellTrade.js:91 ~ handleCreateSellTrade ~ :',
      'Api calling',
    );
    setLoading(true);
    const formData = new FormData();
    formData.append('payment_number', paymentNumber);
    formData.append('payment_method', paymentMode);
    {
      Object.keys(imageResponse).length > 0 &&
        formData.append('payment_screenshot', {
          uri: imageResponse?.uri,
          name: imageResponse?.fileName,
          type: imageResponse?.type,
        });
    }
    formData.append('division', division);
    formData.append('district', district);
    formData.append('upazilla', upazilla);
    formData.append('school_name', schoolName);
    formData.append('class', className);
    formData.append('student_name', studentName);
    formData.append('mobile_number', mobile);
    formData.append('user_id', userId);
    formData.append('category_id', category_data?.id.toString());
    formData.append('amount', amount);

    console.log(
      '🚀 ~ file: handleSumbitAnalogForm.js:118 ~ handleSumbitAnalogForm ~ formData:\n',
      JSON.stringify(formData),
    );
    const response = await axios.post(`${BASE_URL}analog-payment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response?.status == 201) {
      setShowPaymentAlert(true);
      // Alert.alert(
      //   'Information',
      //   'Your details have been successfully saved. We will contact you once they have been verified.',
      //   [{text: 'OK', onPress: () => navigation.goBack()}],
      // );
    } else {
      Snackbar.show({
        text: 'Uh-oh! Something went wrong. Please try again.',
        duration: 2000,
        backgroundColor: color.RED,
      });
    }
    setLoading(false);
  }

  function handleAddImage() {
    setShowAddPhotoModal(true);
  }

  const handleOpenCamera = async () => {
    console.log('🚀 ~ handleOpenCamera ~ handleOpenCamera:');
    const isCameraPermitted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (isCameraPermitted) {
      try {
        await launchCamera(
          {
            mediaType: 'photo',
          },
          response => {
            console.log(response);

            if (response.didCancel) {
              Alert.alert('Information', 'Operation Cancelled');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              Alert.alert('Information', 'Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              Alert.alert('Information', 'Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              Alert.alert('Information', response.errorMessage);
              return;
            } else {
              setImageResponse(response?.assets[0]);
              return;
            }
          },
        );
      } catch (error) {
        console.error('Error launching camera:', error);
      }
      setShowAddPhotoModal(false);
    }
  };

  const handleOpenGallery = async () => {
    const isStoragePermitted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your device storage to read files.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (isStoragePermitted) {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        response => {
          if (response.didCancel) {
            Alert.alert('Information', 'Operation Cancelled');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            Alert.alert('Information', 'Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            Alert.alert('Information', 'Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            Alert.alert('Information', response.errorMessage);
            return;
          } else {
            setImageResponse(response?.assets[0]);
            return;
          }
        },
      );
    }
    setShowAddPhotoModal(false);
  };
  function handleViewImage(param: Object) {
    navigation.navigate('FullImageView', {imgRes: param});
  }

  function handleDivision(text: string): void {
    setDivision(text);
  }
  function handleDistrict(text: string): void {
    setDistrict(text);
    setAllUpazilla(getUpazillasByDistrict(text));
  }
  function handleUpazilla(text: string): void {
    setUpazilla(text);
  }
  function handleSchoolName(text: string): void {
    setSchoolName(text);
  }
  function handleStudentName(text: string): void {
    setStudentName(text);
  }
  function handleMobile(text: string): void {
    setMobile(text);
  }
  function handleAmount(text: string): void {
    setAmount(text);
  }
  function handleClass(text: string): void {
    setClassName(text);
  }
  function handlePaymentNumber(text: string): void {
    setPaymentNumber(text);
  }
  function handlePaymentMode(text: string): void {
    console.log('🚀 ~ handlePaymentMode ~ text:', text);
    setPaymentMode(text);
    setPaymentNumber(getPaymentNumber(text));
  }
  const getUpazillasByDistrict = districtName => {
    const district = districtRes.find(d => d.district === districtName);
    return district ? district.upazilla : [];
  };
  function getPaymentNumber(paymentMethod) {
    const selectedItem = paymentModeData.find(
      item => item.payment_method === paymentMethod,
    );
    return selectedItem ? selectedItem.payment_number : null;
  }

  async function getAllDivisions() {
    setLoading(true);
    try {
      const response = await axios.get(`https://bdapis.com/api/v1.2/divisions`);
      setAllDivisions(response.data.data);
      console.log('🚀 ~ getAllDivisions ~ response:', response.data.data);
    } catch (error) {
      console.error('Error fetching divisions:', error?.message);
    } finally {
      setLoading(false);
    }
  }

  async function getAllDistricts() {
    if (division === '') {
      Snackbar.show({
        text: 'Plese select division',
        duration: 2000,
        backgroundColor: color.RED,
      });
      return;
    } else {
      setLoading(true);
      try {
        console.log('🚀 ~ getAllDistricts ~ division:', division);
        const response = await axios.get(
          `https://bdapis.com/api/v1.2/division/${division}`,
        );
        const districtValue = response?.data?.data.map(item => item.district);
        console.log('🚀 ~ getAllDistricts ~ districtValue:', districtValue);
        const districtOptions = districtValue.map((district, index) => ({
          label: district,
          value: district,
        }));
        console.log('🚀 ~ districtOptions ~ districtOptions:', districtOptions);
        setDistrictRes(response.data.data);
        setAllDistricts(districtOptions);
        console.log('🚀 ~ getAllDistricts ~ response:', response.data.data);
      } catch (error) {
        console.error('Error fetching divisions:', error?.message);
      } finally {
        setLoading(false);
      }
    }
  }

  async function getPaymentModes() {
    console.log('🚀 ~ getPaymentNumber ~ getPaymentNumber:');
    try {
      setLoading(true);
      const response = await axios.get(
        'http://43.204.161.117/api/payment-methods',
      );
      console.log(response.status, 'response.status');
      console.log('🚀 ~ getPaymentNumber ~ response:', response.status);
      if (response.status === 200) {
        setPaymentModeData(response.data);
        setAllPaymentModes(
          response?.data?.map((paymentMode: any, index: any) => ({
            label: paymentMode.payment_method,
            value: paymentMode.payment_method,
          })),
        );
        setLoading(false);
      }
    } catch (error) {
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setLoading(false);
    }
  }

  function handleCopyPress() {
    Clipboard.setString(paymentNumber);
    Snackbar.show({
      text: 'Code Copied Sucessfully',
      duration: 4000,
      backgroundColor: color.PRIMARY_BLUE,
    });
    console.log('handle Copy press');
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={color.PRIMARY_BLUE}
        barStyle="light-content"
      />
      <Header
        title={'Analog Payment Form'}
        backgroundColor={color.PRIMARY_BLUE}
        font={'regular'}
        leftIconName={'leftArrow'}
        rightIcon={false}
        onPress={onHeaderLeftPress}
      />
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: hp(2)}}>
        {/* <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
              fontWeight: '700',
            }}>
            Direct Payment Number (bKash/Nagad)
          </Text>
          <Text
            style={{
              // backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: '#565555',
              padding: wp(2),
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
              fontWeight: '700',
            }}>
            01974-810837
          </Text>
        </View> */}

        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Payment Option
          </Text>
          <DropDown
            placeHolderText={'Select Payment Mode'}
            handleValue={handlePaymentMode}
            isFocus={isPaymentModeFocus}
            setIsFocus={setIsPaymentModeFocus}
            data={allPaymentModes}
            value={paymentMode}
            alternateFunction={getPaymentModes}
          />
        </View>

        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Payment Number
          </Text>
          <View
            style={{
              width: wp(90),
              borderRadius: fp(1),
              backgroundColor: color.WHITE,
              borderWidth: fp(0.3),
              marginTop: hp(1.5),
              borderColor: 'rgb(130,81,238)',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                // backgroundColor: 'rgba(54,75,159,0.2)',
                width: wp(90),
                borderRadius: fp(1),
                color: '#565555',
                padding: fp(2),
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.8),
                fontWeight: '700',
                marginLeft: wp(10),
              }}>
              {paymentNumber}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleCopyPress();
              }}
              style={{alignSelf: 'center', marginRight: wp(15)}}>
              {useIcon.ContentCopy()}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Please attach the screenshot or the payment slip.
          </Text>
          <View style={{marginTop: hp(1)}}>
            {Object.keys(imageResponse).length > 0 && (
              <ImageBackground
                source={{uri: imageResponse?.uri}}
                style={{
                  height: fp(14),
                  width: wp(90),
                  zIndex: -1,
                  borderRadius: fp(2),
                }}
                resizeMode="cover"
                borderRadius={fp(2)}>
                <Text
                  style={{
                    color: '#565555',
                    fontFamily: typography.Inter_Medium,
                    fontSize: fp(1.8),
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    flex: 1,
                  }}
                  onPress={() => handleViewImage(imageResponse)}>
                  View Image{' '}
                </Text>
              </ImageBackground>
            )}
          </View>
          {Object.keys(imageResponse).length <= 0 && (
            <ButtonComp title={'Add image'} onPress={handleAddImage} />
          )}
        </View>
        {/* <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Payment Number
          </Text>
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: '#565555',
              padding: wp(2),
            }}
            placeholder="#01974"
            placeholderTextColor="#565555"
            onChangeText={handlePaymentNumber}
          />
        </View> */}
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Division
          </Text>
          <DropDown
            placeHolderText={'Select Division'}
            handleValue={handleDivision}
            isFocus={isDivisionFocus}
            setIsFocus={setIsDivisionFocus}
            data={allDivisions.map((division: any, index: any) => ({
              label: division.division,
              value: division.division,
            }))}
            value={division}
            alternateFunction={getAllDivisions}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            District
          </Text>
          <DropDown
            placeHolderText={'Select District'}
            handleValue={handleDistrict}
            isFocus={isDistrictFocus}
            setIsFocus={setIsDistrictFocus}
            data={allDistricts}
            value={district}
            alternateFunction={getAllDistricts}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Upazilla
          </Text>
          <DropDown
            placeHolderText={'Select Upazilla'}
            handleValue={handleUpazilla}
            isFocus={isUpazillaFocus}
            setIsFocus={setIsUpazillaFocus}
            data={allUpazilla.map((upazilla: any, index: any) => ({
              label: upazilla,
              value: upazilla,
            }))}
            value={upazilla}
            alternateFunction={() => {
              allUpazilla.length === 0
                ? Snackbar.show({
                    text: 'Plese select district',
                    duration: 2000,
                    backgroundColor: color.RED,
                  })
                : null;
            }}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            School Name
          </Text>
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
            }}
            placeholder="Enter School Name"
            placeholderTextColor="#565555"
            onChangeText={handleSchoolName}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Class
          </Text>
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
            }}
            placeholder="Enter Class Name"
            placeholderTextColor="#565555"
            onChangeText={handleClass}
            keyboardType="number-pad"
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Student Name
          </Text>
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
            }}
            placeholder="Enter Student Name"
            placeholderTextColor="#565555"
            onChangeText={handleStudentName}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Mobile Number
          </Text>
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
            }}
            placeholder="Enter Your Mobile Number"
            placeholderTextColor="#565555"
            onChangeText={handleMobile}
          />
        </View>
        <View style={{marginTop: hp(2)}}>
          <Text
            style={{
              color: '#565555',
              fontFamily: typography.Inter_Medium,
              fontSize: fp(1.8),
            }}>
            Amount
          </Text>
          {/* <Text
            style={{
              // backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(4),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
              position: 'absolute',
            }}>
            ৳
          </Text> */}
          <TextInput
            style={{
              backgroundColor: 'rgba(54,75,159,0.2)',
              width: wp(90),
              borderRadius: fp(1),
              marginTop: hp(1),
              color: 'rgba(0,0,0,0.8)',
              padding: wp(2),
              // paddingLeft: wp(5),
            }}
            placeholder="Enter Amout"
            placeholderTextColor="#565555"
            onChangeText={handleAmount}
            keyboardType="number-pad"
          />
        </View>
      </KeyboardAwareScrollView>

      {showAddPhotoModal ? (
        <Pressable
          onPress={() => setShowAddPhotoModal(false)}
          style={{
            position: 'absolute',
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: hp(100),
            width: wp(100),
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              height: hp(28),
              width: wp(75),
              borderRadius: fp(2),
              position: 'absolute',
              backgroundColor: 'white',
              // bottom: 0,
              top: hp(20),
              marginHorizontal: wp(10),
              alignSelf: 'center',
              // left: 0,
              // right: 0,
            }}>
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Bold,
                fontSize: fp(2.2),
                color: color.PRIMARY_BLUE,
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Add Photo
            </CustomText>
            <View style={{borderTopWidth: fp(0.2), borderColor: color.GREY}} />
            <CustomText
              type={'typeRegular'}
              onPress={handleOpenCamera}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Camera
            </CustomText>
            <View style={{borderTopWidth: fp(0.1), borderColor: color.GREY}} />
            <CustomText
              onPress={handleOpenGallery}
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Gallery
            </CustomText>
            <View style={{borderTopWidth: fp(0.1), borderColor: color.GREY}} />
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(2),
                color: '#555555',
                // marginTop: hp(1),
                padding: fp(2),
              }}>
              Close
            </CustomText>
          </View>
        </Pressable>
      ) : null}
      <View style={{width: wp(90), marginBottom: hp(1)}}>
        <ButtonComp title={'Send Request'} onPress={handleSendPress} />
      </View>
      {loading && (
        <View style={styles.loadingIndicator}>
          <View style={styles.overlay} />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPaymentAlert}
        onRequestClose={() => setShowPaymentAlert(false)}>
        <CustomAlert
          title=""
          subTitle="Your details have been successfully saved. We will contact you once they have been verified."
          img={PaymentAlertIllus}
          isImg={false}
          onPress={() => {
            setShowPaymentAlert(false);
            navigation.goBack();
          }}
          onClosePress={() => {
            setShowPaymentAlert(false);
          }}
          btnTitle={'Done'}
        />
      </Modal>
    </View>
  );
};

export default AnalogPaymentForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 25,
  },
  loadingIndicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  },
});
