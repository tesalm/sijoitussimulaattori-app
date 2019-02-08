import React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Colors } from '../App/colors';
import { cardStyles } from '../App/styles';
import BackButtonWithNavigation from '../navigation/components/BackButton';
import { getTransactions } from '../PortfolioList/actions';
import { SinglePortfolio } from '../PortfolioList/reducer';
import { RootState } from '../redux/reducers';
import { t } from './../assets/i18n';
import { transactionStyles } from './styles';

export interface TransactionsProps {
  portfolio?: SinglePortfolio;
  portfolioId?: string;
  getTransactions: typeof getTransactions;
}

type TransactionsPropsWithNavigation = TransactionsProps &
  NavigationScreenProps;

export class TransactionsScreen extends React.Component<
  TransactionsPropsWithNavigation
> {
  static navigationOptions = {
    title: t('PortfolioPage.Events'),
    headerLeft: <BackButtonWithNavigation />,
  };
  constructor(props: TransactionsPropsWithNavigation) {
    super(props);
  }

  componentDidMount() {
    const { portfolio, portfolioId } = this.props;
    if (
      portfolio &&
      portfolioId &&
      portfolio.transactions.transactionListing.length < 1
    ) {
      this.props.getTransactions(portfolioId);
    }
  }

  refreshTransactions = () => {
    if (this.props.portfolioId) {
      this.props.getTransactions(this.props.portfolioId);
    }
  };

  renderContent = () => {
    const { portfolio, portfolioId } = this.props;
    if (portfolio === undefined || portfolioId === undefined) {
      return <Text>Error, portfolio not found! </Text>;
    }
    if (portfolio.transactions.error) {
      return (
        <Text style={transactionStyles.noActionsText}>
          Error! {portfolio.transactions.error.message}
        </Text>
      );
    }
    const events = portfolio.transactions.transactionListing.filter(
      (transact) => transact.status !== 'MARKET'
    );
    if (events.length === 0) {
      return (
        <Text style={transactionStyles.noActionsText}>
          {t('TransactionsPage.NoTransactions')}
        </Text>
      );
    }

    return events.map((item, index) => (
      <View key={index} style={transactionStyles.eventContainer}>
        <View style={transactionStyles.eventSection}>
          <View style={{ flex: 1 }}>
            {item.status === 'CANCELLED' ? (
              <Text style={transactionStyles.bold}>
                {new Date(item.cancelledAt).getDate()}
                {'.'}
                {new Date(item.cancelledAt).getMonth() + 1}
                {'.'}
                {new Date(item.cancelledAt).getFullYear()}
              </Text>
            ) : (
              <Text style={transactionStyles.bold}>
                {new Date(item.fulfilledAt).getDate()}
                {'.'}
                {new Date(item.fulfilledAt).getMonth() + 1}
                {'.'}
                {new Date(item.fulfilledAt).getFullYear()}
              </Text>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={transactionStyles.bold}>{item.type}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={transactionStyles.bold}>{item.symbol}</Text>
          </View>
        </View>
        <View style={transactionStyles.eventSection}>
          <View style={{ flex: 1 }}>
            <Text style={transactionStyles.basicText}>
              {t('TransactionsPage.Amount')}
            </Text>
            <Text style={transactionStyles.bold}>{item.amount}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={transactionStyles.basicText}>
              {t('TransactionsPage.Value')}
            </Text>
            <Text style={transactionStyles.bold}>{item.price}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={transactionStyles.basicText}>
              {t('TransactionsPage.State')}
            </Text>
            <Text style={transactionStyles.bold}>{item.status}</Text>
          </View>
        </View>
      </View>
    ));
  };

  render() {
    const { portfolio } = this.props;
    if (portfolio) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={portfolio.transactions.loading}
              onRefresh={this.refreshTransactions}
              colors={[Colors.baseColor]}
            />
          }
        >
          <Card containerStyle={cardStyles.container}>
            {this.renderContent()}
          </Card>
        </ScrollView>
      );
    } else {
      // TODO: Format the error message to user
      return <Text>Error, portfolio not found! </Text>;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  portfolioId: state.portfolioListing.portfolioId,
  portfolio: state.portfolioListing.portfolioListing.find((portfolio) => {
    return portfolio.uid === state.portfolioListing.portfolioId;
  }),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTransactions: getTransactions,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsScreen);
