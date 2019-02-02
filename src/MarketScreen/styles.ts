import { StyleSheet } from 'react-native';

import { Colors } from '../App/colors';
import { scale, screenHeight, verticalScale } from '../util/scale';

const StockStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    color: Colors.baseColor,
    fontSize: verticalScale(17),
    marginBottom: verticalScale(8),
  },
  subtitleView: {
    flexDirection: 'column',
  },
  lastSaleValue: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    color: Colors.baseColor,
    textAlign: 'justify',
    marginTop: verticalScale(-2),
  },
  rightTitleView: {
    flexDirection: 'column',
    marginLeft: scale(16),
  },
  loadingView: {
    height: screenHeight(),
    justifyContent: 'center',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.whiteBackground,
    borderBottomWidth: 0,
    paddingLeft: scale(16),
    paddingVertical: verticalScale(8),
  },
  greyContainer: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
    borderBottomWidth: 0,
    paddingLeft: scale(16),
    paddingVertical: verticalScale(8),
  },
});

export { StockStyles };
