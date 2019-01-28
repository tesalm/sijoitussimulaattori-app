import { StyleSheet } from 'react-native';
import { WizardFormColors } from '../App/colors';
import { scale, verticalScale } from '../util/scale';

const bidPageStyle = StyleSheet.create({
  background: {
    backgroundColor: WizardFormColors.backgroundColor,
    height: verticalScale(965),
  },
});

const actionButtons = StyleSheet.create({
  container: {
    paddingTop: verticalScale(115),
  },
  buttonUnactive: {
    color: WizardFormColors.buttonsUnactive,
    fontWeight: 'bold',
    fontSize: verticalScale(20),
    paddingLeft: scale(8),
  },
  buttonActive: {
    color: WizardFormColors.buttonsActive,
    fontWeight: 'bold',
    fontSize: verticalScale(20),
    paddingLeft: scale(8),
  },
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingVertical: verticalScale(16),
  },
  buttonWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const bidStyles = StyleSheet.create({
  headings: {
    color: WizardFormColors.defaultFontColor,
    fontWeight: 'bold',
    fontSize: verticalScale(17),
    textAlign: 'center',
    paddingVertical: verticalScale(16),
  },
  stock: {
    fontStyle: 'italic',
  },
  textInput: {
    color: WizardFormColors.buttonsUnactive,
    fontSize: verticalScale(17),
    textAlign: 'center',
  },
  textInputContainer: {
    paddingHorizontal: scale(16),
  },
  dropdown: {
    alignContent: 'center',
    borderBottomColor: 'white',
    paddingHorizontal: scale(16),
    alignSelf: 'stretch',
  },
  infoText: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoTextHighlight: {
    color: WizardFormColors.hightlightFontColor,
  },
});

const sumUpCancel = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: verticalScale(32),
  },
  cancelButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  sumUpButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: WizardFormColors.buttonsActive,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
  },
  sumUpText: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  buttonDisabled: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: WizardFormColors.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stockinfo = StyleSheet.create({
  stockText: {
    color: WizardFormColors.defaultFontColor,
    fontWeight: 'bold',
    fontSize: verticalScale(17),
  },
  valueHeaderSmall: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(12),
  },
  valueSmall: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(17),
    fontWeight: 'bold',
  },
  updatedText: {
    color: WizardFormColors.defaultFontColor,
    fontSize: verticalScale(11),
  },
  container: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: WizardFormColors.backgroundColor,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  stockinfoMiddle: {
    flexDirection: 'row',
    paddingVertical: verticalScale(16),
  },
  stockinfoMiddleContent: {
    flexDirection: 'column',
    flex: 1,
  },
});

export { bidPageStyle, actionButtons, bidStyles, sumUpCancel, stockinfo };
