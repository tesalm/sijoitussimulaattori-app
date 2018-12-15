import { ActionType, StocksAction } from './actions';

export interface Stock {
  symbol: string;
  name: string;
  high: number;
  low: number;
  revenue: number;
  close: number;
}

export interface StocksListing {
  stocks: Array<Stock>;
  loading: boolean;
  error?: Error;
  symbol?: string;
}

const initialState: StocksListing = {
  stocks: [],
  loading: false,
  error: undefined,
  symbol: undefined,
};

export const stocksListingReducer = (
  state: StocksListing = initialState,
  action: StocksAction
): StocksListing => {
  switch (action.type) {
    case ActionType.RequestStocksBegin:
      return { ...state, loading: true, error: undefined };
    case ActionType.RequestStocksSuccess:
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
        error: undefined,
      };
    case ActionType.RequestStocksFailure:
      return { ...state, loading: false, error: action.error };
    case ActionType.SaveSymbol:
      return { ...state, symbol: action.symbol };
    default:
      return state;
  }
};
