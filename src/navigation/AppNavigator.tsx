import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../LoginScreen/LoginScreen';
import DrawerNavigator from './MainNavigator';

export const createMainSwitchNavigator = ( askForLogin: boolean ) => {
  return createSwitchNavigator(
  {
  Login: LoginScreen,
  App: { screen: DrawerNavigator },
  },
  {
    initialRouteName: (askForLogin ? 'Login' : 'App')
  }
  );
};
