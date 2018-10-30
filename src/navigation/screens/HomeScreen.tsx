import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class HomeScreen extends React.Component<NavigationScreenProps> {
  //static navigationOptions = { title: 'Home' };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Listaus salkuista</Text>
        <View style={{ padding: 10 }}>
          <Button
            title="Go to Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>
      </View>
    );
  }
}
