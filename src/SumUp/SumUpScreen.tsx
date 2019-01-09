import React from 'react';
import { Text } from 'react-native-elements';
import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducer';
import { sumUpStyles } from './styles';
import { formatCurrency } from '../util/general';
import { NavigationScreenProps } from 'react-navigation';
import { confirmBidForm } from '../Bid/actions';
import { BidInfo } from '../Bid/reducers';

interface SumUpProps {
  stock?: Stock;
  confirmBid: typeof confirmBidForm;
  bidInfo: BidInfo;
}

type SumUpPropsWithNavigation = SumUpProps & NavigationScreenProps;

interface SumUpState {
  totalCost: string;
  portfolioValueAfter: string;
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
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    if (this.props.stock && this.props.stock.stockInfo.stockMetadata) {
      const portfolioValue = 1000;
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

  countTotalCost() {
    if (this.props.stock && this.props.stock.stockInfo.stockMetadata) {
      return formatCurrency(
        this.props.bidInfo.bidLevel * this.props.bidInfo.sumOfStocks,
        this.props.stock.currency
      );
    }
    return 0;
  }

  // Saves form-data to backend and if that succees, goes back to StockScreen and
  // shows user a short toast-message.
  async confirmForm() {
    await this.props.confirmBid(this.props.bidInfo);
    if (this.props.bidInfo.error) {
      return;
    }
    this.props.navigation.navigate('SingleStock');
    // TODO: Format toast-message for user.
    ToastAndroid.show('Bid was successfull.', ToastAndroid.SHORT);
  }

  errorMessage() {
    return <Text>{this.props.bidInfo.error}</Text>;
  }

  render() {
    const { bidInfo, stock } = this.props;
    const { totalCost, portfolioValueAfter } = this.state;
    
    if (!stock) {
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
              {/* TODO: Replace with real value. */}
              <Text style={sumUpStyles.valueSmall}>1000€</Text>
            </View>
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.BidLevel')}
              </Text>
              <Text style={sumUpStyles.valueSmall}>
                {formatCurrency(bidInfo.bidLevel, stock.currency)}
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

        {bidInfo.error && (
          <Text style={sumUpStyles.errorMessage}>{this.errorMessage()}</Text>
        )}

        {!bidInfo.loading ? (
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
        ) : (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.currentSymbol;
  }),
  bidInfo: state.bid,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      confirmBid: confirmBidForm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SumUpScreen);
