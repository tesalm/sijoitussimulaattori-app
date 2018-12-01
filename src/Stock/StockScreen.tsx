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

import { Stock } from './reducer';

export interface StockProps extends NavigationScreenProps {
  stockInfo: Stock;
  loading: boolean;
  error?: Error;
  getSingleStock: typeof getStock;
}

export class StockScreen extends React.Component<StockProps> {
  static navigationOptions = { title: t('StockPage.Title') };
  constructor(props: StockProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getSingleStock();
  }

  render() {
    const { stockInfo, loading, error } = this.props;

    return (
      <View>
        <Card containerStyle={{ margin: 0, height: 147 }}>
          <Basicinfo stockInfo={stockInfo} loading={loading} error={error} />
        </Card>

        <Card containerStyle={{ margin: 0, height: 200 }}>
          <Diagram />
        </Card>

        <Card containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={stockStyles.buySellButton}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={stockStyles.infoText}>{t('Buy')}</Text>
              <Image
                source={require('../navigation/assets/close.png')}
                style={{ height: 30, width: 30 }}
              />
            </View>
          </TouchableHighlight>
        </Card>

        <Card containerStyle={{ margin: 0, height: 50 }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(RouteName.Profile)}
            style={stockStyles.buySellButton}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={stockStyles.infoText}>{t('Sell')}</Text>
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
  stockInfo: state.singleStock.stock,
  loading: state.singleStock.loading,
  error: state.singleStock.error,
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
