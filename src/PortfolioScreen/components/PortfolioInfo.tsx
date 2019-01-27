import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { textStyles } from '../../App/styles';
import { t } from '../../assets/i18n';
import { Stock } from '../../MarketScreen/reducer';
import { Portfolio } from '../../PortfolioList/reducer';
import { formatRevenue, revenueColor } from '../../util/stock';
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
    if (!props.portfolio) {
      let errorMessage;
      if (props.error) {
        errorMessage = props.error.message + ' ';
      }
      // TODO: Format error message to user.
      return <Text>Error! {errorMessage} </Text>;
    }
  }

  return (
    <View>
      <View style={portfolioStyles.portfolioinfo}>
        <Text style={textStyles.title}>{props.portfolio.name}</Text>
      </View>
      <View style={portfolioStyles.portfolioinfo}>
        <View style={portfolioStyles.portfolioInfoSmallerComp}>
          <Text style={textStyles.valueHeader}>
            {t('PortfolioPage.MarketValue')}
          </Text>
          <Text style={portfolioStyles.portfolioValue}>
            {props.portfolio.totalMarketValue - props.portfolio.balance + ' $'}
          </Text>
          <Text style={textStyles.valueHeader}>{t('PortfolioPage.Cash')}</Text>
          <Text style={portfolioStyles.portfolioValue}>
            {props.portfolio.balance + ' $'}{' '}
          </Text>
        </View>
        <View style={portfolioStyles.portfolioCurlyBracketsContainer}>
          <Text style={portfolioStyles.portfolioCurlyBracket}>{'}'}</Text>
        </View>
        <View style={portfolioStyles.portfolioInfoMiddleComp}>
          <Text style={textStyles.valueHeader}>
            {t('PortfolioPage.TotalValue')}
          </Text>
          <Text style={portfolioStyles.portfolioValue}>
            {props.portfolio.totalMarketValue + ' $'}
          </Text>
        </View>

        <View style={portfolioStyles.portfolioRightComp}>
          <Text style={textStyles.valueHeader}>
            {t('PortfolioPage.Revenue')}
          </Text>
          <Text style={revenueColor(props.portfolio.lastDayRevenue)}>
            {formatRevenue(props.portfolio.lastDayRevenue)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PortfolioInfo;
