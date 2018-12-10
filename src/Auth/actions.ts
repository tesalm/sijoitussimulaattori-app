import { to } from 'await-to-js';
import firebase from 'react-native-firebase';
import { Dispatch } from 'redux';

import { signInAnonymously, signOut } from '../firestore';
import { UserAuth } from '../models';
import { fetchUserData, initializeNewUserData, UserAction } from '../User/actions';

export enum ActionType {
  RestoreLoginSuccess = '[Login] Restore Login Success',
  RestoreLoginImpossible = '[Login] Restore Login Impossible',
  LoginRequest = '[Login] Login Request',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  Logout = '[Login] Logout',
}

export type AuthAction =
  | RestoreLoginSuccess
  | RestoreLoginImpossible
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | Logout;

export class LoginRequest {
  readonly type = ActionType.LoginRequest;
  constructor() {
    return { type: this.type };
  }
}

export class LoginSuccess {
  readonly type = ActionType.LoginSuccess;
  constructor(public userAuth: UserAuth) {
    return { type: this.type, userAuth };
  }
}

export class LoginFailure {
  readonly type = ActionType.LoginFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class Logout {
  readonly type = ActionType.Logout;
  constructor() {
    return { type: this.type };
  }
}

export class RestoreLoginSuccess {
  readonly type = ActionType.RestoreLoginSuccess;
  constructor(public userAuth: UserAuth) {
    return { type: this.type, userAuth };
  }
}

export class RestoreLoginImpossible {
  readonly type = ActionType.RestoreLoginImpossible;
  constructor() {
    return { type: this.type };
  }
}

const restorePreviousLogin = () => async (
  dispatch: Dispatch<AuthAction | UserAction>
) => {
  // Wait the completion of the Firebase initialization and catch the logged in user
  // after it (if exists).
  const unsubscribe = firebase
    .auth()
    .onAuthStateChanged(async (userAuth: UserAuth | undefined) => {
      if (userAuth) {
        // Previous user can be restored.
        dispatch(new RestoreLoginSuccess(userAuth));
        fetchUserData()(dispatch);
      } else {
        // There is no previous user to restore.
        dispatch(new RestoreLoginImpossible());
      }

      // Catch only the first authentication state change event.
      unsubscribe();
    });
};

// This action should be called only when the user is brand new!
const login = () => async (dispatch: Dispatch<AuthAction | UserAction>) => {
  dispatch(new LoginRequest());

  // Try to login as anonymous user.
  const [err, fsUser] = await to(signInAnonymously());
  if (err || !fsUser) {
    dispatch(new LoginFailure(err || Error('User not found.')));
    return; // <- Exit on error.
  }
  const userAuth: UserAuth = {
    uid: fsUser.user.uid,
  };
  dispatch(new LoginSuccess(userAuth)); // <- Login itself was successful.

  // Initialize user data for the brand new user.
  if (fsUser.additionalUserInfo && fsUser.additionalUserInfo.isNewUser) {
    await initializeNewUserData()(dispatch);
  }
};

// Logout should only be called if user is deleted.
const logout = () => async (dispatch: Dispatch<Logout>) => {
  const [err] = await to(signOut());

  if (err) {
    console.error('Error logging out');
  } else {
    dispatch(new Logout());
  }
};

export { login, logout, restorePreviousLogin };
