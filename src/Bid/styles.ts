import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { WizardFormColors } from '../App/colors';

const bidPageStyle = StyleSheet.create({
  background: {
    backgroundColor: WizardFormColors.backgroundColor,
    height: verticalScale(1091),
  },
});

const bidStyles = StyleSheet.create({
  chooseAction: {
    marginTop: verticalScale(287),
  },
  buttonUnactive: {
    color: WizardFormColors.buttonsUnactive,
    fontWeight: 'bold',
    fontSize: verticalScale(20),
    marginLeft: scale(8),
  },
  buttonActive: {
    color: WizardFormColors.buttonsActive,
    fontWeight: 'bold',
    fontSize: verticalScale(20),
    marginLeft: scale(8),
  },
  headings: {
    color: WizardFormColors.defaultFontColor,
    fontWeight: 'bold',
    fontSize: verticalScale(17),
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  stock: {
    fontStyle: 'italic',
  },
  dropdown: {
    alignContent: 'center',
    borderBottomColor: 'white',
    marginHorizontal: scale(16),
    alignSelf: 'stretch',
    marginBottom: verticalScale(16),
    //justifyContent: 'center',
    // backgroundColor: WizardFormColors.buttonsUnactive,
  },
  dropdownOverlay: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownPicker: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textInputs: {
    color: WizardFormColors.buttonsUnactive,
    fontSize: verticalScale(17),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
    //height: 40,
    //paddingLeft: 6,
  },
  buttons: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  buttonWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sumUpCancelButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(16),
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
  sumUpButtonText: {
    color: WizardFormColors.buttonsUnactive,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
});

export { bidPageStyle, bidStyles };
