import React from 'react';
import { Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { SinglePortfolio } from '../../PortfolioList/reducer';
import { formatCurrency } from '../../util/stock';
import { bidStyles } from '../styles';

export interface PortfolioInfoTextsProps {
  currentStockSymbol?: string;
  portfolioList?: SinglePortfolio[];
  selectedPortfolio?: string;
  stockName: string;
}

// Returns info of the selected portfolio to the bid-screen
export const PortfolioInfoTexts = (
  props: PortfolioInfoTextsProps
): JSX.Element => {
  // Returns selected portfolio as SinglePortfolio.
  function getCurrentPortfolio() {
    if (props.portfolioList) {
      return props.portfolioList.find((portfolio) => {
        return portfolio.name === props.selectedPortfolio;
      });
    }
  }

  // Get the sum of the current stocks in selected portfolio. If there is no stocks, returns 0.
  function getSumOfStockFromPortfolio() {
    const currentPortfolio = getCurrentPortfolio();
    if (
      currentPortfolio &&
      currentPortfolio.portfolioInfo &&
      currentPortfolio.portfolioInfo.portfolio
    ) {
      if (!currentPortfolio.portfolioInfo.portfolio.stocks) {
        return 0;
      } else {
        const portfolioStocks = currentPortfolio.portfolioInfo.portfolio.stocks.find(
          (stock) => {
            return stock.uid === props.currentStockSymbol;
          }
        );
        if (portfolioStocks) {
          return portfolioStocks.amount;
        }
      }
    }
    return 0;
  }

  // TODO: Take away default currency.
  // Returns the total market value of selected portfolio.
  function getPortfolioValue() {
    const currentPortfolio = getCurrentPortfolio();
    if (
      currentPortfolio &&
      currentPortfolio.portfolioInfo &&
      currentPortfolio.portfolioInfo.portfolio
    ) {
      return formatCurrency(
        currentPortfolio.portfolioInfo.portfolio.totalMarketValue,
        '$'
      );
    } else {
      return '0$';
    }
  }

  return (
    <View>
      <Text style={bidStyles.infoText}>
        {t('SumUpPage.YouOwn')}{' '}
        <Text style={bidStyles.infoTextHighlight}>
          {getSumOfStockFromPortfolio()}
        </Text>{' '}
        {t('SumUpPage.StocksOf')} {props.stockName}.
      </Text>
      <Text style={bidStyles.infoText}>
        {t('SumUpPage.YourPortfoliosTotVal')}{' '}
        <Text style={bidStyles.infoTextHighlight}>{getPortfolioValue()}</Text>
      </Text>
    </View>
  );
};
