import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const isSmallDevice = width < 321 || height < 642;
const isLargeDevice = width > 750 || height > 800;
const fontSizes = {
  xlarge: 45,
  large: 32,
  medium: 25,
  small: 20,
  xsmall: 15,
  xxsmall: 10,
};

const smallFontSizes = Object.keys(fontSizes).reduce((acc, fontSize) => {
  acc[fontSize] = fontSizes[fontSize] - 5;
  return acc;
}, {});

const largeFontSizes = Object.keys(fontSizes).reduce((acc, fontSize) => {
  acc[fontSize] = fontSizes[fontSize] + 5;
  return acc;
}, {});

function getFontSizes() {
  if (isSmallDevice) return smallFontSizes;
  if (isLargeDevice) return largeFontSizes;
  return fontSizes;
}

export default {
  window: {
    width,
    height,
  },
  margins: {
    sides: 10,
  },
  fontSizes: getFontSizes()
};
