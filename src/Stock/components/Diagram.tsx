import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { t } from '../../assets/i18n';
import { stockStyles } from '../styles';
import { Historydata } from '../../MarketScreen/reducers';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/reducers';

interface DiagramProps {
  historydata?: Historydata;
  historyLoading?: boolean;
  historyError?: Error;
}

export class Diagram extends React.Component<DiagramProps> {
  constructor(props: DiagramProps) {
    super(props);
  }

  render() {
    const { historyLoading, historyError } = this.props;

    if (historyLoading) {
      return (
        <View style={stockStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      if (historyError) {
        // TODO: Muokkaa error-teksti käyttäjälle.
        return <Text>Error! {historyError.message}</Text>;
      }
    }

    return (
      <View>
        <Text style={stockStyles.titleStyle}>
          {t('StockPage.RevenueOverYear')}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diagram);
