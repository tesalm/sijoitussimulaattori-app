import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import HomeScreen from '../../PortfolioList/PortfolioListScreen';
import PortfolioScreen from '../../PortfolioScreen/PortfolioScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import InfoScreen from '../screens/InfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors, Styles } from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Info: { screen: InfoScreen },
    SinglePortfolio: { screen: PortfolioScreen },
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
