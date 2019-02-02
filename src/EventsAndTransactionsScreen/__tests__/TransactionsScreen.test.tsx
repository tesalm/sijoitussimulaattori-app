import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { getTransactions } from '../../PortfolioList/actions';
import { TransactionsProps, TransactionsScreen } from '../TransactionsScreen';

import 'react-native';

describe('Transactions screen tests: ', () => {
  const navigationMock: any = {};
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultTransactionProps: TransactionsProps = {
    portfolio: {
      uid: 'Portfolio1',
      name: 'Portfolio1',
      balance: 500,
      totalRevenue: -0.02,
      totalMarketValue: 5000,
      lastDayRevenue: 0,
      ownerId: 'JohnDoe',
      portfolioInfo: {
        loading: false,
        error: undefined,
        refreshing: false,
        portfolio: undefined,
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
    portfolioId: 'Portfolio1',
    getTransactions: getTransactions,
  };

  const successTransactionProps: TransactionsProps = {
    portfolio: {
      uid: 'Portfolio1',
      name: 'Portfolio1',
      balance: 500,
      totalRevenue: -0.02,
      totalMarketValue: 5000,
      lastDayRevenue: 0,
      ownerId: 'JohnDoe',
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
          ownerId: 'JohnDoe',
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
        transactionListing: [
          {
            uid: '1',
            type: 'BUY',
            symbol: 'AMZN',
            amount: 20,
            price: 222.2,
            expiresAt: '2018-12-14T15:55:00.000Z',
            status: 'CANCELLED',
            fulfilledAt: '',
            cancelledAt: '2018-12-14T15:55:00.000Z',
          },
          {
            uid: '2',
            type: 'BUY',
            symbol: 'GOOGL',
            amount: 30,
            price: 333.3,
            expiresAt: '2018-12-14T15:55:00.000Z',
            status: 'FULFILLED',
            fulfilledAt: '2018-12-14T15:55:00.000Z',
            cancelledAt: '',
          },
        ],
        loading: false,
        error: undefined,
      },
    },
    portfolioId: 'Portfolio1',
    getTransactions: getTransactions,
  };

  const errorTransactionProps: TransactionsProps = {
    portfolio: {
      uid: 'Portfolio1',
      name: 'Portfolio1',
      balance: 500,
      totalRevenue: -0.02,
      totalMarketValue: 5000,
      lastDayRevenue: 0,
      ownerId: 'JohnDoe',
      portfolioInfo: {
        loading: false,
        error: undefined,
        refreshing: false,
        portfolio: undefined,
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
        error: {
          name: 'Network Error',
          message: 'Network connection failed',
        },
      },
    },
    portfolioId: 'Portfolio1',
    getTransactions: jest.fn(),
  };

  it('renders correctly', async () => {
    const component = shallow(
      <TransactionsScreen {...defaultTransactionProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = shallow(
      <TransactionsScreen {...errorTransactionProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with data', async () => {
    const component = shallow(
      <TransactionsScreen {...successTransactionProps} {...navigationMock} />,
      { context: { store: mockStore() } }
    );
    expect(component).toMatchSnapshot();
  });
});
