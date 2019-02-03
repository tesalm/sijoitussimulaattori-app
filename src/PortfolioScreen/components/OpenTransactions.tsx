import React from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { scale, verticalScale } from 'react-native-size-matters';

import { t } from '../../assets/i18n';
import Icon, { IconNames } from '../../general/icon';
import { cancelTransaction, getTransactions } from '../../PortfolioList/actions';
import { Transaction } from '../../PortfolioList/reducer';
import { portfolioStyles } from '../styles';

export interface TransactionProps {
  transactions: Array<Transaction>;
  loading: boolean;
  error?: Error;
  portfolioId?: string;
  cancelOpenTransaction: typeof cancelTransaction;
  getTransactions: typeof getTransactions;
}

interface TransactionState {
  collapsed: boolean;
  fetched: boolean;
}

export class OpenTransactions extends React.Component<
  TransactionProps,
  TransactionState
> {
  constructor(props: TransactionProps) {
    super(props);
    this.state = { collapsed: true, fetched: false };
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
    if (!this.state.fetched && this.props.portfolioId) {
      this.props.getTransactions(this.props.portfolioId);
      this.setState({ fetched: true });
    }
  };

  renderToggleButton = () => {
    const iconName = this.state.collapsed ? 'arrowDown' : 'arrowUp';
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Icon iconName={IconNames.opensign} iconHeight={24} iconWidth={24} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={portfolioStyles.titleText}>
            {t('OpenTransactions.ToggleTitle')}
          </Text>
          {this.props.loading && (
            <ActivityIndicator size="small" style={{ marginLeft: scale(18) }} />
          )}
        </View>
        <Icon iconName={iconName} iconHeight={24} iconWidth={24} />
      </View>
    );
  };

  confirmationDialog = (portfolioId: string, transact: Transaction) => {
    Alert.alert(
      t('OpenTransactions.AlertTitle'),
      t('OpenTransactions.Cancel') +
        ' ' +
        transact.symbol +
        ' ' +
        t('OpenTransactions.Transaction'),
      [
        {
          text: t('OpenTransactions.No'),
          style: 'cancel',
        },
        {
          text: t('OpenTransactions.Yes'),
          onPress: () =>
            this.props.cancelOpenTransaction(portfolioId, transact.uid),
        },
      ]
    );
  };

  renderContent = () => {
    const { error, transactions, portfolioId } = this.props;
    if (error) {
      return (
        <Text style={portfolioStyles.noActionsText}>
          Error! {error.message}
        </Text>
      );
    }
    if (transactions.length < 1 || portfolioId === undefined) {
      return (
        <Text style={portfolioStyles.noActionsText}>
          {t('OpenTransactions.NoTransactions')}
        </Text>
      );
    }

    return transactions.map((transact, index) => (
      <View key={index} style={portfolioStyles.transaction}>
        <View style={{ flex: 1 }}>
          <Text style={portfolioStyles.symbol}>{transact.type}</Text>
          <Text style={portfolioStyles.basicText}>
            {t('OpenTransactions.Amount')}
          </Text>
          <Text style={portfolioStyles.value}>{transact.amount}</Text>
        </View>
        <View style={{ flex: 1.5 }}>
          <Text style={portfolioStyles.symbol}>{transact.symbol}</Text>
          <Text style={portfolioStyles.basicText}>
            {t('OpenTransactions.Total')}
          </Text>
          <Text style={portfolioStyles.value}>{transact.price}</Text>
        </View>
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => this.confirmationDialog(portfolioId, transact)}
        >
          <Text style={portfolioStyles.cancelAction}>
            {t('OpenTransactions.Cancel').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleExpanded}>
          {this.renderToggleButton()}
        </TouchableOpacity>
        {!this.props.loading && (
          <Collapsible
            style={{ marginTop: verticalScale(6) }}
            collapsed={this.state.collapsed}
          >
            {this.renderContent()}
          </Collapsible>
        )}
      </View>
    );
  }
}
