import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { Stock } from '../../MarketScreen/reducer';
import { Portfolio, PortfolioStock } from '../reducers';
import { stockStyles } from '../styles';

export interface BasicinfoProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
  stocks?: Stock[];
}

export const Basicinfo = (props: BasicinfoProps): JSX.Element => {
  if (props.loading) {
    return (
      <View style={stockStyles.loading}>
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
      <View style={stockStyles.basicinfo}>
        <Text style={stockStyles.titleStyle}>{t('PortfolioPage.Title')}</Text>
      </View>
      <View style={stockStyles.basicinfo}>
        <View style={stockStyles.basicinfoSmallerComp}>
          <Text style={stockStyles.valueHeader}>
            {t('PortfolioPage.MarketValue')}
          </Text>
          <Text style={stockStyles.value}>
            {calculatePortfolioValue(props.portfolio.stocks, props.stocks)}
          </Text>
          <Text style={stockStyles.valueHeader}>{t('PortfolioPage.Cash')}</Text>
          <Text style={stockStyles.value}>{props.portfolio.balance} </Text>
        </View>
        <View style={stockStyles.basicinfoSmallerComp}>
          <Text style={stockStyles.valueHeaderMiddle}>
            {t('PortfolioPage.TotalValue')}
          </Text>
          <Text style={stockStyles.valueMiddle}>
            {props.portfolio.balance + props.portfolio.balance}
          </Text>
        </View>

        <View style={stockStyles.basicinfoMidComp}>
          <Text style={stockStyles.valueHeaderRightSide}>
            {t('PortfolioPage.Revenue')}
          </Text>
          <Text>{'23'}</Text>
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
        // TODO: Muokkaa error-teksti käyttäjälle.
        return 0;
      }
      portoflioValue =
        portoflioValue +
        rightStock.stockInfo.intraday.intradayQuote[0].close * stock.amount;
    }
  });
  return portoflioValue;
};

export default Basicinfo;
