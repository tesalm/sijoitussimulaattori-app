import React from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';

import { t } from './../assets/i18n';
import { Basicinfo } from './components/Basicinfo';
import { EventsTransactions, Manage } from './components/Buttons';
import { Holdings } from './components/Holdings';
import { stockContainerStyles } from './styles';

export default class PortfolioScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };

  render() {
    return (
      <ScrollView>
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
