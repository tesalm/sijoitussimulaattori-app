import { StyleSheet } from 'react-native';

import { Colors } from '../App/colors';
import { scale, verticalScale } from '../util/scale';

const stockStyles = StyleSheet.create({
  buttonGrpContainer: {
    margin: 0,
    height: verticalScale(30),
  },
  graphPadding: {
    top: verticalScale(10),
    bottom: verticalScale(14),
    left: scale(10),
    right: scale(38),
  },
  graphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(180),
  },
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
  buttonGrpText: {
    fontSize: verticalScale(10),
  },
});

export { stockStyles };
