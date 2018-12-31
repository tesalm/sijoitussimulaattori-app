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
import { Basicinfo } from './components/Basicinfo';
import { EventsTransactions, Manage } from './components/Buttons';
import { Holdings } from './components/Holdings';
import { Portfolio } from './reducers';
import { stockContainerStyles } from './styles';

export interface PortfolioProps {
  portfolio?: Portfolio;
  getPortfolio: typeof getPortfolioData;
  name?: string;
  loading: boolean;
  error?: Error;
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
    await this.props.getPortfolio();
    await this.props.getAllStocks();

    if (this.props.portfolio) {
      this.props.portfolio.stocks.forEach((portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.symbol;
        });
        if (findStock) {
          this.props.getMeta(findStock, findStock.symbol);
          this.props.getHistoryData(findStock, findStock.symbol);
          this.props.getIntra(findStock, findStock.symbol);
        }
      });
    }
  }

  refresh = () => {
    const curTime = new Date();
    if (this.props.portfolio) {
      this.props.portfolio.stocks.forEach((portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.symbol;
        });
        if (findStock) {
          this.props.refreshIntra(findStock, findStock.symbol);
        }
      });
    }
  };

  checkRefresh = (): boolean => {
    this.props.stocks.forEach((stock) => {
      if (stock.stockInfo.refreshing) {
        return true;
      }
    });
    return false;
  };

  render() {
    const { portfolio, error, loading, stocks } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            //TODO: what is this
            refreshing={this.checkRefresh()}
            onRefresh={this.refresh}
            colors={[Colors.baseColor]}
          />
        }
      >
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <Basicinfo portfolio={portfolio} loading={loading} error={error} />
        </Card>
        <Card containerStyle={stockContainerStyles.diagram} />
        <Card containerStyle={stockContainerStyles.holdings}>
          <Holdings
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
        </Card>
        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <EventsTransactions />
        </Card>
        <Card containerStyle={stockContainerStyles.buttonContainer}>
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
