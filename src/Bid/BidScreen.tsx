import React, { createRef } from 'react';
import { RootState } from '../redux/reducers';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { bidPageStyle, bidStyles, actionButtons, sumUpCancel } from './styles';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducer';
import { WizardFormColors } from '../App/colors';
import {
  countRevenue,
  formatCurrency,
  parseStringDecimalToFloat,
} from '../util/general';
import { verticalScale } from '../util/scale';
import { NavigationScreenProps } from 'react-navigation';
import { saveBidForm } from './actions';
import { StockInfo } from './components/Stockinfo';
import { ActionButton } from './components/ActionButton';

export interface BidProps {
  stock?: Stock;
  saveForm: typeof saveBidForm;
}

type BidPropsWithNavigation = BidProps & NavigationScreenProps;

export interface BidState {
  bidLevel: string;
  buyActive: boolean;
  sellActive: boolean;
  bidLevelActive: boolean;
  sumOfStocksActive: boolean;
  portfolios: Object;
  sumOfStocks: string;
  selectedPortfolio: string;
}

export class BidScreen extends React.Component<
  BidPropsWithNavigation,
  BidState
> {
  private portfolioRef = createRef<Dropdown>();
  private sumOfStocksRef = createRef<TextInput>();
  private bidLevelRef = createRef<TextInput>();
  private scroller = createRef<ScrollView>();
  constructor(props: BidPropsWithNavigation) {
    super(props);
    this.state = {
      bidLevel: '0,00',
      buyActive: false,
      sellActive: false,
      bidLevelActive: false,
      sumOfStocksActive: false,
      portfolios: [
        { value: 'Portfolio 1' },
        { value: 'Portfolio 2' },
        { value: 'Portfolio 3' },
        { value: 'Portfolio 4' },
      ],
      sumOfStocks: '0',
      selectedPortfolio: 'Portfolio 1',
    };
  }

  static navigationOptions = {
    header: null,
  };

  scroll(yPos: number) {
    this.scroller.current!.scrollTo({ x: 0, y: yPos });
  }

  onBuyPress() {
    this.setState({ buyActive: true }, () =>
      this.setState({ sellActive: false }, () => this.scroll(verticalScale(96)))
    );
  }

  onSellPress() {
    this.setState({ sellActive: true }, () =>
      this.setState({ buyActive: false }, () => this.scroll(verticalScale(96)))
    );
  }

  onDropdownTextChange(value: string) {
    this.setState({ selectedPortfolio: value }, () =>
      this.sumOfStocksRef.current!.focus()
    );
  }

  onSumOfStocksFocuced() {
    this.setState({ sumOfStocksActive: true }, () =>
      this.scroll(verticalScale(228))
    );
  }

  onSumOfStocksSubmit() {
    this.bidLevelRef.current!.focus();
  }

  onBidLevelFocused() {
    this.setState({ bidLevelActive: true }, () =>
      this.scroll(verticalScale(339))
    );
  }

  onBidLevelSubmit() {
    this.scroll(verticalScale(425));
  }

  onSubmit() {
    const level = parseStringDecimalToFloat(this.state.bidLevel);
    const sum = parseStringDecimalToFloat(this.state.sumOfStocks);
    this.props.saveForm(
      this.state.buyActive ? 'buy' : 'sell',
      level,
      sum,
      this.state.selectedPortfolio
    );
    this.props.navigation.navigate('SumUp');
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

  countTotalCost() {
    if (
      this.props.stock &&
      this.props.stock.stockInfo.stockMetadata &&
      this.state.bidLevel !== '' &&
      this.state.sumOfStocks !== ''
    ) {
      return formatCurrency(
        parseStringDecimalToFloat(this.state.bidLevel) *
          parseStringDecimalToFloat(this.state.sumOfStocks),
        this.props.stock.currency
      );
    }
    return 0;
  }

  render() {
    const { stock } = this.props;
    const {
      sumOfStocksActive,
      bidLevelActive,
      buyActive,
      sellActive,
      portfolios,
      bidLevel,
      sumOfStocks,
      selectedPortfolio,
    } = this.state;

    if (!stock || !stock.stockInfo || !stock.stockInfo.stockMetadata) {
      return <Text>Error!</Text>;
    }

    return (
      <View>
        <StockInfo
          name={stock.name}
          revenue={this.countRevenuePercentage()}
          updated={stock.stockInfo.stockMetadata.fetchTime}
        />
        <ScrollView ref={this.scroller}>
          <View style={bidPageStyle.background}>
            <View style={actionButtons.container}>
              <Text style={bidStyles.headings}>
                {t('BidPage.Title')}
                {<Text style={bidStyles.stock}>{stock.name}</Text>}
              </Text>
              <View style={actionButtons.buttonContainer}>
                <TouchableOpacity onPress={() => this.onBuyPress()}>
                  <ActionButton action={'buy'} active={buyActive} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onSellPress()}>
                  <ActionButton action={'sell'} active={sellActive} />
                </TouchableOpacity>
              </View>
            </View>
            {(buyActive || sellActive) && (
              <View>
                <View>
                  <Text style={bidStyles.headings}>
                    {t('BidPage.ChoosePortfolio')}
                  </Text>
                  {/* TODO: Center dropdown texts. */}
                  <Dropdown
                    textColor={WizardFormColors.buttonsUnactive}
                    fontSize={verticalScale(17)}
                    itemColor={WizardFormColors.backgroundColor}
                    baseColor={WizardFormColors.buttonsUnactive}
                    selectedItemColor={WizardFormColors.buttonsActive}
                    data={portfolios}
                    containerStyle={bidStyles.dropdown}
                    value={selectedPortfolio}
                    ref={this.portfolioRef}
                    onChangeText={(value: string) =>
                      this.onDropdownTextChange(value)
                    }
                    style={{ textAlign: 'center' }}
                  />
                  <View>
                    <Text style={bidStyles.infoText}>
                      {t('SumUpPage.YouOwn')}{' '}
                      <Text style={bidStyles.infoTextHighlight}>16</Text>{' '}
                      {t('SumUpPage.StocksOf')} {stock.name}.
                    </Text>
                    <Text style={bidStyles.infoText}>
                      {t('SumUpPage.YourPortfoliosTotVal')}{' '}
                      <Text style={bidStyles.infoTextHighlight}>1749394€</Text>
                    </Text>
                  </View>
                </View>
                <View style={bidStyles.textInputContainer}>
                  {buyActive && (
                    <Text style={bidStyles.headings}>
                      {t('BidPage.SumOfStocksBuy')}
                    </Text>
                  )}
                  {sellActive && (
                    <Text style={bidStyles.headings}>
                      {t('BidPage.SumOfStocksSell')}
                    </Text>
                  )}
                  <TextInput
                    ref={this.sumOfStocksRef}
                    keyboardType={'numeric'}
                    selectionColor={WizardFormColors.buttonsActive}
                    underlineColorAndroid={
                      sumOfStocksActive
                        ? WizardFormColors.buttonsActive
                        : WizardFormColors.buttonsUnactive
                    }
                    style={bidStyles.textInput}
                    value={sumOfStocks}
                    onSubmitEditing={() => this.onSumOfStocksSubmit()}
                    onChangeText={(value: string) =>
                      this.setState({ sumOfStocks: value })
                    }
                    onFocus={() => this.onSumOfStocksFocuced()}
                    onBlur={() =>
                      this.setState({
                        sumOfStocksActive: false,
                      })
                    }
                  />
                </View>
                <View style={bidStyles.textInputContainer}>
                  <Text style={bidStyles.headings}>
                    {t('BidPage.ChooseBidLevel')} ({stock.currency})
                  </Text>
                  <TextInput
                    ref={this.bidLevelRef}
                    keyboardType={'numeric'}
                    selectionColor={WizardFormColors.buttonsActive}
                    underlineColorAndroid={
                      bidLevelActive
                        ? WizardFormColors.buttonsActive
                        : WizardFormColors.buttonsUnactive
                    }
                    style={bidStyles.textInput}
                    value={bidLevel}
                    onSubmitEditing={() => this.onBidLevelSubmit()}
                    onChangeText={(value: string) =>
                      this.setState({ bidLevel: value })
                    }
                    onFocus={() => this.onBidLevelFocused()}
                    onBlur={() =>
                      this.setState({
                        bidLevelActive: false,
                      })
                    }
                  />
                  <Text style={bidStyles.infoText}>
                    {t('SumUpPage.TotalSumOfTransaction')}{' '}
                    <Text style={bidStyles.infoTextHighlight}>
                      {this.countTotalCost()}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            <View style={sumUpCancel.container}>
              <TouchableOpacity
                style={sumUpCancel.cancelButton}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={sumUpCancel.cancelText}>
                  {t('BidPage.Cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={sumUpCancel.sumUpButton}
                onPress={() => this.onSubmit()}
              >
                <Text style={sumUpCancel.sumUpText}>{t('BidPage.SumUp')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  stock: state.stocksListing.stocks.find((stock) => {
    return stock.symbol === state.stocksListing.currentSymbol;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      saveForm: saveBidForm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidScreen);
