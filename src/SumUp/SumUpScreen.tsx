import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { BidInfo } from '../Bid/reducer';
import { Stock } from '../MarketScreen/reducer';
import { RouteName } from '../navigation/routes';
import { saveTransaction } from '../PortfolioList/actions';
import { SinglePortfolio } from '../PortfolioList/reducer';
import { RootState } from '../redux/reducers';
import { formatCurrency } from '../util/stock';
import { sumUpStyles } from './styles';

export interface SumUpProps {
  stock?: Stock;
  saveBid: typeof saveTransaction;
  bidInfo: BidInfo;
  portfolio?: SinglePortfolio;
}

type SumUpPropsWithNavigation = SumUpProps & NavigationScreenProps;

interface SumUpState {
  totalCost: string;
  portfolioValueAfter: string;
  dataSent: boolean;
}

export class SumUpScreen extends React.Component<
  SumUpPropsWithNavigation,
  SumUpState
> {
  constructor(props: SumUpPropsWithNavigation) {
    super(props);
    this.state = {
      totalCost: '0',
      portfolioValueAfter: '0',
      dataSent: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    if (
      this.props.stock &&
      this.props.stock.stockInfo &&
      this.props.stock.stockInfo.stockMetadata &&
      this.props.portfolio &&
      this.props.portfolio.portfolioInfo.portfolio
    ) {
      const portfolioValue = this.props.portfolio.portfolioInfo.portfolio
        .totalMarketValue;
      this.setState(
        {
          totalCost: formatCurrency(
            this.props.bidInfo.sumOfStocks * this.props.bidInfo.bidLevel,
            this.props.stock.stockInfo.stockMetadata.currency
          ),
        },
        () =>
          this.setState({
            portfolioValueAfter: formatCurrency(
              portfolioValue -
                this.props.bidInfo.sumOfStocks * this.props.bidInfo.bidLevel,
              'USD'
            ),
          })
      );
    }
  }

  componentDidUpdate() {
    if (
      this.props.portfolio &&
      this.props.portfolio.transactionInfo &&
      this.props.portfolio.transactionInfo.transactionSuccess &&
      this.state.dataSent
    ) {
      this.props.navigation.navigate(RouteName.Stock);
      // TODO: Format toast-message for user.
      ToastAndroid.show('Bid was successfull.', ToastAndroid.SHORT);
    }
  }

  countTotalCost() {
    if (
      this.props.stock &&
      this.props.stock.stockInfo &&
      this.props.stock.stockInfo.stockMetadata
    ) {
      return formatCurrency(
        this.props.bidInfo.bidLevel * this.props.bidInfo.sumOfStocks,
        this.props.stock.stockInfo.stockMetadata.currency
      );
    }
    return 0;
  }

  // Saves form-data to backend
  confirmForm() {
    if (this.props.portfolio) {
      const portfolio = this.props.portfolio;
      this.setState({ dataSent: true }, () =>
        this.props.saveBid(
          this.props.bidInfo.action,
          this.props.bidInfo.symbol,
          this.props.bidInfo.sumOfStocks,
          this.props.bidInfo.bidLevel,
          portfolio.uid
        )
      );
    }
  }

  errorMessage() {
    if (
      this.props.portfolio &&
      this.props.portfolio.transactionInfo &&
      this.state.dataSent
    ) {
      return (
        <Text>
          {String(this.props.portfolio.transactionInfo.transactionsError)}
        </Text>
      );
    }
  }

  render() {
    const { bidInfo, portfolio, stock } = this.props;
    const { totalCost, portfolioValueAfter } = this.state;

    if (
      !stock ||
      !stock.stockInfo ||
      !stock.stockInfo.stockMetadata ||
      !portfolio ||
      !portfolio.portfolioInfo.portfolio
    ) {
      // TODO: Format error for user.
      return <Text>Error!</Text>;
    }

    return (
      <ScrollView style={sumUpStyles.background}>
        <View style={sumUpStyles.headerContainer}>
          <Text style={sumUpStyles.header}>
            {t('SumUpPage.YoureGoingTo')}{' '}
            {<Text style={sumUpStyles.headerHighlight}>{bidInfo.action} </Text>}
            {stock.name}
          </Text>
          <Text style={sumUpStyles.header}>
            {t('SumUpPage.FollowingDetails')}:
          </Text>
        </View>
        <View style={sumUpStyles.detailContainer}>
          <View style={sumUpStyles.detailRowContainer}>
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.Portfolio')}
              </Text>
              <Text style={sumUpStyles.valueSmall}>
                {bidInfo.selectedPortfolio}
              </Text>
            </View>
            <View />
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.AmountOfStocks')}
              </Text>
              <Text style={sumUpStyles.valueSmall}>{bidInfo.sumOfStocks}</Text>
            </View>
          </View>
          <View style={sumUpStyles.detailRowContainer}>
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.TotalValueOfPortfolio')}
              </Text>
              {/* TODO: Replace default currency */}
              <Text style={sumUpStyles.valueSmall}>
                {formatCurrency(
                  portfolio.portfolioInfo.portfolio.totalMarketValue,
                  'USD'
                )}
              </Text>
            </View>
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.BidLevel')}
              </Text>
              <Text style={sumUpStyles.valueSmall}>
                {formatCurrency(
                  bidInfo.bidLevel,
                  stock.stockInfo.stockMetadata.currency
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={sumUpStyles.bottomContainers}>
          <Text style={sumUpStyles.valueHeaderLarge}>
            {t('SumUpPage.TotalCost')}
          </Text>
          <Text style={sumUpStyles.valueLarge}>{totalCost}</Text>
        </View>
        <View style={sumUpStyles.bottomContainers}>
          <Text style={sumUpStyles.valueHeaderLarge}>
            {t('SumUpPage.PortfoliosValueAfter')}
          </Text>
          <Text style={sumUpStyles.valueLarge}>{portfolioValueAfter}</Text>
        </View>

        {portfolio.transactionInfo &&
          portfolio.transactionInfo.transactionsError && (
            <Text style={sumUpStyles.errorMessage}>{this.errorMessage()}</Text>
          )}

        {portfolio.transactionInfo &&
        portfolio.transactionInfo.transactionsLoading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={sumUpStyles.confirmCancelButtonContainer}>
            <TouchableOpacity
              style={sumUpStyles.cancelButton}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={sumUpStyles.cancelText}>
                {t('SumUpPage.Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sumUpStyles.confirmButton}
              onPress={() => this.confirmForm()}
            >
              <Text style={sumUpStyles.confirmButtonText}>
                {t('SumUpPage.Confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  bidInfo: state.bid,
  portfolio: state.portfolioListing.portfolioListing.find((portfolio) => {
    return portfolio.name === state.bid.selectedPortfolio;
  }),
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.currentSymbol;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      saveBid: saveTransaction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SumUpScreen);
