import React from 'react';
import { Button, Image, Text, View, TouchableHighlight } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockStyles } from './styles';

export default class StockScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = { title: t('StockPage.Title') };

  render() {
    return (
      <View>
        <Card containerStyle={{ margin: 0, height: 147 }}>
          <Basicinfo></Basicinfo>
        </Card>

        <Card containerStyle={{ margin: 0, height: 200 }}>
          <Diagram></Diagram>
        </Card>

        <Card
          containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={ stockStyles.bidOfferButton }
            >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={ stockStyles.infoText }>
                  {t('Bid')}
              </Text>
              <Image
                source={require('../navigation/assets/close.png')}
                style={{ height: 30, width: 30 }}
              />
            </View>
          </TouchableHighlight>
        </Card>

        <Card
          containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={ stockStyles.bidOfferButton }
            >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={ stockStyles.infoText }>
                  {t('Offer')}
              </Text>
              <Image
                source={require('../navigation/assets/close.png')}
                style={{ height: 30, width: 30 }}
              />
            </View>
          </TouchableHighlight>
        </Card>

      </View>
    );
  }
}
