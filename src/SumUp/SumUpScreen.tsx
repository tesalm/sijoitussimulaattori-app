import React from 'react';
import { Text } from 'react-native-elements';
import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducers';
import { sumUpStyles } from './styles';
import { formatCurrency } from '../util/general';
import { NavigationScreenProps } from 'react-navigation';

interface SumUpProps {
  action: string;
  currentBidLevel: number;
  stocks: number;
  portfolio: string;
  stock?: Stock;
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
            this.props.stocks * this.props.currentBidLevel,
            this.props.stock.stockInfo.stockMetadata.currency
          ),
        },
        () =>
          this.setState({
            portfolioValueAfter: formatCurrency(
              portfolioValue - this.props.stocks * this.props.currentBidLevel,
              'USD'
            ),
          })
      );
    }
  }

  render() {
    const { action, currentBidLevel, portfolio, stock, stocks } = this.props;
    const { totalCost, portfolioValueAfter } = this.state;
    if (!stock) {
      return <Text>Error!</Text>;
    }

    return (
      <ScrollView style={sumUpStyles.background}>
        <View style={sumUpStyles.headerContainer}>
          <Text style={sumUpStyles.header}>
            {t('SumUpPage.YoureGoingTo')}{' '}
            {<Text style={sumUpStyles.headerHighlight}>{action} </Text>}
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
              <Text style={sumUpStyles.valueSmall}>{portfolio}</Text>
            </View>
            <View />
            <View style={sumUpStyles.detailColumnContainer}>
              <Text style={sumUpStyles.valueHeaderSmall}>
                {t('SumUpPage.AmountOfStocks')}
              </Text>
              <Text style={sumUpStyles.valueSmall}>{stocks}</Text>
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
              <Text style={sumUpStyles.valueSmall}>{currentBidLevel}</Text>
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
        <View style={sumUpStyles.confirmCancelButtonContainer}>
          <TouchableOpacity
            style={sumUpStyles.cancelButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={sumUpStyles.cancelText}>{t('SumUpPage.Cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sumUpStyles.confirmButton}>
            <Text style={sumUpStyles.confirmButtonText}>
              {t('SumUpPage.Confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  action: state.bid.action,
  currentBidLevel: state.bid.bidLevel,
  stocks: state.bid.sumOfStocks,
  portfolio: state.bid.selectedPortfolio,
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.symbol;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SumUpScreen);
