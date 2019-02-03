import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineWidth = 375;
const guidelineHeight = 667;

const scale = (size: number) => (width / guidelineWidth) * size;
const verticalScale = (size: number) => (height / guidelineHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

const screenHeight = () => height;

export { scale, verticalScale, moderateScale, screenHeight };
