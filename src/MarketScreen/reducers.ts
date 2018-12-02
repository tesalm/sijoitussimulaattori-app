import { ActionType, StocksAction } from './actions';
import { Stock } from '../redux/reducers';

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
    default:
      return state;
  }
};
