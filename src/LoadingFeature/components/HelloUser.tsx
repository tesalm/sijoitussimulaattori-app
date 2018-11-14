import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import { t } from '../../assets/i18n';
import { UserAuth } from '../../models';

interface HelloUserProps {
  user: UserAuth;
}

const LoggedInView = (props: HelloUserProps): JSX.Element => {
  return (
    <>
      <Text style={styles.counterTitle}>{t('Loading.LoggedInAs')} </Text>
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
