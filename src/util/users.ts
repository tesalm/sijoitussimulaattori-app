import { UserData } from './../models/user.model';
import { randomInt } from './general';

const createDefaultUser = (): UserData => {
  return {
    username: 'user' + randomInt().toString(),
  };
};

export { createDefaultUser };
