import { UserData } from './../models/user.model';
import { to } from 'await-to-js';
import { Dispatch } from 'redux';
import { t } from '../assets/i18n';

import { User, UserAuth } from '../models';
import { createDefaultUser } from '../util/users';
import { signInAnonymously, upsertUserData, getUserData, signOut, getCurrentUser } from '../firestore';

export enum ActionType {
  LoginRequest = '[Login] Login Request',
  LogoutRequest = '[Login] Logout Request',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  DeleteCurrentUserRequest = '[Login] Delete Current User Request',
  DeleteCurrentUserSuccess = '[Login] Delete Current User Success',
  DeleteCurrentUserFailure = '[Login] Delete Current User Failure'
}

export type AuthAction =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | LogoutRequest
  | DeleteCurrentUserRequest
  | DeleteCurrentUserSuccess
  | DeleteCurrentUserFailure;

export class LoginRequest {
  readonly type = ActionType.LoginRequest;
  constructor() {
    return { type: this.type };
  }
}

export class LoginSuccess {
  readonly type = ActionType.LoginSuccess;
  constructor(public user: User) {
    return { type: this.type, user };
  }
}

export class LoginFailure {
  readonly type = ActionType.LoginFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class LogoutRequest {
  readonly type = ActionType.LogoutRequest;
  constructor() {
    return { type: this.type };
  }
}

export class DeleteCurrentUserRequest {
  readonly type = ActionType.DeleteCurrentUserRequest;
  constructor() {
    return { type: this.type };
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
  constructor(public error: Error) {
    return { type: this.type, error: this.error };
  }
}

const login = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch(new LoginRequest());

  const [err, fsUser] = await to(signInAnonymously());

  if (err || !fsUser) {
    return dispatch(new LoginFailure(err || Error('User not found.')));
  }

  const userAuth: UserAuth = {
    uid: fsUser.user.uid,
  };

  let userData: UserData = { };

  if (fsUser.additionalUserInfo && fsUser.additionalUserInfo.isNewUser) {

    userData = createDefaultUser();

    try {
      await upsertUserData(userAuth.uid, userData);
    } catch (err) {
      console.error('Error creating defaut user:' + err); // TODO: Error handling needed? Maybe dispatch failure notification action
    }

  } else {

    try {
      userData = (await getUserData(userAuth.uid)) || userData;
    } catch (err) {
      console.error('Error fetching user data:' + err); // TODO: Error handling needed? Maybe dispatch failure notification action
    }

  }

  const user: User = {
    ...userAuth,
    ...userData
  }

  dispatch(new LoginSuccess(user));
};

const logout = () => async (dispatch: Dispatch<LogoutRequest>) => {
  const [err] = await to(signOut());

  if (err) {
    console.error('Error logging out');
  } else {
    dispatch(new LogoutRequest());
  }
};

const deleteCurrentUser = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch(new DeleteCurrentUserRequest());

  const currentUser = getCurrentUser();

  if (!currentUser) {
    dispatch(new DeleteCurrentUserFailure(new Error(t('Auth.NoAuthenticatedUser'))));
    return;
  }

  const [err] = await to(currentUser.delete());

  if (err) {
    dispatch(new DeleteCurrentUserFailure(err));
  } else {
    dispatch(new DeleteCurrentUserSuccess());
  }

}

export { login, logout, deleteCurrentUser };
