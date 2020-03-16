import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) => {
  return (width / guidelineBaseWidth) * size;
}
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

export const getScaledFontSize = (staticFontSize: number) => {
  // Rounds to nearest even integer
  return even(scale(staticFontSize));
};

export const even = (value: number) => 2 * Math.floor(value / 2);