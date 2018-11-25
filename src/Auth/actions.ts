import { to } from 'await-to-js';
import firebase from 'react-native-firebase';
import { Dispatch } from 'redux';

import { t } from '../assets/i18n';
import { getCurrentUser, getUserData, signInAnonymously, signOut, upsertUserData } from '../firestore';
import { User, UserAuth } from '../models';
import { createDefaultUser } from '../util/users';
import { UserData } from './../models/user.model';

export enum ActionType {
  RestoreLoginSuccess = '[Login] Restore Login Success',
  RestoreLoginImpossible = '[Login] Restore Login Impossible',
  LoginRequest = '[Login] Login Request',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
  LogoutRequest = '[Login] Logout Request',
  FetchUserDataSuccess = '[Login] Fetch User Data Success',
  FetchUserDataFailure = '[Login] Fetch User Data Failure',
  DeleteCurrentUserRequest = '[Login] Delete Current User Request',
  DeleteCurrentUserSuccess = '[Login] Delete Current User Success',
  DeleteCurrentUserFailure = '[Login] Delete Current User Failure',
}

export type AuthAction =
  | RestoreLoginSuccess
  | RestoreLoginImpossible
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | LogoutRequest
  | FetchUserDataSuccess
  | FetchUserDataFailure
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

export class FetchUserDataSuccess {
  readonly type = ActionType.FetchUserDataSuccess;
  constructor(public user: User) {
    return { type: this.type, user };
  }
}

export class FetchUserDataFailure {
  readonly type = ActionType.FetchUserDataFailure;
  constructor(public userDataError: Error) {
    return { type: this.type, userDataError };
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
const restorePreviousLogin = () => async (dispatch: Dispatch<AuthAction>) => {
  // Wait the completion of the Firebase initialization and catch the logged in user
  // when after it.
  const unsubscripe = firebase
    .auth()
    .onAuthStateChanged((userAuth: UserAuth) => {
      if (userAuth) {
        // Previous user can be restored.
        dispatch(new RestoreLoginSuccess(userAuth));
        fetchUserData(dispatch, userAuth);
      } else {
        // There is no previous user to restore.
        dispatch(new RestoreLoginImpossible());
      }

      // Catch only the first authentication state change event.
      unsubscripe();
    });
};

// This function should be used only for "old" users.
const fetchUserData = async (
  dispatch: Dispatch<AuthAction>,
  userAuth: UserAuth
) => {
  let userData: UserData = {};

  try {
    userData = (await getUserData(userAuth.uid)) || userData;
  } catch (err) {
    dispatch(new FetchUserDataFailure(err));
    return; // <- Exit on error.
  }

  const user: User = {
    ...userAuth,
    ...userData,
  };

  dispatch(new FetchUserDataSuccess(user));
};

const login = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch(new LoginRequest());

  const [err, fsUser] = await to(signInAnonymously());

  if (err || !fsUser) {
    return dispatch(new LoginFailure(err || Error('User not found.')));
  }

  const userAuth: UserAuth = {
    uid: fsUser.user.uid,
  };

  // It should be now that the login was successfull.
  // The rest of this function will handle user data.
  dispatch(new LoginSuccess(userAuth));

  let userData: UserData = {};

  if (fsUser.additionalUserInfo && fsUser.additionalUserInfo.isNewUser) {
    // Create new user.
    userData = createDefaultUser();

    try {
      await upsertUserData(userAuth.uid, userData);
    } catch (err) {
      console.error('Error creating defaut user:' + err); // TODO: Error handling needed? Maybe dispatch failure notification action
    }
  } else {
    // Fetch data for "old" user.
    fetchUserData(dispatch, userAuth);
    return; // <- !
  }

  const user: User = {
    ...userAuth,
    ...userData,
  };

  // Assign user data for new user. The user might got nothing as UserData, if something
  // went wrong on the user creation initialization.
  dispatch(new FetchUserDataSuccess(user));
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
    dispatch(
      new DeleteCurrentUserFailure(new Error(t('Auth.NoAuthenticatedUser')))
    );
    return;
  }

  const [err] = await to(currentUser.delete());

  if (err) {
    dispatch(new DeleteCurrentUserFailure(err));
  } else {
    dispatch(new DeleteCurrentUserSuccess());
  }
};

export { login, logout, deleteCurrentUser, restorePreviousLogin };
