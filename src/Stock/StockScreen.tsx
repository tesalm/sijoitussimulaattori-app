import React from 'react';

import { Image, Text, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';

import { t } from '../assets/i18n';
import { RouteName } from '../navigation/routes';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockStyles } from './styles';

import { getStock } from './actions';
import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Stock } from '../redux/reducers';

export interface StockProps {
  symbol: string;
  stockInfo?: Stock;
  //loading: boolean;
  error?: Error;
}

export class StockScreen extends React.Component<StockProps> {
  constructor(props: StockProps) {
    super(props);
  }

  render() {
    const { stockInfo, error } = this.props;

    console.log('STOCKSCREEN' + this.props.symbol);
    console.log(stockInfo);

    return (
      <View>
        <Card containerStyle={{ margin: 0, height: 147 }}>
          <Basicinfo stockInfo={stockInfo} error={error} />
        </Card>

        <Card containerStyle={{ margin: 0, height: 200 }}>
          <Diagram />
        </Card>

        <Card containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            //onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={stockStyles.buySellButton}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={stockStyles.buySellText}>{t('Buy')}</Text>
              <Image
                source={require('../navigation/assets/close.png')}
                style={{ height: 24, width: 24 }}
              />
            </View>
          </TouchableHighlight>
        </Card>

        <Card containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            //onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={stockStyles.buySellButton}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={stockStyles.buySellText}>{t('Sell')}</Text>
              <Image
                source={require('../navigation/assets/close.png')}
                style={{ height: 24, width: 24 }}
              />
            </View>
          </TouchableHighlight>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: StockProps) => ({
  stockInfo: state.stocksListing.stocks.find(
    (s) => s.symbol == ownProps.symbol
  ),
  //loading: state.singleStock.loading,
  error: state.singleStock.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockScreen);
