import { StyleSheet } from 'react-native';

import { Colors, FormColors } from '../App/colors';
import { scale, verticalScale } from '../util/scale';

const CreatePortfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FormColors.backgroundColor,
  },
  nameContainer: {
    paddingTop: verticalScale(173),
    paddingBottom: verticalScale(16),
    paddingHorizontal: scale(42),
  },
  amountContainer: {
    paddingBottom: verticalScale(16),
    paddingHorizontal: scale(42),
  },
  headings: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    textAlign: 'center',
    color: FormColors.fontColor,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },
  error: {
    color: Colors.errorText,
    textAlign: 'center',
    marginTop: verticalScale(-16),
  },
});

export { CreatePortfolioStyles };
