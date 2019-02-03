import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { cardStyles } from '../App/styles';
import { t } from '../assets/i18n';
import CardButton from '../general/cardButton';
import { IconNames } from '../general/icon';
import { getHistory, getIntraday, getStockMetadata, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import StockBackButtonWithNavigation from '../navigation/components/StockBackButton';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { countRevenue } from '../util/stock';
import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockStyles } from './styles';

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

  static navigationOptions = {
    title: t('StockPage.Title'),
    headerLeft: <StockBackButtonWithNavigation />,
  };

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
      this.props.stock &&
      this.props.stock.stockInfo &&
      this.props.stock.stockInfo.historyData &&
      this.props.stock.stockInfo.intraday
    ) {
      const yesterday = this.props.stock.stockInfo.historyData
        .historyDataQuote[0].close;
      const today = this.props.stock.stockInfo.intraday.intradayQuote[0].close;
      return countRevenue(yesterday, today);
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
              refreshing={!!stock.stockInfo && stock.stockInfo.refreshing}
              onRefresh={this.refresh}
              colors={[Colors.baseColor]}
            />
          }
        >
          <Card containerStyle={cardStyles.container}>
            <Basicinfo
              revenue={this.countRevenuePercentage()}
              stockMetadata={stock.stockInfo && stock.stockInfo.stockMetadata}
              metaLoading={stock.stockInfo && stock.stockInfo.metaLoading}
              metaError={stock.stockInfo && stock.stockInfo.metaError}
              intradayQuote={
                stock.stockInfo && stock.stockInfo.intraday
                  ? stock.stockInfo.intraday.intradayQuote[0]
                  : undefined
              }
              fetchTime={
                stock.stockInfo && stock.stockInfo.intraday
                  ? stock.stockInfo.intraday.fetchTime
                  : undefined
              }
              intraLoading={stock.stockInfo && stock.stockInfo.intraLoading}
              intraError={stock.stockInfo && stock.stockInfo.intraError}
              historyLoading={stock.stockInfo && stock.stockInfo.historyLoading}
            />
          </Card>

          <Card containerStyle={cardStyles.container}>
            {stock.stockInfo &&
            (stock.stockInfo.historyLoading || stock.stockInfo.intraLoading) ? (
              <View style={stockStyles.loading}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <Diagram
                historyData={
                  stock.stockInfo && stock.stockInfo.historyData
                    ? stock.stockInfo.historyData.historyDataQuote
                    : []
                }
                intraDay={
                  stock.stockInfo && stock.stockInfo.intraday
                    ? stock.stockInfo.intraday.intradayQuote
                    : []
                }
                historyError={stock.stockInfo && stock.stockInfo.historyError}
              />
            )}
          </Card>

          <Card containerStyle={cardStyles.container}>
            <CardButton
              iconName={IconNames.bid}
              translationTitle={'StockPage.Bid'}
              onPress={() => this.props.navigation.navigate(RouteName.Bid)}
            />
          </Card>
        </ScrollView>
      );
    } else {
      // TODO: Format the error message to user
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
