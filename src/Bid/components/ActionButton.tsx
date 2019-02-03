import React from 'react';

import { Text, View } from 'react-native';
import { FormColors } from '../../App/colors';
import { t } from '../../assets/i18n';
import Icon from '../../general/icon';
import { actionButtons } from '../styles';

export interface ActionButtonProps {
  action: string;
  active: boolean;
}

export const ActionButton = (props: ActionButtonProps): JSX.Element => {
  return (
    <View style={actionButtons.buttonWithText}>
      <Icon
        iconName={props.action}
        iconHeight={24}
        iconWidth={24}
        tintColor={
          props.active
            ? FormColors.activeColor
            : FormColors.unactiveColor
        }
      />
      <Text
        style={
          props.active
            ? actionButtons.buttonActive
            : actionButtons.buttonUnactive
        }
      >
        {props.action === 'buy' && t('BidPage.Buy')}
        {props.action === 'sell' && t('BidPage.Sell')}
      </Text>
    </View>
  );
};
