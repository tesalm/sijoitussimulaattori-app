import { StyleSheet } from 'react-native';

const Colors = {
  background: '#004D40',
  text: '#FFFFFF',
};

export const loginScreenStyles = StyleSheet.create({
  background: {
    // <View>
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    fontFamily: 'Roboto',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: '4%',
  },
  logo: {
    width: '60%',
    height: '30%',
    resizeMode: 'contain',
    marginTop: '8%',
  },
  buttonContainer: {
    // <View>
    width: '65%',
    marginBottom: '8%',
  },
});
