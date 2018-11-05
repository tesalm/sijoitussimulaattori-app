import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import t from '../../assets/i18n';

export default class HomeScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = { title: t('PortfoliosPage.Title') };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('PortfoliosPage.PlaceholderText')}</Text>
        <View style={{ padding: 10 }}>
          <Button
            title={t('PortfoliosPage.GoToProfileButtonLabel')}
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>
      </View>
    );
  }
}
