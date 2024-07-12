import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export const checkFileStatus = async item => {
  try {
    const pdfUrl = item?.pdf_book;

    if (!pdfUrl) {
      console.error('PDF URL is not provided.');
      return {[item?.id]: 'download'};
    }

    // Extract file name (portion after last /)
    const fileNameWithExtension = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
    const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
    const filePath = `${cacheDir}/${fileNameWithExtension}`;
    let newFilePath = filePath.replace(/%/g, '_');
    const previousLink = await AsyncStorage.getItem(item?.title);
    const fileExists = await RNFetchBlob.fs.exists(newFilePath);

    let status;
    if (fileExists) {
      if (!previousLink || previousLink !== newFilePath) {
        status = 'update';
      } else {
        status = 'read';
      }
    } else {
      if (previousLink && previousLink !== pdfUrl) {
        status = 'update';
      } else {
        status = 'download';
      }
    }

    return {[item.id]: status};
  } catch (error) {
    console.error('🚀 ~ checkFileStatus ~ Error:', error);
    return {[item.id]: 'download'}; // Set status to 'download' in case of error
  }
};
