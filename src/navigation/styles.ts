import { StyleSheet } from 'react-native';

const Colors = {
  headerTint: 'white',
  bottomBarBackground: '#FFFFFF',
  bottomBarBorderTop: '#004D40',
  inactive: '#004D40',
  active: '#0040FF',
};

const Styles = StyleSheet.create({
  header: {
    backgroundColor: '#004D40',
  },
  iconActive: {
    height: 24,
    width: 24,
    tintColor: Colors.active,
  },
  iconInactive: {
    height: 24,
    width: 24,
    tintColor: Colors.inactive,
  },
  drawerIcon: {
    height: 24,
    width: 24,
  },
});

export { Styles, Colors };
