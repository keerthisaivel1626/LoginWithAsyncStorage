import { Dimensions, Platform } from 'react-native';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

const DESIGN_DIMENSIONS = { width: 375, height: 812 };

export const getPercentageHeight = (heightParam) => {
  return Platform.select({
    ios: height * (heightParam / DESIGN_DIMENSIONS.height),
    android: heightParam,
  });
};

export const getPercentageWidth = (widthParam) => {
  return Platform.select({
    ios: width * (widthParam / DESIGN_DIMENSIONS.width),
    android: widthParam,
  });
};

export const cardBorderRadius = 12;

export const headerHeight = Platform.OS === 'android' ? getPercentageHeight(240) : getPercentageHeight(260);

export const screenPaddingHorizontal = getPercentageWidth(20);
