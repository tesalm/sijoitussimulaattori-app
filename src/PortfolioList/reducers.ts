import { ActionType, PortfoliossAction } from './actions';

export interface PortfolioList {
  name: string;
}

export interface PortfolioListing {
  portfolios: Array<PortfolioList>;
  loading: boolean;
  error?: Error;
  name?: string;
}

const initialState: PortfolioListing = {
  portfolios: [],
  loading: false,
  error: undefined,
  name: undefined,
};

export const portfolioListingReducer = (
  state: PortfolioListing = initialState,
  action: PortfoliossAction
): PortfolioListing => {
  switch (action.type) {
    case ActionType.RequestPortfoliosBegin:
      return { ...state, loading: true, error: undefined };
    case ActionType.RequestPortfoliosSuccess:
      return {
        ...state,
        portfolios: action.portfolios,
        loading: false,
        error: undefined,
      };
    case ActionType.RequestPortfoliosFailure:
      return { ...state, loading: false, error: action.error };
    case ActionType.SaveName:
      return { ...state, name: action.name };

    default:
      return state;
  }
};
