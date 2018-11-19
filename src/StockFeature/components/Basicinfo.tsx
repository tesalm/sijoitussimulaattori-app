import React from 'react';

import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import { NavigationScreenProps } from 'react-navigation';
import { getStock } from '../actions';
import { RootState } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';

import { Stock } from '../../models'

interface BasicinfoProps {
  stockInfo: Stock;
  loading: boolean;
  error: Error | null;
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
          <Text style={ stockStyles.infoHeader }>{t('Bid')}</Text>
          <Text>{props.stockInfo.bid}</Text>
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
