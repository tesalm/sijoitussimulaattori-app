import { ActionType, Stock, StocksAction } from './actions';

export interface StocksListing {
  stocks: Array<Stock>;
  loading: boolean;
  error?: Error;
}

const initialState: StocksListing = {
  stocks: [],
  loading: false,
  error: undefined,
};

export const stocksListingReducer = (
  state: StocksListing = initialState,
  action: StocksAction
): StocksListing => {
  switch (action.type) {
    case ActionType.GetStocksBegin:
      return { ...state, stocks: [], loading: true, error: undefined };
    case ActionType.GetStocksSuccess:
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
        error: undefined,
      };
    case ActionType.GetStocksFailure:
      return { ...state, stocks: [], loading: false, error: action.error };
    default:
      return state;
  }
};
