import * as Font from 'expo-font';
export const initFonts = async () => {
  await Font.loadAsync({
    Inasnibc: require('./Insanibc'),
    Inter_Black: require('./Inter-Black'),
    Inter_Bold: require('./Inter-Bold'),
    Inter_ExtraBold: require('./Inter-ExtraBold'),
    Inter_ExtraLight: require('./Inter-ExtraLight'),
    Inter_Light: require('./Inter-Light'),
    Inter_Medium: require('./Inter-Medium'),
    Inter_Regular: require('./Inter-Regular'),
    Inter_SemiBold: require('./Inter-SemiBold'),
    Inter_Thin: require('./Inter-Thin'),
  });
};
