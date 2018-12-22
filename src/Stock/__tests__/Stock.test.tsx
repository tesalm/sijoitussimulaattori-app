import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { StockScreen, StockProps } from '../StockScreen';
import {
  getMetadata,
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
    getMeta: getMetadata,
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
        name: 'Apple',
        high: 375.53,
        low: 354.38,
        revenue: 3894.34,
        close: 293.42,
        currency: 'USD',
        stockInfo: {
          metadata: {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            type: 'string',
            region: 'string',
            marketOpen: '2018-12-12 11:20:00',
            marketClose: '2018-12-12 11:20:00',
            timeZone: 'US/Eastern',
            currency: 'USD',
            fetchTime: new Date('December 17, 2018 03:24:00'),
          },
          intraday: {
            symbol: 'AAPL',
            date: '2018-12-12',
            open: 170.4,
            high: 170.43,
            low: 165.43,
            close: 168.63,
            volume: 12279994,
            fetchTime: new Date('December 17, 2018 03:24:00'),
          },
          historydata: {
            symbol: 'AAPL',
            date: '2018-12-12',
            open: 170.4,
            high: 170.43,
            low: 165.43,
            close: 168.63,
            volume: 12279994,
            fetchTime: new Date('December 17, 2018 03:24:00'),
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
        metadata: {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          type: 'string',
          region: 'string',
          marketOpen: '2018-12-12 11:20:00',
          marketClose: '2018-12-12 11:20:00',
          timeZone: 'US/Eastern',
          currency: 'USD',
          fetchTime: new Date(),
        },
        intraday: {
          symbol: 'AAPL',
          date: '2018-12-12',
          open: 170.4,
          high: 170.43,
          low: 165.43,
          close: 168.63,
          volume: 12279994,
          fetchTime: new Date(),
        },
        historydata: {
          symbol: 'AAPL',
          date: '2018-12-12',
          open: 170.4,
          high: 170.43,
          low: 165.43,
          close: 168.63,
          volume: 12279994,
          fetchTime: new Date(),
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
