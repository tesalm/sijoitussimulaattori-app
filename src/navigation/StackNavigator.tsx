<<<<<<< HEAD
import { createStackNavigator } from 'react-navigation';

import { MarketScreen } from '../MarketScreen/MarketScreen';
import { StockScreen } from '../Stock/StockScreen';

const StackNavi = createStackNavigator(
  {
    StockList: { screen: MarketScreen },
    SingleStock: { screen: StockScreen },
=======
import React from 'react';
import { createStackNavigator, NavigationScreenProp, NavigationState } from 'react-navigation';

import { PortfolioListScreen } from '../PortfolioList/PortfolioListScreen';
import { getPortfolioData } from '../PortfolioScreen/actions';
import { PortfolioScreen } from '../PortfolioScreen/PortfolioScreen';

interface SinglePortfolioProps {
  navigation: NavigationScreenProp<NavigationState>;
  getPortfolio: typeof getPortfolioData;
}
const SinglePortfolioScreen = (props: SinglePortfolioProps) => {
  <PortfolioScreen
    name={props.navigation.getParam('name')}
    getPortfolio={props.getPortfolio}
  />;
};

const StackNavi = createStackNavigator(
  {
    PortfolioListing: { screen: PortfolioListScreen },
    SinglePortfolio: { screen: SinglePortfolioScreen },
>>>>>>> made lot of modifications, redux is still not working
  },
  {
    mode: 'modal',
  }
);

export default StackNavi;
