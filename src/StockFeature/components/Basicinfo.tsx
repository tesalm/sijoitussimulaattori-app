import React from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

const Basicinfo = (): JSX.Element => {
  return (
    <View style={{ flex: 3, justifyContent: 'space-between' }}>
      <View style={{ flex: 2, flexDirection: 'row'  }}>
        <View style={{ width: '25%', flexDirection: 'column' }}>
          <Text style={ stockStyles.infoHeader }>{t('Bid')}</Text>
          <Text style={ stockStyles.infoText }>10€</Text>
          <Text style={ stockStyles.infoHeader }>{t('Offer')}</Text>
          <Text style={ stockStyles.infoText }>500€</Text>
        </View>
        <View style={{ width: '25%', flexDirection: 'column' }}>
          <Text style={ stockStyles.infoHeader }>{t('High')}</Text>
          <Text style={ stockStyles.infoText }>10€</Text>
          <Text style={ stockStyles.infoHeader }>{t('Low')}</Text>
          <Text style={ stockStyles.infoText }>500€</Text>
        </View>
        <View style={{ width: '50%', flexDirection: 'column'}}>
          <Text>{t('Market value')}</Text>
          <Text>8</Text>
          <Text>{t('Revenue in 24h')}</Text>
          <Text>7</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={ stockStyles.infoHeader }>{t('Updated')} 09.11.2018 16:36.48</Text>
      </View>
    </View>
  );
};

export default Basicinfo;
