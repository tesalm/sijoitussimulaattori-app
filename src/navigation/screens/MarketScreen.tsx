import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class MarketScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: 'Stocks' };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Lista tarjolla olevista arvopapereista</Text>
        <View style={{ padding: 10 }}>
          <Button
            title="Go to Commissions"
            onPress={() => this.props.navigation.navigate('Commissions')}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
}
