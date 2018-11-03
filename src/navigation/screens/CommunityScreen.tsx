import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class CommunityScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: 'Community' };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Yhteisö sivu</Text>
      </View>
    );
  }
}
