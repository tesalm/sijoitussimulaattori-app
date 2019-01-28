import { createBottomTabNavigator } from 'react-navigation';

import CommissionsStack from './bottomTabs/CommissionsTab';
import CommunityStack from './bottomTabs/CommunityTab';
import HomeStack from './bottomTabs/HomeTab';
import MarketStack from './bottomTabs/MarketTab';
import { Colors } from './styles';

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Market: MarketStack,
    Commissions: CommissionsStack,
    Community: CommunityStack,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: Colors.bottomBarBackground,
        borderTopColor: Colors.bottomBarBorderTop,
      },
      inactiveTintColor: Colors.inactive,
      activeTintColor: Colors.active,
      showLabel: true,
    },
  }
);

export default MainTabNavigator;
