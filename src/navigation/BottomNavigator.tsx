import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import CommissionsStack from './bottomTabs/CommissionsTab';
import HomeStack from './bottomTabs/HomeTab';
import MarketStack from './bottomTabs/MarketTab';

const BottomNav = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Market: { screen: MarketStack },
    Commissions: { screen: CommissionsStack },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: '#004D40' },
      //inactiveTintColor: '#F3EBDD',
      showLabel: false,
    },
  }
);

export default BottomNav;
