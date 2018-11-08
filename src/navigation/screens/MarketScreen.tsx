import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { Styles } from '../styles';

interface StockProps{
  info: string;
}
interface StockState{
  data:Array<{key: string, value: string}>;
}

class Stocks extends React.Component<StockProps,StockState> {
  constructor(props:StockProps){
    super(props);
    this.state = {
      data:[{key: "Nokia", value: "3.5%"},{key: "Apple", value: "4.5%"}] 
    }
  }
  render() {
    return (
        <FlatList
          data= {this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.key}
              rightTitle = {item.value}
              rightTitleStyle = {{color: 'green'}}
              subtitle={item.value}
            />
          )}
        />
    );
  }

}

export default class MarketScreen extends React.Component<
   NavigationScreenProps> {
  static navigationOptions = { title: 'Stocks' };
  render() {
    return (
      <List>  
        <Stocks></Stocks>
      </List>
    );
  }
}

