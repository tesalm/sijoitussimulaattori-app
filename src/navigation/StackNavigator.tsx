import { createStackNavigator } from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: StockScreen },
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
