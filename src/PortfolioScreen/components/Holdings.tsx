import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { t } from '../../assets/i18n';
import { Stock } from '../../MarketScreen/reducer';
import {
  calculateTotalMarketValue,
  calculateTotalRevenue,
  calculateTotalRevenueProcent,
  countRevenuePercentage,
  formatCurrency,
  formatRevenue,
  formatRevenueCurrency,
  revenueColor,
  valueColor,
} from '../../util/general';
import { Portfolio, PortfolioStock } from '../reducers';
import { stockStyles } from '../styles';

interface HoldingsProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
  stocks?: Array<Stock>;
}

export class Holdings extends React.Component<HoldingsProps> {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section: PortfolioStock) => {
    return (
      <View>
        <Text>{section.symbol}</Text>
      </View>
    );
  };

  _renderHeader = (section: PortfolioStock) => {
    return (
      <View>
        <Text style={stockStyles.holdingsSubTitle}>{section.symbol}</Text>
      </View>
    );
  };

  _renderContent = (section: PortfolioStock) => {
    const { error, stocks } = this.props;
    if (stocks == undefined) {
      let errorMessage;
      if (error) {
        errorMessage = error.message + ' ';
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }

    //find right stock from the array.
    const rightStock = stocks.find((stock) => stock.symbol == section.symbol);
    if (rightStock == undefined) {
      let errorMessage;
      if (error) {
        errorMessage = error.message + ' ';
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }
    if (
      rightStock.stockInfo.intraday === undefined ||
      rightStock.stockInfo.stockMetadata === undefined ||
      rightStock.stockInfo.historyData == undefined
    ) {
      let errorMessage;
      if (rightStock.stockInfo.metaError) {
        errorMessage = rightStock.stockInfo.metaError.message + ' ';
      }
      if (rightStock.stockInfo.intraError) {
        errorMessage = errorMessage + rightStock.stockInfo.intraError.message;
      }
      if (rightStock.stockInfo.historyError) {
        errorMessage = errorMessage + rightStock.stockInfo.historyError.message;
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }

    //calculate all necessary values needed.
    const currency = rightStock.stockInfo.stockMetadata.currency;
    const close = rightStock.stockInfo.intraday.intradayQuote[0].close;
    const totalRevenueProcent = calculateTotalRevenueProcent(
      rightStock,
      section
    );
    const totalMarketValue = calculateTotalMarketValue(rightStock, section);
    const totalRevenue = calculateTotalRevenue(rightStock, section);
    const revenueProcent = countRevenuePercentage(rightStock);

    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.StocksOwned')}
            </Text>
            <Text style={stockStyles.value}>{section.amount}</Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.MarketValue')}
            </Text>
            <Text style={stockStyles.value}>
              {formatCurrency(close, currency)}{' '}
            </Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueProcent')}
            </Text>
            <Text style={valueColor(totalRevenueProcent)}>
              {formatRevenue(totalRevenueProcent)}{' '}
            </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.Acquisition')}
            </Text>
            <Text style={stockStyles.value}>
              {formatCurrency(section.avgPrice, currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalMarketValue')}
            </Text>
            <Text style={stockStyles.value}>
              {formatCurrency(totalMarketValue, currency)}{' '}
            </Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueE')}
            </Text>
            <Text style={valueColor(totalRevenue)}>
              {formatRevenueCurrency(totalRevenue, currency)}{' '}
            </Text>
          </View>

          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('PortfolioPage.Revenue')}
            </Text>
            <Text style={revenueColor(revenueProcent)}>
              {formatRevenue(revenueProcent)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _updateSections = (activeSections: number[]) => {
    this.setState({ activeSections });
  };

  render() {
    const { portfolio, error, loading, stocks } = this.props;
    if (loading) {
      return (
        <View style={stockStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (
        portfolio === undefined ||
        stocks == undefined ||
        portfolio == undefined
      ) {
        let errorMessage;
        if (error) {
          errorMessage = error.message + ' ';
        }
        // TODO: Muokkaa error-teksti käyttäjälle.
        return <Text>Error! {errorMessage} </Text>;
      }
    }

    return (
      <View>
        <Text style={stockStyles.titleText}>{t('PortfolioPage.Holdings')}</Text>
        <Accordion
          expandMultiple={true}
          sections={portfolio.stocks}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          sectionContainerStyle={stockStyles.accordionContainer}
        />
      </View>
    );
  }
}
