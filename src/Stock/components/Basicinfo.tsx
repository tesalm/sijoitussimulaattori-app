import React from 'react';

import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

import { Stock } from '../reducers';

interface BasicinfoProps {
  stockInfo?: Stock;
  error?: Error;
}

export class Basicinfo extends React.Component<BasicinfoProps> {
  constructor(props: BasicinfoProps) {
    super(props);
  }

  revenueColor = (revenue: number): typeof stockStyles.revenueValueGreen => {
    return revenue >= 0
      ? stockStyles.revenueValueGreen
      : stockStyles.revenueValueRed;
  };

  //format revenue to right forms. Converts number to string and add procent marker.
  formatRevenue = (revenue: number): string => {
    return revenue >= 0
      ? '+' + (revenue * 100).toFixed(2) + ' %'
      : (revenue * 100).toFixed(2) + ' %';
  };

  formatValue = (value: number, currency: string): string => {
    if (currency == 'USD') {
      return value + ' $';
    } else if (currency == 'EUR') {
      return value + ' €';
    }
    return value + ' $';
  };

  render() {
    const { stockInfo, error } = this.props;

    if (stockInfo == undefined) {
      // TODO: Format error for user.
      return <Text>Error!</Text>;
    }

    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Buy')}</Text>
            <Text style={stockStyles.valuesStyle}>
              {this.formatValue(stockInfo.buy, stockInfo.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Sell')}</Text>
            <Text style={stockStyles.valuesStyle}>
              {this.formatValue(stockInfo.sell, stockInfo.currency)}
            </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.High')}</Text>
            <Text style={stockStyles.valuesStyle}>
              {this.formatValue(stockInfo.high, stockInfo.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Low')}</Text>
            <Text style={stockStyles.valuesStyle}>
              {this.formatValue(stockInfo.low, stockInfo.currency)}
            </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp} />
          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('StockPage.MarketValue')}
            </Text>
            <Text style={stockStyles.marketValue}>
              {this.formatValue(stockInfo.marketValue, stockInfo.currency)}
            </Text>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('StockPage.RevenueText')}
            </Text>
            <Text style={this.revenueColor(stockInfo.revenue)}>
              {this.formatRevenue(stockInfo.revenue)}
            </Text>
          </View>
        </View>
        <View style={stockStyles.basicinfo}>
          <View>
            <Text style={stockStyles.valueHeader}>
              {t('StockPage.Updated')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Basicinfo;
