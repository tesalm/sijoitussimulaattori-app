import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerItems, NavigationScreenProps, SafeAreaView } from 'react-navigation';

import BottomNav from './BottomNavigator';
import ProfileScreen from './screens/ProfileScreen';
import { navStyles as styles } from './styles';

const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: BottomNav,
      navigationOptions: { drawerLabel: () => null },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: 'Profiili',
        drawerIcon: (
          <Image
            source={require('./assets/profile.png')}
            style={styles.drawerIcon}
          />
        ),
      },
    },
    // TODO add more drawer items
  },
  {
    initialRouteName: 'Main',
    drawerPosition: 'right',
    drawerWidth: 200,
    contentComponent: (props: NavigationScreenProps) => (
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <TouchableOpacity
          style={{ marginTop: 20, marginLeft: 20 }}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Image
            source={require('./assets/close.png')}
            style={styles.drawerIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>
    ),
  }
);

export default DrawerNavigator;
