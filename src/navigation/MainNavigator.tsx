import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerItems, NavigationScreenProps, SafeAreaView } from 'react-navigation';

import { t } from '../assets/i18n';
import MainTabNavigator from './MainTabNavigator';
import { RouteName } from './routes';
import ProfileScreen from './screens/ProfileScreen';
import { Styles } from './styles';

const MainNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: { drawerLabel: null },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: t('Navigation.Labels.Profile'),
        drawerIcon: (
          <Image
            source={require('./assets/profile.png')}
            style={Styles.drawerIcon}
          />
        ),
      },
    },
  },
  {
    initialRouteName: RouteName.Main,
    drawerPosition: 'left',
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
            style={Styles.drawerIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>
    ),
  }
);

export default MainNavigator;
