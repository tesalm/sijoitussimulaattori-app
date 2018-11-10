import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import { LoginScreen } from './loadingAndLogin/LoginScreen';
import DrawerNavigator from './MainNavigator';

// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html
export const createConditionalSwitchNavigator = ( signedIn: boolean ) => {
  return createSwitchNavigator(
  {
  //Loading: LoadingScreen,
  Login: LoginScreen,
  App: { screen: DrawerNavigator },
  },
  {
    initialRouteName: (signedIn ? 'App' : 'Login')
  }
  );
};
