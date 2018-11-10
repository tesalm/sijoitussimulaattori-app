import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import StockListing from './StockListing'


export default class MarketScreen extends React.Component<
   NavigationScreenProps> {
  static navigationOptions = { title: 'Stocks' };
  render() {
    
    return (
      <List>  
        <StockListing/>
      </List>
    );
  }
}

