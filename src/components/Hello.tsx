import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'You are on iOS',
  android: 'You are on Android',
});

interface HelloProps {
  name?: string;
}

export default class Hello extends React.Component<HelloProps> {
  constructor(props: HelloProps) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello, {name || 'World'}!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});