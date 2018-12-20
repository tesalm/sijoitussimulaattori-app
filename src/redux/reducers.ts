import { combineReducers } from 'redux';

import { Counter, counterReducer } from '../HelloFeature/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducers';
import { PortfolioListing, portfolioListingReducer } from '../PortfolioList/reducers';
import { portfolioReducer, SinglePortfolio } from '../PortfolioScreen/reducers';
import { User, userReducer } from '../User/reducer';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
  stocksListing: StocksListing;
  user: User;
  singlePortfolio: SinglePortfolio;
  portfolioListing: PortfolioListing;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocksListing: stocksListingReducer,
  user: userReducer,
  singlePortfolio: portfolioReducer,
  portfolioListing: portfolioListingReducer,
});
