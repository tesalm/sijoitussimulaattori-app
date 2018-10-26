import { Dispatch } from 'redux';
import { to } from 'await-to-js';
import firebase from 'react-native-firebase';

import { User } from '../models';

export enum ActionType {
  Login = '[Login] Login',
  Logout = '[Login] Logout',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure',
}
  
export type AuthAction = Login | LoginSuccess | LoginFailure | Logout;

export class Login {
  readonly type = ActionType.Login;
  constructor() {
    return {type: this.type};
  }
}

export class LoginSuccess {
  readonly type = ActionType.LoginSuccess;
  constructor(public user: User) {
    return {type: this.type, user};
   }
}

export class LoginFailure {
  readonly type = ActionType.LoginFailure;
  constructor(public error: string) { 
    return {type: this.type, error};
  }
}

export class Logout {
  readonly type = ActionType.Logout;
  constructor() { 
    return {type: this.type};
  }
}

const login = () => async (
  dispatch: Dispatch<LoginSuccess | LoginFailure>
) => {

  const [err, fsUser] = await to(firebase.auth().signInAnonymously());

  if (err || !fsUser) {
    return dispatch(new LoginFailure(err || 'User not found.'));
  }

  const user: User = {
    uid: fsUser.user.uid
  };

  if (fsUser.additionalUserInfo) {
    if (fsUser.additionalUserInfo.isNewUser) {
      // TODO User was just created. Navigate to "give username" -page.
    } else {
      // TODO Get user profile and stuff and add to user -object.
    }
  }

  dispatch(new LoginSuccess(user));
}

const logout = () => async (dispatch: Dispatch<Logout>) => {

  const [err] = await to(firebase.auth().signOut());
  
  if (err) {
    console.error('Error logging out');
  } else {
    dispatch(new Logout());
  }
}

export { login, logout };