import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RouteName } from '../navigation/routes';
import { RootState } from '../redux/reducers';
import { getPortfolios, saveAsCurrentPortfolioId } from './actions';
import { SinglePortfolio } from './reducers';

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

  componentDidMount() {
    //Dispatch the actions
    this.props.getAllPortfolios();
  }

  render() {
    const {
      portfolioListing,
      loading,
      portfolioListingLoadingError,
    } = this.props;
    if (portfolioListingLoadingError) {
      //TODO: Format the error message to user
      return <Text>Error! {portfolioListingLoadingError.message} </Text>;
    }
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      //TODO: Modify this list to match design for portfolio-list.
      <FlatList
        data={portfolioListing}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              this.props.saveAsCurrentPortfolio(item.uid);
              this.props.navigation.navigate(RouteName.SinglePortfolio);
            }}
            title={item.name}
          />
        )}
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  portfolioListing: state.portfolioListing.portfolioListing,
  loading: state.portfolioListing.loading,
  portfolioListingLoadingError: state.portfolioListing.error,
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