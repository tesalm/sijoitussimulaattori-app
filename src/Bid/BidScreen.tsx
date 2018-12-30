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
import { bidPageStyle, bidStyles } from './styles';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducers';
import Icon from '../general/icon';
import { WizardFormColors } from '../App/colors';
import { formatCurrency } from '../util/general';
import { verticalScale } from '../util/scale';
import { NavigationScreenProps } from 'react-navigation';
import { saveBidForm } from './actions';

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

  scroll(yPos: number, callback?: () => void) {
    this.scroller.current!.scrollTo({ x: 0, y: yPos });
    if (callback) {
      callback();
    }
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

  onSumOfStocksSubmit() {
     () => this.bidLevelRef.current!.focus();
  }

  onBidLevelSubmit() {
    () =>
      this.scroll(verticalScale(425), () => this.bidLevelRef.current!.focus());
  }

  onSubmit() {
    const level = parseInt(this.state.bidLevel.concat(), 10);
    const sum = parseInt(this.state.sumOfStocks.concat(), 10);
    this.props.saveForm(
      this.state.buyActive ? 'buy' : 'sell',
      level,
      sum,
      this.state.selectedPortfolio
    );
    this.props.navigation.navigate('SumUp');
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

    if (!stock) {
      return <Text>Error!</Text>;
    }

    return (
      <View>
        {/* <BackButtonWithNavigation /> */}
        <ScrollView ref={this.scroller}>
          <View style={bidPageStyle.background}>
            <View style={bidStyles.chooseAction}>
              <Text style={bidStyles.headings}>
                {t('BidPage.Title')}
                {<Text style={bidStyles.stock}>{stock.name}</Text>}
              </Text>
              <View style={bidStyles.buttons}>
                <TouchableOpacity onPress={() => this.onBuyPress()}>
                  <View style={bidStyles.buttonWithText}>
                    <Icon
                      iconName={'deposit'}
                      iconHeight={24}
                      iconWidth={24}
                      tintColor={
                        buyActive
                          ? WizardFormColors.buttonsActive
                          : WizardFormColors.buttonsUnactive
                      }
                    />
                    <Text
                      style={
                        buyActive
                          ? bidStyles.buttonActive
                          : bidStyles.buttonUnactive
                      }
                    >
                      {'Buy'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onSellPress()}>
                  <View style={bidStyles.buttonWithText}>
                    <Icon
                      iconName={'withdraw'}
                      iconHeight={24}
                      iconWidth={24}
                      tintColor={
                        sellActive
                          ? WizardFormColors.buttonsActive
                          : WizardFormColors.buttonsUnactive
                      }
                    />
                    <Text
                      style={
                        sellActive
                          ? bidStyles.buttonActive
                          : bidStyles.buttonUnactive
                      }
                    >
                      {'Sell'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {(buyActive || sellActive) && (
              <View>
                <View>
                  <Text style={bidStyles.headings}>
                    {t('BidPage.ChoosePortfolio')}
                  </Text>
                  <Dropdown
                    textColor={WizardFormColors.buttonsUnactive}
                    fontSize={verticalScale(17)}
                    itemColor={WizardFormColors.backgroundColor}
                    baseColor={WizardFormColors.buttonsUnactive}
                    selectedItemColor={WizardFormColors.buttonsActive}
                    data={portfolios}
                    containerStyle={bidStyles.dropdown}
                    value={selectedPortfolio}
                    overlayStyle={bidStyles.dropdownOverlay}
                    pickerStyle={bidStyles.dropdownPicker}
                    ref={this.portfolioRef}
                    onChangeText={(value: string) =>
                      this.onDropdownTextChange(value)
                    }
                  />
                </View>
                <View>
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
                    style={bidStyles.textInputs}
                    value={sumOfStocks}
                    onSubmitEditing={this.onSumOfStocksSubmit}
                    onChangeText={(value: string) =>
                      this.setState({ sumOfStocks: value })
                    }
                    onFocus={() =>
                      this.setState({ sumOfStocksActive: true }, () =>
                        this.scroll(verticalScale(228))
                      )
                    }
                    onBlur={() =>
                      this.setState({
                        sumOfStocksActive: false,
                      })
                    }
                  />
                </View>
                <View>
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
                    style={bidStyles.textInputs}
                    value={bidLevel}
                    onSubmitEditing={this.onBidLevelSubmit}
                    onChangeText={(value: string) =>
                      this.setState({ bidLevel: value })
                    }
                    onFocus={() =>
                      this.setState({ bidLevelActive: true }, () =>
                        this.scroll(verticalScale(228))
                      )
                    }
                    onBlur={() =>
                      this.setState({
                        bidLevelActive: false,
                      })
                    }
                  />
                </View>
              </View>
            )}
            <View style={bidStyles.sumUpCancelButtonContainer}>
              <TouchableOpacity
                style={bidStyles.cancelButton}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={bidStyles.cancelText}>{t('BidPage.Cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={bidStyles.sumUpButton}
                onPress={() => this.onSubmit()}
              >
                <Text style={bidStyles.sumUpButtonText}>
                  {t('BidPage.SumUp')}
                </Text>
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
    return stock.symbol === state.stocksListing.symbol;
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
