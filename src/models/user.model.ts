export type Uid = string;

/** Defines auth-related properties that belongs to the user */
export interface UserAuth {
  uid: Uid;
}

/** Defines non-auth-related properties that belongs to the user */
export interface UserData {
  username?: string;
}

/** Combines UserAuth and UserData */
export interface User extends UserAuth, UserData {}

/** Indicates in which state the user login is. */
export enum LoginState {
  CheckingPreviousLogin,
  LoggedOut,
  LoggedIn,
  LoggingIn,
  LoggingOut,
}
