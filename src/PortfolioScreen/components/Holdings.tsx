import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { t } from '../../assets/i18n';
import { Portfolio } from '../reducers';
import { stockStyles } from '../styles';

export interface Sections {
  symbol: string;
  amount: number;
  avgPrice: number;
}
interface HoldingsProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
}

export class Holdings extends React.Component<HoldingsProps> {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section: Sections) => {
    return (
      <View>
        <Text>{section.symbol}</Text>
      </View>
    );
  };

  _renderHeader = (section: Sections) => {
    return (
      <View>
        <Text style={stockStyles.holdingsSubTitle}>{section.symbol}</Text>
      </View>
    );
  };

  _renderContent = (section: Sections) => {
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
            <Text style={stockStyles.value}>500 </Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueProcent')}
            </Text>
            <Text style={stockStyles.value}>500 </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.Acquisition')}
            </Text>
            <Text style={stockStyles.value}>10 000</Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalMarketValue')}
            </Text>
            <Text style={stockStyles.value}>500 </Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.TotalRevenueE')}
            </Text>
            <Text style={stockStyles.value}>500 </Text>
          </View>

          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('PortfolioPage.Revenue')}
            </Text>
            <Text style={stockStyles.revenueValueGreen}>+4,56%</Text>
          </View>
        </View>
      </View>
    );
  };

  _updateSections = (activeSections: number[]) => {
    this.setState({ activeSections });
  };

  render() {
    const { portfolio, error, loading } = this.props;
    if (loading) {
      return (
        <View style={stockStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (portfolio === undefined) {
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
