import cloneDeep from 'lodash/cloneDeep';

import { ActionType, PortfolioAction } from './actions';

export interface Transaction {
  uid: string;
  type: string;
  symbol: string;
  amount: number;
  price: number;
  expiresAt: string;
  status: string;
  fulfilledAt: string;
  cancelledAt: string;
}

export interface TransactionInfo {
  transactions?: Transaction[];
  transactionsLoading: boolean;
  transactionsError?: Error;
  transactionSuccess: boolean;
}

export interface CreatePortfolio {
  uid: string;
  name: string;
  balance: number;
  ownerId: string;
}

export interface PortfolioStock {
  uid: string;
  amount: number;
  avgPrice: number;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
}
export interface SinglePortfolio {
  uid: string;
  name: string;
  balance: number;
  ownerId: string;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
  portfolioInfo: PortfolioInfo;
  transactionInfo: TransactionInfo;
  transactions: TransactionListing;
}

export interface PortfolioInfo {
  loading: boolean;
  refreshing: boolean;
  error?: Error;
  portfolio?: Portfolio;
}

export interface Portfolio {
  uid: string;
  name: string;
  balance: number;
  totalRevenue: number;
  totalMarketValue: number;
  lastDayRevenue: number;
  ownerId: string;
  stocks: PortfolioStock[];
}

export interface CreatingPortfolio {
  creatingPortfolioLoading: boolean;
  creatingPortfolioError?: Error;
  creatingPortfolioSuccess: boolean;
}

export interface PortfolioListing {
  portfolioListing: Array<SinglePortfolio>;
  loading: boolean;
  error?: Error;
  portfolioId?: string;
  creatingPortfolio: CreatingPortfolio;
}

export interface TransactionListing {
  transactionListing: Array<Transaction>;
  loading: boolean;
  error?: Error;
}

export const initialState: PortfolioListing = {
  portfolioListing: [],
  loading: false,
  error: undefined,
  creatingPortfolio: {
    creatingPortfolioLoading: false,
    creatingPortfolioError: undefined,
    creatingPortfolioSuccess: false,
  },
};

export const portfolioListingReducer = (
  state: PortfolioListing = initialState,
  action: PortfolioAction
): PortfolioListing => {
  switch (action.type) {
    case ActionType.RequestPortfolioListingBegin:
      return { ...cloneDeep(state), loading: true, error: undefined };
    case ActionType.RequestPortfoliosListingSuccess:
      return {
        ...cloneDeep(state),
        portfolioListing: action.portfolios,
        loading: false,
        error: undefined,
      };
    case ActionType.RequestPortfoliosListingFailure:
      return { ...cloneDeep(state), loading: false, error: action.error };
    case ActionType.SaveCurrentPortfolioId:
      return { ...cloneDeep(state), portfolioId: action.id };
    case ActionType.RequestPortfolioBegin: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo.loading = true;
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestPortfolioSuccess: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo = {
        ...portfolioList[portfolioIndex].portfolioInfo,
        portfolio: action.portfolio,
        loading: false,
        error: undefined,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestPortfolioFailure: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].portfolioInfo = {
        ...portfolioList[portfolioIndex].portfolioInfo,
        portfolio: undefined,
        loading: false,
        error: action.error,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.SaveTransactionBegin: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].transactionInfo = {
        ...portfolioList[portfolioIndex].transactionInfo,
        transactionsLoading: true,
        transactionsError: undefined,
        transactionSuccess: false,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.SaveTransactionSuccess: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      const transactionList = cloneDeep(
        portfolioList[portfolioIndex].transactionInfo.transactions
      );
      if (!transactionList) {
        portfolioList[portfolioIndex].transactionInfo = {
          ...portfolioList[portfolioIndex].transactionInfo,
          transactionsLoading: false,
          transactionsError: undefined,
          transactionSuccess: true,
          transactions: [action.transaction],
        };
      } else {
        transactionList.push(action.transaction);
        portfolioList[portfolioIndex].transactionInfo = {
          ...portfolioList[portfolioIndex].transactionInfo,
          transactionsLoading: false,
          transactionsError: undefined,
          transactionSuccess: true,
          transactions: transactionList,
        };
      }
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.SaveTransactionFailure: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].transactionInfo = {
        ...portfolioList[portfolioIndex].transactionInfo,
        transactionsLoading: false,
        transactionsError: action.error,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.CreatePortfolioBegin: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = true;
      creation.creatingPortfolioError = undefined;
      creation.creatingPortfolioSuccess = false;
      return { ...state, creatingPortfolio: creation };
    }
    case ActionType.CreatePortfolioSuccess: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = false;
      creation.creatingPortfolioError = undefined;
      creation.creatingPortfolioSuccess = true;
      const newPortfolio = {
        uid: action.uid,
        name: action.name,
        ownerId: action.ownerId,
        balance: action.amount,
        totalRevenue: 0,
        totalMarketValue: 0,
        lastDayRevenue: 0,
        portfolioInfo: {
          loading: false,
          refreshing: false,
          error: undefined,
          portfolio: undefined,
        },
        transactionInfo: {
          transactionsLoading: false,
          transactionsError: undefined,
          transactionSuccess: false,
          transactions: undefined,
        },
        transactions: {
          transactionListing: [],
          loading: false,
          error: undefined,
        },
      };
      const portfolioList = cloneDeep(state.portfolioListing);
      portfolioList.push(newPortfolio);
      return {
        ...cloneDeep(state),
        creatingPortfolio: creation,
        portfolioListing: portfolioList,
      };
    }
    case ActionType.CreatePortfolioFailure: {
      const creation = cloneDeep(state.creatingPortfolio);
      creation.creatingPortfolioLoading = false;
      creation.creatingPortfolioError = action.error;
      creation.creatingPortfolioSuccess = false;
      return { ...state, creatingPortfolio: creation };
    }
    case ActionType.RequestTransactionsBegin: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].transactions.loading = true;
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestTransactionsSuccess: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].transactions = {
        ...portfolioList[portfolioIndex].transactions,
        transactionListing: action.transactions,
        loading: false,
        error: undefined,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestTransactionsFailure: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      portfolioList[portfolioIndex].transactions = {
        ...portfolioList[portfolioIndex].transactions,
        loading: false,
        error: action.error,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    case ActionType.RequestCancelTransactionSuccess: {
      const portfolioList = cloneDeep(state.portfolioListing);
      const portfolioIndex = getPortfolioIndex(
        portfolioList,
        action.portfolioId
      );
      if (portfolioIndex < 0) {
        return { ...cloneDeep(state) };
      }
      const transactions = portfolioList[portfolioIndex].transactions;
      portfolioList[portfolioIndex].transactions = {
        ...transactions,
        transactionListing: transactions.transactionListing.filter(
          (transact) => transact.uid !== action.transactionId
        ),
        loading: false,
        error: undefined,
      };
      return { ...cloneDeep(state), portfolioListing: portfolioList };
    }
    default:
      return state;
  }
};

const getPortfolioIndex = (
  portfolioList: SinglePortfolio[],
  portfolioId: string
) =>
  portfolioList.findIndex((portfolio) => {
    return portfolio.uid === portfolioId;
  });
