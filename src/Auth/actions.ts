import { to } from 'await-to-js';
import firebase from 'react-native-firebase';
import { Dispatch } from 'redux';

import { User } from '../models';

export enum ActionType {
  LoginRequest = '[Login] Login Request',
  LogoutRequest = '[Login] Logout Request',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
}

export type AuthAction =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | LogoutRequest;

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

const login = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch(new LoginRequest());

  // TODO: remove this once the login is in use:
  await new Promise((r) => setTimeout(r, 3000));

  const [err, fsUser] = await to(firebase.auth().signInAnonymously());

  if (err || !fsUser) {
    return dispatch(new LoginFailure(err || Error('User not found.')));
  }

  const user: User = {
    uid: fsUser.user.uid,
  };

  if (fsUser.additionalUserInfo) {
    if (fsUser.additionalUserInfo.isNewUser) {
      // TODO User was just created. Navigate to "give username" -page.
    } else {
      // TODO Get user profile and stuff and add to user -object.
    }
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

export { login, logout };
