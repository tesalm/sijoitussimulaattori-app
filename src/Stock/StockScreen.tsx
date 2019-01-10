import React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import {
  getHistory,
  getIntraday,
  getStockMetadata,
  refreshIntraday,
} from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RootState } from '../redux/reducers';
import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import CardButton from '../general/cardButton';
import { RouteName } from '../navigation/routes';
import { NavigationScreenProps } from 'react-navigation';
import { cardStyles } from '../App/styles';

export interface StockProps {
  getMeta: typeof getStockMetadata;
  getIntra: typeof getIntraday;
  refreshIntra: typeof refreshIntraday;
  getHistoryData: typeof getHistory;
  refreshing: boolean;
  symbol?: string;
  stock?: Stock;
}

type StockPropsWithNavigation = StockProps & NavigationScreenProps;

interface StockState {}

export class StockScreen extends React.Component<
  StockPropsWithNavigation,
  StockState
> {
  constructor(props: StockPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    if (this.props.symbol && this.props.stock) {
      // Attempt to get or refresh necessary data:
      this.props.getMeta(this.props.stock, this.props.symbol);
      this.props.getHistoryData(this.props.stock, this.props.symbol);
      this.props.getIntra(this.props.stock, this.props.symbol);
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
    if (this.props.symbol && this.props.stock) {
      this.props.refreshIntra(this.props.stock, this.props.symbol);
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
          <Card containerStyle={cardStyles.container}>
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

          <Card containerStyle={cardStyles.container}>
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

          <Card containerStyle={cardStyles.container}>
            <CardButton
              iconName={'bid'}
              translationTitle={'StockPage.Bid'}
              route={RouteName.Home}
              navigation={this.props.navigation}
            />
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
