import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { BidProps, BidScreen } from '../BidScreen';

describe('bid tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultBidProps: BidProps = {
    stock: undefined,
    saveForm: jest.fn(),
    portfolioList: [],
    getDataForPortfolio: jest.fn(),
    getPortfolioList: jest.fn(),
    currentStockSymbol: '',
  };

  const bidProps: BidProps = {
    stock: {
      symbol: 'AAPL',
      name: 'Apple',
      high: 375.53,
      low: 354.38,
      revenue: 3894.34,
      close: 293.42,
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
    saveForm: jest.fn(),
    portfolioList: [
      {
        uid: 'Portfolio1',
        name: 'P1',
        balance: 8372,
        ownerId: 'Heidi',
        totalRevenue: 9384,
        totalMarketValue: 484394,
        lastDayRevenue: 483,
        portfolioInfo: {
          loading: false,
          refreshing: false,
          error: undefined,
          portfolio: {
            uid: 'Portfolio1',
            name: 'P1',
            balance: 8372,
            totalRevenue: 9384,
            totalMarketValue: 484394,
            lastDayRevenue: 483,
            ownerId: 'Heidi',
            stocks: [],
          },
        },
        transactionInfo: {
          transactions: undefined,
          transactionsLoading: false,
          transactionsError: undefined,
          transactionSuccess: false,
        },
        transactions: {
          transactionListing: [],
          loading: false,
          error: undefined,
        },
      },
      {
        uid: 'Portfolio2',
        name: 'P2',
        balance: 9372,
        ownerId: 'Seidi',
        totalRevenue: 19384,
        totalMarketValue: 44394,
        lastDayRevenue: 4835,
        portfolioInfo: {
          loading: false,
          refreshing: false,
          error: undefined,
          portfolio: {
            uid: 'Portfolio2',
            name: 'P2',
            balance: 9372,
            totalRevenue: 19384,
            totalMarketValue: 44394,
            lastDayRevenue: 4835,
            ownerId: 'Seidi',
            stocks: [],
          },
        },
        transactionInfo: {
          transactions: undefined,
          transactionsLoading: false,
          transactionsError: undefined,
          transactionSuccess: false,
        },
        transactions: {
          transactionListing: [],
          loading: false,
          error: undefined,
        },
      },
    ],
    getDataForPortfolio: jest.fn(),
    getPortfolioList: jest.fn(),
    currentStockSymbol: 'AAPL',
  };

  it('BidScreen renders correctly', async () => {
    const component = renderer
      .create(<BidScreen {...defaultBidProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('BidScreen renders correctly with real data', async () => {
    const component = renderer
      .create(<BidScreen {...bidProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
