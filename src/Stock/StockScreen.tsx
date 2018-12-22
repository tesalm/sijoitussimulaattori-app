import React from 'react';

import { ScrollView, RefreshControl, Text } from 'react-native';
import { Card } from 'react-native-elements';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockContainerStyles } from './styles';

import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import Bid from './components/Bid';
import {
  getMetadata,
  getIntraday,
  getHistory,
  refreshIntraday,
} from '../MarketScreen/actions';
import { Colors } from '../App/colors';
import { Stock } from '../MarketScreen/reducers';
import { countRevenue } from '../util/general';

export interface StockProps {
  stocks: Array<Stock>;
  getMeta: typeof getMetadata;
  getIntra: typeof getIntraday;
  refreshIntra: typeof refreshIntraday;
  getHistoryData: typeof getHistory;
  refreshing: boolean;
  symbol?: string;
  stock?: Stock;
}

interface StockState {}

export class StockScreen extends React.Component<StockProps, StockState> {
  constructor(props: StockProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.symbol && this.props.stock) {
      const curTime = new Date();
      // Fetch metadata if needed
      if (
        this.props.stock.stockInfo === undefined ||
        this.props.stock.stockInfo.metadata === undefined ||
        onceADayRefreshrateDated(
          curTime,
          this.props.stock.stockInfo.metadata.fetchTime
        )
      ) {
        this.props.getMeta(this.props.stocks, this.props.symbol, curTime);
      }
      // Fetch historydata if needed
      if (
        this.props.stock.stockInfo === undefined ||
        this.props.stock.stockInfo.historydata === undefined ||
        onceADayRefreshrateDated(
          curTime,
          this.props.stock.stockInfo.historydata.fetchTime
        )
      ) {
        this.props.getHistoryData(
          this.props.stocks,
          this.props.symbol,
          curTime
        );
      }
      // Fetch intraday if needed
      if (
        this.props.stock.stockInfo === undefined ||
        this.props.stock.stockInfo.intraday === undefined ||
        refreshrateDated(curTime, this.props.stock.stockInfo.intraday.fetchTime)
      ) {
        this.props.getIntra(this.props.stocks, this.props.symbol, curTime);
      }
    }
  }

  countRevenuePersentage() {
    if (
      this.props.stock !== undefined &&
      this.props.stock.stockInfo !== undefined &&
      this.props.stock.stockInfo.historydata !== undefined &&
      this.props.stock.stockInfo.intraday !== undefined
    ) {
      const revenue =
        this.props.stock.stockInfo.historydata.close /
          this.props.stock.stockInfo.intraday.close -
        1;
      return countRevenue(revenue);
    }
    return '';
  }

  refresh = () => {
    const curTime = new Date();
    if (
      this.props.symbol &&
      this.props.stock &&
      this.props.stock.stockInfo &&
      this.props.stock.stockInfo.intraday &&
      refreshrateDated(curTime, this.props.stock.stockInfo.intraday.fetchTime)
    ) {
      this.props.refreshIntra(this.props.stocks, this.props.symbol, curTime);
    }
  };

  render() {
    const { stock } = this.props;
    if (stock) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={stock.stockInfo.refreshing}
              onRefresh={this.refresh}
              colors={[Colors.baseColor]}
            />
          }
        >
          <Card containerStyle={stockContainerStyles.basicInfo}>
            <Basicinfo
              revenue={this.countRevenuePersentage()}
              metadata={stock.stockInfo.metadata}
              metaLoading={stock.stockInfo.metaLoading}
              metaError={stock.stockInfo.metaError}
              intraday={stock.stockInfo.intraday}
              intraLoading={stock.stockInfo.intraLoading}
              intraError={stock.stockInfo.intraError}
              historyLoading={stock.stockInfo.historyLoading}
            />
          </Card>

          <Card containerStyle={stockContainerStyles.diagram}>
            <Diagram
              historydata={stock.stockInfo.historydata}
              historyLoading={stock.stockInfo.historyLoading}
              historyError={stock.stockInfo.historyError}
            />
          </Card>

          <Card containerStyle={stockContainerStyles.buttonContainer}>
            <Bid />
          </Card>
        </ScrollView>
      );
    } else {
      //TODO: Format the error message to user
      return <Text>Error, stockinfo not found! </Text>;
    }
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
  symbol: state.stocksListing.symbol,
  stocks: state.stocksListing.stocks,
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.symbol;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMeta: getMetadata,
      getIntra: getIntraday,
      refreshIntra: refreshIntraday,
      getHistoryData: getHistory,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockScreen);
