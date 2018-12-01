import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const stockStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    color: '#004D40',
    fontSize: 16,
    marginTop: verticalScale(8),
    marginLeft: scale(8),
  },
  subtitleView: {
    flexDirection: 'column',
    marginTop: verticalScale(12),
    marginLeft: scale(8),
    marginBottom: verticalScale(4),
  },
  valueHeader: {
    fontSize: 12,
    color: '#004D40',
    textAlign: 'left',
    marginBottom: verticalScale(0),
    marginLeft: scale(8),
  },
  valuesStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'left',
    marginTop: verticalScale(-2),
    marginLeft: scale(8),
  },
  buySellButton: {
    margin: 0,
    height: 50,
  },
  arrowImage: {
    height: 24,
    width: 24,
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
    width: '50%',
    alignContent: 'flex-end',
  },
});

export { stockStyles };
