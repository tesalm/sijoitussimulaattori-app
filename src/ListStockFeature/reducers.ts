import { StocksAction, ActionType } from './actions';

export interface StocksListing {
  stocks: Array<{key: string,  revenue: string, lastsale: string}>;
  loading: boolean;
  error: Error | null;
}

const initialState: StocksListing = {
  stocks: [],
  loading: false,
  error: null,
};

export const stocksListingReducer = (
  state: StocksListing = initialState,
  action: StocksAction  
): StocksListing => {
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
