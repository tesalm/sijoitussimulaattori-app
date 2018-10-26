import { Auth, authReducer } from './../Auth/reducer';
import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';

export interface RootState {
  counter: Counter;
  login: Auth;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
  login: authReducer,
});
