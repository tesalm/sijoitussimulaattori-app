import React from 'react';

import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import { NavigationScreenProps } from 'react-navigation';
import { getStock } from '../actions';
import { RootState } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';

import { Stock } from '../reducer'

interface BasicinfoProps {
  stockInfo: Stock;
  loading: boolean;
  error?: Error;
}

const Basicinfo = (props: BasicinfoProps): JSX.Element => {

  if (props.error) {
    return <Text>Error! {props.error.message} </Text>
  }

  if (props.loading) {
    return <Text>Loading!</Text>
  }

  return (
    <View style={{ flex: 3, justifyContent: 'space-between' }}>
      <View style={{ flex: 2, flexDirection: 'row'  }}>
        <View style={{ width: '25%', flexDirection: 'column' }}>
          <Text style={ stockStyles.infoHeader }>{t('Buy')}</Text>
          <Text style={ stockStyles.infoText }>{ props.stockInfo.buy }€</Text>
          <Text style={ stockStyles.infoHeader }>{t('Sell')}</Text>
          <Text style={ stockStyles.infoText }>{ props.stockInfo.sell }€</Text>
        </View>
        <View style={{ width: '25%', flexDirection: 'column' }}>
          <Text style={ stockStyles.infoHeader }>{t('High')}</Text>
          <Text style={ stockStyles.infoText }>{ props.stockInfo.high }€</Text>
          <Text style={ stockStyles.infoHeader }>{t('Low')}</Text>
          <Text style={ stockStyles.infoText }>{ props.stockInfo.low }€</Text>
        </View>
        <View style={{ width: '50%', flexDirection: 'column'}}>
          <Text>{t('Market value')}</Text>
          <Text>{props.stockInfo.marketValue}€</Text>
          <Text>{t('Revenue in 24h')}</Text>
          <Text>{props.stockInfo.revenue}€</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={ stockStyles.infoHeader }>{t('Updated')} 09.11.2018 16:36.48</Text>
      </View>
    </View>
  );
};

export default Basicinfo;
