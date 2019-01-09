import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { Stock } from '../../MarketScreen/reducer';
import { formatRevenue, revenueColor } from '../../util/stock';
import { Portfolio, PortfolioStock } from '../reducers';
import { portfolioStyles } from '../styles';

export interface PortfolioInfoProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
  stocks?: Stock[];
}

export const PortfolioInfo = (props: PortfolioInfoProps): JSX.Element => {
  if (props.loading) {
    return (
      <View style={portfolioStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (props.portfolio === undefined) {
      let errorMessage;
      if (props.error) {
        errorMessage = props.error.message + ' ';
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }
  }

  return (
    <View>
      <View style={portfolioStyles.portfolioinfo}>
        <Text style={portfolioStyles.titleStyle}>
          {t('PortfolioPage.Title')}
        </Text>
      </View>
      <View style={portfolioStyles.portfolioinfo}>
        <View style={portfolioStyles.portfolioInfoSmallerComp}>
          <Text style={portfolioStyles.valueHeader}>
            {t('PortfolioPage.MarketValue')}
          </Text>
          <Text style={portfolioStyles.value}>
            {props.portfolio.totalMarketValue + ' $'}
          </Text>
          <Text style={portfolioStyles.valueHeader}>
            {t('PortfolioPage.Cash')}
          </Text>
          <Text style={portfolioStyles.value}>
            {props.portfolio.balance + ' $'}{' '}
          </Text>
        </View>
        <View style={portfolioStyles.portfolioInfoSmallerComp}>
          <Text style={portfolioStyles.valueHeaderMiddle}>
            {t('PortfolioPage.TotalValue')}
          </Text>
          <Text style={portfolioStyles.valueMiddle}>
            {props.portfolio.balance + props.portfolio.totalMarketValue + ' $'}
          </Text>
        </View>

        <View style={portfolioStyles.portfolioInfoSmallerComp}>
          <Text style={portfolioStyles.valueHeaderRightSide}>
            {t('PortfolioPage.Revenue')}
          </Text>
          <Text style={revenueColor(props.portfolio.revenue)}>
            {formatRevenue(props.portfolio.revenue)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const calculatePortfolioValue = (
  portfolioStocks: PortfolioStock[],
  stocks?: Stock[]
) => {
  //find right stock from the array.
  let portoflioValue = 0;
  portfolioStocks.forEach((stock) => {
    if (stocks) {
      const rightStock = stocks.find(
        (findStock) => findStock.symbol == stock.symbol
      );
      if (rightStock == undefined) {
        return 0;
      }
      if (rightStock.stockInfo.intraday === undefined) {
        return 0;
      }
      portoflioValue =
        portoflioValue +
        rightStock.stockInfo.intraday.intradayQuote[0].close * stock.amount;
    }
  });
  return portoflioValue;
};

export default PortfolioInfo;
