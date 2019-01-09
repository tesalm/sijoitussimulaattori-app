import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { stockStyles } from '../styles';
import Icon from '../../general/icon';

import { t } from '../../assets/i18n';
import { NavigationScreenProps } from 'react-navigation';
import { Colors } from '../../App/colors';

interface BidProps {}

type BidPropsWithNavigation = BidProps & NavigationScreenProps;

const Bid = (props: BidPropsWithNavigation): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Bid')}>
      <View style={stockStyles.bidView}>
        <View style={stockStyles.bidLogoView}>
          <Icon
            iconName={'transaction'}
            iconHeight={24}
            iconWidth={24}
            tintColor={Colors.baseColor}
          />
          <Text style={stockStyles.bidText}>{t('StockPage.Bid')}</Text>
        </View>
        <Icon
          iconName={'open'}
          iconHeight={24}
          iconWidth={24}
          tintColor={Colors.baseColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Bid;
