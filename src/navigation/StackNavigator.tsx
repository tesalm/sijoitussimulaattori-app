import { createStackNavigator } from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { PortfolioListScreen } from '../PortfolioList/PortfolioListScreen';
import { PortfolioScreen } from '../PortfolioScreen/PortfolioScreen';
import { StockScreen } from '../Stock/StockScreen';

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: StockScreen },
    PortfolioListing: { screen: PortfolioListScreen },
    SinglePortfolio: { screen: PortfolioScreen },
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
