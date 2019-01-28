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

const restorePreviousLogin = () => (
  dispatch: Dispatch<AuthAction | UserAction>
) => {
  // Generator, which returns true only when called at the first time.
  // It is assumed that the generator is "thread safe".
  function* isFirstTime() {
    yield true;
    while (true) {
      yield false;
    }
  }

  const firstAuthStateChangeEvent = isFirstTime();
  const firstUnsubscribing = isFirstTime();

  // Wait the completion of the Firebase initialization and catch the logged in user
  // after it (if exists). Note that the event listener will execute always when the
  // state changes.
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    // Handle only one (the first) auth state changed event. Note that it is
    // possible that more than one auth event triggers at the same time.
    if (firstAuthStateChangeEvent.next().value) {
      if (user) {
        // Previous user can be restored.
        const userAuth: UserAuth = {
          uid: user.uid,
        };
        dispatch(new RestoreLoginSuccess(userAuth));

        // Try to fetch the user data.
        try {
          fetchUserData()(dispatch);
        } catch {
          // No need to handle any further exceptions raised by 'fetchUserData' function.
        }
      } else {
        // There is no previous user to restore.
        dispatch(new RestoreLoginImpossible());
      }
    }

    // Only the first authentication state change event is wanted, so
    // unsubscribe the event listener.
    // Ensure that the unsubscribe function is called only once and
    // that it is defined.
    if (unsubscribe && firstUnsubscribing.next().value) {
      unsubscribe();
    }
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
    // tslint:disable-next-line:no-console
    console.error('Error logging out');
  } else {
    dispatch(new Logout());
  }
};

export { login, logout, restorePreviousLogin };
