import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../App/colors';

const stockContainerStyles = StyleSheet.create({
  basicInfo: {
    margin: 0,
    height: 147,
  },
  diagram: {
    margin: 0,
    height: 200,
  },
  buttonContainer: {
    margin: 0,
    height: 50,
  },
});

const stockStyles = StyleSheet.create({
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
    //marginBottom: verticalScale(4),
  },
  valueHeader: {
    fontSize: 12,
    color: Colors.baseColor,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
    marginLeft: scale(8),
  },
  valuesStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.baseColor,
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
    marginBottom: verticalScale(8),
  },
  valueHeaderRightSide: {
    fontSize: 12,
    color: Colors.baseColor,
    marginBottom: verticalScale(0),
    marginLeft: scale(8),
  },
  revenueValueGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenPercent,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  revenueValueRed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.redPercent,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  close: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.baseColor,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  bidText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.baseColor,
  },
  bidButton: {
    margin: 0,
    height: 50,
  },
  arrowImage: {
    height: 20,
    width: 20,
  },
  basicinfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  basicinfoSmallerComp: {
    flexDirection: 'column',
    width: '25%',
  },
  basicinfoMidComp: {
    flexDirection: 'column',
    width: '25%',
    alignContent: 'flex-end',
  },
});

export { stockContainerStyles, stockStyles };
