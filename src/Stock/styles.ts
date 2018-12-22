import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { Colors } from '../App/colors';

const stockContainerStyles = StyleSheet.create({
  basicInfo: {
    margin: 0,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    height: verticalScale(186),
  },
  diagram: {
    margin: 0,
    height: verticalScale(200),
  },
  buttonContainer: {
    margin: 0,
    height: verticalScale(56),
  },
});

const stockStyles = StyleSheet.create({
  titleStyle: {
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
  valueHeaderRightSide: {
    fontSize: verticalScale(12),
    marginBottom: verticalScale(0),
    textAlign: 'center',
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.greenPercent,
    marginBottom: verticalScale(8),
  },
  revenueValueRed: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.redPercent,
    marginBottom: verticalScale(16),
  },
  valueRightSide: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    textAlign: 'center',
    color: Colors.baseColor,
  },
  bidView: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidLogoView: {
    marginTop: 0,
    flexDirection: 'row',
  },
  bidText: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
  basicinfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  basicinfoLeft: {
    flexDirection: 'column',
    flex: 2,
  },
  basicinfoRight: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  basicinfoMiddle: {
    flexDirection: 'row',
  },
  basicinfoMiddleContent: {
    flexDirection: 'column',
    flex: 1,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stockContainerStyles, stockStyles };
