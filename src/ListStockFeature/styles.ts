import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../App/colors';

const StockStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    color: Colors.baseColor,
    fontSize: 16,
    marginTop: verticalScale(8),
    marginLeft: scale(8),
  },
  subtitleView: {
    flexDirection: 'column',
    marginTop: verticalScale(12),
    marginLeft: scale(8),
  },
  lastSaleText: {
    fontSize: 12,
    color: Colors.baseColor,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
  },
  lastSaleValue: {
    fontSize: 14,
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
    fontSize: 12,
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenPercent,
    textAlign: 'center',
  },
  revenueValueRed: {
    fontSize: 18,
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
