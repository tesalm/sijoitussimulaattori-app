import { User } from '../models';
import { ActionType, AuthAction } from './actions';

export interface Auth {
  user?: User;
  error?: Error;
}

export const initialAuthState: Auth = {
  user: undefined,
  error: undefined,
};

export const authReducer = (
  state: Auth = initialAuthState,
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
    case ActionType.DeleteCurrentUserSuccess:
    case ActionType.LogoutRequest:
      return initialAuthState;
    default:
      return state;
  }
};
