import { combineReducers } from 'redux';

import { StocksListing, stocksListingReducer } from '../MarketScreen/reducer';
import { User, userReducer } from '../User/reducer';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  login: Auth;
  stocksListing: StocksListing;
  user: User;
}

export const rootReducer = combineReducers<RootState>({
  login: authReducer,
  stocksListing: stocksListingReducer,
  user: userReducer,
});
