import React from 'react';

import { Image, Text, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockStyles } from './styles';

import { getStock } from './actions'
import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface StockProps extends NavigationScreenProps {
  stock: Array<{
    key: string,
    bid: number,
    offer: number,
    high: number,
    low: number,
    marketValue: number,
    revenue: number}>;
  loading: boolean;
  error: Error | null;
  getSingleStock: typeof getStock;
}

class StockScreen extends React.Component<StockProps> {
  static navigationOptions = { title: t('StockPage.Title') };
  constructor(props:StockProps) {
    super(props);

    this.state = {
      stock: [],
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.props.getSingleStock();
  }

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

const mapStateToProps = (state: RootState) => ({
  stock: state.singleStock.stock,
  loading: state.singleStock.loading,
  error: state.singleStock.error
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getSingleStock: getStock,
    },
    dispatch
  );

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(StockScreen);
