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
import { stockContainerStyles, stockStyles } from './styles';

export interface PortfolioProps {
  portfolio?: Portfolio;
  getPortfolio: typeof getPortfolioData;
  name?: string;
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
    const { portfolio, name } = this.props;

    if (name == undefined) {
      return <Text>hups</Text>;
    }
    return (
      <ScrollView>
        <Card>
          <Text>{name}</Text>
        </Card>
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <Basicinfo />
        </Card>
        <Card containerStyle={stockContainerStyles.diagram} />
        <Card containerStyle={stockContainerStyles.holdings}>
          <Holdings />
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
