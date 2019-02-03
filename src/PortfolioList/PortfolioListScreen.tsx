import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { SinglePortfolio } from './reducer';

import Icon, { IconNames } from '../general/icon';
import { PortfolioListingStyles } from './styles';

export interface PortfolioListProps {
  portfolioListing: Array<SinglePortfolio>;
  loading: boolean;
  portfolioListingLoadingError?: Error;
  getAllPortfolios: typeof getPortfolios;
  saveAsCurrentPortfolio: typeof saveAsCurrentPortfolioId;
}

type PortfolioPropsWithNavigation = PortfolioListProps & NavigationScreenProps;

export class PortfolioListScreen extends React.Component<
  PortfolioPropsWithNavigation
> {
  constructor(props: PortfolioPropsWithNavigation) {
    super(props);
  }

  static navigationOptions = {
    title: t('PortfoliosPage.Title'),
  };

  componentDidMount() {
    // Dispatch the actions
    this.props.getAllPortfolios();
  }

  portfolioPressed = (uid: string) => {
    if (this.props.loading) {
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

  refreshPortfolios = () => {
    this.props.getAllPortfolios();
  };

  render() {
    const {
      portfolioListing,
      loading,
      portfolioListingLoadingError,
    } = this.props;
    if (portfolioListingLoadingError) {
      // TODO: Format the error message to user
      return <Text>{portfolioListingLoadingError.message}</Text>;
    }
    if (loading) {
      return (
        <View style={PortfolioListingStyles.loadingView}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    // Show message if there are no portfolios
    if (portfolioListing.length === 0) {
      return (
        <View style={PortfolioListingStyles.noPortfolioContainer}>
          <Text style={PortfolioListingStyles.noPortfolioText}>
            {t('PortfolioListing.NoPortfolios')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(RouteName.CreatePortfolio)
            }
            style={PortfolioListingStyles.createNewPortfolio}
          >
            <Icon iconName={IconNames.add} iconHeight={50} iconWidth={50} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={PortfolioListingStyles.screen}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshPortfolios}
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
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(RouteName.CreatePortfolio)
          }
          style={PortfolioListingStyles.createNewPortfolio}
        >
          <Icon iconName={IconNames.add} iconHeight={50} iconWidth={50} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolioListing: state.portfolioListing.portfolioListing,
  portfolioListingLoadingError: state.portfolioListing.error,
  loading: state.portfolioListing.loading,
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
