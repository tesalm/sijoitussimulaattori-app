import { UserData } from '../models';
import { ActionType, UserAction } from './actions';

export interface User {
  userData?: UserData;
  dataFetchError?: Error;
  dataInitError?: Error;
  dataDeletionError?: Error;
}

export const initialUserState: User = {
  userData: undefined,
  dataFetchError: undefined,
  dataInitError: undefined,
  dataDeletionError: undefined,
};

export const userReducer = (
  state: User = initialUserState,
  action: UserAction
): User => {
  switch (action.type) {
    case ActionType.FetchUserDataSuccess:
      return {
        ...state,
        userData: action.user,
        dataFetchError: undefined,
      };
    case ActionType.FetchUserDataFailure:
      return {
        ...state,
        userData: undefined,
        dataFetchError: action.dataFetchError,
      };
    case ActionType.InitUserDataSuccess:
      return {
        ...state,
        userData: action.user,
        dataInitError: undefined,
      };
    case ActionType.InitUserDataFailure:
      return {
        ...state,
        userData: undefined,
        dataInitError: action.dataInitError,
      };
    case ActionType.DeleteCurrentUserSuccess:
      return {
        ...state,
        userData: undefined,
        dataDeletionError: undefined,
      };
    case ActionType.DeleteCurrentUserFailure:
      return {
        ...state,
        dataDeletionError: action.dataDeletionError,
      };
    default:
      return state;
  }
};
