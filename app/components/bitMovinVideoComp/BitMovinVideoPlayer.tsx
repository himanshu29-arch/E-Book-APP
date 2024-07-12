// import React, {useEffect, useCallback} from 'react';
// import {View, StyleSheet} from 'react-native';

// import {
//   usePlayer,
//   SourceType,
//   PlayerView,
//   ReadyEvent,
// } from 'bitmovin-player-react-native';
// import {hp} from '../../helpers/resDimension';

// export default function BitMovinVideoPlayerComp() {
//   const player = usePlayer({
//     // Bitmovin player license key
//     licenseKey: 'edf30a20-19fe-4e21-bc14-d85996cc23a7',
//     analyticsConfig: {
//       // Bitmovin analytics key from the Analytics Dashboard
//       licenseKey: '96bcba19-8228-44a8-b50b-84b2f9497c0b',
//     },
//   });

//   useEffect(() => {
//     player.load({
//       url: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
//       // url: 'https://sohojpora.s3.ap-south-1.amazonaws.com/book_videos/file_example_MP4_1920_18MG.mp4',
//       // type: SourceType.HLS,
//       type: SourceType.HLS,
//       title: 'Art of Motion',
//       analyticsSourceMetadata: {
//         videoId: 'reactnative-wizard-Art_of_Motion-1715942415682',
//         title: 'Art of Motion',
//         isLive: false,
//       },
//     });
//   }, [player]);

//   // onReady is called when the player has downloaded initial
//   // video and audio and is ready to start playback.
//   const onReady = useCallback(
//     (event: ReadyEvent) => {
//       // Start playback
//       player.play();
//       console.log(event.timestamp);
//     },
//     [player],
//   );

//   return (
//     <View style={styles.flex1}>
//       <PlayerView style={styles.flex1} player={player} onReady={onReady} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   flex1: {
//     flex: 1,
//     backgroundColor: 'black',
//     height: hp(30),
//   },
// });
