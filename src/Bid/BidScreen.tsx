import debounce from 'lodash/debounce';
import React, { createRef } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormColors } from '../App/colors';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducer';
import { RouteName } from '../navigation/routes';
import { getPortfolioData, getPortfolios } from '../PortfolioList/actions';
import { SinglePortfolio } from '../PortfolioList/reducer';
import { RootState } from '../redux/reducers';
import { parseStringDecimalToFloat } from '../util/general';
import { verticalScale } from '../util/scale';
import { countRevenue, formatCurrency } from '../util/stock';
import { saveBidForm } from './actions';
import { ActionButton } from './components/ActionButton';
import { PortfolioInfoTexts } from './components/PortfolioInfoTexts';
import { StockInfo } from './components/StockInfo';
import { actionButtons, bidPageStyle, bidStyles, errorStyles, sumUpCancel } from './styles';

export interface BidProps {
  stock?: Stock;
  saveForm: typeof saveBidForm;
  portfolioList: SinglePortfolio[];
  getDataForPortfolio: typeof getPortfolioData;
  getPortfolioList: typeof getPortfolios;
  currentStockSymbol?: string;
}

type BidPropsWithNavigation = BidProps & NavigationScreenProps;

interface BidState {
  bidLevel: string;
  action: string;
  bidLevelActive: boolean;
  portfolioNames: {}[];
  selectedPortfolio: string;
  sumOfStocksActive: boolean;
  sumOfStocks: string;
  sumUpActive: boolean;
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
      action: '',
      bidLevelActive: false,
      portfolioNames: [],
      selectedPortfolio: '',
      sumOfStocksActive: false,
      sumOfStocks: '0',
      sumUpActive: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    if (this.props.portfolioList.length === 0) {
      this.props.getPortfolioList();
    }
  }

  scroll(yPos: number) {
    this.scroller.current!.scrollTo({ x: 0, y: yPos });
    this.isSumUpActive();
  }

  getPortfolioNamesToDropdown() {
    const allPortfolioNames = this.state.portfolioNames.slice();
    this.props.portfolioList.forEach((portfolio) => {
      allPortfolioNames.push({ value: portfolio.name });
      return;
    });
    this.setState({ portfolioNames: allPortfolioNames });
  }

  onBuyPress() {
    this.getPortfolioNamesToDropdown();
    // If selectedPortfolio is not yet set, let's set it.
    if (this.state.selectedPortfolio === '') {
      this.setState(
        { selectedPortfolio: this.props.portfolioList[0].name },
        () =>
          this.setState({ action: 'buy' }, () => this.scroll(verticalScale(96)))
      );
    } else {
      this.setState({ action: 'buy' }, () => this.scroll(verticalScale(96)));
    }
  }

  onSellPress() {
    this.getPortfolioNamesToDropdown();
    // If selectedPortfolio is not yet set, let's set it.
    if (this.state.selectedPortfolio === '') {
      this.setState(
        {
          selectedPortfolio: this.props.portfolioList[0].name,
        },
        () =>
          this.setState({ action: 'sell' }, () =>
            this.scroll(verticalScale(96))
          )
      );
    } else {
      this.setState({ action: 'sell' }, () => this.scroll(verticalScale(96)));
    }
  }

  onDropdownTextChange = debounce((value: string) => {
    this.setState({ selectedPortfolio: value }, () => {
      this.sumOfStocksRef.current!.focus();
    });
  }, 100);

  // When portfolio is chosen, let's fetch its data, if that hasn't already be done.
  onSumOfStocksFocuced = debounce(() => {
    this.setState({ sumOfStocksActive: true }, () =>
      this.scroll(verticalScale(228))
    );
    const currentPortfolio = this.props.portfolioList.find((portfolio) => {
      return portfolio.name === this.state.selectedPortfolio;
    });
    if (currentPortfolio && currentPortfolio.portfolioInfo) {
      if (!currentPortfolio.portfolioInfo.portfolio) {
        this.props.getDataForPortfolio(currentPortfolio.uid);
      }
    }
  }, 500);

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
    // TODO: Format error message to user.
    if (!this.props.stock) {
      return <Text>Error!</Text>;
    }
    const level = parseStringDecimalToFloat(this.state.bidLevel);
    const sum = parseStringDecimalToFloat(this.state.sumOfStocks);
    this.props.saveForm(
      this.state.action,
      level,
      sum,
      this.state.selectedPortfolio,
      this.props.stock.symbol
    );
    this.props.navigation.navigate(RouteName.SumUp);
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
      this.props.stock.stockInfo &&
      this.props.stock.stockInfo.stockMetadata &&
      this.state.bidLevel !== '' &&
      this.state.sumOfStocks !== ''
    ) {
      return formatCurrency(
        parseStringDecimalToFloat(this.state.bidLevel) *
          parseStringDecimalToFloat(this.state.sumOfStocks),
        this.props.stock.stockInfo.stockMetadata.currency
      );
    }
    return 0;
  }

  isSumUpActive() {
    const { bidLevel, sumOfStocks, action } = this.state;
    if (action !== '' && bidLevel !== '0,00' && sumOfStocks !== '0') {
      this.setState({ sumUpActive: true });
    } else {
      this.setState({ sumUpActive: false });
    }
  }

  render() {
    const { currentStockSymbol, portfolioList, stock } = this.props;
    const {
      sumOfStocksActive,
      bidLevelActive,
      action,
      bidLevel,
      portfolioNames,
      selectedPortfolio,
      sumOfStocks,
      sumUpActive,
    } = this.state;

    if (!stock || !stock.stockInfo || !stock.stockInfo.stockMetadata) {
      return <Text>Error! </Text>;
    }

    if (portfolioList.length === 0 || portfolioList === undefined) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.noPortfolioText}>
            {t('BidPage.NoPortfoliosError')}
          </Text>
          <View style={sumUpCancel.container}>
            <TouchableOpacity
              style={sumUpCancel.cancelButton}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={sumUpCancel.cancelText}>{t('BidPage.GoBack')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
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
                  <ActionButton
                    action={'buy'}
                    active={action === 'buy' ? true : false}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onSellPress()}>
                  <ActionButton
                    action={'sell'}
                    active={action === 'sell' ? true : false}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {action !== '' && (
              <View>
                <View>
                  <Text style={bidStyles.headings}>
                    {t('BidPage.ChoosePortfolio')}
                  </Text>
                  {/* TODO: Center dropdown texts. */}
                  <Dropdown
                    textColor={FormColors.unactiveColor}
                    fontSize={verticalScale(17)}
                    itemColor={FormColors.backgroundColor}
                    baseColor={FormColors.unactiveColor}
                    selectedItemColor={FormColors.activeColor}
                    data={portfolioNames}
                    containerStyle={bidStyles.dropdown}
                    value={selectedPortfolio}
                    ref={this.portfolioRef}
                    onChangeText={(value: string) =>
                      this.onDropdownTextChange(value)
                    }
                    style={{ textAlign: 'center' }}
                  />
                  <View>
                    <PortfolioInfoTexts
                      currentStockSymbol={currentStockSymbol}
                      portfolioList={portfolioList}
                      selectedPortfolio={selectedPortfolio}
                      stockName={stock.name}
                    />
                  </View>
                </View>
                <View style={bidStyles.textInputContainer}>
                  {action === 'buy' && (
                    <Text style={bidStyles.headings}>
                      {t('BidPage.SumOfStocksBuy')}
                    </Text>
                  )}
                  {action === 'sell' && (
                    <Text style={bidStyles.headings}>
                      {t('BidPage.SumOfStocksSell')}
                    </Text>
                  )}
                  <TextInput
                    ref={this.sumOfStocksRef}
                    keyboardType={'numeric'}
                    selectionColor={FormColors.activeColor}
                    underlineColorAndroid={
                      sumOfStocksActive
                        ? FormColors.activeColor
                        : FormColors.unactiveColor
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
                    {t('BidPage.ChooseBidLevel')} (
                    {stock.stockInfo.stockMetadata.currency})
                  </Text>
                  <TextInput
                    ref={this.bidLevelRef}
                    keyboardType={'numeric'}
                    selectionColor={FormColors.activeColor}
                    underlineColorAndroid={
                      bidLevelActive
                        ? FormColors.activeColor
                        : FormColors.unactiveColor
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
                style={
                  sumUpActive
                    ? sumUpCancel.sumUpButton
                    : sumUpCancel.buttonDisabled
                }
                onPress={() => this.onSubmit()}
                disabled={!sumUpActive}
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
  portfolioList: state.portfolioListing.portfolioListing,
  currentStockSymbol: state.stocksListing.currentSymbol,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getDataForPortfolio: getPortfolioData,
      getPortfolioList: getPortfolios,
      saveForm: saveBidForm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidScreen);
