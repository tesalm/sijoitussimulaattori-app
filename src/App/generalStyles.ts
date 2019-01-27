import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from './colors';

const generalStyles = StyleSheet.create({
  button: {
    margin: 0,
    height: 61,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonLogoView: {
    flexDirection: 'row',
  },
  buttonTitle: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenPercent,
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(8),
    marginLeft: scale(30),
  },
  revenueValueRed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.redPercent,
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(8),
    marginLeft: scale(30),
  },
});

export { generalStyles };
