import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Colors } from '../../App/colors';
import { t } from '../../assets/i18n';
import MarketScreen from '../../MarketScreen/MarketScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import { Styles } from '../styles';

const MarketStack = createStackNavigator(
  {
    StockList: {
      screen: MarketScreen,
    },
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.StockList,
    navigationOptions: ({ navigation }) => ({
      headerStyle: Styles.header,
      headerTintColor: Colors.whiteBackground,
      headerTitleStyle: { textAlign: 'left', flex: 1 },
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
