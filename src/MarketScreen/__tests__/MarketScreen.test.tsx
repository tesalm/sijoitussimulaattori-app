import * as React from 'react';
import renderer from 'react-test-renderer';

import { MarketScreen, StockProps } from '../MarketScreen';

describe('stock-list tests', () => {
  //Mock for navigation.
  const navigationMock: any = {};

  const defaultStockProps: StockProps = {
    stocks: [],
    loading: false,
    error: undefined,
    getAllStocks: jest.fn(),
  };

  const loadingStockProps: StockProps = {
    stocks: [],
    loading: true,
    error: undefined,
    getAllStocks: jest.fn(),
  };

  const errorStockProps: StockProps = {
    stocks: [],
    loading: false,
    error: { name: 'Network Error', message: 'Network connection failed' },
    getAllStocks: jest.fn(),
  };

  const stocksStockProps: StockProps = {
    stocks: [
      {
        symbol: 'APL',
        name: 'Apple',
        buy: 10.26,
        sell: 10.26,
        high: 10.28,
        low: 9.99,
        marketValue: 10.26,
        revenue: -0.035,
        close: 14.57,
      },
      {
        symbol: 'APLL',
        name: 'Apple',
        buy: 10.26,
        sell: 10.26,
        high: 10.28,
        low: 9.99,
        marketValue: 10.26,
        revenue: -0.035,
        close: 14.57,
      },
    ],
    loading: false,
    error: undefined,
    getAllStocks: jest.fn(),
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
