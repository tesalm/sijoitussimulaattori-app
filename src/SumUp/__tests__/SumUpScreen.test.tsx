import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { SumUpProps, SumUpScreen } from '../SumUpScreen';

describe('sumUp tests', () => {
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultSumUpProps: SumUpProps = {
    stock: undefined,
    saveBid: jest.fn(),
    bidInfo: {
      action: '',
      bidLevel: 0,
      sumOfStocks: 0,
      selectedPortfolio: '',
      symbol: '',
    },
    portfolio: undefined,
  };

  const sumUpProps: SumUpProps = {
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
    saveBid: jest.fn(),
    bidInfo: {
      action: 'buy',
      bidLevel: 56,
      sumOfStocks: 3,
      selectedPortfolio: 'P1',
      symbol: 'AAPL',
    },
    portfolio: {
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
  };

  it('SumUpScreen renders correctly', async () => {
    const component = renderer
      .create(<SumUpScreen {...defaultSumUpProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('SumUpScreen renders correctly with real data', async () => {
    const component = renderer
      .create(<SumUpScreen {...sumUpProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
