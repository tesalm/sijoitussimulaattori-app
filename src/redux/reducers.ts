import { combineReducers } from 'redux';
import { BidInfo, bidReducer } from '../Bid/reducer';
import { StocksListing, stocksListingReducer } from '../MarketScreen/reducer';
import {
  PortfolioListing,
  portfolioListingReducer,
} from '../PortfolioList/reducer';
import { User, userReducer } from '../User/reducer';
import { Auth, authReducer } from './../Auth/reducer';

export interface RootState {
  login: Auth;
  stocksListing: StocksListing;
  user: User;
  bid: BidInfo;
  portfolioListing: PortfolioListing;
}

export const rootReducer = combineReducers<RootState>({
  login: authReducer,
  stocksListing: stocksListingReducer,
  user: userReducer,
  bid: bidReducer,
  portfolioListing: portfolioListingReducer,
});
