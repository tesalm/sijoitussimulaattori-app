import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';
import { SingleStock, stockReducer } from '../Stock/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducers';
import { Auth, authReducer } from './../Auth/reducer';

export interface Stock {
  symbol: string;
  name: string;
  buy: number;
  sell: number;
  high: number;
  low: number;
  marketValue: number;
  revenue: number;
  close: number;
}

export interface RootState {
  counter: Counter;
  login: Auth;
  stocksListing: StocksListing;
  singleStock: SingleStock;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocksListing: stocksListingReducer,
  singleStock: stockReducer,
});
