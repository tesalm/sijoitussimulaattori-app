import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../redux/reducers';
import { getPortfolios, SaveAsCurrentPortfolioId } from './actions';
import { SinglePortfolio } from './reducers';

export interface PortfolioListProps {
  portfolios: Array<SinglePortfolio>;
  loading: boolean;
  error?: Error;
  getAllPortfolios: typeof getPortfolios;
  saveAsCurrentId: typeof SaveAsCurrentPortfolioId;
  portfolioId?: string;
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
    const { portfolios, loading, error } = this.props;
    if (error) {
      //TODO: Format the error message to user
      return <Text>Error! {error.message} </Text>;
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
        data={portfolios}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              this.props.saveAsCurrentId(item.uid);
              this.props.navigation.navigate('SinglePortfolio');
            }}
            title={item.name}
          />
        )}
      />
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  portfolios: state.portfolioListing.portfolios,
  loading: state.portfolioListing.loading,
  error: state.portfolioListing.error,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllPortfolios: getPortfolios,
      saveAsCurrentId: SaveAsCurrentPortfolioId,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListScreen);
