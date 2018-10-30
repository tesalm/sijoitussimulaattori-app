import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class InfoScreen extends React.Component<NavigationScreenProps> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Infosivu</Text>
      </View>
    );
  }
}
