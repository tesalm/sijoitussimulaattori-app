import { ActionType, PortfoliossAction } from './actions';

export interface PortfolioList {
  name: string;
}

export interface PortfolioListing {
  portfolios: Array<PortfolioList>;
  loading: boolean;
  error?: Error;
  portfolioId?: string;
}

const initialState: PortfolioListing = {
  portfolios: [],
  loading: false,
  error: undefined,
  portfolioId: undefined,
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
    case ActionType.SaveId:
      return { ...state, portfolioId: action.id };

    default:
      return state;
  }
};
