import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Pressable,
  Platform,
  ToastAndroid,
  Alert,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {CommentMenu, DummyProfImg} from '../../../assets/images';
import Header from '../../../components/header/Header';
import {color} from '../../../constants/colors/colors';
import CustomText from '../../../components/text/CustomText';
import {typography} from '../../../assets/fonts/typography';
import {fp, hp, wp} from '../../../helpers/resDimension';
import LikeButton from '../../../components/LikeButton/LikeButton';
import {apiClient} from '../../../helpers/apiClient';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentInput from '../../../components/commentInput/CommentInput';
import CommentReplyInput from '../../../components/commentInput/CommentReplyInput';
import CommentMenuModal from '../../../components/CommentMenu/CommentMenuModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CommentAlert from '../../../components/CommentAlert/CommentAlert';
import VideoPlayerEx from '../../../components/VideoPlayer/VideoPlayer';
import {BASE_URL} from '../../../constants/storageKeys';
import {useDispatch} from 'react-redux';

import {dislike, like} from '../../../redux/likeSlice';
import DislikeButton from '../../../components/LikeButton/DislikeButton';
import CommentButton from '../../../components/LikeButton/CommentButton';
import {useNavigationState} from '@react-navigation/native';
import {EditProfile} from '../../../assets/ProfileMenu';
const BookVideos: React.FC = ({navigation, route}) => {
  const {BookDetails, VideoUri} = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, SetCommentText] = useState('');
  const [commentsData, setCommentsData] = useState([]);
  const [editCommentFlow, setEditCommentFlow] = useState(false);
  const [editReplyFlow, setEditReplyFlow] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [commentIdTobeEdit, setCommentIdTobeEdit] = useState();
  const [replyIdTobeEdit, setReplyIdTobeEdit] = useState();
  const [imageResponseUI, setImageResponseUI] = useState({});

  const [bookVideosRes, setBookVideosRes] = useState([]);
  const [openCommentMenuIndex, setOpenCommentMenuIndex] = useState(null);
  const [openCommentReplyMenuIndex, setOpenCommentReplyMenuIndex] =
    useState(null);
  const [showCommentReplyInputIndex, setShowCommentReplyInputIndex] =
    useState(null);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showCommentAlert, setShowCommentAlert] = useState(false);
  const [imageResponse, setImageResponse] = useState({});
  const [likePressed, setLikePressed] = useState('');
  const [disLikePressed, setDisLikePressed] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);
  const refInput = useRef<TextInput>(null);
  const refReplyInput = useRef<TextInput>(null);

  const [userId, setUserId] = useState('');

  useEffect(
    () => {
      handleGetBookVideos();
    },
    [
      // handleCommentDelete,
      // // handleCommentEdit,
      // // handleCommentReply,
      // handleSendComment,
      // handleSendCommentReply,
      // handleSendEditedComment,
      // handleSendEditedReply,
    ],
  );

  const handleGetBookVideos = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    setUserId(user_id);
    try {
      setIsLoading(true);
      // const response = await apiClient.get(`books/${BookDetails.id}/videos`);
      const response = await apiClient.post(`/videos/details`, {
        video_url: VideoUri,
      });

      if (response.status === 200) {
        setBookVideosRes(response?.data?.video);
        console.log(response?.data?.video?.likes);
        console.log(response?.data?.video?.dislikes);

        const isLiked =
          response?.data?.video?.likes.find(
            item => item.id === Number(user_id),
          ) !== undefined;
        console.log('🚀 ~ handleGetBookVideos ~ isLiked:', isLiked);
        const isDisliked =
          response?.data?.video?.dislikes.find(
            item => item.id === Number(user_id),
          ) !== undefined;
        console.log('🚀 ~ handleGetBookVideos ~ isDisliked:', isDisliked);
        if (isLiked) {
          dispatch(like(true));
          dispatch(dislike(false));
        } else if (isDisliked) {
          dispatch(like(false));
          dispatch(dislike(true));
        } else {
          dispatch(like(false));
          dispatch(dislike(false));
        }

        setIsLoading(false);
        handleGetCommentsData(response?.data?.video?.id);
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
  function handleCommentMenu(commentId) {
    setOpenCommentMenuIndex(
      commentId === openCommentMenuIndex ? null : commentId,
    );
  }
  function handleCommentReplyMenu(commentId) {
    setOpenCommentReplyMenuIndex(
      commentId === openCommentReplyMenuIndex ? null : commentId,
    );
  }

  function handleCommentReply(commentId) {
    // to be reply input box

    setShowCommentReplyInputIndex(
      commentId === showCommentReplyInputIndex ? null : commentId,
    );
  }

  async function handleLikePress() {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.post(
        `http://43.204.161.117/api/videos/${bookVideosRes?.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        // setLikePressed(likePressed == 'like_pressed' ? '' : 'like_pressed');
        // setLikePressed(
        //   bookVideosRes?.likes.some(obj => Object.values(obj).includes(userId))
        //     ? 'like_pressed'
        //     : '',
        // );
        handleGetBookVideos();
        setIsLoading(false);
        Snackbar.show({
          text: response.data.message,
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
      }
    } catch (error) {
      console.log('inside catch', error?.message);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDislikePress() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('🚀 ~ handleLikePress ~ token:', token);
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}videos/${bookVideosRes?.id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        console.log(
          '🚀 ~ handleGetBookVideos ~ response?.data:',
          response?.data,
        );
        handleGetBookVideos();
        setLikePressed(''); //added to change the color of like when dislike pressed..
        setIsLoading(false);
        Snackbar.show({
          text: response.data.message,
          duration: 2000,
          backgroundColor: color.RED,
        });
      }
    } catch (error) {
      console.log('inside catch', error?.message);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendComment() {
    console.log(
      '🚀 ~ handleSendComment ~ handleSendComment: ',
      bookVideosRes?.id,
    );
    console.log('🚀 ~ handleSendComment ~ commentText:', commentText);
    console.log('🚀 ~ handleSendComment ~ commentText:', imageResponse);
    refInput.current?.blur();
    SetCommentText('');

    const formData = new FormData();
    if (commentText != '') {
      formData.append('content', commentText);
    } else {
      Snackbar.show({
        text: 'Please add text to comment',
        duration: 2000,
        backgroundColor: color.RED,
      });
    }
    if (Object.keys(imageResponse).length != 0) {
      formData.append('image', {
        uri: imageResponse.uri,
        name: imageResponse.fileName,
        type: imageResponse.type,
      });
    }
    console.log(formData, 'formData');
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('🚀 ~ handleSendComment ~ token:', token);
      setIsLoading(true);
      const response = await axios.post(
        // `http://43.204.161.117/api/videos/${bookVideosRes?.id}/comments`,
        `http://43.204.161.117/api/videos/${bookVideosRes?.id}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response?.status);
      if (response?.status === 201) {
        handleGetCommentsData(bookVideosRes?.id);

        setIsLoading(false);
        SetCommentText('');
        setImageResponse({});
        setImageResponseUI({});
        setShowCommentAlert(true);
        Snackbar.show({
          text: 'Your comment successfully uploaded',
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
        // setTimeout(() => {
        //   setShowCommentAlert(false);
        // }, 3000);
      }
    } catch (error) {
      console.log('🚀 ~ handleSendComment ~ error:', error);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendEditedComment() {
    refInput.current?.blur();
    SetCommentText('');
    const formData = new FormData();
    if (commentText != '') {
      formData.append('content', commentText);
    } else {
      Snackbar.show({
        text: 'Please add text to comment',
        duration: 2000,
        backgroundColor: color.RED,
      });
    }
    if (Object.keys(imageResponse).length != 0) {
      formData.append('image', {
        uri: imageResponse.uri,
        name: imageResponse.fileName,
        type: imageResponse.type,
      });
    }
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.post(
        `http://43.204.161.117/api/comments/${commentIdTobeEdit}`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        handleGetCommentsData(bookVideosRes?.id);
        setIsLoading(false);
        SetCommentText('');
        setImageResponse({});
        setImageResponseUI({});
        Snackbar.show({
          text: response?.data?.message,
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
      }
    } catch (error) {
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendCommentReply(commentId) {
    console.log('🚀 ~ handleSendCommentReply ~ handleSendCommentReply:');
    setReplyText('');
    const formData = new FormData();
    formData.append('content', replyText);
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.post(
        `http://43.204.161.117/api/comments/${commentId}/replies`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 201) {
        handleCommentReply(commentId);
        handleGetCommentsData(bookVideosRes?.id);
        setIsLoading(false);
        setReplyText('');
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
  }

  async function handleSendEditedReply(commentId) {
    console.log('🚀 ~ handleSendEditedReply ~ handleSendEditedReply');
    setReplyText('');
    const formData = new FormData();
    formData.append('content', replyText);
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.post(
        `http://43.204.161.117/api/replies/${replyIdTobeEdit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        handleCommentReply(commentId);
        handleGetCommentsData(bookVideosRes.id);
        setIsLoading(false);
        setReplyText('');
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
  }

  function onChangeComment(val) {
    SetCommentText(val);
  }
  function onChangeCommentReply(val) {
    setReplyText(val);
  }

  async function handleGetCommentsData(id) {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `http://43.204.161.117/api/videos/${id}/comments-replies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        setCommentsData(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCommentDelete(commentId) {
    console.log('🚀 ~ handleCommentDelete ~ commentId:', commentId);
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.delete(
        `http://43.204.161.117/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        handleGetCommentsData(bookVideosRes.id);
        handleGetBookVideos();
        setIsLoading(false);
        Snackbar.show({
          text: response?.data?.message,
          duration: 2000,
          backgroundColor: color.PRIMARY_BLUE,
        });
      }
    } catch (error) {
      console.log('inside catch comment delete', error?.message);
      Snackbar.show({
        text: response?.data?.message,
        duration: 2000,
        backgroundColor: color.RED,
      });
      // }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReplyDelete(commentId) {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsLoading(true);
      const response = await axios.delete(
        `http://43.204.161.117/api/replies/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.status, 'response.status');
      if (response.status === 200) {
        handleGetCommentsData(bookVideosRes.id);
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
  }

  function handleCommentEdit(item) {
    refInput.current?.focus();
    setEditCommentFlow(true);
    handleCommentMenu(item?.id);
    SetCommentText(item.content);
    setImageResponseUI({uri: item?.image});
    setCommentIdTobeEdit(item?.id);
  }

  function handleReplyEdit(item) {
    setEditReplyFlow(true);
    console.log('🚀 ~ handleReplyEdit ~ handleReplyEdit:');
    refReplyInput.current?.focus();
    handleCommentReply(item?.comment_id);

    setReplyIdTobeEdit(item?.id);
    handleCommentReplyMenu(item?.id);
    setReplyText(item.content);
  }

  function handleAddAttachment() {
    setShowAddPhotoModal(true);
  }
  function returnCommentCreatedTime(created_at) {
    const currentDate = new Date();
    const pastDate = new Date(created_at);
    const differenceInMilliseconds = Math.abs(currentDate - pastDate);
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    return Math.ceil(differenceInDays);
  }
  function renderCommentReply({item}) {
    console.log('🚀 ~ renderCommentReply ~ item:', item);
    const timeAgo = returnCommentCreatedTime(item?.created_at);
    return (
      <View
        style={{
          marginHorizontal: wp(2),
          marginBottom: openCommentReplyMenuIndex == item?.id ? hp(5) : hp(1),
          flexDirection: 'row',
          width: wp(20),
        }}>
        <Image
          source={EditProfile}
          style={{height: fp(6), width: fp(6), marginTop: hp(2)}}
          resizeMode="contain"
        />

        <View style={{marginLeft: wp(1.6), marginTop: hp(2)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: fp(1.4),
              justifyContent: 'space-between',
            }}>
            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Bold,
                fontSize: fp(1.5),
                color: '#565555',
              }}>
              SohibMirza
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Medium,
                  fontSize: fp(1.4),
                  color: '#9E9E9E',
                }}>
                {`  ${timeAgo} ${timeAgo == 1 ? 'day' : 'days'} ago`}
              </CustomText>
            </CustomText>
            {openCommentReplyMenuIndex === item?.id && (
              <CommentMenuModal
                handleCommentEdit={() => handleReplyEdit(item)}
                handleCommentDelete={() => {
                  handleReplyDelete(item?.id);
                }}
              />
            )}
            <Pressable
              style={{height: fp(2), width: fp(2)}}
              onPress={() => {
                handleCommentReplyMenu(item?.id);
              }}>
              <Image
                source={CommentMenu}
                style={{
                  height: fp(2),
                  width: fp(2),
                  marginTop: hp(0.2),
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <CustomText
            type={'typeRegular'}
            style={{
              fontFamily: typography.Inter_Regular,
              fontSize: fp(1.4),
              color: '#565555',
              width: wp(65),
              marginTop: hp(0.6),
              textAlign: 'justify',
              lineHeight: 15,
            }}>
            {item?.content}
          </CustomText>
        </View>
      </View>
    );
  }

  function renderComments({item}) {
    const timeAgo = returnCommentCreatedTime(item?.created_at);
    return (
      <View
        style={{
          backgroundColor: 'white',
          elevation: 1,
          width: '95%',
          alignSelf: 'center',
          borderRadius: fp(1),
          marginVertical: hp(1),
          zIndex: -100,
        }}>
        <View
          style={{
            marginHorizontal: wp(2),
            flexDirection: 'row',
            width: wp(20),
          }}>
          <Image
            source={EditProfile}
            style={{height: fp(6), width: fp(6), marginTop: hp(2)}}
            resizeMode="contain"
          />
          <View style={{marginLeft: wp(1.6), marginTop: hp(2)}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: fp(1.4),
                justifyContent: 'space-between',
              }}>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Bold,
                  fontSize: fp(1.5),
                  color: '#565555',
                }}>
                SohibMirza
                <CustomText
                  type={'typeRegular'}
                  style={{
                    fontFamily: typography.Inter_Medium,
                    fontSize: fp(1.4),
                    color: '#9E9E9E',
                  }}>
                  {`  ${timeAgo} ${timeAgo == 1 ? 'day' : 'days'} ago`}
                  {/* {'    '}5 months ago */}
                </CustomText>
              </CustomText>
              {openCommentMenuIndex === item?.id ? (
                <CommentMenuModal
                  handleCommentEdit={() => handleCommentEdit(item)}
                  handleCommentDelete={() => {
                    handleCommentDelete(item?.id);
                  }}
                />
              ) : null}

              {parseInt(userId) === item?.user_id ? (
                <Pressable
                  style={{height: fp(2), width: fp(2)}}
                  hitSlop={fp(4)}
                  onPress={() => {
                    handleCommentMenu(item?.id);
                  }}>
                  <Image
                    source={CommentMenu}
                    style={{
                      height: fp(2),
                      width: fp(2),
                      marginTop: hp(0.2),
                      alignSelf: 'flex-end',
                      // marginRight: 20,
                      right: 10,
                      position: 'absolute',
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              ) : null}
            </View>
            {item?.image ? (
              <Image
                source={{uri: item?.image}}
                style={{
                  height: fp(8),
                  width: fp(12),
                  marginTop: hp(2),
                  borderRadius: fp(1),
                }}
                resizeMode="cover"
              />
            ) : null}

            <CustomText
              type={'typeRegular'}
              style={{
                fontFamily: typography.Inter_Regular,
                fontSize: fp(1.4),
                color: '#565555',
                width: wp(75),
                marginTop: hp(0.6),
                textAlign: 'justify',
                lineHeight: 15,
              }}>
              {item?.content}
            </CustomText>

            <Pressable
              onPress={() => handleCommentReply(item?.id)}
              style={{marginTop: hp(1)}}>
              <CustomText
                type={'typeRegular'}
                style={{
                  fontFamily: typography.Inter_Medium,
                  fontSize: fp(1.4),
                  color: '#9E9E9E',
                }}>
                Reply
              </CustomText>
            </Pressable>

            <View style={{marginTop: hp(1.4)}}>
              <FlatList data={item.replies} renderItem={renderCommentReply} />
            </View>
          </View>
        </View>
        {showCommentReplyInputIndex == item?.id ? (
          <CommentReplyInput
            refReplyInput={refReplyInput}
            commentText={replyText}
            onChangeComment={onChangeCommentReply}
            handleSendComment={() =>
              editReplyFlow
                ? handleSendEditedReply(item?.id)
                : handleSendCommentReply(item?.id)
            }
          />
        ) : null}
      </View>
    );
  }

  const toast = (visible: boolean, message: string) => {
    if (visible) {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        Alert.alert(message, message);
      }
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const handleOpenCamera = async () => {
    const isCameraPermitted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    // if (isCameraPermitted) {
    try {
      await launchCamera(
        {
          mediaType: 'photo',
        },
        response => {
          console.log('🚀 ~ handleOpenGallery ~ response:', response);

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
            setImageResponseUI(response?.assets[0]);
          }
        },
      );
    } catch (error) {
      console.error('Error launching camera:', error);
    }
    // }
    setShowAddPhotoModal(false);
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
            setImageResponseUI(response?.assets[0]);
          }
        },
      );
    }
    setShowAddPhotoModal(false);
  };

  const handleIsLandscapeCb = (params: type) => {
    console.log('🚀 ~ handleIsLandscapeCb ~ params:', params);
    setIsLandscape(params);
  };
  // function handleIsLandscapeCb(params) {

  // }

  function onLeftPress() {
    navigation.goBack();
    // navigation.navigate('PdfViewer', {BookDetails: BookDetails});
    setPause(true);
    return true;
  }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', onLeftPress);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', onLeftPress);
  // }, []);

  const [pause, setPause] = useState(true);
  function handleCommentPress() {}

  return (
    <View style={{flex: 1}}>
      {!isLandscape ? (
        <>
          <Header
            title={'Video'}
            backgroundColor={color.PRIMARY_BLUE}
            font={'regular'}
            leftIconName={'leftArrow'}
            onPress={onLeftPress}
          />
        </>
      ) : null}
      <StatusBar
        hidden={!isLandscape ? false : true}
        backgroundColor={color.PRIMARY_BLUE}
        barStyle="light-content"
      />
      <VideoPlayerEx uri={VideoUri} handleIsLandscapeCb={handleIsLandscapeCb} />
      {/* <View style={{flex: 1}}> */}
      <View style={{marginLeft: wp(4)}}>
        <CustomText
          type={'typeRegular'}
          style={{
            fontFamily: typography.Inter_Bold,
            fontSize: fp(2.8),
            color: color.PRIMARY_BLUE,
            marginTop: hp(1),
          }}>
          {bookVideosRes?.title}
        </CustomText>
      </View>
      <View style={styles.likeButtonContainer}>
        <LikeButton
          imgName={'like'}
          count={bookVideosRes?.likesCount}
          onPress={handleLikePress}
          pressed={likePressed}
        />
        <CommentButton
          imgName={'comment'}
          count={bookVideosRes?.comments?.length}
          onPress={handleCommentPress}
          pressed={'comment'}
        />
        <DislikeButton
          imgName={'dislike'}
          count={bookVideosRes?.dislikesCount}
          onPress={handleDislikePress}
        />
      </View>
      <ScrollView>
        {/* {likePressed == && (
          <CustomText
            type={'typeRegular'}
            style={{
              fontFamily: typography.Inter_Bold,
              fontSize: fp(1.2),
              color: '#878787',
              marginLeft: wp(3),
              marginTop: hp(1),
            }}>
            Shubham liked this video
          </CustomText>
        )} */}
        <View
          style={{
            marginBottom: hp(1),
            // backgroundColor: 'green',
          }}>
          <View
            style={{
              borderWidth: fp(0.1),
              borderColor: '#F7F7F7',
              marginTop: hp(2),
            }}
          />

          <CommentInput
            refInput={refInput}
            commentText={commentText}
            onChangeComment={onChangeComment}
            handleSendComment={
              editCommentFlow ? handleSendEditedComment : handleSendComment
            }
            handleAddAttachment={handleAddAttachment}
            uri={imageResponseUI?.uri ? imageResponseUI?.uri : null}
            isLandscape={isLandscape}
          />
        </View>

        {/* //?comment section */}
        <View
          style={{flex: 1, paddingBottom: hp(2), backgroundColor: '#F7F7F7'}}>
          <FlatList data={commentsData} renderItem={renderComments} />
        </View>
        {/* </View> */}

        {/* {
          showCommentAlert &&
            Snackbar.show({
              text: 'Your comment successfully uploaded',
              duration: 2000,
              backgroundColor: color.PRIMARY_BLUE,
            })
          // ;
          //     <CommentAlert handleClosePress={() => setShowCommentAlert(false)} />
        } */}
      </ScrollView>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={color.PRIMARY_BLUE}
          style={styles.loadingIndicator}
        />
      )}

      {showAddPhotoModal ? (
        <Pressable
          onPress={() => setShowAddPhotoModal(false)}
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  modal_container_vertical: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: responsiveHeight(2),
    right: responsiveHeight(7),
    borderRadius: responsiveHeight(0.2),
    width: responsiveHeight(9),
  },
  modal_container_horizontal: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: responsiveHeight(5),
    right: responsiveHeight(25),
    borderRadius: responsiveHeight(0.2),
    width: responsiveHeight(17),
  },
  speed_option_vertical: {
    padding: responsiveHeight(1),
    alignSelf: 'center',
  },

  speed_option_horizontal: {
    padding: responsiveHeight(0.4),
    alignSelf: 'center',
  },
  speed_option_vert: {
    color: '#ffffff',
    fontSize: responsiveHeight(3),
  },
  speed_option_text_hori: {
    color: '#ffffff',
    fontSize: responsiveHeight(1.3),
  },
  speed_option_hori: {
    color: '#ffffff',
    fontSize: responsiveHeight(1.4),
  },

  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 999,
  },
  big_imgs_style: {
    // aspectRatio: 1,
    resizeMode: 'contain',
    height: fp(6),
    width: fp(3),
    // height: '30%',
  },
  small_imgs_style: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: responsiveHeight(1.8),
  },
  big_btns_flex_ver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsiveHeight(15),
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
  },
  big_btns_flex_hor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsiveHeight(7.5),
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
  },

  likeButtonContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(2),
    justifyContent: 'flex-start',
    gap: fp(0.8),
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BookVideos;
