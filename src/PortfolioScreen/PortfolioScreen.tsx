import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { getHistory, getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { getPortfolioData } from './actions';
import { EventsTransactions, Manage } from './components/Buttons';
import { Holdings } from './components/Holdings';
import { PortfolioInfo } from './components/PortfolioInfo';
import { Portfolio } from './reducers';
import { portfolioContainerStyles } from './styles';

export interface PortfolioProps {
  portfolio?: Portfolio;
  getPortfolio: typeof getPortfolioData;
  name?: string;
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

export class PortfolioScreen extends React.Component<PortfolioProps> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };
  constructor(props: PortfolioProps) {
    super(props);
  }

  async componentDidMount() {
    if (this.props.name) {
      await this.props.getPortfolio(this.props.name);
    }

    await this.props.getAllStocks();

    if (this.props.portfolio) {
      await this.props.portfolio.stocks.forEach(async (portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.symbol;
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
    if (this.props.name) {
      this.props.getPortfolio(this.props.name);
    }
    if (this.props.portfolio) {
      this.props.portfolio.stocks.forEach(async (portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.symbol;
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
        <Card containerStyle={portfolioContainerStyles.basicInfo}>
          <PortfolioInfo
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
        </Card>
        <Card containerStyle={portfolioContainerStyles.diagram} />
        <Card containerStyle={portfolioContainerStyles.holdings}>
          <Holdings
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
        </Card>
        <Card containerStyle={portfolioContainerStyles.buttonContainer}>
          <EventsTransactions />
        </Card>
        <Card containerStyle={portfolioContainerStyles.buttonContainer}>
          <Manage />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  name: state.portfolioListing.name,
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
