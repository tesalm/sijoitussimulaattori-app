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
import { stockContainerStyles } from './styles';

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
    this.props.getPortfolio();
  };

  render() {
    const { portfolio, error, loading, stocks, refreshing } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refresh}
            colors={[Colors.baseColor]}
          />
        }
      >
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <PortfolioInfo
            portfolio={portfolio}
            loading={loading}
            error={error}
            stocks={stocks}
          />
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
