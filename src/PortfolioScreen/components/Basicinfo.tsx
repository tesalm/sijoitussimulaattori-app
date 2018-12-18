import React from 'react';
import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

export class Basicinfo extends React.Component {
  revenueColor = (revenue: number): typeof stockStyles.revenueValueGreen => {
    return revenue >= 0
      ? stockStyles.revenueValueGreen
      : stockStyles.revenueValueRed;
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
    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <Text style={stockStyles.titleStyle}>{t('PortfolioPage.Title')}</Text>
        </View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.MarketValue')}
            </Text>
            <Text style={stockStyles.value}>10 000</Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.Cash')}
            </Text>
            <Text style={stockStyles.value}>500 </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeaderMiddle}>
              {t('PortfolioPage.TotalValue')}
            </Text>
            <Text style={stockStyles.valueMiddle}>10 500</Text>
          </View>

          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('PortfolioPage.Revenue')}
            </Text>
            <Text style={this.revenueColor(4.52)}>+4,56%</Text>
          </View>
        </View>
      </View>
    );
  }
}
