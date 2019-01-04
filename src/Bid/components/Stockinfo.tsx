import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { StockMetadata, Intraday } from '../../MarketScreen/reducers';
import { revenueColor, formatCurrency } from '../../util/general';
import { bidStyles, stockinfo } from '../styles';
import { stockContainerStyles } from '../../Stock/styles';

export interface StockinfoProps {
  name: string;
  marketValue: number;
  updated: Date;
}

export const StockInfo = (props: StockinfoProps): JSX.Element => {
  return (
    <View style={stockinfo.container}>
      <View>
        <Text style={stockinfo.stockText}>{props.name}</Text>
      </View>
      <View style={stockinfo.stockinfoMiddle}>
        <View style={stockinfo.stockinfoMiddleContent}>
          <Text style={stockinfo.valueHeaderSmall}>
            {t('StockPage.MarketValue')}
          </Text>
          <Text style={stockinfo.valueSmall}>{props.marketValue}</Text>
        </View>
        <View style={stockinfo.stockinfoMiddleContent}>
          <Text>HALOO</Text>
        </View>
      </View>
      <View>
        <Text style={stockinfo.updatedText}>
          {t('StockPage.Updated')}: {props.updated.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};
