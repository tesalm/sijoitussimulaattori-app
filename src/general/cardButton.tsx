import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { cardButtonStyles } from '../App/styles';
import Icon from './icon';

import { t } from '../assets/i18n';
import { NavigationScreenProps } from 'react-navigation';

interface CardButtonProps {
  iconName: string;
  translationTitle: string;
  route: string;
}

type CardButtonPropsWithNavigation = CardButtonProps & NavigationScreenProps;

const CardButton = (props: CardButtonPropsWithNavigation): JSX.Element => {
  return (
    <TouchableHighlight onPress={() => props.navigation.navigate(props.route)}>
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
