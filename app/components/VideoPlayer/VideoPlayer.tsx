import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Image,
  Button,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {fp, hp, wp} from '../../helpers/resDimension';
import Video, {VideoRef} from 'react-native-video';
import {
  Forward,
  OrientationIcon,
  PauseIcon,
  PlayIcon,
  Rewind,
} from '../../assets/images';

import Orientation from 'react-native-orientation-locker';
import Slider from '@react-native-community/slider';
import {typography} from '../../assets/fonts/typography';
import {color} from '../../constants/colors/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const VideoPlayerEx = ({uri, handleIsLandscapeCb}) => {
  const isFocus = useIsFocused();
  useEffect(() => {
    setPaused(!isFocus);
  }, [isFocus]);
  useEffect(() => {
    Orientation.unlockAllOrientations(); // Allow both portrait and landscape orientations
    return () => {
      Orientation.lockToPortrait(); // Lock the orientation back to landscape when leaving the screen
    };
  }, []);
  const videoRef = useRef<any>(null);
  //states
  const [isLandscape, setIsLandscape] = useState(false);
  const [isVideoPlayerActive, setIsVideoPlayerActive] = useState(true);
  // const [isMuted, setIsMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0.2);
  const [duration, setDuration] = useState(0);

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
    setDuration(data.seekableDuration);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  //ten sec backward
  const handleBackwardTenSec = () => {
    // const DOUBLE_PRESS_DELAY = 200;
    if (videoRef.current) {
      const newTime = currentTime - 10;
      videoRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleForwardTenSec = () => {
    if (videoRef.current) {
      const newTime = currentTime + 10;
      videoRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const onSeekComplete = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
      setCurrentTime(value);
      setPaused(false);
    }
  };

  const onSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
      console.log(typeof value);
      // setCurrentTime(value);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsLandscape(!isLandscape);
    handleIsLandscapeCb(!isLandscape);
  };

  return (
    <View style={{}}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={color.PRIMARY_BLUE}
          style={styles.loader}
        />
      )}
      <TouchableOpacity
        style={{
          width: '100%',
          // height: isLandscape ? '100%' : hp(30),
          height: isLandscape ? '100%' : null,
        }}
        activeOpacity={1}
        onPress={() => {
          setIsVideoPlayerActive(!isVideoPlayerActive);
        }}>
        <Video
          resizeMode="contain"
          ref={videoRef}
          // muted={isMuted}
          repeat
          paused={paused}
          // controls={true}
          source={{
            uri: uri,
          }}
          style={[
            isLandscape ? styles.video_horizontal : styles.video_vertical,
          ]}
          // rate={playbackSpeed}
          onProgress={onProgress}
          onLoadStart={onLoadStart}
          // selectedVideoTrack={{
          //   type: 'resolution',
          //   value: 480,
          // }}

          // onVideoLoadStart={onVideoLoadStart}
          // onError={onError}
          // onBuffer={onVideoBuffer}
          // onReadyForDisplay={onReadyForDisplay}
          // onLoad={onLoad}
        ></Video>

        {isVideoPlayerActive && (
          <Pressable
            onPress={() => {
              setIsVideoPlayerActive(!isVideoPlayerActive);
            }}
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}>
            <View
              style={
                isLandscape
                  ? styles.big_btns_flex_ver
                  : styles.big_btns_flex_hor
              }>
              <Pressable
                onPress={() => {
                  handleBackwardTenSec();
                }}>
                <Image
                  source={Rewind}
                  // style={{height: hp(4), width: hp(4)}}
                  style={styles.big_imgs_style}
                  resizeMode="contain"
                />
              </Pressable>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  togglePlayPause();
                }}>
                <Image
                  source={paused ? PauseIcon : PlayIcon}
                  style={[styles.big_imgs_style, {tintColor: 'white'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleForwardTenSec();
                }}>
                <Image
                  source={Forward}
                  // style={{height: hp(4), width: hp(4)}}
                  style={styles.big_imgs_style}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
        <Slider
          testID={uri}
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor={color.PRIMARY_BLUE}
          maximumTrackTintColor={color.WHITE}
          thumbTintColor={color.PRIMARY_BLUE}
          onValueChange={onSeek}
          onSlidingComplete={onSeekComplete}
        />
        <View style={styles.bottom_things_con}>
          <View
            style={{
              flexDirection: 'row',
              gap: isLandscape ? hp(3) : hp(2.7),
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={togglePlayPause}>
              <Image
                resizeMode="contain"
                source={paused ? PauseIcon : PlayIcon}
                style={[styles.small_imgs_style, {tintColor: 'white'}]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsVideoPlayerActive(true);
            toggleOrientation();
          }}
          style={{
            position: 'absolute',
            right: hp(2),
            bottom: hp(1.6),
          }}>
          <Image
            source={OrientationIcon}
            style={styles.small_imgs_style_landscape}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(VideoPlayerEx);
const styles = StyleSheet.create({
  backgroundVideo: {
    height: hp(40),
    width: wp(40),
    backgroundColor: 'white',
  },

  video_vertical: {
    width: wp(100),
    height: hp(30),
  },
  video_horizontal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  small_imgs_style: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: hp(2.2),
  },
  big_btns_flex_ver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(15),
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
  },
  big_btns_flex_hor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(7.5),
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
  },
  big_imgs_style: {
    // aspectRatio: 1,
    resizeMode: 'contain',
    height: fp(5),
    width: fp(3),
    // height: '30%',
  },
  slider: {
    width: '100%',
    bottom: '14%',
    height: hp(2),
    position: 'absolute',
  },
  bottom_things_con: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: '4%',
    left: '6%',
  },
  timeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: hp(1),
    width: '100%',
  },
  timeText: {
    color: '#ffffff',
    fontSize: fp(1.6),
    fontFamily: typography.Inter_Regular,
  },
  small_imgs_style_landscape: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: hp(2),
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
  },
});

//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
