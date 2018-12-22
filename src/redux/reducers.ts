import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducers';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
  stocksListing: StocksListing;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocksListing: stocksListingReducer,
});
