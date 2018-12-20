import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { ListItem, SearchBar, colors } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { RootState } from '../redux/reducers';
import { getStocks, saveStockSymbol, refreshStocks } from './actions';
import { Stock } from './reducers';
import { StockStyles } from './styles';
import { Colors } from '../App/colors';

export interface StockProps {
  stocks: Array<Stock>;
  loading: boolean;
  refreshing: boolean;
  error?: Error;
  getAllStocks: typeof getStocks;
  refreshAllStocks: typeof refreshStocks;
  saveSymbol: typeof saveStockSymbol;
}

interface StockState {}

type StockPropsWithNavigation = StockProps & NavigationScreenProps;

export class MarketScreen extends React.Component<
  StockPropsWithNavigation,
  StockState
> {
  constructor(props: StockPropsWithNavigation) {
    super(props);
  }
  static navigationOptions = { title: t('MarketPage.Title') };

  componentDidMount() {
    //Dispatch the actions
    this.props.getAllStocks();
  }

  renderHeader = (): JSX.Element => {
    return (
      <SearchBar
        lightTheme
        round
        placeholder={t('ListStockPage.SearcBarPlaceholder')} //TODO: search bar functionality
        autoCorrect={false}
      />
    );
  };

  //This checks what color revenue should be
  revenueColor = (revenue: number): typeof StockStyles.revenueValueGreen => {
    return revenue >= 0
      ? StockStyles.revenueValueGreen
      : StockStyles.revenueValueRed;
  };

  //Every other listitem has gray background
  listBackgroundColor = (index: number): typeof StockStyles.greyContainer => {
    return index % 2 ? StockStyles.greyContainer : StockStyles.whiteContainer;
  };

  //format revenue to right forms. Converts number to string and add procent marker.
  formatRevenue = (revenue: number): string => {
    return revenue >= 0
      ? '+' + (revenue * 100).toFixed(2) + ' %'
      : (revenue * 100).toFixed(2) + ' %';
  };

  formatValue = (value: number, currency: string): string => {
    if (currency == 'USD') {
      return value + ' $';
    } else if (currency == 'EUR') {
      return value + ' €';
    }
    return value + ' $';
  };

  refresh = () => {
    this.props.refreshAllStocks();
  };

  render() {
    const { stocks, loading, refreshing, error } = this.props;
    console.log(stocks);
    if (error) {
      //TODO: Format the error message to user
      return <Text>Error! {error.message} </Text>;
    }

    // Loading stocks without swiping
    if (loading) {
      return (
        <View style={StockStyles.loadingView}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refresh}
            colors={[Colors.baseColor]}
          />
        }
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              this.props.saveSymbol(item.symbol);
              this.props.navigation.navigate('SingleStock');
            }}
            containerStyle={this.listBackgroundColor(index)}
            title={item.name}
            titleStyle={StockStyles.titleStyle}
            rightTitle={
              <View style={StockStyles.rightTitleView}>
                <Text style={StockStyles.revenueText}>
                  {t('ListStockPage.RevenueText')}
                </Text>
                <Text style={this.revenueColor(item.revenue)}>
                  {this.formatRevenue(item.revenue)}
                </Text>
              </View>
            }
            subtitle={
              <View style={StockStyles.subtitleView}>
                <Text style={StockStyles.lastSaleText}>
                  {t('ListStockPage.LastSaleText')}
                </Text>
                <Text style={StockStyles.lastSaleValue}>
                  {this.formatValue(item.close, item.currency)}
                </Text>
              </View>
            }
          />
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  stocks: state.stocksListing.stocks,
  loading: state.stocksListing.loading,
  refreshing: state.stocksListing.refreshing,
  error: state.stocksListing.error,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllStocks: getStocks,
      refreshAllStocks: refreshStocks,
      saveSymbol: saveStockSymbol,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketScreen);
