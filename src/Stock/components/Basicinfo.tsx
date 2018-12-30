import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import {
  StockMetadata,
  Intraday,
  IntradayQuote,
} from '../../MarketScreen/reducers';
import {
  revenueColor,
  formatCurrency,
  formatRevenue,
} from '../../util/general';

export interface BasicinfoProps {
  revenue: number;
  stockMetadata?: StockMetadata;
  intradayQuote?: IntradayQuote;
  fetchTime?: Date;
  metaLoading?: boolean;
  metaError?: Error;
  intraLoading?: boolean;
  intraError?: Error;
  // Revenue is count from intraday-data and historydata,
  // so we also need to know if historydata is still loading.
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
    if (
      props.intradayQuote === undefined ||
      props.stockMetadata === undefined
    ) {
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
      <View>
        <Text style={stockStyles.titleStyle}>
          {props.stockMetadata.name} ({props.stockMetadata.symbol})
        </Text>
      </View>
      <View style={stockStyles.basicinfoMiddle}>
        <View style={stockStyles.basicinfoLeft}>
          <View style={stockStyles.basicinfoMiddle}>
            <View style={stockStyles.basicinfoMiddleContent}>
              <Text style={stockStyles.valueHeader}>{t('StockPage.Low')}</Text>
              <Text style={stockStyles.value}>
                {formatCurrency(
                  props.intradayQuote.low,
                  props.stockMetadata.currency
                )}
              </Text>
              <Text style={stockStyles.valueHeader}>{t('StockPage.High')}</Text>
              <Text style={stockStyles.value}>
                {formatCurrency(
                  props.intradayQuote.high,
                  props.stockMetadata.currency
                )}
              </Text>
            </View>
            <View style={stockStyles.basicinfoMiddleContent}>
              <Text style={stockStyles.valueHeader}>{t('StockPage.Open')}</Text>
              <Text style={stockStyles.value}>
                {formatCurrency(
                  props.intradayQuote.open,
                  props.stockMetadata.currency
                )}
              </Text>
              <Text style={stockStyles.valueHeader}>
                {t('StockPage.Close')}
              </Text>
              <Text style={stockStyles.value}>
                {formatCurrency(
                  props.intradayQuote.close,
                  props.stockMetadata.currency
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={stockStyles.basicinfoRight}>
          <Text style={stockStyles.valueHeaderRightSide}>
            {t('StockPage.Volume')}
          </Text>
          <Text style={stockStyles.valueRightSide}>
            {props.intradayQuote.volume}
          </Text>
          <Text style={stockStyles.valueHeaderRightSide}>
            {t('StockPage.RevenueText')}
          </Text>
          <Text style={revenueColor(props.revenue)}>
            {formatRevenue(props.revenue)}
          </Text>
        </View>
      </View>
      <View>
        <Text style={stockStyles.valueHeader}>
          {t('StockPage.Updated')}:{' '}
          {props.fetchTime ? props.fetchTime.toLocaleString() : ''}
        </Text>
      </View>
    </View>
  );
};

export default Basicinfo;
