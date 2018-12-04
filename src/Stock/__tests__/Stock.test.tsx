import * as React from 'react';
import renderer from 'react-test-renderer';

import { StockScreen, StockProps } from '../StockScreen';

describe('stock tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};

  const defaultStockProps: StockProps = {
    symbol: '',
    stockInfo: {
      symbol: '',
      name: '',
      buy: 0,
      sell: 0,
      high: 0,
      low: 0,
      marketValue: 0,
      revenue: 0,
      close: 0,
    },
    error: undefined,
  };

  const errorStockProps: StockProps = {
    symbol: '',
    stockInfo: {
      symbol: '',
      name: '',
      buy: 0,
      sell: 0,
      high: 0,
      low: 0,
      marketValue: 0,
      revenue: 0,
      close: 0,
    },
    error: { name: 'Error', message: 'Stockdata could not be fetched' },
  };

  const stockStockProps: StockProps = {
    symbol: 'APL',
    stockInfo: {
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
    error: undefined,
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(<StockScreen {...defaultStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(<StockScreen {...errorStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stock', async () => {
    const component = renderer
      .create(<StockScreen {...stockStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
