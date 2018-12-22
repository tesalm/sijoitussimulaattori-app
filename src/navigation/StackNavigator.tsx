import React from 'react';

import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';
import {
  getMetadata,
  getIntraday,
  getHistory,
  refreshIntraday,
} from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducers';

interface SingleStockProps {
  navigation: NavigationScreenProp<NavigationState>;
  getMeta: typeof getMetadata;
  getIntra: typeof getIntraday;
  refreshIntra: typeof refreshIntraday;
  getHistoryData: typeof getHistory;
  stockList: Array<Stock>;
  refreshing: boolean;
}

const SingleStockScreen = (props: SingleStockProps) => {
  <StockScreen
    symbol={props.navigation.getParam('symbol')}
    stocks={props.stockList}
    refreshing={props.refreshing}
    getMeta={props.getMeta}
    getIntra={props.getIntra}
    refreshIntra={props.refreshIntra}
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
