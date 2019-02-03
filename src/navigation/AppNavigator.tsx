import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../LoginScreen/LoginScreen';
import CreatePortfolioModalNavigator from './CreatePortfolioNavigator';
import MainNavigator from './MainNavigator';
import PortfolioModalNavigator from './PortfolioModalNavigator';
import { RouteName } from './routes';
import InfoScreen from './screens/InfoScreen';
import StockModalNavigator from './StockModalNavigator';

const AppNavigator = createStackNavigator(
  {
    App: MainNavigator,
    StockModal: StockModalNavigator,
    PortfolioModal: PortfolioModalNavigator,
    CreatePortfolioModal: CreatePortfolioModalNavigator,
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
