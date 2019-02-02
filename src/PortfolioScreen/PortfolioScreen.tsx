import debounce from 'lodash/debounce';
import React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { cardButtonStyles, cardStyles } from '../App/styles';
import CardButton from '../general/cardButton';
import { IconNames } from '../general/icon';
import {
  getIntraday,
  getStockMetadata,
  getStocks,
  refreshIntraday,
} from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import PortfolioBackButtonWithNavigation from '../navigation/components/PortfolioBackButton';
import { RouteName } from '../navigation/routes';
import { cancelTransaction, getPortfolioData, getTransactions } from '../PortfolioList/actions';
import { PortfolioStock, SinglePortfolio } from '../PortfolioList/reducer';
import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { Holdings } from './components/Holdings';
import { OpenTransactions } from './components/OpenTransactions';
import { PortfolioInfo } from './components/PortfolioInfo';

export interface PortfolioProps {
  portfolio?: SinglePortfolio;
  getPortfolio: typeof getPortfolioData;
  portfolioId?: string;
  stocks: Array<Stock>;
  getAllStocks: typeof getStocks;
  getStockMetaData: typeof getStockMetadata;
  getStockIntraDayData: typeof getIntraday;
  getTransactions: typeof getTransactions;
  cancelOpenTransaction: typeof cancelTransaction;
  refreshStockIntraDayData: typeof refreshIntraday;
  stocksLoading: boolean;
}

type PortfolioPropsWithNavigation = PortfolioProps & NavigationScreenProps;

export class PortfolioScreen extends React.Component<
  PortfolioPropsWithNavigation
> {
  constructor(props: PortfolioPropsWithNavigation) {
    super(props);
  }
  static navigationOptions = {
    title: t('PortfolioPage.Title'),
    headerLeft: <PortfolioBackButtonWithNavigation />,
  };

  componentDidMount() {
    if (
      this.props.portfolio &&
      this.props.portfolioId &&
      this.props.portfolio.portfolioInfo.portfolio === undefined
    ) {
      this.props.getPortfolio(this.props.portfolioId);
    }
    if (this.props.stocks.length === 0) {
      this.props.getAllStocks();
    }
  }

  // Debounce function with 500 ms delay
  getStockData = debounce((stocks: PortfolioStock[]) => {
    stocks.forEach((portfolioStock) => {
      const findStock = this.props.stocks.find((stock) => {
        return stock.symbol === portfolioStock.uid;
      });

      if (findStock) {
        if (!findStock.stockInfo || !findStock.stockInfo.intraday) {
          this.props.getStockMetaData(findStock, findStock.symbol);
        }
        if (!findStock.stockInfo || !findStock.stockInfo.intraday) {
          this.props.getStockIntraDayData(findStock, findStock.symbol);
        }
      }
    });
  }, 500);

  componentDidUpdate() {
    if (this.props.portfolio && this.props.portfolio.portfolioInfo.portfolio) {
      this.getStockData(this.props.portfolio.portfolioInfo.portfolio.stocks);
    }
  }

  // Fetch portfolio and stock data when refreshed.
  refreshPortfolioAndStock = () => {
    if (this.props.portfolioId) {
      this.props.getPortfolio(this.props.portfolioId);
      this.props.getTransactions(this.props.portfolioId);
    }
    if (this.props.portfolio && this.props.portfolio.portfolioInfo.portfolio) {
      this.props.portfolio.portfolioInfo.portfolio.stocks.forEach(
        async (portfolioStock) => {
          const findStock = this.props.stocks.find((stock) => {
            return stock.symbol === portfolioStock.uid;
          });
          if (findStock) {
            this.props.refreshStockIntraDayData(findStock, findStock.symbol);
          }
        }
      );
    }
  };

  render() {
    const { portfolio, stocks, stocksLoading } = this.props;
    if (portfolio) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={portfolio.portfolioInfo.refreshing}
              onRefresh={this.refreshPortfolioAndStock}
              colors={[Colors.baseColor]}
            />
          }
        >
          <Card containerStyle={cardStyles.container}>
            <PortfolioInfo
              portfolio={portfolio.portfolioInfo.portfolio}
              loading={portfolio.portfolioInfo.loading}
              error={portfolio.portfolioInfo.error}
              stocks={stocks}
            />
          </Card>
          <Card containerStyle={cardStyles.container} />
          <Card containerStyle={cardStyles.container}>
            <Holdings
              portfolio={portfolio.portfolioInfo.portfolio}
              portfolioLoading={portfolio.portfolioInfo.loading}
              error={portfolio.portfolioInfo.error}
              stocks={stocks}
              stocksLoading={stocksLoading}
            />
          </Card>
          <Card containerStyle={cardStyles.container}>
            <OpenTransactions
              getTransactions={this.props.getTransactions}
              cancelOpenTransaction={this.props.cancelOpenTransaction}
              portfolioId={this.props.portfolioId}
              transactions={portfolio.transactions.transactionListing.filter(
                (transaction) => transaction.status === 'MARKET'
              )}
              loading={portfolio.transactions.loading}
              error={portfolio.transactions.error}
            />
          </Card>
          <Card containerStyle={cardButtonStyles.cardButton}>
            <CardButton
              iconName={IconNames.events}
              translationTitle={'PortfolioPage.Events'}
              onPress={() =>
                this.props.navigation.navigate(RouteName.EventsAndTransactions)
              }
            />
          </Card>
          <Card containerStyle={cardButtonStyles.cardButton}>
            <CardButton
              iconName={IconNames.manage}
              translationTitle={'PortfolioPage.Manage'}
              // TODO: navigae to manage portfolio page
              onPress={() => this.props.navigation.navigate(RouteName.Home)}
            />
          </Card>
        </ScrollView>
      );
    } else {
      // TODO: Format the error message to user
      return <Text>Error, portfolio not found! </Text>;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolioId: state.portfolioListing.portfolioId,
  portfolio: state.portfolioListing.portfolioListing.find((portfolio) => {
    return portfolio.uid === state.portfolioListing.portfolioId;
  }),
  stocks: state.stocksListing.stocks,
  stocksLoading: state.stocksListing.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getPortfolio: getPortfolioData,
      getAllStocks: getStocks,
      getStockMetaData: getStockMetadata,
      getStockIntraDayData: getIntraday,
      refreshStockIntraDayData: refreshIntraday,
      getTransactions: getTransactions,
      cancelOpenTransaction: cancelTransaction,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);
