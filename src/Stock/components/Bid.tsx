import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { stockStyles } from '../styles';
import Icon from '../../general/icon';

import { t } from '../../assets/i18n';

interface BidProps {}

const Bid = (props: BidProps): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight>
      <View style={stockStyles.bidView}>
        <View style={stockStyles.bidLogoView}>
          <Icon iconName={'transaction'} iconHeight={24} iconWidth={24} />
          <Text style={stockStyles.bidText}>{t('StockPage.Bid')}</Text>
        </View>
        <Icon iconName={'open'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export default Bid;
