import firebase from 'react-native-firebase';

import { Uid, UserData } from '../models';
import { upsert } from './firestore-utils';

/** Defines collection names used in firestore */
enum Collections {
  USERS = 'users',
}

const signInAnonymously = async () => {
  return firebase.auth().signInAnonymously();
};

const signOut = async () => {
  return firebase.auth().signOut();
};

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

const getUserData = async (userId: Uid) => {
  const doc = await firebase
    .firestore()
    .collection(Collections.USERS)
    .doc(userId)
    .get();
  if (doc && doc.exists) {
    return doc.data() as UserData;
  }
  return;
};

const upsertUserData = async (userId: Uid, data: UserData) => {
  const docRef = firebase
    .firestore()
    .collection(Collections.USERS)
    .doc(userId);
  return upsert(docRef, data);
};

export {
  signInAnonymously,
  signOut,
  getCurrentUser,
  getUserData,
  upsertUserData,
};
