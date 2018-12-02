import React from 'react';

import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

import { Stock } from '../reducer';

interface BasicinfoProps {
  stockInfo: Stock;
  loading: boolean;
  error?: Error;
}

const Basicinfo = (props: BasicinfoProps): JSX.Element => {
  if (props.error) {
    return <Text>Error! {props.error.message} </Text>;
  }

  if (props.loading) {
    return <Text>Loading!</Text>;
  }

  return (
    <View>
      <View style={stockStyles.basicinfo}>
        <View style={stockStyles.basicinfoSmallerComp}>
          <Text style={stockStyles.valueHeader}>{t('Buy')}</Text>
          <Text style={stockStyles.valuesStyle}>{props.stockInfo.buy}€</Text>
          <Text style={stockStyles.valueHeader}>{t('Sell')}</Text>
          <Text style={stockStyles.valuesStyle}>{props.stockInfo.sell}€</Text>
        </View>
        <View style={stockStyles.basicinfoSmallerComp}>
          <Text style={stockStyles.valueHeader}>{t('High')}</Text>
          <Text style={stockStyles.valuesStyle}>{props.stockInfo.high}€</Text>
          <Text style={stockStyles.valueHeader}>{t('Low')}</Text>
          <Text style={stockStyles.valuesStyle}>{props.stockInfo.low}€</Text>
        </View>
        <View style={stockStyles.basicinfoMidComp}>
          <Text>{t('Market value')}</Text>
          <Text>{props.stockInfo.marketValue}€</Text>
          <Text>{t('Revenue in 24h')}</Text>
          <Text>{props.stockInfo.revenue}€</Text>
        </View>
      </View>
      <View style={stockStyles.basicinfo}>
        <View>
          <Text>{t('Updated')} 09.11.2018 16:36.48</Text>
        </View>
      </View>
    </View>
  );
};

export default Basicinfo;
