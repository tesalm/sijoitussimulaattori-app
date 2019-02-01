import { StyleSheet } from 'react-native';
import { FormColors } from '../App/colors';
import { scale, verticalScale } from '../util/scale';

const bidPageStyle = StyleSheet.create({
  background: {
    backgroundColor: FormColors.backgroundColor,
    height: verticalScale(965),
  },
});

const actionButtons = StyleSheet.create({
  container: {
    paddingTop: verticalScale(115),
  },
  buttonUnactive: {
    color: FormColors.unactiveColor,
    fontWeight: 'bold',
    fontSize: verticalScale(20),
    paddingLeft: scale(8),
  },
  buttonActive: {
    color: FormColors.activeColor,
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
    color: FormColors.fontColor,
    fontWeight: 'bold',
    fontSize: verticalScale(17),
    textAlign: 'center',
    paddingVertical: verticalScale(16),
  },
  stock: {
    fontStyle: 'italic',
  },
  textInput: {
    color: FormColors.unactiveColor,
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
    color: FormColors.fontColor,
    fontSize: verticalScale(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoTextHighlight: {
    color: FormColors.activeColor,
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
    color: FormColors.fontColor,
    fontSize: verticalScale(14),
    fontWeight: 'bold',
  },
  sumUpButton: {
    height: verticalScale(36),
    width: verticalScale(112),
    backgroundColor: FormColors.activeColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
  },
  sumUpText: {
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

const stockinfo = StyleSheet.create({
  stockText: {
    color: FormColors.fontColor,
    fontWeight: 'bold',
    fontSize: verticalScale(17),
  },
  valueHeaderSmall: {
    color: FormColors.fontColor,
    fontSize: verticalScale(12),
  },
  valueSmall: {
    color: FormColors.fontColor,
    fontSize: verticalScale(17),
    fontWeight: 'bold',
  },
  updatedText: {
    color: FormColors.fontColor,
    fontSize: verticalScale(11),
  },
  container: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: FormColors.backgroundColor,
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

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FormColors.backgroundColor,
  },
  noPortfolioText: {
    fontSize: verticalScale(20),
    textAlign: 'center',
    color: FormColors.fontColor,
  },
});

export {
  bidPageStyle,
  actionButtons,
  bidStyles,
  sumUpCancel,
  stockinfo,
  errorStyles,
};
