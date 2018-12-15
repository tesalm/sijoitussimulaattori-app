import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';

import { Intraday, Metadata } from '../reducers';
import { RootState } from '../../redux/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface BasicinfoProps {
  metadata?: Metadata;
  intraday?: Intraday;
  metaLoading?: boolean;
  metaError?: Error;
  intraLoading?: boolean;
  intraError?: Error;
  revenue: string;
}

export class Basicinfo extends React.Component<BasicinfoProps> {
  constructor(props: BasicinfoProps) {
    super(props);
  }

  revenueColor = (revenue: number): typeof stockStyles.revenueValueGreen => {
    return revenue >= 0
      ? stockStyles.revenueValueGreen
      : stockStyles.revenueValueRed;
  };

  formatValue = (value: number, currency: string): string => {
    if (currency == 'USD') {
      return value + ' $';
    } else if (currency == 'EUR') {
      return value + ' €';
    }
    return value + ' $';
  };

  render() {
    const {
      metadata,
      intraday,
      metaLoading,
      metaError,
      intraLoading,
      intraError,
      revenue,
    } = this.props;

    if (metaLoading || intraLoading) {
      return (
        <View style={stockStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (intraday === undefined || metadata === undefined) {
        let errorMessage;
        if (metaError) {
          errorMessage = metaError.message + ' ';
        }
        if (intraError) {
          errorMessage = errorMessage + intraError.message;
        }
        // TODO: Muokkaa error-teksti käyttäjälle.
        return <Text>Error! {errorMessage} </Text>;
      }
    }

    return (
      <View>
        <View style={stockStyles.basicinfo}>
          <Text style={stockStyles.titleStyle}>
            {metadata.name} ({metadata.symbol})
          </Text>
        </View>
        <View style={stockStyles.basicinfo}>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Low')}</Text>
            <Text style={stockStyles.value}>
              {this.formatValue(intraday.low, metadata.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.High')}</Text>
            <Text style={stockStyles.value}>
              {this.formatValue(intraday.high, metadata.currency)}
            </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp}>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Open')}</Text>
            <Text style={stockStyles.value}>
              {this.formatValue(intraday.open, metadata.currency)}
            </Text>
            <Text style={stockStyles.valueHeader}>{t('StockPage.Close')}</Text>
            <Text style={stockStyles.value}>
              {this.formatValue(intraday.close, metadata.currency)}
            </Text>
          </View>
          <View style={stockStyles.basicinfoSmallerComp} />
          <View style={stockStyles.basicinfoMidComp}>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('StockPage.Volume')}
            </Text>
            <Text style={stockStyles.valueRightSide}>{intraday.volume}</Text>
            <Text style={stockStyles.valueHeaderRightSide}>
              {t('StockPage.RevenueText')}
            </Text>
            <Text style={this.revenueColor(intraday.open)}>{revenue}</Text>
          </View>
        </View>
        <View style={stockStyles.basicinfo}>
          <View>
            <Text style={stockStyles.valueHeader}>
              {t('StockPage.Updated')}: {intraday.fetchTime.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  metadata: state.singleStock.metadata,
  intraday: state.singleStock.intraday,
  metaLoading: state.singleStock.metaLoading,
  metaError: state.singleStock.metaError,
  intraLoading: state.singleStock.intraLoading,
  intraError: state.singleStock.intraError,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basicinfo);
