import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../util/scale';
import { Colors, WizardFormColors } from '../App/colors';

const sumUpStyles = StyleSheet.create({
  background: {
    backgroundColor: WizardFormColors.backgroundColor,
  },
  header: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: WizardFormColors.defaultFontColor,
    textAlign: 'center',
  },
  headerHighlight: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: WizardFormColors.buttonsActive,
  },
  headerContainer: {
    marginTop: verticalScale(94),
  },
  valueHeaderSmall: {
    fontSize: verticalScale(12),
    color: WizardFormColors.defaultFontColor,
  },
  valueSmall: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    color: WizardFormColors.defaultFontColor,
  },
  valueHeaderLarge: {
    fontSize: verticalScale(15),
    fontWeight: 'bold',
    color: WizardFormColors.defaultFontColor,
    textAlign: 'center',
  },
  valueLarge: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: WizardFormColors.defaultFontColor,
    textAlign: 'center',
  },
  confirmCancelButtonContainer: {
    marginTop: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'center',
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
  confirmButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: WizardFormColors.buttonsActive,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
  },
  confirmButtonText: {
    color: WizardFormColors.buttonsUnactive,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  detailContainer: {
    marginVertical: verticalScale(16),
    display: 'flex',
    flexDirection: 'row',
  },
  detailRowContainer: {
    flex: 1,
    marginHorizontal: scale(16),
  },
  detailColumnContainer: {
    marginBottom: verticalScale(16),
  },
  bottomContainers: {
    marginBottom: verticalScale(16),
  },
});

export { sumUpStyles };
