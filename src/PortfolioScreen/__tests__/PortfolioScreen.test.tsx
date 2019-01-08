import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { getIntraday, getStockMetadata, getStocks, refreshIntraday } from '../../MarketScreen/actions';
import { getPortfolioData } from '../actions';
import { PortfolioProps, PortfolioScreen } from '../PortfolioScreen';

describe('portfolio tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultStockProps: PortfolioProps = {
    portfolio: undefined,
    getPortfolio: getPortfolioData,
    name: undefined,
    loading: false,
    error: undefined,
    refreshing: false,
    stocks: [],
    getAllStocks: getStocks,
    getMeta: getStockMetadata,
    getHistoryData: jest.fn(),
    getIntra: getIntraday,
    refreshIntra: refreshIntraday,
  };

  const successStockProps: PortfolioProps = {
    portfolio: {
      name: 'Portfolio1',
      ownerId: 'klsdjfs',
      balance: 500,
      revenue: -2.4,
      totalMarketValue: 5000,
      stocks: [
        {
          symbol: 'AAPL',
          name: 'Apple',
          amount: 340,
          avgPrice: 132,
        },
      ],
    },
    stocks: [
      {
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
            intradayQuote: [
              {
                symbol: 'AAPL',
                date: '2018-12-12T00:20:00.000Z',
                open: 170.4,
                high: 170.43,
                low: 165.43,
                close: 168.63,
                volume: 12279994,
              },
              {
                symbol: 'AAPL',
                date: '2018-12-12T00:10:00.000Z',
                open: 170.4,
                high: 170.43,
                low: 165.43,
                close: 168.63,
                volume: 12279994,
              },
            ],
            fetchTime: new Date('2018-12-17T01:24:00.000Z'),
          },
          historyData: {
            historyDataQuote: [
              {
                symbol: 'AAPL',
                date: '2018-12-15T00:00:00.000Z',
                open: 170.4,
                high: 170.43,
                low: 165.43,
                close: 162.63,
                volume: 12279994,
              },
              {
                symbol: 'AAPL',
                date: '2018-12-14T00:00:00.000Z',
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
    getMeta: jest.fn(),
    getIntra: jest.fn(),
    refreshIntra: jest.fn(),
    getHistoryData: jest.fn(),
    refreshing: false,
    name: 'Portfolio1',
    getAllStocks: jest.fn(),
    getPortfolio: jest.fn(),
    loading: false,
  };

  it('Portfolioscreen renders correctly', async () => {
    const wrapper = shallow(
      <PortfolioScreen {...defaultStockProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('PortfolioScreen renders correctly with portfolio and stocks', async () => {
    const wrapper = shallow(
      <PortfolioScreen {...successStockProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
