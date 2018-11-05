import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import t from '../../assets/i18n';

export default class ProfileScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = { title: t('ProfilePage.Title') };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('ProfilePage.PlaceholderText')}</Text>
      </View>
    );
  }
}
