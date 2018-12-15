import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { StockScreen, StockProps } from '../StockScreen';
import { getMetadata, getIntraday } from '../actions';

describe('stock tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultStockProps: StockProps = {
    metadata: undefined,
    intraday: undefined,
    historydata: undefined,
    getMeta: getMetadata,
    getIntra: getIntraday,
    getHistoryData: jest.fn(),
    symbol: '',
  };

  const errorStockProps: StockProps = {
    metadata: undefined,
    intraday: undefined,
    historydata: undefined,
    getMeta: jest.fn(),
    getIntra: jest.fn(),
    getHistoryData: jest.fn(),
    symbol: '',
  };

  const successStockProps: StockProps = {
    symbol: 'AAPL',
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
    getMeta: jest.fn(),
    getIntra: jest.fn(),
    getHistoryData: jest.fn(),
  };

  it('Stockscreen renders correctly', async () => {
    const wrapper = shallow(
      <StockScreen {...defaultStockProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Stockscreen renders correctly with error', async () => {
    const wrapper = shallow(
      <StockScreen {...errorStockProps} {...navigationMock} />,
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
