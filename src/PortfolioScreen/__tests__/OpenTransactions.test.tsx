import { shallow } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import { cancelTransaction } from '../../PortfolioList/actions';
import * as actions from '../../PortfolioList/actions';
import { PortfolioListing, portfolioListingReducer } from '../../PortfolioList/reducer';
import { OpenTransactions, TransactionProps } from '../components/OpenTransactions';

import 'react-native';

describe('Portfolio pending transactions tests: ', () => {
  const middlewares: any = [];
  const mockStore = configureStore(middlewares);

  const defaultTransactionProps: TransactionProps = {
    transactions: [],
    loading: false,
    error: undefined,
    portfolioId: 'Portfolio1',
    getTransactions: jest.fn(),
    cancelOpenTransaction: jest.fn(),
  };

  const successTransactionProps: TransactionProps = {
    transactions: [
      {
        uid: '1',
        type: 'SELL',
        symbol: 'AMZN',
        amount: 20,
        price: 222.2,
        expiresAt: '2018-12-14T15:55:00.000Z',
        status: 'MARKET',
        fulfilledAt: '',
        cancelledAt: '',
      },
    ],
    loading: false,
    error: undefined,
    portfolioId: 'Portfolio1',
    getTransactions: jest.fn(),
    cancelOpenTransaction: cancelTransaction,
  };

  const errorTransactionProps: TransactionProps = {
    transactions: [],
    loading: false,
    error: {
      name: 'Network Error',
      message: 'Network connection failed',
    },
    portfolioId: 'Portfolio1',
    getTransactions: jest.fn(),
    cancelOpenTransaction: jest.fn(),
  };

  const initialState: PortfolioListing = {
    portfolioListing: [
      {
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
          transactionListing: successTransactionProps.transactions,
          loading: false,
          error: undefined,
        },
      },
    ],
    loading: false,
    error: undefined,
    creatingPortfolio: {
      creatingPortfolioLoading: false,
      creatingPortfolioError: undefined,
      creatingPortfolioSuccess: false,
    },
  };

  it('renders correctly', async () => {
    const component = shallow(
      <OpenTransactions {...defaultTransactionProps} />,
      { context: { store: mockStore() } }
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const component = shallow(<OpenTransactions {...errorTransactionProps} />, {
      context: { store: mockStore() },
    });
    expect(component.find('Collapsible')).toMatchSnapshot();
  });

  it('renders correctly with data', async () => {
    const component = shallow(
      <OpenTransactions {...successTransactionProps} />,
      { context: { store: mockStore() } }
    );
    expect(component.find('Collapsible')).toMatchSnapshot();
  });

  it('actions', async () => {
    expect(
      new actions.RequestTransactionsBegin('Portfolio1')
    ).toMatchSnapshot();
    expect(
      new actions.RequestTransactionsSuccess(
        successTransactionProps.transactions,
        'Portfolio1'
      )
    ).toMatchSnapshot();
    expect(
      new actions.RequestCancelTransactionSuccess('Portfolio1', '1')
    ).toMatchSnapshot();

    const err: any = errorTransactionProps.error;
    expect(
      new actions.RequestTransactionsFailure(err, 'Portfolio1')
    ).toMatchSnapshot();
  });

  it('reducers', async () => {
    let action: any;
    action = {
      type: actions.ActionType.RequestTransactionsBegin,
      portfolioId: 'Portfolio1',
    };
    expect(portfolioListingReducer(initialState, action)).toMatchSnapshot();
    action = {
      type: actions.ActionType.RequestTransactionsSuccess,
      transactions: successTransactionProps.transactions,
      portfolioId: 'Portfolio1',
    };
    expect(portfolioListingReducer(initialState, action)).toMatchSnapshot();
    action = {
      type: actions.ActionType.RequestTransactionsFailure,
      error: errorTransactionProps.error,
      portfolioId: 'Portfolio1',
    };
    expect(portfolioListingReducer(initialState, action)).toMatchSnapshot();
    action = {
      type: actions.ActionType.RequestCancelTransactionSuccess,
      transactionId: '1',
      portfolioId: 'Portfolio1',
    };
    expect(portfolioListingReducer(initialState, action)).toMatchSnapshot();
  });
});
