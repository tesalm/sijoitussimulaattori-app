import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { t } from '../../assets/i18n';
import MarketScreen from '../../MarketScreen/MarketScreen';
import StockScreen from '../../Stock/StockScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import { Colors, Styles } from '../styles';

const MarketStack = createStackNavigator(
  {
    StockList: {
      screen: MarketScreen,
    },
    Stock: {
      screen: StockScreen,
      navigationOptions: () => ({
        headerBackTitleVisible: true,
      }),
    },
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.StockList,
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.headerTint,
      headerTitleStyle: { textAlign: 'right', flex: 1, marginRight: 30 },
      headerLeft: <MenuIcon navigation={navigation} />,
    }),
  }
);

MarketStack.navigationOptions = {
  tabBarLabel: t('Navigation.Labels.Stocks'),
  tabBarIcon: ({ focused }: any) =>
    focused ? (
      <Image
        source={require('../assets/chart.png')}
        style={Styles.iconActive}
      />
    ) : (
      <Image
        source={require('../assets/chart.png')}
        style={Styles.iconInactive}
      />
    ),
};

export default MarketStack;
