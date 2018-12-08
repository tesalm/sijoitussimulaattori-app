import { firestore } from 'react-native-firebase';

import { UserAuth } from '../../src/models';

import 'react-native-mock-render/mock';

export enum TestCaseType {
  NormalCase,
  ErrorCase,
}

// General definition for mocking the most essential logic of Firebase.
export const FirebaseGeneralMock = {
  messaging: jest.fn(() => {
    return {
      hasPermission: jest.fn(() => Promise.resolve(true)),
      subscribeToTopic: jest.fn(),
      unsubscribeFromTopic: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('myMockToken')),
    };
  }),

  notifications: jest.fn(() => {
    return {
      onNotification: jest.fn(),
      onNotificationDisplayed: jest.fn(),
    };
  }),
};

// Constructs a special mock to use with certain authentications tests.
export function SpecialReactNativeFirebaseMock(testCaseType: TestCaseType) {
  // Define a mock to function: firebase.auth().signInAnonymously()
  const signInAnonymously = jest.fn(() => {
    switch (testCaseType) {
      case TestCaseType.NormalCase:
        // Fake and incomplete credential object to suit only parameters
        // needed in certain test cases.
        return Promise.resolve({
          user: { uid: 'fake-uid' },
          additionalUserInfo: { isNewUser: true },
        });
      case TestCaseType.ErrorCase:
        return Promise.reject(Error('fake-error'));
    }
  });

  // Define a mock to function: firebase.auth().signOut()
  const signOut = jest.fn(() => {
    switch (testCaseType) {
      case TestCaseType.NormalCase:
        return Promise.resolve();
      case TestCaseType.ErrorCase:
        return Promise.reject(Error('fake-error'));
    }
  });

  // Define a mock to all of the these functions:
  // firebase.firestore().collection(Collections.USERS).doc(userId).get()
  // firebase.firestore().collection(Collections.USERS).doc(userId).update()
  // firebase.firestore().collection(Collections.USERS).doc(userId).set()
  const collection = jest.fn(() => {
    if (testCaseType === TestCaseType.ErrorCase) {
      return Promise.reject(Error('fake-error'));
    }

    // Fake and incomplete user data object to suit only parameters
    // needed in certain test cases.
    const data = {
      exists: true,
      data: jest.fn(() => {
        uid: 'fake-uid';
      }),
    };

    return {
      collection: jest.fn(() => {
        return {
          doc: jest.fn(() => {
            return {
              get: jest.fn(() => Promise.resolve(data)), // <- Successful result is always returned.
              update: jest.fn(),
              set: jest.fn(),
            };
          }),
        };
      }),
    };
  });

  // Construct the actual mock object.
  return {
    ...FirebaseGeneralMock,
    auth: jest.fn(() => {
      return {
        signInAnonymously: signInAnonymously,
        signOut: signOut,
        currentUser: {
          uid: 'fake-uid', // <- Fake object to be placed in firebase.auth().currentUser.uid
          delete: jest.fn(() => {
            switch (testCaseType) {
              case TestCaseType.NormalCase:
                return Promise.resolve();
              case TestCaseType.ErrorCase:
                return Promise.reject(Error('fake-error'));
            }
          }),
        },
      };
    }),
    firestore: collection,
  };
}

// A hack to test the used observer in the Auth actions: restorePreviousLogin.
// Activate the observer by callback after certain time span with desired parameters.
const restorePreviousLoginEvent = async (
  restorePossible: Boolean,
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

// Constructs a special mock just for one purpose, to test the authStateChange observer.
// The special mock is needed as the observer is quite a tricky to handle in unit tests.
export function AuthStateChangeReactNativeFirebaseMock(
  testCaseType: TestCaseType,
  restorePossible: Boolean,
  expectAndDone: () => void
) {
  // Define mocks to firebase functionalities which the restorePerviousLogin action
  // needs.
  const collection = jest.fn(() => {
    if (testCaseType === TestCaseType.ErrorCase) {
      return Promise.reject(Error('fake-error'));
    }

    const data = {
      exists: true,
      data: jest.fn(() => {
        uid: 'fake-uid';
      }),
    };

    return {
      collection: jest.fn(() => {
        return {
          doc: jest.fn(() => {
            return {
              get: jest.fn(() => Promise.resolve(data)),
              update: jest.fn(),
              set: jest.fn(),
            };
          }),
        };
      }),
    };
  });

  return {
    ...FirebaseGeneralMock,
    auth: jest.fn(() => {
      return {
        onAuthStateChanged: jest.fn(
          (callback: (auth: UserAuth | undefined) => void) => {
            // Start a timed hack, which will cause the observer to react after 800 ms.
            restorePreviousLoginEvent(restorePossible, callback);
            // Instead of the unsubscripe function, provide a function which will
            // verify the end results and mark the test case to be done.
            // In other words, check results of the executed action when it
            // would normally call the unsubscripe function.
            return expectAndDone;
          }
        ),
        currentUser: { uid: 'fake-uid' },
      };
    }),
    firestore: collection,
  };
}
