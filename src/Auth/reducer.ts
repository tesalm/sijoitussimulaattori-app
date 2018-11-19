import { LoginStatus, User } from '../models';
import { ActionType, AuthAction } from './actions';

export interface Auth {
  user?: User;
  loginError?: Error;
  userDataError?: Error;
  loginState: LoginStatus;
}

export const initialAuthState: Auth = {
  user: undefined,
  loginError: undefined,
  userDataError: undefined,
  loginState: LoginStatus.CheckingPreviousLogin,
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
        loginState: LoginStatus.LoggedIn,
      };
    case ActionType.RestoreLoginImpossible:
      return {
        ...state,
        loginState: LoginStatus.LoggedOut,
      };
    case ActionType.LoginRequest:
      return {
        ...state,
        loginState: LoginStatus.LoggingIn,
      };
    case ActionType.LoginSuccess:
      return {
        ...state,
        user: action.user,
        loginError: undefined,
        loginState: LoginStatus.LoggedIn,
      };
    case ActionType.LoginFailure:
      return {
        ...state,
        user: undefined,
        loginError: action.error,
        loginState: LoginStatus.LoggedOut,
      };
    case ActionType.DeleteCurrentUserSuccess:
    case ActionType.LogoutRequest:
      return {
        ...state,
        user: undefined,
        loginError: undefined,
        loginState: LoginStatus.LoggedOut,
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
    default:
      return state;
  }
};
