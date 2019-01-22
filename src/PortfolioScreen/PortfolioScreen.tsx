import React from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { cardButtonStyles, cardStyles } from '../App/styles';
import CardButton from '../general/cardButton';
import { getHistory, getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../MarketScreen/actions';
import { Stock } from '../MarketScreen/reducer';
import { RouteName } from '../navigation/routes';
import { getPortfolioData } from '../PortfolioList/actions';
import { SinglePortfolio } from '../PortfolioList/reducers';
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
  getMeta: typeof getStockMetadata;
  getHistoryData: typeof getHistory;
  getIntra: typeof getIntraday;
  refreshIntra: typeof refreshIntraday;
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

  async componentDidMount() {
    if (
      this.props.portfolio &&
      this.props.portfolioId &&
      this.props.portfolio.portfolioInfo.portfolio == undefined
    ) {
      await this.props.getPortfolio(this.props.portfolioId);
    }
    if (this.props.stocks.length == 0) {
      await this.props.getAllStocks();
    }

    if (this.props.portfolio && this.props.portfolio.portfolioInfo.portfolio) {
      await this.props.portfolio.portfolioInfo.portfolio.stocks.forEach(
        async (portfolioStock) => {
          var findStock = this.props.stocks.find((stock) => {
            return stock.symbol === portfolioStock.uid;
          });
          if (findStock) {
            if (findStock.stockInfo.historyData == undefined) {
              await this.props.getHistoryData(findStock, findStock.symbol);
            }
            if (findStock.stockInfo.stockMetadata == undefined) {
              await this.props.getMeta(findStock, findStock.symbol);
            }
            if (findStock.stockInfo.intraday == undefined) {
              await this.props.getIntra(findStock, findStock.symbol);
            }
          }
        }
      );
    }
  }

  //Fetch portfolio and stock data when refreshed.
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
            await this.props.refreshIntra(findStock, findStock.symbol);
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
          <Card containerStyle={cardButtonStyles.cardButton}>
            <CardButton
              iconName={'events'}
              translationTitle={'PortfolioPage.Events'}
              //TODO: navigate to events page
              onPress={() => this.props.navigation.navigate(RouteName.Home)}
            />
          </Card>
          <Card containerStyle={cardButtonStyles.cardButton}>
            <CardButton
              iconName={'manage'}
              translationTitle={'PortfolioPage.Manage'}
              //TODO: navigae to manage portfolio page
              onPress={() => this.props.navigation.navigate(RouteName.Home)}
            />
          </Card>
        </ScrollView>
      );
    } else {
      //TODO: Format the error message to user
      return <Text>Error, portfolio not found! </Text>;
    }
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
