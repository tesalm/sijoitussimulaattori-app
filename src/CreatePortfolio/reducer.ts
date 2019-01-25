import { ActionType, CreatePortfolioAction } from './actions';
import cloneDeep = require('lodash/cloneDeep');
import firebase, { auth } from 'react-native-firebase';

export interface CreatingPortfolio {
  loading: boolean;
  error?: Error;
  success: boolean;
}

const initialState: CreatingPortfolio = {
  loading: false,
  error: undefined,
  success: false,
};

export const createPortfolioReducer = (
  state: CreatingPortfolio = initialState,
  action: CreatePortfolioAction
): CreatingPortfolio => {
  switch (action.type) {
    case ActionType.CreatePortfolioBegin:
      return { ...state, loading: true, error: undefined, success: false };
    case ActionType.CreatePortfolioSuccess:
      return { ...state, loading: false, error: undefined, success: true };
    case ActionType.CreatePortfolioFailure:
      return { ...state, loading: false, error: action.error, success: false };
    default:
      return state;
  }
};
