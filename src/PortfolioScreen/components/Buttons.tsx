import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import { generalStyles } from '../../App/generalStyles';
import { t } from '../../assets/i18n';
import Icon, { IconNames } from '../../general/icon';

export const EventsTransactions = (): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={generalStyles.button}>
      <View style={generalStyles.buttonView}>
        <View style={generalStyles.buttonLogoView}>
          <Icon iconName={IconNames.manage} iconHeight={24} iconWidth={24} />
          <Text style={generalStyles.buttonTitle}>
            {t('PortfolioPage.Events')}
          </Text>
        </View>
        <Icon iconName={IconNames.open} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export const Manage = (): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={generalStyles.button}>
      <View style={generalStyles.buttonView}>
        <View style={generalStyles.buttonLogoView}>
          <Icon iconName={IconNames.manage} iconHeight={24} iconWidth={24} />
          <Text style={generalStyles.buttonTitle}>
            {t('PortfolioPage.Manage')}
          </Text>
        </View>
        <Icon iconName={IconNames.open} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};
