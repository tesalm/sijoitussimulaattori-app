import React from 'react';
import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

const Diagram = (): JSX.Element => {
  return (
    <View>
      <Text style={stockStyles.titleStyle}>
        {t('StockPage.RevenueOverYear')}
      </Text>
    </View>
  );
};

export default Diagram;
