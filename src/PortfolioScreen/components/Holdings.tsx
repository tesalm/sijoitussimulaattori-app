import React from 'react';
import { ActivityIndicator, Text, TouchableHighlight, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { textStyles } from '../../App/styles';
import { t } from '../../assets/i18n';
import Icon, { IconNames } from '../../general/icon';
import { Stock } from '../../MarketScreen/reducer';
import { Portfolio, PortfolioStock } from '../../PortfolioList/reducer';
import { formatCurrency, formatRevenue, formatRevenueCurrency, revenueColor, valueColor } from '../../util/stock';
import { portfolioStyles } from '../styles';

export interface HoldingsProps {
  portfolio?: Portfolio;
  portfolioLoading: boolean;
  stocksLoading: boolean;
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

  // Render header for one section
  renderHeader = (
    section: PortfolioStock,
    index: number,
    isActive: boolean
  ) => {
    const { error, stocks } = this.props;
    if (stocks === undefined) {
      let errorMessage;
      if (error) {
        errorMessage = error.message + ' ';
      }
      // TODO: Format error message to user
      return <Text>Error! {errorMessage} </Text>;
    }
    // find right stock from the array.
    const rightStock = stocks.find((stock) => stock.symbol === section.uid);
    if (rightStock === undefined) {
      let errorMessage;
      if (error) {
        // TODO: Format Error message to user
        errorMessage = error.message;
      }
      return <Text> Error! {errorMessage}</Text>;
    }
    // Check if it still loading data.
    if (
      !rightStock.stockInfo ||
      rightStock.stockInfo.metaLoading ||
      rightStock.stockInfo.intraLoading
    ) {
      return <ActivityIndicator size="small" />;
    }

    const iconName = isActive ? IconNames.arrowUp : IconNames.arrowDown;

    return (
      <View style={portfolioStyles.holdingsLogoView}>
        <View style={portfolioStyles.holdingsTitleView}>
          <Text style={portfolioStyles.holdingsSubTitle}>
            {rightStock.name}
          </Text>
        </View>
        <View style={portfolioStyles.holdingsArrowView}>
          <Icon iconName={iconName} iconHeight={24} iconWidth={24} />
        </View>
      </View>
    );
  };

  // Renders content for one section
  renderContent = (section: PortfolioStock) => {
    const { error, stocks } = this.props;
    if (stocks === undefined) {
      let errorMessage;
      if (error) {
        errorMessage = error.message + ' ';
      }
      // TODO: Format error message to user.
      return <Text>Error! {errorMessage} </Text>;
    }

    // find right stock from the array.
    const rightStock = stocks.find((stock) => stock.symbol === section.uid);
    if (rightStock === undefined) {
      let errorMessage;
      if (error) {
        errorMessage = error.message + ' ';
      }
      // TODO: Format error message to user.
      return <Text>Error! {errorMessage} </Text>;
    }
    if (
      !rightStock.stockInfo ||
      !rightStock.stockInfo.intraday ||
      !rightStock.stockInfo.stockMetadata
    ) {
      let errorMessage;
      if (rightStock.stockInfo && rightStock.stockInfo.metaError) {
        errorMessage = rightStock.stockInfo.metaError.message + ' ';
      }
      if (rightStock.stockInfo && rightStock.stockInfo.intraError) {
        errorMessage = errorMessage + rightStock.stockInfo.intraError.message;
      }
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {errorMessage} </Text>;
    }

    // calculate all needed values.
    const currency = rightStock.stockInfo.stockMetadata.currency;
    const close = rightStock.stockInfo.intraday.intradayQuote[0].close;
    const totalRevenueCurrency =
      section.totalMarketValue - section.avgPrice * section.amount;
    return (
      <View>
        <View style={portfolioStyles.holdingsContainer}>
          <View style={portfolioStyles.portfolioInfoSmallerComp}>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.StocksOwned')}
            </Text>
            <Text style={portfolioStyles.value}>{section.amount}</Text>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.MarketValue')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(close, currency)}{' '}
            </Text>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueProcent')}
            </Text>
            <Text style={valueColor(section.totalRevenue)}>
              {formatRevenue(section.totalRevenue)}{' '}
            </Text>
          </View>
          <View style={portfolioStyles.portfolioInfoSmallerComp}>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.Acquisition')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(section.avgPrice, currency)}
            </Text>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.TotalMarketValue')}
            </Text>
            <Text style={portfolioStyles.value}>
              {formatCurrency(section.totalMarketValue, currency)}{' '}
            </Text>
            <Text style={textStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenue')}
            </Text>
            <Text style={valueColor(totalRevenueCurrency)}>
              {formatRevenueCurrency(totalRevenueCurrency, currency)}{' '}
            </Text>
          </View>

          <View style={portfolioStyles.portfolioHoldingsRightComp}>
            <Text style={portfolioStyles.valueHeader}>
              {t('PortfolioPage.Revenue')}
            </Text>
            <Text style={revenueColor(section.lastDayRevenue)}>
              {formatRevenue(section.lastDayRevenue)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  updateSections = (activeSections: number[]) => {
    this.setState({ activeSections });
  };

  // When icon is pressed, open or close all sections
  onPressOpenOrClose = () => {
    if (this.props.portfolio) {
      // If all sections open, close them if not, open them all.
      if (
        this.state.activeSections.length === this.props.portfolio.stocks.length
      ) {
        this.updateSections([]);
      } else {
        this.updateSections(
          new Array(this.props.portfolio.stocks.length)
            .fill(undefined)
            .map((_, i) => i)
        );
      }
    }
  };

  render() {
    const {
      portfolio,
      error,
      portfolioLoading,
      stocksLoading,
      stocks,
    } = this.props;
    if (portfolioLoading || stocksLoading) {
      return (
        <View style={portfolioStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (!portfolio || !stocks) {
        let errorMessage;
        if (error) {
          errorMessage = error.message + ' ';
        }
        // TODO: Format error message to user.
        return <Text>Error! {errorMessage} </Text>;
      }
    }
    // Choose correct icon
    const iconName =
      this.state.activeSections.length === portfolio.stocks.length
        ? IconNames.twoArrowClose
        : IconNames.twoArrowOpen;

    return (
      <View>
        <View style={portfolioStyles.holdingsLogoView}>
          <View style={portfolioStyles.holdingsTitleView}>
            <Icon
              iconName={IconNames.holdings}
              iconHeight={24}
              iconWidth={24}
            />
            <Text style={portfolioStyles.titleText}>
              {t('PortfolioPage.Holdings')}
            </Text>
          </View>
          <View style={portfolioStyles.holdingsArrowView}>
            <TouchableHighlight onPress={this.onPressOpenOrClose}>
              <Icon iconName={iconName} iconHeight={24} iconWidth={24} />
            </TouchableHighlight>
          </View>
        </View>

        <Accordion
          underlayColor={'white'}
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
