import { combineReducers } from 'redux';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducers';
import { createPortfolioReducer, CreatingPortfolio } from '../CreatePortfolio/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducer';
import { PortfolioListing, portfolioListingReducer } from '../PortfolioList/reducers';
import { User, userReducer } from '../User/reducer';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
  stocksListing: StocksListing;
  user: User;
  portfolioListing: PortfolioListing;
  portfolio: CreatingPortfolio;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocksListing: stocksListingReducer,
  user: userReducer,
  portfolioListing: portfolioListingReducer,
  portfolio: createPortfolioReducer,
});
