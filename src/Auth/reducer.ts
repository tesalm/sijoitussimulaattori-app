import { UserAuth } from '../models';
import { ActionType, AuthAction } from './actions';

/** Indicates in which state the user login is. */
export enum LoginState {
  CheckingPreviousLogin,
  LoggedOut,
  LoggedIn,
  LoggingIn,
  LoggingOut,
}

export interface Auth {
  userAuth?: UserAuth;
  loginError?: Error;
  loginState: LoginState;
}

export const initialAuthState: Auth = {
  userAuth: undefined,
  loginError: undefined,
  loginState: LoginState.CheckingPreviousLogin,
};

export const authReducer = (
  state: Auth = initialAuthState,
  action: AuthAction
): Auth => {
  switch (action.type) {
    case ActionType.LoginSuccess:
    case ActionType.RestoreLoginSuccess:
      return {
        ...state,
        userAuth: action.userAuth,
        loginError: undefined,
        loginState: LoginState.LoggedIn,
      };
    case ActionType.RestoreLoginImpossible:
      return {
        ...state,
        userAuth: undefined,
        loginState: LoginState.LoggedOut,
      };
    case ActionType.LoginRequest:
      return {
        ...state,
        loginState: LoginState.LoggingIn,
      };
    case ActionType.LoginFailure:
      return {
        ...state,
        userAuth: undefined,
        loginError: action.error,
        loginState: LoginState.LoggedOut,
      };
    case ActionType.Logout:
      return {
        ...state,
        userAuth: undefined,
        loginState: LoginState.LoggedOut,
      };
    default:
      return state;
  }
};
