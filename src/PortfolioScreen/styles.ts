import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import { Colors } from '../App/colors';

const portfolioStyles = StyleSheet.create({
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
    marginBottom: verticalScale(4),
    color: Colors.baseColor,
  },
  valueGreen: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),

    marginBottom: verticalScale(4),
    color: Colors.greenPercent,
  },
  valueRed: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),

    marginBottom: verticalScale(4),
    color: Colors.redPercent,
  },

  titleText: {
    fontSize: verticalScale(17),
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
    flex: 1,
  },
  portfolioInfoSmallerComp: {
    flexDirection: 'column',
    flex: 0.8,
  },
  portfolioHoldingsRightComp: {
    flexDirection: 'column',
    flex: 0.8,
    alignItems: 'center',
    marginTop: scale(25),
  },
  portfolioInfoMiddleComp: {
    flexDirection: 'column',
    flex: 1,
    textAlign: 'center',
    marginTop: scale(20),
  },
  portfolioCurlyBracketsContainer: {
    flexDirection: 'column',
    flex: 0.4,
    textAlign: 'center',
    marginTop: scale(6),
  },
  portfolioCurlyBracket: {
    fontSize: scale(40),
    color: Colors.baseColor,
  },

  portfolioValue: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(8),
    color: Colors.baseColor,
  },

  portfolioRightComp: {
    flexDirection: 'column',
    flex: 0.8,
    textAlign: 'center',
    marginTop: scale(20),
    alignItems: 'center',
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
  holdingsTitleView: {
    flex: 0.9,
    flexDirection: 'row',
  },
  holdingsArrowView: {
    flex: 0.1,
    marginTop: scale(5),
    alignItems: 'flex-end',
  },
  symbol: {
    fontFamily: 'Roboto',
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: verticalScale(4),
    color: Colors.baseColor,
  },
  basicText: {
    fontFamily: 'Roboto',
    fontSize: verticalScale(12),
    textAlign: 'justify',
    color: Colors.baseColor,
  },
  noActionsText: {
    fontFamily: 'Roboto',
    fontSize: verticalScale(14),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(4),
    opacity: 0.6,
  },
  cancelAction: {
    fontFamily: 'Roboto',
    fontSize: verticalScale(15),
    color: 'orange',
  },
  transaction: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(2),
  },
});

export { portfolioStyles };
