import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';

import { Colors } from '../App/colors';

const StockStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    color: Colors.baseColor,
    fontSize: verticalScale(16),
    marginTop: verticalScale(8),
    marginLeft: scale(8),
  },
  subtitleView: {
    flexDirection: 'column',
    marginTop: verticalScale(12),
    marginLeft: scale(8),
  },
  lastSaleText: {
    fontSize: verticalScale(12),
    color: Colors.baseColor,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
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
    marginLeft: scale(8),
  },
  revenueText: {
    fontSize: verticalScale(12),
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.greenPercent,
    textAlign: 'center',
  },
  revenueValueRed: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.redPercent,
    textAlign: 'center',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
  },
  whiteContainer: {
    height: verticalScale(75),
    backgroundColor: Colors.whiteBackground,
    borderBottomWidth: 0,
  },
  greyContainer: {
    height: verticalScale(75),
    backgroundColor: Colors.greyBackground,
    borderBottomWidth: 0,
  },
});

export { StockStyles };
