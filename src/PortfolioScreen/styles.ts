import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../App/colors';

const stockContainerStyles = StyleSheet.create({
  basicInfo: {
    margin: 0,
    height: 130,
  },
  diagram: {
    margin: 0,
    height: 200,
  },
  buttonContainer: {
    margin: 0,
    height: 50,
  },
  holdings: {
    margin: 0,
    flex: 1,
  },
});

const stockStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: scale(8),
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  valueHeader: {
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  valueHeaderMiddle: {
    fontSize: 12,
    textAlign: 'justify',
    marginTop: verticalScale(16),
    marginLeft: scale(16),
    color: Colors.baseColor,
  },

  value: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
    color: Colors.baseColor,
  },
  valueGreen: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
    color: Colors.greenPercent,
  },
  valueRed: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
    color: Colors.redPercent,
  },
  valueMiddle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(16),
    marginBottom: verticalScale(8),
    color: Colors.baseColor,
  },
  valueHeaderRightSide: {
    fontSize: 12,
    marginTop: verticalScale(24),
    marginLeft: scale(30),
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
  valueRightSide: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
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
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  basicinfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  basicinfoSmallerComp: {
    flexDirection: 'column',
    flex: 1,
  },
  basicinfoMidComp: {
    flexDirection: 'column',
    flex: 1,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionContainer: {
    borderTopWidth: 1.5,
  },
  holdingsSubTitle: {
    fontSize: 15,
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
});

export { stockContainerStyles, stockStyles };
