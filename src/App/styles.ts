import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { Colors, FormColors } from './colors';

const generalStyles = StyleSheet.create({});

const cardButtonStyles = StyleSheet.create({
  cardButton: {
    margin: 0,
    flex: 1,
  },
  cardButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButtonLogoView: {
    flexDirection: 'row',
  },
  cardButtonTitle: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    marginLeft: scale(8),
    color: Colors.baseColor,
  },
});

const cardStyles = StyleSheet.create({
  container: {
    margin: 0,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    flex: 1,
  },
});

const textStyles = StyleSheet.create({
  title: {
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
});

const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: verticalScale(16),
  },
  cancelButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: FormColors.fontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  okButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: FormColors.activeColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
  },
  okText: {
    color: FormColors.fontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  buttonDisabled: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: FormColors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const textInputStyles = StyleSheet.create({
  item: {
    color: FormColors.unactiveColor,
    fontSize: verticalScale(16),
    textAlign: 'center',
    paddingHorizontal: scale(16),
  },
});

export { generalStyles, cardButtonStyles, cardStyles, textStyles, buttonStyles, textInputStyles };
