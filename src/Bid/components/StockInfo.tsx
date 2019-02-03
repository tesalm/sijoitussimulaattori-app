import React from 'react';
import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { getLocale } from '../../util/general';
import { formatRevenue } from '../../util/stock';
import { stockinfo } from '../styles';

export interface StockInfoProps {
  name: string;
  revenue: number;
  updated: Date;
}

export const StockInfo = (props: StockInfoProps): JSX.Element => {
  return (
    <View style={stockinfo.container}>
      <View>
        <Text style={stockinfo.stockText}>{props.name}</Text>
      </View>
      <View style={stockinfo.stockinfoMiddle}>
        <View style={stockinfo.stockinfoMiddleContent}>
          <Text style={stockinfo.valueHeaderSmall}>
            {t('StockPage.RevenueText')}
          </Text>
          <Text style={stockinfo.valueSmall}>
            {formatRevenue(props.revenue)}
          </Text>
        </View>
        <View style={stockinfo.stockinfoMiddleContent}>
          {/* TODO: Here comes the graph */}
        </View>
      </View>
      <View>
        <Text style={stockinfo.updatedText}>
          {t('StockPage.Updated')}: {props.updated.toLocaleString(getLocale())}
        </Text>
      </View>
    </View>
  );
};
