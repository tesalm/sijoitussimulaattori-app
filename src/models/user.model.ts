
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
export interface User extends UserAuth, UserData { }