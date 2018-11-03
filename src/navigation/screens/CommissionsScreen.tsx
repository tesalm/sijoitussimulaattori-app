import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class CommissionsScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: 'Commissions' };
  render() {
    return (
      <View style={styles.container}>
        <Text>Omat toimeksiannot</Text>
        <View style={{ padding: 10 }}>
          <Button
            title="Go to Markets"
            onPress={() => this.props.navigation.navigate('Market')}
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
