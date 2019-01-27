import { to } from 'await-to-js';
import { Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { Logout } from '../Auth/actions';
import { getCurrentUser, getUserData, upsertUserData } from '../firestore';
import { UserData } from '../models';
import { createDefaultUser } from '../util/users';

export enum ActionType {
  FetchUserDataSuccess = '[User] Fetch User Data Success',
  FetchUserDataFailure = '[User] Fetch User Data Failure',
  InitUserDataSuccess = '[User] Initialize User Data Success',
  InitUserDataFailure = '[User] Initialize User Data Failure',
  DeleteCurrentUserSuccess = '[User] Delete Current User Success',
  DeleteCurrentUserFailure = '[User] Delete Current User Failure',
}

export type UserAction =
  | FetchUserDataSuccess
  | FetchUserDataFailure
  | InitUserDataSuccess
  | InitUserDataFailure
  | DeleteCurrentUserSuccess
  | DeleteCurrentUserFailure;

export class FetchUserDataSuccess {
  readonly type = ActionType.FetchUserDataSuccess;
  constructor(public user: UserData) {
    return { type: this.type, user };
  }
}

export class FetchUserDataFailure {
  readonly type = ActionType.FetchUserDataFailure;
  constructor(public dataFetchError: Error) {
    return { type: this.type, dataFetchError };
  }
}

export class InitUserDataSuccess {
  readonly type = ActionType.InitUserDataSuccess;
  constructor(public user: UserData) {
    return { type: this.type, user };
  }
}

export class InitUserDataFailure {
  readonly type = ActionType.InitUserDataFailure;
  constructor(public dataInitError: Error) {
    return { type: this.type, dataInitError };
  }
}

export class DeleteCurrentUserSuccess {
  readonly type = ActionType.DeleteCurrentUserSuccess;
  constructor() {
    return { type: this.type };
  }
}

export class DeleteCurrentUserFailure {
  readonly type = ActionType.DeleteCurrentUserFailure;
  constructor(public dataDeletionError: Error) {
    return { type: this.type, dataDeletionError };
  }
}

// This action should be used only for already-defined users.
const fetchUserData = () => async (dispatch: Dispatch<UserAction>) => {
  const userAuth = getCurrentUser();
  if (!userAuth) {
    const err = Error(t('Auth.NoAuthenticatedUser'));
    dispatch(new FetchUserDataFailure(err));
    return; // <- Exit on error.
  }

  let userData: UserData = {};
  try {
    userData = (await getUserData(userAuth.uid)) || userData;
  } catch (err) {
    dispatch(new FetchUserDataFailure(err));
    return; // <- Exit on error.
  }

  dispatch(new FetchUserDataSuccess(userData));
};

// This action should be used only for new users to initialize their user data.
const initializeNewUserData = () => async (dispatch: Dispatch<UserAction>) => {
  const userAuth = getCurrentUser();
  if (!userAuth) {
    const err = Error(t('Auth.NoAuthenticatedUser'));
    dispatch(new InitUserDataFailure(err));
    return; // <- Exit on error.
  }

  const userData = createDefaultUser();
  try {
    await upsertUserData(userAuth.uid, userData);
  } catch (err) {
    dispatch(new InitUserDataFailure(err));
    return; // <- Exit on error.
  }

  dispatch(new InitUserDataSuccess(userData));
};

const deleteUser = () => async (dispatch: Dispatch<UserAction | Logout>) => {
  const userAuth = getCurrentUser();
  if (!userAuth) {
    const err = Error(t('Auth.NoAuthenticatedUser'));
    dispatch(new DeleteCurrentUserFailure(err));
    return; // <- Exit on error.
  }

  const [error] = await to(userAuth.delete());

  if (error) {
    dispatch(new DeleteCurrentUserFailure(error));
  } else {
    dispatch(new DeleteCurrentUserSuccess());
    dispatch(new Logout());
  }
};

export { fetchUserData, initializeNewUserData, deleteUser };
