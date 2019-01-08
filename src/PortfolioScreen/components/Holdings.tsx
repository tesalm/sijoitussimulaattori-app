import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { t } from '../../assets/i18n';
import Icon from '../../general/icon';
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
} from '../../util/stock';
import { Portfolio, PortfolioStock } from '../reducers';
import { portfolioStyles } from '../styles';

interface HoldingsProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
  stocks?: Array<Stock>;
}

interface HoldingsState {
  activeSections: Array<number>;
}

export class Holdings extends React.Component<HoldingsProps, HoldingsState> {
  constructor(props: HoldingsProps, state: HoldingsState) {
    super(props);
    this.state = { activeSections: [] };
  }

  renderHeader = (
    section: PortfolioStock,
    index: number,
    isActive: boolean
  ) => {
    const iconName = isActive ? 'arrowUp' : 'arrowDown';

    return (
      <View style={portfolioStyles.holdingsSubLogoView}>
        <View style={portfolioStyles.holdingsSubTitleView}>
          <Text style={portfolioStyles.holdingsSubTitle}>{section.name}</Text>
        </View>
        <View style={portfolioStyles.holdingsArrowView}>
          <Icon iconName={iconName} iconHeight={24} iconWidth={24} />
        </View>
      </View>
    );
  };

  renderContent = (section: PortfolioStock) => {
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
        <View style={portfolioStyles.holdingsContainer}>
          <View style={portfolioStyles.portfolioInfoSmallerComp}>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.StocksOwned')}
            </Text>
            <Text style={portfolioStyles.value}>{section.amount}</Text>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.MarketValue')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(close, currency)}{' '}
            </Text>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueProcent')}
            </Text>
            <Text style={valueColor(totalRevenueProcent)}>
              {formatRevenue(totalRevenueProcent)}{' '}
            </Text>
          </View>
          <View style={portfolioStyles.portfolioInfoSmallerComp}>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.Acquisition')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(section.avgPrice, currency)}
            </Text>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.TotalMarketValue')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(totalMarketValue, currency)}{' '}
            </Text>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenue')}
            </Text>
            <Text style={valueColor(totalRevenue)}>
              {formatRevenueCurrency(totalRevenue, currency)}{' '}
            </Text>
          </View>

          <View style={portfolioStyles.portfolioInfoSmallerComp}>
            <Text style={portfolioStyles.valueHeaderRightSideHoldings}>
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

  updateSections = (activeSections: number[]) => {
    this.setState({ activeSections });
  };

  render() {
    const { portfolio, error, loading, stocks } = this.props;
    if (loading) {
      return (
        <View style={portfolioStyles.loading}>
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
        <View style={portfolioStyles.holdingsLogoView}>
          <Icon iconName={'holdings'} iconHeight={24} iconWidth={24} />
          <Text style={portfolioStyles.titleText}>
            {t('PortfolioPage.Holdings')}
          </Text>
        </View>
        <Accordion
          expandMultiple={true}
          sections={portfolio.stocks}
          activeSections={this.state.activeSections}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          onChange={this.updateSections}
          sectionContainerStyle={portfolioStyles.accordionContainer}
        />
      </View>
    );
  }
}
