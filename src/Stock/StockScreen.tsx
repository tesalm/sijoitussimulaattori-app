import React from 'react';

import { View } from 'react-native';
import { Card } from 'react-native-elements';

import Basicinfo from './components/Basicinfo';
import Diagram from './components/Diagram';
import { stockContainerStyles } from './styles';

import { RootState } from '../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Metadata, Intraday, Historydata } from './reducers';

import Bid from './components/Bid';
import { getMetadata, getIntraday, getHistory } from './actions';

export interface StockProps {
  metadata?: Metadata;
  intraday?: Intraday;
  historydata?: Historydata;
  getMeta: typeof getMetadata;
  getIntra: typeof getIntraday;
  getHistoryData: typeof getHistory;
  symbol?: string;
}

interface StockState {}

export class StockScreen extends React.Component<StockProps, StockState> {
  constructor(props: StockProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.symbol != undefined) {
      const curTime = new Date();
      // TODO: Aseta updateTime. Nyt 00:30.00
      const updateTimeH = 0;
      const updateTimeM = 30;
      const updateTimeS = 0;

      // Metadatan haku (haetaan vain kerran päivässä)
      if (this.props.metadata === undefined) {
        this.props.getMeta(this.props.symbol, curTime);
      } else {
        // Jos curTime > 00:30.00
        if (
          curTime.getHours() >= updateTimeH &&
          curTime.getMinutes() >= updateTimeM &&
          curTime.getSeconds() >= updateTimeS
        ) {
          // Jos data on haettu edellisenä päivänä tai fetchTime < 00:30.00, päivitetään tiedot.
          if (
            curTime.getDate() != this.props.metadata.fetchTime.getDate() ||
            (this.props.metadata.fetchTime.getHours() <= updateTimeH &&
              this.props.metadata.fetchTime.getMinutes() <= updateTimeM &&
              this.props.metadata.fetchTime.getSeconds() <= updateTimeS)
          ) {
            this.props.getMeta(this.props.symbol, curTime);
          }
        }
      }

      // Historiadatan haku (haetaan vain kerran päivässä)
      if (this.props.historydata === undefined) {
        this.props.getHistoryData(this.props.symbol, curTime);
      } else {
        // Jos curTime > 00:30.00
        if (
          curTime.getHours() >= updateTimeH &&
          curTime.getMinutes() >= updateTimeM &&
          curTime.getSeconds() >= updateTimeS
        ) {
          // Jos data on haettu edellisenä päivänä tai fetchTime < 00:30.00, päivitetään tiedot.
          if (
            curTime.getDate() != this.props.historydata.fetchTime.getDate() ||
            (this.props.historydata.fetchTime.getHours() <= updateTimeH &&
              this.props.historydata.fetchTime.getMinutes() <= updateTimeM &&
              this.props.historydata.fetchTime.getSeconds() <= updateTimeS)
          ) {
            this.props.getHistoryData(this.props.symbol, curTime);
          }
        }
      }

      // Intraday haku
      if (this.props.intraday == undefined) {
        this.props.getIntra(this.props.symbol, curTime);
      } else {
        const curTime_ms = curTime.getTime();
        const intraTime_ms = this.props.intraday.fetchTime.getTime();
        // TODO: Aseta intradayn refresh-rate oikeaan. Nyt 2 h.
        if (curTime_ms - intraTime_ms > 1000 * 60 * 60 * 2) {
          this.props.getIntra(this.props.symbol, curTime);
        }
      }
    }
  }

  countRevenue() {
    if (
      this.props.historydata != undefined &&
      this.props.intraday != undefined
    ) {
      const revenue =
        this.props.historydata.close / this.props.intraday.close - 1;
      return revenue >= 0
        ? '+' + (revenue * 100).toFixed(2) + ' %'
        : (revenue * 100).toFixed(2) + ' %';
    }
    return '';
  }

  render() {
    const { historydata } = this.props;
    return (
      <View>
        <Card containerStyle={stockContainerStyles.basicInfo}>
          <Basicinfo revenue={this.countRevenue()} />
        </Card>

        <Card containerStyle={stockContainerStyles.diagram}>
          <Diagram />
        </Card>

        <Card containerStyle={stockContainerStyles.buttonContainer}>
          <Bid />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  symbol: state.stocksListing.symbol,
  metadata: state.singleStock.metadata,
  intraday: state.singleStock.intraday,
  historydata: state.singleStock.historydata,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMeta: getMetadata,
      getIntra: getIntraday,
      getHistoryData: getHistory,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockScreen);
