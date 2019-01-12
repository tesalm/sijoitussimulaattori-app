import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import { cardButtonStyles } from '../App/styles';
import { t } from '../assets/i18n';
import Icon from './icon';

interface CardButtonProps {
  iconName: string;
  translationTitle: string;
  onPress: () => void;
}

const CardButton = (props: CardButtonProps): JSX.Element => {
  return (
    <TouchableHighlight onPress={() => props.onPress()}>
      <View style={cardButtonStyles.cardButtonView}>
        <View style={cardButtonStyles.cardButtonLogoView}>
          <Icon iconName={props.iconName} iconHeight={24} iconWidth={24} />
          <Text style={cardButtonStyles.cardButtonTitle}>
            {t(props.translationTitle)}
          </Text>
        </View>
        <Icon iconName={'open'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export default CardButton;
