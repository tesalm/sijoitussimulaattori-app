import React from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

const SECTIONS = [
  {
    title: 'Kemira',
    stocks: 17,
    marketValue: 13.49,
    totalRevenue: '+15,73',
    acquisitionPrice: 12.33,
    totalMarketValue: 229.33,
    totalRevenueE: '+73.59',
    todayRevenue: '+4.75',
  },
  {
    title: 'DNA Oy',
    stocks: 17,
    marketValue: 13.49,
    totalRevenue: '+15,73',
    acquisitionPrice: 12.33,
    totalMarketValue: 229.33,
    totalRevenueE: 73.59,
    todayRevenue: '+4.75',
  },
  {
    title: 'DNA Oy',
    stocks: 17,
    marketValue: 13.49,
    totalRevenue: '+15,73',
    acquisitionPrice: 12.33,
    totalMarketValue: 229.33,
    totalRevenueE: 73.59,
    todayRevenue: '+4.75',
  },
];

interface Section {
  title: 'string';
  stocks: number;
  marketValue: number;
  totalRevenue: string;
  acquisitionPrice: number;
  totalMarketValue: number;
  totalRevenueE: string;
  todayRevenue: string;
}

export class Holdings extends React.Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section: Section) => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  _renderHeader = (section: Section) => {
    return (
      <View>
        <Text style={stockStyles.holdingsSubTitle}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section: Section) => {
    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.StocksOwned')}
            </Text>
            <Text style={stockStyles.value}>10 000</Text>
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
    return (
      <View>
        <Text style={stockStyles.titleText}>{t('PortfolioPage.Holdings')}</Text>
        <Accordion
          expandMultiple={true}
          sections={SECTIONS}
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
