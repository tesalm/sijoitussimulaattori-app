import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { getHistory, getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducers';
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
export interface extendendStock {
  stock: Stock;
  amount: number;
}

export class PortfolioScreen extends React.Component<PortfolioProps> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };
  constructor(props: PortfolioProps) {
    super(props);
  }

  async componentDidMount() {
    const curTime = new Date();
    //TODO: Muokkaa tämä paremmaksi
    await this.props.getPortfolio();
    await this.props.getAllStocks();

    if (this.props.portfolio) {
      this.props.portfolio.stocks.forEach((portfolioStock) => {
        var findStock = this.props.stocks.find((stock) => {
          return stock.symbol === portfolioStock.symbol;
        });
        if (findStock) {
          if (
            findStock.stockInfo == undefined ||
            findStock.stockInfo.stockMetadata == undefined ||
            onceADayRefreshrateDated(
              curTime,
              findStock.stockInfo.stockMetadata.fetchTime
            )
          ) {
            this.props.getMeta(this.props.stocks, findStock.symbol, curTime);
          }
          // Fetch historydata if needed
          if (
            findStock.stockInfo === undefined ||
            findStock.stockInfo.historyData === undefined ||
            onceADayRefreshrateDated(
              curTime,
              findStock.stockInfo.historyData.fetchTime
            )
          ) {
            this.props.getHistoryData(
              this.props.stocks,
              findStock.symbol,
              curTime
            );
          }
          // Fetch intraday if needed
          if (
            findStock.stockInfo === undefined ||
            findStock.stockInfo.intraday === undefined ||
            refreshrateDated(curTime, findStock.stockInfo.intraday.fetchTime)
          ) {
            this.props.getIntra(this.props.stocks, findStock.symbol, curTime);
          }
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
          if (
            findStock.symbol &&
            findStock.stockInfo &&
            findStock.stockInfo.intraday &&
            refreshrateDated(curTime, findStock.stockInfo.intraday.fetchTime)
          ) {
            this.props.refreshIntra(
              this.props.stocks,
              findStock.symbol,
              curTime
            );
          }
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

// Checks if metadata and historydata should be updated (they should be updated once a day)
function onceADayRefreshrateDated(curTime: Date, fetchTime: Date): boolean {
  // TODO: Set updateTime (once a day). Now 00:30.00
  const updateTimeH = 0;
  const updateTimeM = 30;
  const updateTimeS = 0;

  // If curTime > 00:30.00
  if (
    curTime.getHours() >= updateTimeH &&
    curTime.getMinutes() >= updateTimeM &&
    curTime.getSeconds() >= updateTimeS
  ) {
    // If data has been fetched the day before or fetchTime < updateTime, refresh data
    if (
      curTime.getDate() != fetchTime.getDate() ||
      (fetchTime.getHours() <= updateTimeH &&
        fetchTime.getMinutes() <= updateTimeM &&
        fetchTime.getSeconds() <= updateTimeS)
    ) {
      return true;
    }
  }
  return false;
}

// Checks if intraday should be updated (intraday is updated many times a day)
function refreshrateDated(curTime: Date, fetchTime: Date): boolean {
  const curTime_ms = curTime.getTime();
  const intraTime_ms = fetchTime.getTime();
  // TODO: Set refreshrate. Now 5 minutes.
  if (curTime_ms - intraTime_ms > 1000 * 60 * 5) {
    return true;
  }
  return false;
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
