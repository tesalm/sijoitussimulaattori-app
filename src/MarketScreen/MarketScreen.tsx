import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { getStocks } from './actions';
import { Stock } from './reducers';
import { StockStyles } from './styles';

export interface StockProps {
  stocks: Array<Stock>;
  loading: boolean;
  error?: Error;
  getAllStocks: typeof getStocks;
}

type StockPropsWithNavigation = StockProps & NavigationScreenProps;

export class MarketScreen extends React.Component<StockPropsWithNavigation> {
  constructor(props: StockPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    //Dispatch the actions
    this.props.getAllStocks();
  }

  renderHeader = (): JSX.Element => {
    return (
      <SearchBar
        lightTheme
        round
        placeholder={t('ListStockPage.SearcBarPlaceholder')}
        //TODO: search bar functionality
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
    return index % 2 ? StockStyles.whiteContainer : StockStyles.greyContainer;
  };

  //format revenue to right forms. Converts number to string and add procent marker.
  formatRevenue = (revenue: number): string => {
    return revenue >= 0
      ? '+' + (revenue * 100).toFixed(2) + ' %'
      : (revenue * 100).toFixed(2) + ' %';
  };

  render() {
    const { stocks, loading, error } = this.props;
    if (error) {
      //TODO: Format the error message to user
      return <Text>Error! {error.message} </Text>;
    }
    if (loading) {
      return (
        <View style={StockStyles.loadingView}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item, index }) => (
          <ListItem
            //TODO: navigate to to right stock page.
            onPress={() =>
              this.props.navigation.navigate(RouteName.Commissions)
            }
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
                  {item.close + ' $'}
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
  error: state.stocksListing.error,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllStocks: getStocks,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketScreen);
