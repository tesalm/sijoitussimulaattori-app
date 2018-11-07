import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../../assets/i18n';

export default class InfoScreen extends React.Component<NavigationScreenProps> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{t('InfoPage.PlaceholderText')}</Text>
      </View>
    );
  }
}
