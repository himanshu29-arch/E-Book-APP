import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ButtonComp from '../../../components/button/Button';
import Header from '../../../components/header/Header';
import {color} from '../../../constants/colors/colors';
import {fp, hp, wp} from '../../../helpers/resDimension';
import {typography} from '../../../assets/fonts/typography';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiClient} from '../../../helpers/apiClient';
import {endpoints} from '../../../constants/colors/endpoints';
import CustomText from '../../../components/text/CustomText';
import {Modal} from 'react-native';
import CustomAlert from '../../../components/alerts/CustomAlert';
import {PaymentAlertIllus} from '../../../assets/images';
import date_one_year_from_today from '../../../utils/validDate/GetNextYear';
import {checkFileStatus} from '../../../helpers/pdfDownload/downloadHelper';
import {useDispatch, useSelector} from 'react-redux';
import {setPdfStatus, setPdfStatuses} from '../../../redux/pdfStatusSlice';

const PdfBooks = ({navigation, route}) => {
  const {category_data} = route.params;
  const downloadTask = useRef(null);
  const dispatch = useDispatch();
  const pdfStatus = useSelector(state => state.pdfStatus); // Ensure 'PdfStatus' matches the slice name in your Redux store
  console.log('🚀 ~ PdfBooks ~ pdfStatus:', pdfStatus);

  // const [statuses, setStatuses] = useState({});
  // const [status, setStatus] = useState('download');
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isApproved, setIsApproved] = useState('pending');
  const [progress, setProgress] = useState({});
  const [incompletedBooks, setIncompletedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    handleGetBooksByCategoryId();
    handleGetPaymentHistory();
  }, []);
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      handleGetBooksByCategoryId();
      handleGetPaymentHistory();
    });

    // Clean up the listener on component unmount
    return () => {
      focusListener();
    };
  }, [navigation]);

  const handleGetPaymentHistory = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      console.log('🚀 ~ handleGetPaymentHistory ~ user_id:', user_id);
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_PAYMENT_HISTORY_BY_USER_ID}${user_id}`,
      );
      if (response.status === 200) {
        console.log(response?.data, 'payment history');
        const isPurchased = response?.data?.some(
          item => item.category_id === category_data?.id,
        );
        const obj = response?.data?.filter(
          item => item.category_id === category_data?.id,
        );
        setIsPurchased(isPurchased);
        setIsApproved(obj[0]?.status);
        console.log(
          '🚀 ~ handleGetPaymentHistory ~ response?.data?.status:',
          response?.data[0]?.status,
        );
      }
    } catch (error) {
      console.log('🚀 ~ handleGetPaymentHistory ~ error:', error?.message);

      Snackbar.show({
        text: error.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleGetBooksByCategoryId = async () => {
    try {
      const initialStatuses = {};
      setIsLoading(true);
      const response = await apiClient.get(
        `${endpoints.GET_BOOKS_BY_CATEGORY_ID}${category_data.id}`,
      );
      console.log(
        '🚀 ~ handleGetBooksByCategoryId ~ response:',
        response?.data,
      );
      if (response.status === 200) {
        const incompletedBooks = response.data.filter(
          book => book.status === 'Incomplete',
        );
        setIncompletedBooks(incompletedBooks);
        const completedBooks = response.data.filter(
          book => book.status === 'Completed',
        );
        for (const item of completedBooks) {
          const status = await checkFileStatus(item);
          console.log('🚀 ~ handleGetBooksByCategoryId ~ status:', status);
          Object.assign(initialStatuses, status);
        }
        dispatch(setPdfStatuses(initialStatuses));
        // setStatuses(initialStatuses);

        setCompletedBooks(completedBooks);
      }
    } catch (error) {
      console.log('Error:', error.message);
      Snackbar.show({
        text: error.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const cancelDownload = () => {
    if (downloadTask.current) {
      downloadTask.current.cancel((err, taskId) => {
        if (err) {
          console.error('Download cancellation error:', err);
        } else {
          console.log(`Download ${taskId} cancelled`);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to cancel the download if it's still in progress
      cancelDownload();
    };
  }, []);

  const downloadPdf = async item => {
    console.log('download pdf');
    dispatch(setPdfStatus({id: item?.id, status: 'downloading'}));
    const pdfUrl = item?.pdf_book;

    const fileNameWithExtension = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);

    const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
    const filePath = `${cacheDir}/${fileNameWithExtension}`;
    let newFilePath = filePath.replace(/%/g, '_');
    console.log('🚀 ~ downloadPdf ~ newFilePath:', newFilePath);

    try {
      let downloadedSize = 0; // Initialize downloaded size to 0

      downloadTask.current = RNFetchBlob.config({
        path: newFilePath,
      })
        .fetch('GET', pdfUrl)
        .progress((received, total) => {
          downloadedSize = received; // Update the downloaded size
          const percentage = Math.min((received / total) * 100); // Calculate progress percentage based on received size
          console.log('🚀 ~ .progress ~ percentage:', percentage);
          // setProgress(percentage); // Update progress state
          setProgress(prevProgress => ({
            ...prevProgress,
            [item.id]: percentage, // Update progress state by book ID
          }));
        });
      const res = await downloadTask.current;
      if (res.info().status === 200) {
        // Alert.alert('Download complete', `File saved to cache at: ${filePath}`);
        Snackbar.show({
          text: 'The file has been successfully downloaded.',
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
        await AsyncStorage.setItem(item?.title, newFilePath);

        dispatch(setPdfStatus({id: item?.id, status: 'read'}));
      } else {
        Alert.alert('Download failed', `Status code: ${res.info().status}`);
        Snackbar.show({
          text: 'Download failed.',
          duration: 2000,
          backgroundColor: color.RED,
        });

        dispatch(setPdfStatus({id: item?.id, status: 'download'}));
      }
    } catch (error) {
      Alert.alert('Download error', error.message);

      dispatch(setPdfStatus({id: item?.id, status: 'download'}));
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    handleGetBooksByCategoryId();
    setRefreshing(false);
  }, []);
  // useEffect(() => {
  //   cleanCache();
  // }, []);

  // const cleanCache = async () => {
  //   console.log('clean cache');
  //   const fileName = `${BookDetails?.title}.pdf`;
  //   const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
  //   const filePath = `${cacheDir}/${fileName}`;

  //   try {
  //     const fileExists = await RNFetchBlob.fs.exists(filePath);
  //     if (fileExists) {
  //       await RNFetchBlob.fs.unlink(filePath);
  //       Alert.alert('File deleted', `File at ${filePath} has been deleted.`);
  //       setFilePath('');
  //       setStatus('download');
  //       // setProgress(0);
  //     } else {
  //       Alert.alert('File not found', 'No file found in cache to delete.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Delete error', error.message);
  //   }
  // };

  const handleButtonPress = item => {
    console.log('🚀 ~ handleButtonPress ~ item:', item);
    const status = pdfStatus[item?.id];
    console.log('🚀 ~ handleButtonPress ~ statuses:', pdfStatus);
    console.log('🚀 ~ handleButtonPress ~ status:', status);
    if (status === 'download') {
      downloadPdf(item);
    } else if (status === 'read') {
      console.log('🚀 ~ handleButtonPress ~ item:', item);
      cancelDownload();
      navigation.navigate('PdfViewer', {BookDetails: item});
    } else if (status === 'update') {
      downloadPdf(item);
    }
  };
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const renderItem = useCallback(
    ({item, index}) => {
      const status = pdfStatus[item?.id];
      return (
        <View style={styles.bookContainer}>
          <Image source={{uri: item?.cover_pic}} style={styles.coverImage} />
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.description}>{item?.description}</Text>
            {status === 'downloading' && (
              <View style={{marginBottom: hp(2)}}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      {width: `${progress[item?.id] || 0}%`},
                    ]}
                  />
                </View>
                <Text style={{color: color.PRIMARY_BLUE, marginLeft: wp(3)}}>
                  {progress[item?.id]?.toFixed(0)}%
                </Text>
              </View>
            )}
            {status !== 'downloading' &&
              isApproved == 'approved' &&
              item?.status == 'Completed' &&
              isPurchased && (
                <View style={styles.buttonContainer}>
                  <ButtonComp
                    title={
                      status === 'download'
                        ? 'Download'
                        : status == 'read'
                        ? 'Read Book'
                        : 'Update'
                    }
                    padding={fp(1)}
                    fontSize={fp(1.6)}
                    onPress={() => handleButtonPress(item)}
                  />
                </View>
              )}
          </View>
        </View>
      );
    },
    [pdfStatus, progress, isApproved, isPurchased, downloadPdf],
  );
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={color.PRIMARY_BLUE}
        barStyle="light-content"
      />
      <Header
        title={`${category_data?.name} Books`}
        backgroundColor={color.PRIMARY_BLUE}
        font={'regular'}
        leftIconName={'leftArrow'}
      />
      {completedBooks.length > 0 ? (
        <FlatList
          data={completedBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[
                color.PRIMARY_BLUE,
                color.PRIMARY_BLUE,
                color.PRIMARY_BLUE,
              ]} // Customize colors
            />
          }
        />
      ) : (
        // <View style={styles.loadingIndicator}>
        <Text
          style={{
            flex: 1,
            justifyContent: 'center',
            color: 'black',
            textAlignVertical: 'center',
            fontWeight: '600',
            fontSize: fp(1.8),
          }}>
          {' '}
          No Books found for this category
        </Text>
        // </View>
      )}
      {incompletedBooks.length > 0 && (
        <View
          style={{
            width: wp(100),
            backgroundColor: 'rgba(54, 75, 159, 0.3)',
            padding: fp(1),
            marginTop: hp(3),
          }}>
          <Text
            style={{
              color: color.PRIMARY_BLUE,
              fontFamily: typography.Inter_Bold,
              fontSize: fp(2.4),
              alignSelf: 'center',
            }}>
            UPCOMING
          </Text>
        </View>
      )}
      {incompletedBooks.length > 0 && (
        <FlatList
          data={incompletedBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      {!isPurchased && (
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
            width: wp(100),
          }}>
          <View style={{}}>
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
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_SemiBold,
                  fontSize: fp(1.8),
                  color: 'black',
                  lineHeight: fp(2.7),
                  // marginTop: hp(3),
                  alignSelf: 'center',
                  textDecorationLine: 'line-through',
                }}>
                ৳ {Number(category_data?.price) + 500}.00
              </CustomText>
              {'  '}৳ {category_data?.price}
            </CustomText>
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Medium,
                fontSize: fp(1.5),
                color: 'black',
                marginLeft: wp(2),
              }}>
              {/* Validity {date_one_year_from_today} */}
              Validity 31 Dec 2024
            </CustomText>
          </View>
          <ButtonComp
            marginTop={0}
            title="Buy Now"
            onPress={() => {
              setShowPaymentAlert(true);
            }}
          />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPaymentAlert}
        onRequestClose={() => setShowPaymentAlert(false)}>
        <CustomAlert
          title="Secure Payment Process"
          subTitle="Secure payment gateway that keeps you safe from fraudsters and thieves"
          img={PaymentAlertIllus}
          isImg={true}
          onPress={() => {
            setShowPaymentAlert(false);
            navigation.navigate('AnalogPaymentForm', {
              category_data: category_data,
            });
          }}
          onClosePress={() => {
            setShowPaymentAlert(false);
          }}
          btnTitle="Make Payment"
        />
      </Modal>
      {isLoading && (
        <View style={styles.loadingIndicator}>
          <View style={styles.overlay} />
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: color.WHITE,
  },
  bookContainer: {
    marginTop: hp(4),
    maxHeight: hp(25),
    width: wp(90),
    borderColor: color.PRIMARY_BLUE,
    borderWidth: 1.5,
    borderRadius: fp(1),
    elevation: 5,
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    // padding: fp(0.5),
  },
  coverImage: {
    height: fp(18),
    width: fp(16),
    marginLeft: wp(2),
    alignSelf: 'center',
    borderRadius: fp(1),
  },
  title: {
    color: color.DIM_BLACK,
    fontSize: fp(2),
    fontFamily: typography.Inter_Bold,
    marginTop: hp(2.2),
    marginLeft: wp(3),
    width: wp(50),
  },
  description: {
    color: color.DIM_BLACK,
    fontSize: fp(1.8),
    fontFamily: typography.Inter_Medium,
    marginTop: hp(0.5),
    marginLeft: wp(3),
    width: wp(50),
  },
  // progressBar: {
  //   marginTop: hp(1),
  //   marginLeft: wp(3),
  //   width: wp(48),
  // },
  buttonContainer: {
    width: wp(30),
    height: hp(8),
    marginLeft: wp(2),
    // position: 'absolute',
    // bottom: 0,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  progressBar: {
    marginTop: hp(1),
    marginLeft: wp(3),
    width: wp(48),
    height: hp(2),
    backgroundColor: '#ddd',
    borderRadius: 4,

    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: color.PRIMARY_BLUE,
    // marginBottom: hp(3),
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

export default PdfBooks;
