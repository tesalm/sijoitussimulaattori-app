import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { StockScreen, StockProps } from '../StockScreen';
import {
  getStockMetadata,
  getIntraday,
  refreshIntraday,
} from '../../MarketScreen/actions';

describe('stock tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultStockProps: StockProps = {
    stocks: [],
    getMeta: getStockMetadata,
    getIntra: getIntraday,
    refreshIntra: refreshIntraday,
    getHistoryData: jest.fn(),
    refreshing: false,
    symbol: undefined,
    stock: undefined,
  };

  const successStockProps: StockProps = {
    stocks: [
      {
        symbol: 'APL',
        name: 'Apple',
        high: 10.28,
        low: 9.99,
        revenue: -0.035,
        close: 14.57,
        currency: 'USD',
        stockInfo: {
          metaLoading: false,
          intraLoading: false,
          historyLoading: false,
          refreshing: false,
        },
      },
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        high: 170.43,
        low: 165.43,
        revenue: 3894.34,
        close: 168.63,
        currency: 'USD',
        stockInfo: {
          stockMetadata: {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            type: 'string',
            region: 'string',
            marketOpen: '2018-12-12 11:20:00',
            marketClose: '2018-12-12 11:20:00',
            timeZone: 'US/Eastern',
            currency: 'USD',
            fetchTime: new Date('2018-12-17T01:24:00.000Z'),
          },
          intraday: {
            symbol: 'AAPL',
            date: '2018-12-12',
            open: 170.4,
            high: 170.43,
            low: 165.43,
            close: 168.63,
            volume: 12279994,
            fetchTime: new Date('2018-12-17T01:24:00.000Z'),
          },
          historyData: {
            historyDataArray: [
              {
                symbol: 'AAPL',
                date: '2018-12-12',
                open: 170.4,
                high: 170.43,
                low: 165.43,
                close: 162.63,
                volume: 12279994,
              },
              {
                symbol: 'AAPL',
                date: '2017-12-12',
                open: 170.4,
                high: 170.43,
                low: 161.43,
                close: 168.63,
                volume: 12279994,
              },
            ],
            fetchTime: new Date('2018-12-17T01:24:00.000Z'),
          },
          metaLoading: false,
          intraLoading: false,
          historyLoading: false,
          refreshing: false,
          metaError: undefined,
          intraError: undefined,
          historyError: undefined,
        },
      },
    ],
    stock: {
      symbol: 'AAPL',
      name: 'Apple',
      high: 375.53,
      low: 354.38,
      revenue: 3894.34,
      close: 293.42,
      currency: 'USD',
      stockInfo: {
        stockMetadata: {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          type: 'string',
          region: 'string',
          marketOpen: '2018-12-12 11:20:00',
          marketClose: '2018-12-12 11:20:00',
          timeZone: 'US/Eastern',
          currency: 'USD',
          fetchTime: new Date('2018-12-17T01:24:00.000Z'),
        },
        intraday: {
          symbol: 'AAPL',
          date: '2018-12-12',
          open: 170.4,
          high: 170.43,
          low: 165.43,
          close: 168.63,
          volume: 12279994,
          fetchTime: new Date('2018-12-17T01:24:00.000Z'),
        },
        historyData: {
          historyDataArray: [
            {
              symbol: 'AAPL',
              date: '2018-12-12',
              open: 170.4,
              high: 170.43,
              low: 165.43,
              close: 162.63,
              volume: 12279994,
            },
            {
              symbol: 'AAPL',
              date: '2017-12-12',
              open: 170.4,
              high: 170.43,
              low: 161.43,
              close: 168.63,
              volume: 12279994,
            },
          ],
          fetchTime: new Date('2018-12-17T01:24:00.000Z'),
        },
        metaLoading: false,
        intraLoading: false,
        historyLoading: false,
        refreshing: false,
        metaError: undefined,
        intraError: undefined,
        historyError: undefined,
      },
    },
    getMeta: jest.fn(),
    getIntra: jest.fn(),
    refreshIntra: jest.fn(),
    getHistoryData: jest.fn(),
    refreshing: false,
    symbol: 'AAPL',
  };

  it('Stockscreen renders correctly', async () => {
    const wrapper = shallow(
      <StockScreen {...defaultStockProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Stockscreen renders correctly with stock', async () => {
    const wrapper = shallow(
      <StockScreen {...successStockProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
