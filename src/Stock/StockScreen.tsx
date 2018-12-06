import React from 'react';

import { View } from 'react-native';
import { Card } from 'react-native-elements';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockContainerStyles } from './styles';

import { RootState } from '../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Stock } from './reducers';
import BuySell from './components/BuySell';

export interface StockProps {
  symbol: string;
  stockInfo?: Stock;
  error?: Error;
}

export class StockScreen extends React.Component<StockProps> {
  constructor(props: StockProps) {
    super(props);
  }

  render() {
    const { stockInfo, error } = this.props;

    return (
      <View>
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <Basicinfo stockInfo={stockInfo} error={error} />
        </Card>

        <Card containerStyle={stockContainerStyles.diagram}>
          <Diagram />
        </Card>

        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <BuySell containerName={'Buy'} />
        </Card>

        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <BuySell containerName={'Sell'} />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: StockProps) => ({
  stockInfo: ownProps.stockInfo,
  // state.stocksListing.stocks.find(
  //   (s) => s.symbol == ownProps.symbol
  // ),
  //loading: state.singleStock.loading,
  error: state.singleStock.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockScreen);
