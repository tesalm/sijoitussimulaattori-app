import { ActionType, PortfolioAction } from './actions';

export interface PortfolioStock {
  symbol: string;
  amount: number;
  avgPrice: number;
}
export interface Portfolio {
  ownerId: string;
  balance: number;
  stocks: PortfolioStock[];
  name: string;
}

export interface SinglePortfolio {
  portfolio?: Portfolio;
  loading: boolean;
  error?: Error;
}

const initialState: SinglePortfolio = {
  portfolio: undefined,
  loading: false,
  error: undefined,
};

export const portfolioReducer = (
  state: SinglePortfolio = initialState,
  action: PortfolioAction
): SinglePortfolio => {
  switch (action.type) {
    case ActionType.RequestPortfolioBegin:
      return { ...state, loading: true, error: undefined };
    case ActionType.RequestPortfolioSuccess:
      return {
        ...state,
        portfolio: action.portfolio,
        loading: false,
        error: undefined,
      };
    case ActionType.RequestPortfolioFailure:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
