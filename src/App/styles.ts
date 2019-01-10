import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from './colors';

const generalStyles = StyleSheet.create({});

const cardButtonStyles = StyleSheet.create({
  cardButton: {
    margin: 0,
    height: verticalScale(56),
  },
  cardButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButtonLogoView: {
    flexDirection: 'row',
  },
  cardButtonTitle: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
});

const cardStyles = StyleSheet.create({
  container: {
    margin: 0,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    flex: 1,
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: verticalScale(17),
    marginBottom: verticalScale(16),
    color: Colors.baseColor,
  },
  valueHeader: {
    fontSize: verticalScale(12),
    textAlign: 'justify',
    marginBottom: verticalScale(0),
    color: Colors.baseColor,
  },
  value: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(16),
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
});

export { generalStyles, cardButtonStyles, cardStyles, textStyles };
