import firebase from 'react-native-firebase';
import { Uid, UserData } from '../models';
import to from 'await-to-js';
import { upsert } from './firestore-utils';

/** Defines collection names used in firestore */
enum Collections {
  USERS = 'users'
}

const getUserData = async (userId: Uid) => {
  const [err, doc] = await to(firebase.firestore().collection(Collections.USERS).doc(userId).get());

  if (err) {
    throw err;
  }

  if (doc && doc.exists) {
    return doc.data() as UserData;
  }

  return;
}

const upsertUserData = async (userId: Uid, data: UserData) => {
  const docRef = firebase.firestore().collection(Collections.USERS).doc(userId);
  return upsert(docRef, data);
}

export { 
  getUserData,
  upsertUserData
}