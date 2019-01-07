import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../LoginScreen/LoginScreen';
import MainNavigator from './MainNavigator';
import { RouteName } from './routes';
import InfoScreen from './screens/InfoScreen';
import StockModalNavigator from './StockModalNavigator';

const AppNavigator = createStackNavigator(
  {
    App: MainNavigator,
    StockModal: StockModalNavigator,
    Info: InfoScreen,
  },
  { navigationOptions: { header: null } }
);

export const createMainSwitchNavigator = (askForLogin: boolean) => {
  return createSwitchNavigator(
    {
      Login: LoginScreen,
      App: AppNavigator,
    },
    {
      initialRouteName: askForLogin ? RouteName.Login : RouteName.App,
    }
  );
};
