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
import { getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RouteName } from '../navigation/routes';
import { getPortfolioData } from '../PortfolioList/actions';
import { PortfolioStock, SinglePortfolio } from '../PortfolioList/reducers';
import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { Holdings } from './components/Holdings';
import { PortfolioInfo } from './components/PortfolioInfo';

export interface PortfolioProps {
  portfolio?: SinglePortfolio;
  getPortfolio: typeof getPortfolioData;
  portfolioId?: string;
  stocks: Array<Stock>;
  getAllStocks: typeof getStocks;
  getStockMetaData: typeof getStockMetadata;
  getStockIntraDayData: typeof getIntraday;
  refreshStockIntraDayData: typeof refreshIntraday;
  stocksLoading: boolean;
}

type PortfolioPropsWithNavigation = PortfolioProps & NavigationScreenProps;

export class PortfolioScreen extends React.Component<
  PortfolioPropsWithNavigation
> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };
  constructor(props: PortfolioPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    if (
      this.props.portfolio &&
      this.props.portfolioId &&
      this.props.portfolio.portfolioInfo.portfolio == undefined
    ) {
      this.props.getPortfolio(this.props.portfolioId);
    }
    if (this.props.stocks.length == 0) {
      this.props.getAllStocks();
    }
  }

  // Debounce function with 500 ms delay
  getStockData = debounce((stocks: PortfolioStock[]) => {
    stocks.forEach((portfolioStock) => {
      var findStock = this.props.stocks.find((stock) => {
        return stock.symbol === portfolioStock.uid;
      });

      if (findStock) {
        if (!findStock.stockInfo.intraday) {
          this.props.getStockMetaData(findStock, findStock.symbol);
        }
        if (!findStock.stockInfo.intraday) {
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
    }
    if (this.props.portfolio && this.props.portfolio.portfolioInfo.portfolio) {
      this.props.portfolio.portfolioInfo.portfolio.stocks.forEach(
        async (portfolioStock) => {
          var findStock = this.props.stocks.find((stock) => {
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
<<<<<<< HEAD
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
          <Card containerStyle={cardButtonStyles.cardButton}>
            <CardButton
              iconName={IconNames.events}
              translationTitle={'PortfolioPage.Events'}
              // TODO: navigate to events page
              onPress={() => this.props.navigation.navigate(RouteName.Home)}
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
=======
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
          <Basicinfo
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
>>>>>>> All stock related attributes are presented correctly
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolioId: state.portfolioListing.portfolioId,
  portfolio: state.portfolioListing.portfolioListing.find((portfolio) => {
    return portfolio.uid == state.portfolioListing.portfolioId;
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
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);
