import * as React from 'react';
import * as reactNativeFirebaseMock from 'react-native-firebase';

import {
  CreateCustomReactNativeFirebaseMock,
  CreateRestorePreviousLoginCustomMock,
  TestCaseType,
} from '../../../tools/mocks/firebase';
import { LoginState } from '../../Auth/reducer';
import { configureStore } from '../../redux/store';

import 'react-native-mock-render/mock';

const originalFirebaseMock = { ...reactNativeFirebaseMock };

// ** Auth actions - successfull cases **
describe('>>> Auth actions - successfull cases', () => {
  beforeAll(() => {
    // Override original mock with the special one.
    jest.resetModules();
    jest.mock('react-native-firebase', () => {
      return CreateCustomReactNativeFirebaseMock(TestCaseType.NormalCase);
    });
  });

  afterAll(() => {
    jest.mock('react-native-firebase', () => {
      return { ...originalFirebaseMock };
    });
  });

  it('should handle new user login action', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect from initial state.
    const stateBefore = store.getState();
    expect(stateBefore.login.loginState).not.toEqual(LoginState.LoggedIn);
    expect(stateBefore.login.userAuth).toBeUndefined();
    expect(stateBefore.user.userData).toBeUndefined(); // User related

    await store.dispatch(actions.login());

    // Expect after login.
    const stateAfter = store.getState();
    expect(stateAfter.login.loginState).toEqual(LoginState.LoggedIn);
    expect(stateAfter.login.userAuth).toBeDefined();
    expect(stateAfter.login.loginError).toBeUndefined();
    expect(stateAfter.user.userData).toBeDefined(); // User related
    expect(stateAfter.user.dataInitError).toBeUndefined(); // User related

    done();
  });

  it('should handle logout action', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');
    // Login before testing logout.
    await store.dispatch(actions.login());

    // Expect before logout.
    const beforeLogout = store.getState();
    expect(beforeLogout.login.loginState).toEqual(LoginState.LoggedIn);
    expect(beforeLogout.login.userAuth).toBeDefined();

    await store.dispatch(actions.logout());

    // Expect after logout.
    const stateAfterLogout = store.getState();
    expect(stateAfterLogout.login.loginState).toEqual(LoginState.LoggedOut);
    expect(stateAfterLogout.login.userAuth).toBeUndefined();

    done();
  });
});

// ** Auth actions - failure cases **
describe('>>> Auth actions - failure cases', () => {
  beforeAll(() => {
    // Override original mock with the special one.
    jest.resetModules();
    jest.mock('react-native-firebase', () => {
      return CreateCustomReactNativeFirebaseMock(TestCaseType.ErrorCase);
    });
  });

  afterAll(() => {
    jest.mock('react-native-firebase', () => {
      return { ...originalFirebaseMock };
    });
  });

  it('should tolerate login error', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect from initial state.
    const stateBefore = store.getState();
    expect(stateBefore.login.loginError).toBeUndefined();
    expect(stateBefore.login.loginState).not.toEqual(LoginState.LoggedIn);

    await store.dispatch(actions.login());

    // Expect after failed login attempt.
    const stateAfter = store.getState();
    expect(stateAfter.login.userAuth).toBeUndefined();
    expect(stateAfter.login.loginError).toBeDefined();
    expect(stateAfter.login.loginState).toEqual(LoginState.LoggedOut);

    done();
  });
});

// ** Auth actions - special test suite to test the previois login action **
describe('>>> Auth actions - restore previous logins', () => {
  afterAll(() => {
    jest.mock('react-native-firebase', () => {
      return { ...originalFirebaseMock };
    });
  });

  it('should handle previous login restore', async (done) => {
    // Expect from initial state.
    const store = configureStore();
    const stateBefore = store.getState();
    expect(stateBefore.login.loginState).toEqual(
      LoginState.CheckingPreviousLogin
    );
    expect(stateBefore.login.userAuth).toBeUndefined();

    // Define a callback, which does the validation and will be called at the point
    // when the user credential should have been restored.
    const expectAndDone = () => {
      const stateAfter = store.getState();
      expect(stateAfter.login.loginState).toEqual(LoginState.LoggedIn);
      expect(stateAfter.login.userAuth).toBeDefined();
      done();
    };

    // Initialize the special mock to test the action restorePreviousLogin, which
    // is having an observer to be triggered in the test.
    jest.resetModules();
    jest.mock('react-native-firebase', () => {
      return CreateRestorePreviousLoginCustomMock(
        TestCaseType.NormalCase,
        true, // Previous login exists.
        expectAndDone
      );
    });
    const actions = require('../actions');

    store.dispatch(actions.restorePreviousLogin());
  });

  it('should tolerate error when restoring previous login', async (done) => {
    // Expect from initial state.
    const store = configureStore();
    const stateBefore = store.getState();
    expect(stateBefore.login.loginState).toEqual(
      LoginState.CheckingPreviousLogin
    );
    expect(stateBefore.login.userAuth).toBeUndefined();

    // Define a callback, which does the validation and will be called at the point
    // when the user credential should have been restored.
    const expectAndDone = () => {
      const stateAfter = store.getState();
      expect(stateAfter.login.loginState).toEqual(LoginState.LoggedIn);
      expect(stateAfter.login.userAuth).toBeDefined();
      done();
    };

    // Initialize the special mock to test the action restorePreviousLogin, which
    // is having an observer to be triggered in the test.
    jest.resetModules();
    jest.mock('react-native-firebase', () => {
      return CreateRestorePreviousLoginCustomMock(
        TestCaseType.ErrorCase,
        true, // Previous login exists.
        expectAndDone
      );
    });
    const actions = require('../actions');

    store.dispatch(actions.restorePreviousLogin());
  });

  it('should handle case when no previous login exists', async (done) => {
    // Expect from initial state.
    const store = configureStore();
    const stateBefore = store.getState();
    expect(stateBefore.login.loginState).toEqual(
      LoginState.CheckingPreviousLogin
    );
    expect(stateBefore.login.userAuth).toBeUndefined();

    // Define a callback, which does the validation and will be called at the point
    // when the user credential should have been restored.
    const expectAndDone = () => {
      const stateAfter = store.getState();
      expect(stateAfter.login.loginState).toEqual(LoginState.LoggedOut);
      expect(stateAfter.login.userAuth).toBeUndefined();
      expect(stateAfter.login.loginError).toBeUndefined(); // This is not an error state.
      done();
    };

    // Initialize the special mock to test the action restorePreviousLogin, which
    // is having an observer to be triggered in the test.
    jest.resetModules();
    jest.mock('react-native-firebase', () => {
      return CreateRestorePreviousLoginCustomMock(
        TestCaseType.NormalCase,
        false, // Previous login does not exists.
        expectAndDone
      );
    });
    const actions = require('../actions');

    store.dispatch(actions.restorePreviousLogin());
  });
});
