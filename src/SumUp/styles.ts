import { StyleSheet } from 'react-native';
import { Colors, FormColors } from '../App/colors';
import { scale, verticalScale } from '../util/scale';

const sumUpStyles = StyleSheet.create({
  background: {
    backgroundColor: FormColors.backgroundColor,
  },
  header: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: FormColors.fontColor,
    textAlign: 'center',
  },
  headerHighlight: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: FormColors.activeColor,
  },
  headerContainer: {
    marginTop: verticalScale(94),
  },
  valueHeaderSmall: {
    fontSize: verticalScale(12),
    color: FormColors.fontColor,
  },
  valueSmall: {
    fontSize: verticalScale(17),
    fontWeight: 'bold',
    color: FormColors.fontColor,
  },
  valueHeaderLarge: {
    fontSize: verticalScale(15),
    fontWeight: 'bold',
    color: FormColors.fontColor,
    textAlign: 'center',
  },
  valueLarge: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: FormColors.fontColor,
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
    color: FormColors.fontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  confirmButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: FormColors.activeColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
  },
  confirmButtonText: {
    color: FormColors.unactiveColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  detailContainer: {
    marginVertical: verticalScale(16),
    marginHorizontal: scale(16),
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
  errorMessage: {
    color: Colors.redPercent,
    fontSize: verticalScale(14),
    textAlign: 'center',
  },
});

export { sumUpStyles };
