import * as React from 'react';
import renderer from 'react-test-renderer';

import { PortfolioListProps, PortfolioListScreen } from '../PortfolioListScreen';

describe('portfolio-list tests', () => {
  //Mock for navigation.
  const navigationMock: any = {};

  const defaultStockProps: PortfolioListProps = {
    portfolios: [],
    loading: false,

    error: undefined,
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const loadingStockProps: PortfolioListProps = {
    portfolios: [],
    loading: true,

    error: undefined,
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const errorStockProps: PortfolioListProps = {
    portfolios: [],
    loading: false,

    error: { name: 'Network Error', message: 'Network connection failed' },
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const stocksStockProps: PortfolioListProps = {
    portfolios: [
      {
        uid: 'Portfolio1',
        name: 'Portfolio1',
        balance: 500,
        ownerId: 'Jooni',
        totalRevenue: 0.25,
        totalMarketValue: 0.53,
        lastDayRevenue: 0.23,
        portfolioInfo: {
          loading: false,
          error: undefined,
          refreshing: false,
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
        },
      },
    ],

    loading: false,
    error: undefined,
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = renderer
      .create(
        <PortfolioListScreen {...defaultStockProps} {...navigationMock} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    const component = renderer
      .create(
        <PortfolioListScreen {...loadingStockProps} {...navigationMock} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(<PortfolioListScreen {...errorStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with portfolio', async () => {
    const component = renderer
      .create(<PortfolioListScreen {...stocksStockProps} {...navigationMock} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
