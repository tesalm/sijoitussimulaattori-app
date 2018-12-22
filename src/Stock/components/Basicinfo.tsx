import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import { StockMetadata, Intraday } from '../../MarketScreen/reducers';
import { revenueColor, formatCurrency } from '../../util/general';

export interface BasicinfoProps {
  revenue: string;
  stockMetadata?: StockMetadata;
  intraday?: Intraday;
  metaLoading?: boolean;
  metaError?: Error;
  intraLoading?: boolean;
  intraError?: Error;
  // Revenue is counted from intraday-data and historydata,
  // so we also need to know if hisotrydata is still loading.
  historyLoading?: boolean;
}

export const Basicinfo = (props: BasicinfoProps): JSX.Element => {
  if (props.metaLoading || props.intraLoading || props.historyLoading) {
    return (
      <View style={stockStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (props.intraday === undefined || props.stockMetadata === undefined) {
      let errorMessage;
      if (props.metaError) {
        errorMessage = props.metaError.message + ' ';
      }
      if (props.intraError) {
        errorMessage = errorMessage + props.intraError.message;
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }
  }

  return (
    <View style={stockStyles.basicinfo}>
      <View style={stockStyles.basicinfoLeft}>
        <View>
          <Text style={stockStyles.titleStyle}>
            {props.stockMetadata.name} ({props.stockMetadata.symbol})
          </Text>
        </View>
        <View style={stockStyles.basicinfoMiddle}>
          <View style={stockStyles.basicinfoMiddleContent}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Low')}</Text>
            <Text style={stockStyles.value}>
              {formatCurrency(props.intraday.low, props.stockMetadata.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.High')}</Text>
            <Text style={stockStyles.value}>
              {formatCurrency(props.intraday.high, props.stockMetadata.currency)}
            </Text>
          </View>
          <View style={stockStyles.basicinfoMiddleContent}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Open')}</Text>
            <Text style={stockStyles.value}>
              {formatCurrency(props.intraday.open, props.stockMetadata.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Close')}</Text>
            <Text style={stockStyles.value}>
              {formatCurrency(props.intraday.close, props.stockMetadata.currency)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={stockStyles.valueHeader}>
            {t('StockPage.Updated')}:{' '}
            {props.intraday.fetchTime.toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={stockStyles.basicinfoRight}>
        <Text style={stockStyles.valueHeaderRightSide}>
          {t('StockPage.Volume')}
        </Text>
        <Text style={stockStyles.valueRightSide}>{props.intraday.volume}</Text>
        <Text style={stockStyles.valueHeaderRightSide}>
          {t('StockPage.RevenueText')}
        </Text>
        <Text style={revenueColor(props.intraday.open)}>{props.revenue}</Text>
      </View>
    </View>
  );
};

export default Basicinfo;
