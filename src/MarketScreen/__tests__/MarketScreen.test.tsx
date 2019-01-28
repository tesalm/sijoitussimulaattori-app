import * as React from 'react';
import renderer from 'react-test-renderer';

import { MarketScreen, StockProps } from '../MarketScreen';

describe('stock-list tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};

  const defaultStockProps: StockProps = {
    stocks: [],
    loading: false,
    refreshing: false,
    error: undefined,
    getAllStocks: jest.fn(),
    saveAsCurrentSymbol: jest.fn(),
  };

  const loadingStockProps: StockProps = {
    stocks: [],
    loading: true,
    refreshing: false,
    error: undefined,
    getAllStocks: jest.fn(),
    saveAsCurrentSymbol: jest.fn(),
  };

  const refreshingStockProps: StockProps = {
    stocks: [],
    loading: false,
    refreshing: true,
    error: undefined,
    getAllStocks: jest.fn(),
    saveAsCurrentSymbol: jest.fn(),
  };

  const errorStockProps: StockProps = {
    stocks: [],
    loading: false,
    refreshing: false,
    error: { name: 'Network Error', message: 'Network connection failed' },
    getAllStocks: jest.fn(),
    saveAsCurrentSymbol: jest.fn(),
  };

  const stocksStockProps: StockProps = {
    stocks: [
      {
        symbol: 'APL',
        name: 'Apple',
        high: 10.28,
        low: 9.99,
        revenue: -0.035,
        close: 14.57,
        stockInfo: {
          metaLoading: false,
          intraLoading: false,
          historyLoading: false,
          refreshing: false,
        },
      },
      {
        symbol: 'APLL',
        name: 'Apple',
        high: 10.28,
        low: 9.99,
        revenue: -0.035,
        close: 14.57,
        stockInfo: {
          metaLoading: false,
          intraLoading: false,
          historyLoading: false,
          refreshing: false,
        },
      },
    ],
    loading: false,
    refreshing: false,
    error: undefined,
    getAllStocks: jest.fn(),
    saveAsCurrentSymbol: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(<MarketScreen {...defaultStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    const component = renderer
      .create(<MarketScreen {...loadingStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with refreshing', async () => {
    const component = renderer
      .create(<MarketScreen {...refreshingStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(<MarketScreen {...errorStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stocks', async () => {
    const component = renderer
      .create(<MarketScreen {...stocksStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
