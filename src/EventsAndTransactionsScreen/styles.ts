import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { Colors } from '../App/colors';

const transactionStyles = StyleSheet.create({
  bold: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: Colors.baseColor,
  },
  basicText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'justify',
    color: Colors.baseColor,
  },
  noActionsText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(12),
    opacity: 0.6,
  },
  eventContainer: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(12),
  },
  eventSection: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: verticalScale(6),
  },
});

export { transactionStyles };
