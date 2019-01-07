import { ActionType, CreatePortfolioAction } from './actions';

export interface CreatingPortfolio {
  loading: boolean;
  error?: Error;
}

const initialState: CreatingPortfolio = {
  loading: false,
  error: undefined,
};

export const createPortfolioReducer = (
  state: CreatingPortfolio = initialState,
  action: CreatePortfolioAction
): CreatingPortfolio => {
  switch (action.type) {
    case ActionType.CreatePortfolioBegin:
      return { ...state, loading: true, error: undefined };
    case ActionType.CreatePortfolioSuccess:
      return { ...state, loading: false, error: undefined };
    case ActionType.CreatePortfolioFailure:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
