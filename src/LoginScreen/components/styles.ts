import { StyleSheet } from 'react-native';

const Colors = {
  modalBackground: '#004D40E9', // <- Transparent (E9)
};

export const modalPopupStyles = StyleSheet.create({
  modalSplash: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
  },
});
