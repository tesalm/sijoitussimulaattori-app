import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class MarketScreen extends React.Component<
  NavigationScreenProps
> {
  render() {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
