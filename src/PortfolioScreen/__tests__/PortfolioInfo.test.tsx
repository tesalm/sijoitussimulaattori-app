import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { PortfolioInfo, PortfolioInfoProps } from '../components/PortfolioInfo';

describe('portfolioInfo tests', () => {
  // Mock for navigation.
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultPortfolioProps: PortfolioInfoProps = {
    portfolio: undefined,
    loading: undefined,
    error: undefined,
    stocks: undefined,
  };

  const successPortfolioProps: PortfolioInfoProps = {
    portfolio: {
      uid: 'Portfolio1',
      name: 'Portfolio1',
      balance: 500,
      totalRevenue: -0.02,
      totalMarketValue: 5000,
      lastDayRevenue: 0,
      ownerId: 'Joooni',
      stocks: [
        {
          uid: 'AMZN',
          amount: 245,
          avgPrice: 153.3,
          totalRevenue: 0.54,
          totalMarketValue: 2084,
          lastDayRevenue: 0.52,
        },
        {
          uid: 'AAPL',
          amount: 340,
          avgPrice: 132,
          totalRevenue: 0.54,
          totalMarketValue: 2084,
          lastDayRevenue: 0.52,
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
    error: undefined,
    loading: false,
  };

  it('PortfolioInfo renders correctly', async () => {
    const wrapper = shallow(
      <PortfolioInfo {...defaultPortfolioProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('PortfolioInfo renders correctly with portfolio and stocks', async () => {
    const wrapper = shallow(
      <PortfolioInfo {...successPortfolioProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
