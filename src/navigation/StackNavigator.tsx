import React from 'react';

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';

type SingleStockProps = {
  navigation: NavigationScreenProp<NavigationState>;
};
const SingleStockScreen = (props: SingleStockProps) => {
  <StockScreen symbol={props.navigation.getParam('symbol')} />;
};

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: SingleStockScreen },
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
