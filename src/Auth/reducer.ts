import { User } from '../models';
import { ActionType, AuthAction } from './actions';

export interface Auth {
  user?: User;
  error?: Error;
}

const initialState: Auth = {};

export const authReducer = (
  state: Auth = initialState,
  action: AuthAction
): Auth => {
  switch (action.type) {
    case ActionType.LoginRequest:
      return state;
    case ActionType.LoginSuccess:
      return {
        ...state,
        user: action.user,
        error: undefined,
      };
    case ActionType.LoginFailure:
      return {
        ...state,
        user: undefined,
        error: action.error,
      };
    case ActionType.LogoutRequest:
      return initialState;
    default:
      return state;
  }
};
