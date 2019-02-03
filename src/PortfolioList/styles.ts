import { StyleSheet } from 'react-native';
import { Colors } from '../App/colors';
import { scale, screenHeight, verticalScale } from '../util/scale';

const PortfolioListingStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: Colors.baseColor,
    fontSize: verticalScale(16),
  },
  titleView: {
    marginLeft: scale(8),
  },
  subtitleView: {
    flexDirection: 'column',
    marginTop: verticalScale(12),
    marginLeft: scale(8),
  },
  subtitleText: {
    fontSize: verticalScale(12),
    color: Colors.baseColor,
    textAlign: 'justify',
    marginBottom: verticalScale(0),
  },
  subtitleValue: {
    fontSize: verticalScale(14),
    fontWeight: 'bold',
    textAlign: 'justify',
    marginTop: verticalScale(-2),
  },
  rightTitleView: {
    flexDirection: 'column',
    marginLeft: scale(8),
  },
  revenueText: {
    fontSize: verticalScale(12),
    color: Colors.baseColor,
  },
  revenueValueGreen: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.greenPercent,
    textAlign: 'center',
  },
  revenueValueRed: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: Colors.redPercent,
    textAlign: 'center',
  },
  loadingView: {
    height: screenHeight(),
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    paddingLeft: scale(16),
    paddingVertical: verticalScale(8),
  },
  itemSeparatorStyle: {
    height: verticalScale(5),
  },
  noPortfolioContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noPortfolioText: {
    fontSize: verticalScale(20),
    textAlign: 'center',
    color: Colors.baseColor,
  },
  createNewPortfolio: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: verticalScale(16),
    right: scale(16),
  },
});

export { PortfolioListingStyles };
