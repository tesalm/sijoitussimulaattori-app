import React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { getHistory, getIntraday, getStockMetadata, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RootState } from '../redux/reducers';
import Basicinfo from './components/Basicinfo';
import Bid from './components/Bid';
import Diagram from './components/Diagram';
import { stockContainerStyles } from './styles';

export interface StockProps {
  getMeta: typeof getStockMetadata;
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
      this.props.getMeta(this.props.stock, this.props.symbol, curTime);
      // Fetch historydata if needed
      this.props.getHistoryData(this.props.stock, this.props.symbol, curTime);
      // Fetch intraday if needed
      this.props.getIntra(this.props.stock, this.props.symbol, curTime);
    }
  }

  countRevenuePercentage() {
    if (
      this.props.stock !== undefined &&
      this.props.stock.stockInfo !== undefined &&
      this.props.stock.stockInfo.historyData !== undefined &&
      this.props.stock.stockInfo.intraday !== undefined
    ) {
      const yesterday = this.props.stock.stockInfo.historyData
        .historyDataQuote[0].close;
      const today = this.props.stock.stockInfo.intraday.intradayQuote[0].close;
      const revenue = (today - yesterday) / yesterday;
      return revenue;
    }
    return 0;
  }

  refresh = () => {
    const curTime = new Date();
    if (this.props.symbol && this.props.stock) {
      this.props.refreshIntra(this.props.stock, this.props.symbol, curTime);
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
              revenue={this.countRevenuePercentage()}
              stockMetadata={stock.stockInfo.stockMetadata}
              metaLoading={stock.stockInfo.metaLoading}
              metaError={stock.stockInfo.metaError}
              intradayQuote={
                stock.stockInfo.intraday
                  ? stock.stockInfo.intraday.intradayQuote[0]
                  : undefined
              }
              fetchTime={
                stock.stockInfo.intraday
                  ? stock.stockInfo.intraday.fetchTime
                  : undefined
              }
              intraLoading={stock.stockInfo.intraLoading}
              intraError={stock.stockInfo.intraError}
              historyLoading={stock.stockInfo.historyLoading}
            />
          </Card>

          <Card containerStyle={stockContainerStyles.diagram}>
            <Diagram
              historyData={
                stock.stockInfo.historyData
                  ? stock.stockInfo.historyData.historyDataQuote
                  : []
              }
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

const mapStateToProps = (state: RootState) => ({
  symbol: state.stocksListing.currentSymbol,
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.currentSymbol;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMeta: getStockMetadata,
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
