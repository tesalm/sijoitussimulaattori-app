import { StyleSheet } from 'react-native';

const Colors = {
  headerTint: '#F3EBDD',
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
  createNewPortfolio: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export { Styles, Colors };
