import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { cardButtonStyles, cardStyles } from '../App/styles';
import CardButton from '../general/cardButton';
import { getHistory, getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { getPortfolioData } from './actions';
import { Holdings } from './components/Holdings';
import { PortfolioInfo } from './components/PortfolioInfo';
import { Portfolio } from './reducers';

export interface PortfolioProps {
  portfolio?: Portfolio;
  getPortfolio: typeof getPortfolioData;
  portfolioId?: string;
  loading: boolean;
  error?: Error;
  refreshing: boolean;
  stocks: Array<Stock>;
  getAllStocks: typeof getStocks;
  getMeta: typeof getStockMetadata;
  getHistoryData: typeof getHistory;
  getIntra: typeof getIntraday;
  refreshIntra: typeof refreshIntraday;
}

type PortfolioPropsWithNavigation = PortfolioProps & NavigationScreenProps;

export class PortfolioScreen extends React.Component<
  PortfolioPropsWithNavigation
> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };
  constructor(props: PortfolioPropsWithNavigation) {
    super(props);
  }

  async componentDidMount() {
    if (this.props.portfolioId) {
      await this.props.getPortfolio(this.props.portfolioId);
    }

    await this.props.getAllStocks();

    if (this.props.portfolio) {
      await this.props.portfolio.stocks.forEach(async (portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.uid;
        });
        if (findStock) {
          await this.props.getMeta(findStock, findStock.symbol);
          await this.props.getHistoryData(findStock, findStock.symbol);
          await this.props.getIntra(findStock, findStock.symbol);
        }
      });
    }
  }

  refreshPortfolioAndStock = () => {
    if (this.props.portfolioId) {
      this.props.getPortfolio(this.props.portfolioId);
    }
    if (this.props.portfolio) {
      this.props.portfolio.stocks.forEach(async (portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.uid;
        });
        if (findStock) {
          await this.props.refreshIntra(findStock, findStock.symbol);
        }
      });
    }
  };

  render() {
    const { portfolio, error, loading, stocks, refreshing } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refreshPortfolioAndStock}
            colors={[Colors.baseColor]}
          />
        }
      >
        <Card containerStyle={cardStyles.container}>
          <PortfolioInfo
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
        </Card>
        <Card containerStyle={cardStyles.container} />
        <Card containerStyle={cardStyles.container}>
          <Holdings
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
        </Card>
        <Card containerStyle={cardButtonStyles.cardButton}>
          <CardButton
            iconName={'manage'}
            translationTitle={'PortfolioPage.Events'}
            //TODO: navigate to events page
            onPress={() => this.props.navigation.navigate(RouteName.Home)}
          />
        </Card>
        <Card containerStyle={cardButtonStyles.cardButton}>
          <CardButton
            iconName={'manage'}
            translationTitle={'PortfolioPage.Manage'}
            //TODO: navigae to manage portfolio page
            onPress={() => this.props.navigation.navigate(RouteName.Home)}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolioId: state.portfolioListing.portfolioId,
  portfolio: state.singlePortfolio.portfolio,
  error: state.singlePortfolio.error,
  loading: state.singlePortfolio.loading,
  stocks: state.stocksListing.stocks,
  refreshing: state.singlePortfolio.refreshing,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getPortfolio: getPortfolioData,
      getAllStocks: getStocks,
      getMeta: getStockMetadata,
      getIntra: getIntraday,
      getHistoryData: getHistory,
      refreshIntra: refreshIntraday,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);
