import { StocksAction, ActionType } from './actions';

export interface Stocks {
  stocks: Array<{key: string, value: string}>;
  loading: Boolean;
  error: Error | null;
}

const initialState: Stocks = {
  stocks: [],
  loading: false,
  error: null,
};

export const stocksReducer = (
  state: Stocks = initialState,
  action: StocksAction
): Stocks => {
  switch (action.type) {
    case ActionType.GetStocksBegin:
      return { ...state, stocks: [], loading: true, error: null};
    case ActionType.GetStocksSuccess:
      return { ...state, stocks:action.stocks, loading: false, error: null };
    case ActionType.GetStocksFailure:
      return { ...state, stocks:[], loading: false, error: action.error };  
    default:
      return state;
  }
};
