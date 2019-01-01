import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { t } from '../../assets/i18n';
import { HistoryDataQuote, IntradayQuote } from '../../MarketScreen/reducer';
import { stockStyles } from '../styles';
import Graph from './Graph';

interface GraphState {
  toolBarIndex: number;
  historyInterval: Array<HistoryDataQuote>;
  graphLoading?: boolean;
}

interface GraphProps {
  historyData: Array<HistoryDataQuote>;
  intraDay: Array<IntradayQuote>;
  historyError?: Error;
}

class Diagram extends React.Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props);
    this.state = { toolBarIndex: NaN, historyInterval: [] };
    this.updateGraph = this.updateGraph.bind(this);
  }
  _schedule = 0;

  componentDidMount() {
    if (this.props.intraDay.length > 1) {
      this.updateGraph(0);
    } else {
      // if no intraday data available, show weekly insted
      this.updateGraph(1);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._schedule);
  }

  updateGraph(toolBarIndex: number) {
    if (this.state.toolBarIndex != toolBarIndex) {
      this.setState({ toolBarIndex, graphLoading: true });
      // schedule the execution of setHistoryInterval() right after the state is updated
      this._schedule = setTimeout(
        () => this.setHistoryInterval(toolBarIndex),
        0
      );
    }
  }

  setInterval = (timeFrame: Date) => {
    const { historyData } = this.props;
    this.setState({
      historyInterval: historyData.filter((i) => new Date(i.date) > timeFrame),
      graphLoading: false,
    });
  };

  setHistoryInterval = (index: number) => {
    const today = new Date();
    switch (index) {
      case 0: {
        return this.setState({
          historyInterval: this.props.intraDay,
          graphLoading: false,
        });
      }
      case 1: {
        const lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        return this.setInterval(lastWeek);
      }
      case 2: {
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        return this.setInterval(lastMonth);
      }
      case 3: {
        const last3Months = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate()
        );
        return this.setInterval(last3Months);
      }
      case 4: {
        const lastYear = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        return this.setInterval(lastYear);
      }
    }
  };

  render() {
    const { toolBarIndex, historyInterval, graphLoading } = this.state;

    if (this.props.historyError) {
      return <Text>Error! {this.props.historyError.message}</Text>;
    }

    return (
      <View>
        <Text style={stockStyles.titleStyle}>
          {t('StockPage.RevenueOverYear')}
        </Text>
        <View style={stockContainerStyles.graphContainer}>
          {graphLoading ? (
            <ActivityIndicator
              size="large"
              color="green"
              style={{ position: 'absolute' }}
            />
          ) : (
            <Graph historydata={historyInterval} />
          )}
        </View>
        <ButtonGroup
          onPress={this.updateGraph}
          selectedIndex={toolBarIndex}
          buttons={[
            t('Graph.1D'),
            t('Graph.1W'),
            t('Graph.1M'),
            t('Graph.3M'),
            t('Graph.1Y'),
          ]}
          containerStyle={stockContainerStyles.buttonGrpContainer}
          textStyle={stockStyles.buttonGrpText}
        />
      </View>
    );
  }
}

export default Diagram;
