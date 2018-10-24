import { combineReducers } from 'redux';
import { counterReducer, Counter } from '../HelloFeature/reducer';

export interface RootState {
  counter: Counter;
}

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer,
});
