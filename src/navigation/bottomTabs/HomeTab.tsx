import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import PortfolioListScreen from '../../PortfolioList/PortfolioListScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import { Colors, Styles } from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: PortfolioListScreen,
  },
  {
    // Shared options
    headerMode: 'float',
    initialRouteName: RouteName.Home,
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'left', flex: 1 },
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
