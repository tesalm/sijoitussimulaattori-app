import React from 'react';

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';
import { getMetadata, getIntraday, getHistory } from '../Stock/actions';

interface SingleStockProps {
  navigation: NavigationScreenProp<NavigationState>;
  getMeta: typeof getMetadata;
  getIntra: typeof getIntraday;
  getHistoryData: typeof getHistory;
}
const SingleStockScreen = (props: SingleStockProps) => {
  <StockScreen
    symbol={props.navigation.getParam('symbol')}
    getMeta={props.getMeta}
    getIntra={props.getIntra}
    getHistoryData={props.getHistoryData}
  />;
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
