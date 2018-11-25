import { LoginState, User } from '../models';
import { ActionType, AuthAction } from './actions';

export interface Auth {
  user?: User;
  loginError?: Error;
  userDataError?: Error;
  loginState: LoginState;
}

export const initialAuthState: Auth = {
  user: undefined,
  loginError: undefined,
  userDataError: undefined,
  loginState: LoginState.CheckingPreviousLogin,
};

export const authReducer = (
  state: Auth = initialAuthState,
  action: AuthAction
): Auth => {
  switch (action.type) {
    case ActionType.RestoreLoginSuccess:
      return {
        ...state,
        user: action.userAuth,
        loginError: undefined,
        loginState: LoginState.LoggedIn,
      };
    case ActionType.RestoreLoginImpossible:
      return {
        ...state,
        user: undefined,
        loginState: LoginState.LoggedOut,
      };
    case ActionType.LoginRequest:
      return {
        ...state,
        loginState: LoginState.LoggingIn,
      };
    case ActionType.LoginSuccess:
      return {
        ...state,
        user: action.user,
        loginError: undefined,
        loginState: LoginState.LoggedIn,
      };
    case ActionType.LoginFailure:
      return {
        ...state,
        user: undefined,
        loginError: action.error,
        loginState: LoginState.LoggedOut,
      };
    case ActionType.FetchUserDataSuccess:
      return {
        ...state,
        user: action.user,
        userDataError: undefined,
      };
    case ActionType.FetchUserDataFailure:
      return {
        ...state,
        userDataError: action.userDataError,
      };
    case ActionType.DeleteCurrentUserSuccess:
    case ActionType.LogoutRequest:
      return {
        ...state,
        user: undefined,
        loginError: undefined,
        loginState: LoginState.LoggedOut,
      };
    default:
      return state;
  }
};
