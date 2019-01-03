import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import { t } from '../../assets/i18n';
import Icon from '../../general/icon';
import { stockStyles } from '../styles';

export const EventsTransactions = (): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={stockStyles.button}>
      <View style={stockStyles.buttonView}>
        <View style={stockStyles.buttonLogoView}>
          <Icon iconName={'manage'} iconHeight={24} iconWidth={24} />
          <Text style={stockStyles.titleText}>{t('PortfolioPage.Events')}</Text>
        </View>
        <Icon iconName={'open'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export const Manage = (): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={stockStyles.button}>
      <View style={stockStyles.buttonView}>
        <View style={stockStyles.buttonLogoView}>
          <Icon iconName={'manage'} iconHeight={24} iconWidth={24} />
          <Text style={stockStyles.titleText}>{t('PortfolioPage.Manage')}</Text>
        </View>
        <Icon iconName={'open'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};
