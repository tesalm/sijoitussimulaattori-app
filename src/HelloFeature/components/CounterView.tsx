import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

import { helloStyles } from '../styles';

interface CounterViewProps {
  counterValue: number;
}

const CounterView = (props: CounterViewProps): JSX.Element => {
  return (
    <>
      <Text style={styles.counterTitle}>Counter value is:</Text>
      <Text style={styles.counterValue}>{props.counterValue}</Text>
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

export default CounterView;
