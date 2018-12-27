import React from 'react';
import { RootState } from '../redux/reducers';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import BackButtonWithNavigation from '../navigation/components/BackButton';
import { bidPageStyle, bidStyles } from './styles';
import { t } from '../assets/i18n';
import { Stock } from '../MarketScreen/reducers';
import Icon from '../general/icon';
import { WizardFormColors } from '../App/colors';
import { formatCurrency } from '../util/general';
import { Button } from 'react-native-elements';

export interface BidProps {
  stock?: Stock;
}

interface BidState {
  bidLevel: string;
  buyActive: boolean;
  sellActive: boolean;
  sumOfStocks: string;
}

export class BidScreen extends React.Component<BidProps, BidState> {
  constructor(props: BidProps) {
    super(props);
    this.state = {
      bidLevel: '0,00',
      buyActive: false,
      sellActive: false,
      sumOfStocks: '0',
    };
  }

  static navigationOptions = {
    header: null,
  };

  formatBidValue() {
    if (this.props.stock && this.props.stock.stockInfo.stockMetadata) {
      return formatCurrency(
        parseInt(this.state.bidLevel, 10),
        this.props.stock.stockInfo.stockMetadata.currency
      );
    }
    return '0';
  }

  onBuyPress() {
    this.setState({ buyActive: true }, () =>
      this.setState({ sellActive: false })
    );
  }

  onSellPress() {
    this.setState({ sellActive: true }, () =>
      this.setState({ buyActive: false })
    );
  }

  render() {
    const { stock } = this.props;
    const { bidLevel, buyActive, sellActive, sumOfStocks } = this.state;
    if (!stock) {
      return <Text>Error!</Text>;
    }
    return (
      <View style={bidPageStyle.background}>
        <BackButtonWithNavigation />
        <View>
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
        <View>
          <Text style={bidStyles.headings}>{t('BidPage.ChoosePortfolio')}</Text>
          <Dropdown style={bidStyles.picker}>
            {/* TODO: Change portfolios to real ones. */}
          </Dropdown>
        </View>
        <View>
          {/* {buyActive
            ? () => {
                return <Text>{t('BidPage.SumOfStocksBuy')}</Text>;
              }
            : () => {
                return <Text>{t('BidPage.SumOfStocksSell')}</Text>;
              }}
          ; */}
          <TextInput keyboardType={'numeric'} value={sumOfStocks} />
        </View>
        <View>
          <Text style={bidStyles.headings}>{t('BidPage.ChooseBidLevel')}</Text>
          <TextInput keyboardType={'numeric'} value={this.formatBidValue()} />
        </View>
        <View style={bidStyles.okCancelButtons}>
          <Button title={t('BidPage.Cancel')} />
          <Button title={t('BidPage.Ok')} />
        </View>
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
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidScreen);
