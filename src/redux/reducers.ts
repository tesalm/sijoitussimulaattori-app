import { combineReducers } from 'redux';
import { SingleStock, stockReducer } from '../StockFeature/reducer';

import { Counter, counterReducer } from '../HelloFeature/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducers';
import { Auth, authReducer } from './../Auth/reducer';

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
  singleStock: stockReducer
});
