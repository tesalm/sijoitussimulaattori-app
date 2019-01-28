import React from 'react';
import { Text } from 'react-native';
import { VictoryArea, VictoryAxis, VictoryChart } from 'victory-native';

import { t } from '../../assets/i18n';
import { DailyQuote } from '../../MarketScreen/reducer';
import { verticalScale } from '../../util/scale';
import { stockStyles } from '../styles';

interface GraphProps {
  historyData: Array<DailyQuote>;
}

const Graph = (props: GraphProps): JSX.Element => {
  const { historyData } = props;
  if (historyData.length < 2) {
    return <Text>{t('Graph.NoData')}</Text>;
  }
  const maxDate = new Date(historyData[0].date);
  const minDate = new Date(historyData[historyData.length - 1].date);
  const startDate = new Date(
    minDate.getFullYear(),
    minDate.getMonth(),
    minDate.getDate()
  ).getTime();
  const endDate = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    maxDate.getDate()
  ).getTime();
  const months = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ].map((key) => t('Graph.Month.' + key));

  function getDomain(data: Array<DailyQuote>) {
    let min = data[0].close;
    let max = data[0].close;
    for (let i = 1, len = data.length; i < len; i++) {
      const v = data[i].close;
      min = v < min ? v : min;
      max = v > max ? v : max;
    }
    return [min, max];
  }

  return (
    <VictoryChart
      height={verticalScale(180)}
      animate={false}
      padding={stockStyles.graphPadding}
      domainPadding={{ y: verticalScale(20) }}
      scale={{ x: 'time' }}
    >
      {/* x -axis */}
      <VictoryAxis
        invertAxis={true}
        fixLabelOverlap={true}
        tickFormat={(x: string) => {
          if (historyData[historyData.length - 1].date === x) {
            return null;
          }
          const date = new Date(x);
          if (endDate === startDate) {
            let mm = date.getMinutes().toString();
            if (mm.length === 1) {
              mm = '0' + mm;
            }
            return date.getUTCHours() + ':' + mm + '\t';
          }
          if (minDate.getFullYear() !== maxDate.getFullYear()) {
            const yy = date
              .getFullYear()
              .toString()
              .substr(-2);
            return date.getDate() + '. ' + months[date.getMonth()] + ' - ' + yy;
          }
          return date.getDate() + '. ' + months[date.getMonth()] + '\t';
        }}
        style={{
          tickLabels: {
            fontSize: 10,
            fill: '#455A64',
            padding: 2,
            textAnchor: 'end',
          },
          axis: { stroke: 'none' },
        }}
      />

      {/* y -axis */}
      <VictoryAxis
        dependentAxis
        orientation="right"
        tickFormat={(y: number) => {
          if (y >= 1000) {
            return Math.round(y);
          }
          return y;
        }}
        style={{
          tickLabels: {
            fontSize: 10,
            fill: '#455A64',
            padding: 2,
          },
          axis: { stroke: 'none' },
          grid: { stroke: 'gray', opacity: 0.1 },
        }}
      />

      <VictoryArea
        domain={{ y: getDomain(historyData) }}
        interpolation="linear"
        animate={false}
        style={{
          data: {
            fill: '#FF9900', // #00A8EF light blue
            stroke: '#FF8000',
            strokeWidth: 1,
            fillOpacity: 0.3,
          },
        }}
        data={historyData}
        x="date"
        y="close"
      />
    </VictoryChart>
  );
};

export default Graph;
