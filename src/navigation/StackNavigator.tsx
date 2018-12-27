import { createStackNavigator } from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';
import { BidScreen } from '../Bid/BidScreen';

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: StockScreen },
    Bid: { screen: BidScreen },
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
