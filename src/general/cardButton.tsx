import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cardButtonStyles } from '../App/styles';
import { t } from '../assets/i18n';
import Icon, { IconNames } from './icon';

interface CardButtonProps {
  iconName: string;
  translationTitle: string;
  onPress: () => void;
}

const CardButton = (props: CardButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={cardButtonStyles.cardButtonView}>
        <View style={cardButtonStyles.cardButtonLogoView}>
          <Icon iconName={props.iconName} iconHeight={24} iconWidth={24} />
          <Text style={cardButtonStyles.cardButtonTitle}>
            {t(props.translationTitle)}
          </Text>
        </View>
        <Icon iconName={IconNames.open} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableOpacity>
  );
};

export default CardButton;
