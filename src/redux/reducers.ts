import { Auth, authReducer } from './../Auth/reducer';
import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';
import { Stocks, stocksReducer } from '../ListStockFeature/reducers';

export interface RootState {
  counter: Counter;
  login: Auth;
  stocks: Stocks;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  stocks: stocksReducer
});
