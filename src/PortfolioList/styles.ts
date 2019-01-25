import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '../util/scale';

// TODO: This might change due to portfolioList branch.
const Styles = StyleSheet.create({
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

export { Styles };
