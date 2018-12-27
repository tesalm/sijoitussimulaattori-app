import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { Colors, WizardFormColors } from '../App/colors';

const bidPageStyle = StyleSheet.create({
  background: {
    backgroundColor: WizardFormColors.backgroundColor,
    height: verticalScale(667),
  },
});

const bidStyles = StyleSheet.create({
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
  picker: {
    // color: WizardFormColors.buttonsUnactive,
    alignSelf: 'center',
    fontSize: verticalScale(17),
    // backgroundColor: WizardFormColors.buttonsUnactive,
    color: 'white',
    width: '50%',
  },
  textInputs: {
    color: WizardFormColors.buttonsUnactive,
    alignSelf: 'center',
    fontSize: verticalScale(17),
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
  okCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export { bidPageStyle, bidStyles };
