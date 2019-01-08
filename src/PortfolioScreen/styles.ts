import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../App/colors';

const portfolioContainerStyles = StyleSheet.create({
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

const portfolioStyles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: scale(8),
    color: Colors.baseColor,
  },
  valueHeader: {
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
    color: Colors.baseColor,
  },
  valueHeaderMiddle: {
    fontSize: 12,
    textAlign: 'justify',
    marginTop: verticalScale(20),
    marginLeft: scale(16),
    color: Colors.baseColor,
  },

  value: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(4),
    color: Colors.baseColor,
  },
  valueGreen: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),

    marginBottom: verticalScale(4),
    color: Colors.greenPercent,
  },
  valueRed: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),

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
    marginTop: verticalScale(20),
    marginLeft: scale(30),
    color: Colors.baseColor,
  },
  valueHeaderRightSideHoldings: {
    fontSize: 12,
    marginTop: verticalScale(30),
    marginLeft: scale(30),
    color: Colors.baseColor,
  },

  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: scale(8),

    color: Colors.baseColor,
  },
  holdingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  portfolioinfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  portfolioInfoSmallerComp: {
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
    marginBottom: scale(8),
    marginTop: scale(8),
    color: Colors.baseColor,
    fontWeight: 'bold',
  },
  holdingsLogoView: {
    marginTop: 0,
    flexDirection: 'row',
    marginBottom: scale(12),
  },
  holdingsSubLogoView: {
    marginTop: 0,
    flexDirection: 'row',
    marginBottom: scale(12),
  },
  holdingsSubTitleView: {
    flex: 0.9,
  },
  holdingsArrowView: {
    flex: 0.1,
    marginTop: scale(5),
  },
});

export { portfolioContainerStyles, portfolioStyles };
