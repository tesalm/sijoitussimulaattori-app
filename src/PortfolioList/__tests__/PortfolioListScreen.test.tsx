import * as React from 'react';
import renderer from 'react-test-renderer';

import { PortfolioListProps, PortfolioListScreen } from '../PortfolioListScreen';

describe('portfolio-list tests', () => {
  //Mock for navigation.
  const navigationMock: any = {};

  const defaultPortfolioListingProps: PortfolioListProps = {
    portfolioListing: [],
    loading: false,

    error: undefined,
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const loadingPortfolioListingProps: PortfolioListProps = {
    portfolioListing: [],
    loading: true,

    error: undefined,
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const errorPortfolioListingProps: PortfolioListProps = {
    portfolioListing: [],
    loading: false,

    error: { name: 'Network Error', message: 'Network connection failed' },
    getAllPortfolios: jest.fn(),
    saveAsCurrentId: jest.fn(),
  };

  const portfolioPortfolioListingProps: PortfolioListProps = {
    portfolioListing: [
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
        <PortfolioListScreen
          {...defaultPortfolioListingProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    const component = renderer
      .create(
        <PortfolioListScreen
          {...loadingPortfolioListingProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = renderer
      .create(
        <PortfolioListScreen
          {...errorPortfolioListingProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with portfolio', async () => {
    const component = renderer
      .create(
        <PortfolioListScreen
          {...portfolioPortfolioListingProps}
          {...navigationMock}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
