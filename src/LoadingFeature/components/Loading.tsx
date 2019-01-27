import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

const LoadingView = (): JSX.Element => {
  return (
    <>
      <Text style={styles.counterTitle}>Loading...</Text>
      <Text style={styles.counterTitle}>
        (simulated 3 seconds before sending login request)
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  counterTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 1,
  } as TextStyle,
  counterValue: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  } as TextStyle,
});

export default LoadingView;
