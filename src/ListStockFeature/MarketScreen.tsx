import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import StockListing from './StockListing'


export default class MarketScreen extends React.Component<
   NavigationScreenProps> {
  static navigationOptions = { title: 'Stocks' };
  render() {
    
    return (        
        <StockListing/>
    );
  }
}

