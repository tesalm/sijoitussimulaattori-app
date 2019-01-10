import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { t } from '../../assets/i18n';
import { HistoryDataQuote } from '../../MarketScreen/reducer';
import { stockStyles } from '../styles';
import { textStyles } from '../../App/styles';

interface DiagramProps {
  historyData: HistoryDataQuote[];
  historyLoading?: boolean;
  historyError?: Error;
}

const Diagram = (props: DiagramProps): JSX.Element => {
  if (props.historyLoading) {
    return (
      <View style={stockStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (props.historyError) {
      // TODO: Muokkaa error-teksti käyttäjälle.
      return <Text>Error! {props.historyError.message}</Text>;
    }
  }

  return (
    <View>
      <Text style={textStyles.title}>
        {t('StockPage.RevenueOverYear')}
      </Text>
    </View>
  );
};
export default Diagram;
