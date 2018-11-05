import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import t from '../../assets/i18n';
import { RouteName } from '../routes';

export default class MarketScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: t('MarketPage.Title') };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('MarketPage.PlaceholderText')}</Text>
        <View style={{ padding: 10 }}>
          <Button
            title={t('MarketPage.GoToCommissionsButtonLabel')}
            onPress={() =>
              this.props.navigation.navigate(RouteName.Commissions)
            }
          />
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title={t('MarketPage.GoToHomePageButtonLabel')}
            onPress={() => this.props.navigation.navigate(RouteName.Home)}
          />
        </View>
      </View>
    );
  }
}
