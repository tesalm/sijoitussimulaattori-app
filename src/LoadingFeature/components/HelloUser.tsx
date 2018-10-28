import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';
import { User } from '../../models';

interface HelloUserProps {
  user: User;
}

const LoggedInView = (props: HelloUserProps): JSX.Element => {
  return (
    <>
      <Text style={styles.counterTitle}>Logged in as </Text>
      <Text style={styles.counterValue}>{props.user.uid}</Text>
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

export default LoggedInView;
