import { StyleSheet } from 'react-native';

const Colors = {
  button: '#004D40',
  buttonText: '#FFFFFF',
};

const LightColors = {
  button: '#FFFFFF',
  buttonText: '#004D40',
};

export const buttonStyles = StyleSheet.create({
  button: {
    // <View> inside a <TouchableOpacity>
    backgroundColor: Colors.button,
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
  },
});

export const buttonStylesLight = StyleSheet.create({
  button: {
    // <View> inside a <TouchableOpacity>
    backgroundColor: LightColors.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 16,
    fontSize: 16,
    elevation: 3,
  },
  buttonText: {
    // <Text>
    color: LightColors.buttonText,
    fontFamily: 'Roboto',
  },
});
