import { combineReducers } from 'redux';

import { Counter, counterReducer } from '../HelloFeature/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducer';
import { User, userReducer } from '../User/reducer';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
  stocksListing: StocksListing;
  user: User;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocksListing: stocksListingReducer,
  user: userReducer,
});
