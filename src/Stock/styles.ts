import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../App/colors';

const stockContainerStyles = StyleSheet.create({
  basicInfo: {
    margin: 0,
    height: 178,
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
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
    marginBottom: verticalScale(8),
    color: Colors.baseColor,
  },
  valueHeaderRightSide: {
    fontSize: 12,
    marginBottom: verticalScale(0),
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenPercent,
    marginBottom: verticalScale(8),
    marginLeft: scale(8),
  },
  revenueValueRed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.redPercent,
    marginBottom: verticalScale(8),
    marginLeft: scale(8),
  },
  valueRightSide: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  bidButton: {
    margin: 0,
    height: 61,
  },
  bidView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bidLogoView: {
    flexDirection: 'row',
  },
  bidText: {
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
    flex: 1.5,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stockContainerStyles, stockStyles };
