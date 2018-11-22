import * as React from 'react';
import renderer from 'react-test-renderer';

import { MarketScreen, StockProps } from '../MarketScreen';

describe('Hello World', () => {
  //Mock for navigation props. This was only solution I found, other would be to set defaultStockProps type to any
  const navigationMock = {
    state: { key: 'Hei', index: 1, routeName: 'Hei' },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
  };

  const defaultStockProps: StockProps = {
    stocks: [],
    loading: false,
    error: undefined,
    getAllStocks: jest.fn(),
    navigation: navigationMock,
  };

  const loadingStockProps: StockProps = {
    stocks: [],
    loading: true,
    error: undefined,
    getAllStocks: jest.fn(),
    navigation: navigationMock,
  };

  const errorStockProps: StockProps = {
    stocks: [],
    loading: false,
    error: { name: 'Network Error', message: 'Network connection failed' },
    getAllStocks: jest.fn(),
    navigation: navigationMock,
  };

  const stocksStockProps: StockProps = {
    stocks: [
      {
        key: 'APL',
        name: 'Apple',
        revenue: 0.035,
        lastsale: 13.44,
      },
      {
        key: 'APL',
        name: 'Apple',
        revenue: -0.035,
        lastsale: 13.44,
      },
    ],
    loading: false,
    error: undefined,
    getAllStocks: jest.fn(),
    navigation: navigationMock,
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(<MarketScreen {...defaultStockProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    const component = renderer
      .create(<MarketScreen {...loadingStockProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(<MarketScreen {...errorStockProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with stocks', async () => {
    const component = renderer
      .create(<MarketScreen {...stocksStockProps} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
