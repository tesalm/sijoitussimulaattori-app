import cloneDeep from 'lodash/cloneDeep';

import { ActionType, PortfolioAction } from './actions';

export interface PortfolioStock {
  uid: string;
  amount: number;
  avgPrice: number;
}
export interface Portfolio {
  uid: string;
  portfolioId: string;
  balance: number;
  revenue: number;
  totalMarketValue: number;
  ownerId: string;
  stocks: PortfolioStock[];
}

export interface SinglePortfolio {
  portfolio?: Portfolio;
  loading: boolean;
  error?: Error;
  refreshing: boolean;
}

const initialState: SinglePortfolio = {
  portfolio: undefined,
  loading: false,
  error: undefined,
  refreshing: false,
};

export const portfolioReducer = (
  state: SinglePortfolio = initialState,
  action: PortfolioAction
): SinglePortfolio => {
  switch (action.type) {
    case ActionType.RequestPortfolioBegin:
      return {
        ...cloneDeep(state),
        loading: true,
        error: undefined,
        refreshing: true,
      };
    case ActionType.RequestPortfolioSuccess:
      return {
        ...state,
        portfolio: action.portfolio,
        loading: false,
        error: undefined,
        refreshing: false,
      };
    case ActionType.RequestPortfolioFailure:
      return {
        ...cloneDeep(state),
        loading: false,
        error: action.error,
        refreshing: false,
      };

    default:
      return state;
  }
};
