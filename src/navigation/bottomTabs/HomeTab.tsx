import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import CreatePortfolio from '../../CreatePortfolio/CreatePortfolio';
import PortfolioListScreen from '../../PortfolioList/PortfolioListScreen';
import PortfolioScreen from '../../PortfolioScreen/PortfolioScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import { Colors, Styles } from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: PortfolioListScreen,
    SinglePortfolio: { screen: PortfolioScreen },
    CreatePortfolio: { screen: CreatePortfolio },
    // TODO add more pages related to this tab
  },
  {
    // Shared options
    headerMode: 'float',
    initialRouteName: RouteName.Home,
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: t('Navigation.Labels.Portfolios'),
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/briefcase.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/briefcase.png')}
        style={Styles.iconInactive}
      />
    ),
};

export default HomeStack;
