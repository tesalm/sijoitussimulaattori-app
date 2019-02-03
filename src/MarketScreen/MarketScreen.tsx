import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { textStyles } from '../App/styles';
import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { formatCurrency, formatRevenue, revenueColor } from '../util/stock';
import { getStocks, saveAsCurrentStockSymbol } from './actions';
import { Stock } from './reducer';
import { StockStyles } from './styles';

export interface StockProps {
  stocks: Array<Stock>;
  loading: boolean;
  refreshing: boolean;
  error?: Error;
  getAllStocks: typeof getStocks;
  saveAsCurrentSymbol: typeof saveAsCurrentStockSymbol;
}

interface StockState {}

type StockPropsWithNavigation = StockProps & NavigationScreenProps;

export class MarketScreen extends React.Component<
  StockPropsWithNavigation,
  StockState
> {
  static navigationOptions = { title: t('MarketPage.Title') };

  constructor(props: StockPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    // Dispatch the actions
    this.props.getAllStocks();
  }

  renderHeader = (): JSX.Element => {
    return (
      <SearchBar
        lightTheme
        round
        placeholder={t('ListStockPage.SearchBarPlaceholder')} // TODO: search bar functionality
        autoCorrect={false}
      />
    );
  };

  // Every other listitem has gray background
  listBackgroundColor = (index: number): typeof StockStyles.greyContainer => {
    return index % 2 ? StockStyles.greyContainer : StockStyles.whiteContainer;
  };

  refresh = () => {
    this.props.getAllStocks();
  };

  stockPressed = (symbol: string) => {
    if (this.props.refreshing) {
      // TODO: Format toast message to user.
      ToastAndroid.show(
        'Wait, stock-list is being refreshed.',
        ToastAndroid.SHORT
      );
    } else {
      this.props.saveAsCurrentSymbol(symbol);
      this.props.navigation.navigate(RouteName.Stock);
    }
  };

  render() {
    const { stocks, loading, refreshing, error } = this.props;
    if (error) {
      // TODO: Format the error message to user
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
            onPress={() => this.stockPressed(item.symbol)}
            containerStyle={this.listBackgroundColor(index)}
            title={item.name}
            titleStyle={StockStyles.titleStyle}
            rightTitle={
              <View style={StockStyles.rightTitleView}>
                <Text style={textStyles.valueHeader}>
                  {t('ListStockPage.RevenueText')}
                </Text>
                <Text style={revenueColor(item.revenue)}>
                  {formatRevenue(item.revenue)}
                </Text>
              </View>
            }
            subtitle={
              <View style={StockStyles.subtitleView}>
                <Text style={textStyles.valueHeader}>
                  {t('ListStockPage.LastSaleText')}
                </Text>
                <Text style={StockStyles.lastSaleValue}>
                  {formatCurrency(
                    item.close,
                    item.stockInfo && item.stockInfo.stockMetadata
                      ? item.stockInfo.stockMetadata.currency
                      : 'USD'
                  )}
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
      saveAsCurrentSymbol: saveAsCurrentStockSymbol,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketScreen);
