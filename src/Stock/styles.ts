import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { Colors } from '../App/colors';

const stockStyles = StyleSheet.create({
  valueHeaderRightSide: {
    fontSize: verticalScale(12),
    marginBottom: verticalScale(0),
    textAlign: 'center',
    color: Colors.baseColor,
  },
  valueRightSide: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    textAlign: 'center',
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

export { stockStyles };
