import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../../assets/i18n';
import { RouteName } from '../routes';

export default class CommissionsScreen extends React.Component<
  NavigationScreenProps
> {
  static navigationOptions = {
    title: t('CommissionsPage.Title'),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>{t('CommissionsPage.PlaceholderText')}</Text>
        <View style={{ padding: 10 }}>
          <Button
            title={t('CommissionsPage.GoToMarketsButtonLabel')}
            onPress={() => this.props.navigation.navigate(RouteName.StockList)}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title={t('CommissionsPage.GoToStockButtonLabel')}
            onPress={() =>
              this.props.navigation.navigate(RouteName.StockList, {})
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
