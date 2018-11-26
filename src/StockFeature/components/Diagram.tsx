import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
//import { stockStyles } from '../styles';

const Diagram = (): JSX.Element => {
  return (
    <View>
      <Text style={stockStyles.titleStyle}>{t('Revenue over a year')}</Text>
    </View>
  );
};

export default Diagram;
