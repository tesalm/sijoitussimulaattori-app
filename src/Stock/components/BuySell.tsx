import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { stockStyles } from '../styles';
import Icon from '../../general/icon';

import { t } from '../../assets/i18n';

interface BuySellProps {
  containerName: string;
}

const BuySell = (props: BuySellProps): JSX.Element => {
  return (
    // TODO: Make onPress for these items that go to buy or sell view.
    <TouchableHighlight style={stockStyles.buySellButton}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={stockStyles.buySellText}>{t(props.containerName)}</Text>
        <Icon iconName={'close.png'} iconHeight={24} iconWidth={24} />
      </View>
    </TouchableHighlight>
  );
};

export default BuySell;
