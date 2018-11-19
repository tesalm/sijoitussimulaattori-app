import { StyleSheet } from 'react-native';

const Colors = {
  background: '#004D40',
  buttons: '#FFFFFF',
  text: '#FFFFFF',
  buttonText: '#004D40',
  modalBackground: '#004D40E9', // <- Transparent (E9)
};

export const loginScreenStyles = StyleSheet.create({
  background: {
    // <View>
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
  },
  logoContainerRow: {
    // <View>
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  logoContainerColumn: {
    // <View>
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  logo: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  buttonContainerRow: {
    // <View>
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainerColumn: {
    // <View>
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    // <View> inside a <TouchableOpacity>
    backgroundColor: Colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 16,
    fontSize: 16,
    elevation: 3,
  },
  buttonText: {
    // <Text>
    color: Colors.buttonText,
    fontFamily: 'Roboto',
    //textTransform: 'uppercase', <- For some reason this is not working (on Android?).
  },
  modalSplash: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
  },
});
