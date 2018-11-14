import { UserData } from './../models/user.model';
import { to } from 'await-to-js';
import firebase from 'react-native-firebase';
import { Dispatch } from 'redux';
import { t } from '../assets/i18n';

import { User, UserAuth } from '../models';
import { upsertUserData, getUserData } from '../firestore';
import { createDefaultUser } from '../util/users';

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

  // TODO: remove this once the login is in use:
  // await new Promise((r) => setTimeout(r, 3000));

  const [err, fsUser] = await to(firebase.auth().signInAnonymously());

  if (err || !fsUser) {
    return dispatch(new LoginFailure(err || Error('User not found.')));
  }

  const userAuth: UserAuth = {
    uid: fsUser.user.uid,
  };

  let userData: UserData = { };

  if (fsUser.additionalUserInfo) {
    if (fsUser.additionalUserInfo.isNewUser) {
      const defaultUser = createDefaultUser();
      const [updateErr] = await to(upsertUserData(userAuth.uid, defaultUser));

      if (updateErr) {
        // TODO: Handle default user creation error?
      console.error('Error creating defaut user:' + updateErr);
      }
      // TODO User was created. Navigate to profile -page for setup or mst.
      userData = defaultUser;

    } else {
      const [getErr, foundData] = await to(getUserData(userAuth.uid));
      if (getErr) {
        // TODO: Handle user fetch error?
      console.error('Error fetching user data:' + getErr);
      }

      if(foundData) {
        userData = foundData;
      }
    }
  }

  const user: User = {
    ...userAuth,
    ...userData
  }

  dispatch(new LoginSuccess(user));
};

const logout = () => async (dispatch: Dispatch<LogoutRequest>) => {
  const [err] = await to(firebase.auth().signOut());

  if (err) {
    console.error('Error logging out');
  } else {
    dispatch(new LogoutRequest());
  }
};

const deleteCurrentUser = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch(new DeleteCurrentUserRequest());

  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    dispatch(new DeleteCurrentUserFailure(new Error(t('Auth.NoAuthenticatedUser') || 'PLACEHOLDER: No authenticated user')));
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
