import React from 'react';
import { Image } from 'react-native';
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { t } from '../../assets/i18n';
import MarketScreen from '../../MarketScreen/MarketScreen';
import MenuIcon from '../components/MenuIcon';
import { RouteName } from '../routes';
import InfoScreen from '../screens/InfoScreen';
import { Styles } from '../styles';
import StockScreen from '../../Stock/StockScreen';
import BidScreen from '../../Bid/BidScreen';
import SumUpScreen from '../../SumUp/SumUpScreen';
import { Colors } from '../../App/colors';

interface SumUpProps {
  action: string;
  bidLevel: string;
  sumOfStocks: string;
  selectedPortfolio: string;
}

const MarketStack = createStackNavigator(
  {
    Market: { screen: MarketScreen },
    Info: { screen: InfoScreen },
    SingleStock: { screen: StockScreen },
    Bid: { screen: BidScreen },
    SumUp: { screen: SumUpScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.Market,
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
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default MarketStack;
