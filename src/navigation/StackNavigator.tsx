import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';
import { BidScreen } from '../Bid/BidScreen';
import SumUpScreen from '../SumUp/SumUpScreen';

interface SumUpProps {
  action: string;
  bidLevel: string;
  sumOfStocks: string;
  selectedPortfolio: string;
}

const SummingUpScreen = (props: SumUpProps) => {
  <SumUpScreen
    action={props.action}
    currentBidLevel={props.bidLevel}
    stocks={props.sumOfStocks}
    portfolio={props.selectedPortfolio}
  />;
};

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: StockScreen },
    Bid: { screen: BidScreen },
    SumUp: { screen: SummingUpScreen },
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
