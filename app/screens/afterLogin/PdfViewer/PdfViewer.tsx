import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Linking,
  ActivityIndicator,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {color} from '../../../constants/colors/colors';

import RNFetchBlob from 'rn-fetch-blob';

const PdfViewer = ({navigation, route}) => {
  const {BookDetails} = route.params;
  console.log('🚀 ~ PdfViewer ~ BookDetails:', BookDetails);
  const pdfUrl = BookDetails.pdf_book;
  console.log('🚀 ~ PdfViewer ~ pdfUrl:', pdfUrl);
  console.log('🚀 ~ PdfViewer ~ BookDetails.pdf_book:', BookDetails.pdf_book);
  const fileNameWithExtension = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
  console.log('🚀 ~ PdfViewer ~ fileNameWithExtension:', fileNameWithExtension);
  const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
  console.log('🚀 ~ PdfViewer ~ cacheDir:', cacheDir);
  const filePath = `${cacheDir}/${fileNameWithExtension}`;
  console.log('🚀 ~ PdfViewer ~ filePath:', filePath);
  // Find the part of the string between 'cache/' and '.pdf'
  let start = filePath.lastIndexOf('cache/') + 6; // length of 'cache/' is 6
  let end = filePath.lastIndexOf('.pdf');
  let substring = filePath.substring(start, end);

  // // Extract the last 8 characters from the substring
  let last8Chars = substring.slice(-8);
  console.log('🚀 ~ PdfViewer ~ last8Chars:', last8Chars);
  // // Create the new file path
  let newFilePath = filePath.replace(/%/g, '_');
  console.log(newFilePath);

  // const filePath = `${cacheDir}/${url}`;

  const source = {
    uri: newFilePath,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          navigation.navigate('BookVideos', {
            BookDetails: BookDetails,
            VideoUri: uri,
          });
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
    backgroundColor: color.WHITE,
  },
  pdf: {
    flex: 1,

    // width: wp(100),
    // height: hp(100),
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
