import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { stockStyles } from '../styles';
import Icon from '../../general/icon';

import { t } from '../../assets/i18n';

interface BidProps {}

const Bid = (props: BidProps): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={stockStyles.bidButton}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={stockStyles.bidText}>{t('Bid')}</Text>
        <Icon iconName={'close'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export default Bid;
