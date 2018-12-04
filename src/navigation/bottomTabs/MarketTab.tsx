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
import { Colors, Styles } from '../styles';
import { StockScreen } from '../../Stock/StockScreen';

type SingleStockProps = {
  navigation: NavigationScreenProp<NavigationState>;
};
const SingleStockScreen = (props: SingleStockProps) => {
  if (props.navigation.state.params == undefined) {
    console.log('STOCK-SYMBOL EI LÖYTYNYT');
    return <StockScreen symbol={''} stockInfo={undefined} />;
  }

  return (
    <StockScreen
      symbol={props.navigation.state.params.symbol}
      stockInfo={props.navigation.state.params.stock}
    />
  );
};

const MarketStack = createStackNavigator(
  {
    Market: { screen: MarketScreen },
    Info: { screen: InfoScreen },
    SingleStock: { screen: SingleStockScreen },
    // TODO add more pages related to this tab
  },
  {
    headerMode: 'float',
    initialRouteName: RouteName.Market,
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
  tabBarOnPress: ({ navigation, defaultHandler }: any) => {
    navigation.popToTop();
    defaultHandler();
  },
};

export default MarketStack;
