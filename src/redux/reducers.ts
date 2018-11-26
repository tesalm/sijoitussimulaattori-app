import { Auth, authReducer } from './../Auth/reducer';
import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';
import { SingleStock, stockReducer } from '../StockFeature/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
  singleStock: SingleStock;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
  singleStock: stockReducer,
});
