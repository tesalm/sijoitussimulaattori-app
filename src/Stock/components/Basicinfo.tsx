import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

import { Stock } from '../../redux/reducers';

interface BasicinfoProps {
  stockInfo?: Stock;
  //loading: boolean;
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

  render() {
    const { stockInfo, error } = this.props;

    if (stockInfo == undefined) {
      console.log(stockInfo);
      return <Text>Error!</Text>;
    }

    // if (loading) {
    //   return <ActivityIndicator size="large" style={{ marginTop: '5%' }} />;
    // }

    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('Buy')}</Text>
            <Text style={stockStyles.valuesStyle}>{stockInfo.buy}€</Text>
            <Text style={stockStyles.valueHeader}>{t('Sell')}</Text>
            <Text style={stockStyles.valuesStyle}>{stockInfo.sell}€</Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('High')}</Text>
            <Text style={stockStyles.valuesStyle}>{stockInfo.high}€</Text>
            <Text style={stockStyles.valueHeader}>{t('Low')}</Text>
            <Text style={stockStyles.valuesStyle}>{stockInfo.low}€</Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp} />
          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('Market value')}
            </Text>
            <Text style={stockStyles.marketValue}>
              {stockInfo.marketValue}€
            </Text>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('Revenue in 24h')}
            </Text>
            <Text style={this.revenueColor(stockInfo.revenue)}>
              {this.formatRevenue(stockInfo.revenue)}
            </Text>
          </View>
        </View>
        <View style={stockStyles.basicinfo}>
          <View>
            <Text style={stockStyles.valueHeader}>
              {t('Updated')} 09.11.2018 16:36.48
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Basicinfo;
