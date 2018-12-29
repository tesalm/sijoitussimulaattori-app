import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { getPortfolioData } from './actions';
import { Basicinfo } from './components/Basicinfo';
import { EventsTransactions, Manage } from './components/Buttons';
import { Holdings } from './components/Holdings';
import { Portfolio } from './reducers';
import { stockContainerStyles } from './styles';

export interface PortfolioProps {
  portfolio?: Portfolio;
  getPortfolio: typeof getPortfolioData;
  name?: string;
  loading: boolean;
  error?: Error;
}

export class PortfolioScreen extends React.Component<PortfolioProps> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };
  constructor(props: PortfolioProps) {
    super(props);
  }

  componentDidMount() {
    //Dispatch the actions
    this.props.getPortfolio();
  }

  render() {
    const { portfolio, name, error, loading } = this.props;

    if (name == undefined) {
      return <Text>hups</Text>;
    }
    return (
      <ScrollView>
        <Card>
          <Text>{name}</Text>
        </Card>
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <Basicinfo portfolio={portfolio} loading={loading} error={error} />
        </Card>
        <Card containerStyle={stockContainerStyles.diagram} />
        <Card containerStyle={stockContainerStyles.holdings}>
          <Holdings portfolio={portfolio} loading={loading} error={error} />
        </Card>
        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <EventsTransactions />
        </Card>
        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <Manage />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  name: state.portfolioListing.name,
  portfolio: state.singlePortfolio.portfolio,
  error: state.singlePortfolio.error,
  loading: state.singlePortfolio.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getPortfolio: getPortfolioData,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);
