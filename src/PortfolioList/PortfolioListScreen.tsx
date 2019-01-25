import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, ToastAndroid, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { formatRevenue, revenueColor, valueColor } from '../util/stock';
import { getPortfolios, saveAsCurrentPortfolioId } from './actions';
import { SinglePortfolio } from './reducers';
import { PortfolioListingStyles } from './styles';

export interface PortfolioListProps {
  portfolioListing: Array<SinglePortfolio>;
  loading: boolean;
  portfolioListingLoadingError?: Error;
  getAllPortfolios: typeof getPortfolios;
  saveAsCurrentPortfolio: typeof saveAsCurrentPortfolioId;
  refreshing: boolean;
}

type PortfolioPropsWithNavigation = PortfolioListProps & NavigationScreenProps;

export class PortfolioListScreen extends React.Component<
  PortfolioPropsWithNavigation
> {
  constructor(props: PortfolioPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    //Dispatch the actions
    this.props.getAllPortfolios();
  }

  portfolioPressed = (uid: string) => {
    if (this.props.refreshing) {
      // TODO: Format toast message to user.
      ToastAndroid.show(
        'Wait, stock-list is being refreshed.',
        ToastAndroid.SHORT
      );
    } else {
      this.props.saveAsCurrentPortfolio(uid);
      this.props.navigation.navigate(RouteName.SinglePortfolio);
    }
  };

  refresh = () => {
    this.props.getAllPortfolios();
  };

  render() {
    const {
      portfolioListing,
      loading,
      portfolioListingLoadingError,
      refreshing,
    } = this.props;
    if (portfolioListingLoadingError) {
      //TODO: Format the error message to user
      return <Text>{t('PortfolioListing.NoPortfolios')}</Text>;
    }
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (portfolioListing.length == 0) {
      //TODO: Format message to user
      return <Text>You don't own any portfolios</Text>;
    }

    return (
      //TODO: Modify this list to match design for portfolio-list.
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refresh}
            colors={[Colors.baseColor]}
          />
        }
        data={portfolioListing}
        ItemSeparatorComponent={() => (
          <View style={PortfolioListingStyles.itemSeparatorStyle} />
        )}
        keyExtractor={(item) => item.uid}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => this.portfolioPressed(item.uid)}
            containerStyle={PortfolioListingStyles.listContainer}
            title={
              <View style={PortfolioListingStyles.titleView}>
                <Text style={PortfolioListingStyles.titleStyle}>
                  {item.name}
                </Text>
              </View>
            }
            rightTitle={
              <View style={PortfolioListingStyles.rightTitleView}>
                <Text style={PortfolioListingStyles.revenueText}>
                  {t('PortfolioListing.RevenueToday')}
                </Text>
                <Text style={revenueColor(item.lastDayRevenue)}>
                  {formatRevenue(item.lastDayRevenue)}
                </Text>
              </View>
            }
            subtitle={
              <View style={PortfolioListingStyles.subtitleView}>
                <Text style={PortfolioListingStyles.subtitleText}>
                  {t('PortfolioListing.TotalRevenue')}
                </Text>
                <Text style={valueColor(item.totalRevenue)}>
                  {formatRevenue(item.totalRevenue)}
                </Text>
              </View>
            }
          />
        )}
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  portfolioListing: state.portfolioListing.portfolioListing,
  portfolioListingLoadingError: state.portfolioListing.error,
  error: state.portfolioListing.error,
  refreshing: state.portfolioListing.refreshing,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllPortfolios: getPortfolios,
      saveAsCurrentPortfolio: saveAsCurrentPortfolioId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListScreen);
