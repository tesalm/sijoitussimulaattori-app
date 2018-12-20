import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../../assets/i18n';
import { RootState } from '../../redux/reducers';
import { Portfolio } from '../reducers';
import { stockStyles } from '../styles';

export interface BasicinfoProps {
  portfolio?: Portfolio;
  loading?: boolean;
  error?: Error;
}

export class Basicinfo extends React.Component<BasicinfoProps> {
  constructor(props: BasicinfoProps) {
    super(props);
  }
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
    const { portfolio, loading, error } = this.props;
    if (loading == undefined && portfolio == undefined && error == undefined) {
      return (
        <View>
          <Text>vituiks meni</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={stockStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (portfolio == undefined) {
        //TODO: Format the error message to user
        if (error) {
          return <Text>Error! {error.message} </Text>;
        } else {
          return <Text>Error! asöfeh {portfolio} </Text>;
        }
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
            <Text style={stockStyles.value}>{portfolio.marketValue}</Text>
            <Text style={stockStyles.valueHeader}>
              {t('PortfolioPage.Cash')}
            </Text>
            <Text style={stockStyles.value}>{portfolio.cash} </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeaderMiddle}>
              {t('PortfolioPage.TotalValue')}
            </Text>
            <Text style={stockStyles.valueMiddle}>
              {portfolio.marketValue + portfolio.cash}
            </Text>
          </View>

          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('PortfolioPage.Revenue')}
            </Text>
            <Text style={this.revenueColor(4.52)}>{portfolio.revenue}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolio: state.singlePortfolio.portfolio,
  loading: state.singlePortfolio.loading,
  error: state.singlePortfolio.error,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basicinfo);
