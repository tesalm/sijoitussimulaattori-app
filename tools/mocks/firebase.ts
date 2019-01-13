import { firestore } from 'react-native-firebase';

import { UserAuth } from '../../src/models';

import 'react-native-mock-render/mock';

export enum TestCaseType {
  NormalCase,
  ErrorCase,
}

// Definition for mocking the essential parts of Firebase. This definition is recommended to
// be used as a basis for every Firebase mocks.
export const FirebaseGeneralMock = {
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),

  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),

  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
};

// Constructs a custom, manually defined mock for Firebase. If you need to write tests for a new
// functionality which calls Firebase API, you can mock the desired Firebase method here if the needed
// functionality is not mocked yet. If an already defined mock method is not behaving as you would
// need, please consider to made a special mock for that purpose unless the already defined mock
// is really doing something very insensible.
// The function is able to return two kind on mocks according to the parameter 'testCaseType':
// one for a normal and the other for an erroneous case.
export function CreateCustomReactNativeFirebaseMock(
  testCaseType: TestCaseType
) {
  // Defines a mock to the Firebase's 'signInAnonymously' function.
  const signInAnonymously = jest.fn(() => {
    switch (testCaseType) {
      case TestCaseType.NormalCase:
        // Fake and incomplete credential object containing only needed parameters.
        return Promise.resolve({
          user: { uid: 'fake-uid' },
          additionalUserInfo: { isNewUser: true },
        });
      case TestCaseType.ErrorCase:
        return Promise.reject(Error('fake-error'));
    }
  });

  // Defines a mock to the Firebase's 'signOut' function.
  const signOut = jest.fn(() => {
    switch (testCaseType) {
      case TestCaseType.NormalCase:
        return Promise.resolve();
      case TestCaseType.ErrorCase:
        return Promise.reject(Error('fake-error'));
    }
  });

  // Defines an incomplete and fake 'currentUser' object containing only needed parameters
  // and a mock for the 'delete' method.
  const currentUser = {
    uid: 'fake-uid',
    delete: jest.fn(() => {
      // A mock for the function, which deletes the current user.
      switch (testCaseType) {
        case TestCaseType.NormalCase:
          return Promise.resolve();
        case TestCaseType.ErrorCase:
          return Promise.reject(Error('fake-error'));
      }
    }),
  };

  // Defines mocks for the functions 'get', 'update' and 'set', which are belonging to
  // an object retuned by this Firebase function: 'firebase.firestore().collection().doc()'.
  const collection = jest.fn(() => {
    // For an erroneous case, always response witn a reject.
    if (testCaseType === TestCaseType.ErrorCase) {
      return Promise.reject(Error('fake-error'));
    }

    // Fake and incomplete user data object containing only necessary parameters.
    const data = {
      exists: true,
      data: jest.fn(() => ({
        uid: 'fake-uid',
      })),
    };

    return {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve(data)), // <- Successful result is always resolved by 'get'.
          update: jest.fn(), // <- Function 'update' does not do anything in tests.
          set: jest.fn(), // <- Function 'set' does not do anything in tests.
        })),
      })),
    };
  });

  // Constructs the whole Firebase mock object using the partial mocks defined above.
  return {
    ...FirebaseGeneralMock,
    auth: jest.fn(() => ({
      signInAnonymously: signInAnonymously,
      signOut: signOut,
      currentUser: currentUser,
    })),
    firestore: collection,
  };
} // CreateCustomReactNativeFirebaseMock

// This function will activate the event listener 'onAuthStateChange' after a short delay.
// The parameter 'restorePossible' affects, should this function emulate a situation when it is
// or it is not possible to restore previous login session. The parameter 'callback' contains the
// function, which has been defined to be executed when the listener 'onAuthStateChange' should be
// triggered.
const restorePreviousLoginEvent = async (
  restorePossible: boolean,
  callback: (auth: UserAuth | undefined) => void
) => {
  await new Promise((res) => setTimeout(res, 800));
  // Use appropriate parameters for callbacking according to should we emulate a case
  // when previous login exists or not?
  if (restorePossible) {
    callback({ uid: 'fake-user' });
  } else {
    callback(undefined);
  }
};

// Constructs a special Firebase mock to test the Auth action 'restorePerviousLogin', which
// uses the Firebase's 'onAuthStateChange' listener. To test the action, it is needed to
// trigger the listener with a fake user data object as parameter after a small delay. To test a case,
// when there is no user credential to restore, the listener should be activated with 'undefined'
// as the user object. Parameter 'restorePossible' represents, should the mock emulate a case when
// the restoration is possible or not. Parameter 'testCaseType' will control, should the mock behave
// as in a normal or an erroneous case. Parameter 'expectAndDone' is a callback function, which will be
// executed instead of an unsubscribe function of the listener. It is assumed that the unsubscribe
// function for the listener is called when the action has complete its work and the state can be
// checked at this point.
export function CreateRestorePreviousLoginCustomMock(
  testCaseType: TestCaseType,
  restorePossible: boolean,
  expectAndDone: () => void
) {
  // Defines mocks for the functions 'get', 'update' and 'set', which are belonging to
  // an object retuned by this Firebase function: 'firebase.firestore().collection().doc()'.
  const collection = jest.fn(() => {
    // For an erroneous case, always response witn a reject.
    if (testCaseType === TestCaseType.ErrorCase) {
      return Promise.reject(Error('fake-error'));
    }

    // Fake and incomplete user data object containing only necessary parameters.
    const data = {
      exists: true,
      data: jest.fn(() => ({
        uid: 'fake-uid',
      })),
    };

    return {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve(data)),
          update: jest.fn(),
          set: jest.fn(),
        })),
      })),
    };
  });

  // Mock for the Firebase's 'onAuthStateChanged' listener. To activate the listener, the callback
  // function (which is given as parameter 'callback') will be called after a small delay. The original
  // listener would have provided an unsubsribe function as a return value, but the mock will return
  // a certain function instead, which will verify that the store's state is expected at the very end
  // of the action as the unsubscribe function is the very last thing called in the action.
  const onAuthStateChanged = jest.fn(
    (callback: (auth: UserAuth | undefined) => void) => {
      restorePreviousLoginEvent(restorePossible, callback);
      return expectAndDone;
    }
  );

  // Constructs the whole Firebase mock object using the partial mocks defined above.
  return {
    ...FirebaseGeneralMock,
    auth: jest.fn(() => ({
      onAuthStateChanged: onAuthStateChanged,
      currentUser: { uid: 'fake-uid' },
    })),
    firestore: collection,
  };
}
