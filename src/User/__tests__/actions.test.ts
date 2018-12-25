import * as React from 'react';
import * as reactNativeFirebaseMock from 'react-native-firebase';

import { CreateCustomReactNativeFirebaseMock, TestCaseType } from '../../../tools/mocks/firebase';
import { LoginSuccess } from '../../Auth/actions';
import { LoginState } from '../../Auth/reducer';
import { UserAuth, UserData } from '../../models';
import { configureStore } from '../../redux/store';
import { FetchUserDataSuccess } from '../actions';

import 'react-native-mock-render/mock';

const originalFirebaseMock = { ...reactNativeFirebaseMock };

const fakeAuth: UserAuth = {
  uid: 'fake-uid',
};

const fakeUserData: UserData = {
  username: 'fake-name',
};

describe('>>> User actions - succesfull cases', () => {
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

  it('should handle fetch user data action', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect before fetching user data.
    const stateBefore = store.getState();
    expect(stateBefore.user.userData).toBeUndefined();

    await store.dispatch(actions.fetchUserData());

    // Expect after fetch.
    const stateAfter = store.getState();
    expect(stateAfter.user.userData).toBeDefined();
    expect(stateAfter.user.dataFetchError).toBeUndefined();

    done();
  });

  it('should handle user data initialization', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect before initializating user data.
    const stateBefore = store.getState();
    expect(stateBefore.user.userData).toBeUndefined();

    await store.dispatch(actions.initializeNewUserData());

    // Expect after initialization.
    const stateAfter = store.getState();
    expect(stateAfter.user.userData).toBeDefined();
    expect(stateAfter.user.dataInitError).toBeUndefined();

    done();
  });

  it('should handle user deletion', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Set the auth state so that user is logged in and user data is fetched.
    await store.dispatch(new LoginSuccess(fakeAuth));
    await store.dispatch(new FetchUserDataSuccess(fakeUserData));

    // Expect before user deletion.
    const stateBefore = store.getState();
    expect(stateBefore.login.userAuth).toBeDefined();
    expect(stateBefore.login.loginState).toEqual(LoginState.LoggedIn);
    expect(stateBefore.user.userData).toBeDefined();

    await store.dispatch(actions.deleteUser());

    // Expect after user deletion.
    const stateAfter = store.getState();
    expect(stateAfter.login.userAuth).toBeUndefined();
    expect(stateAfter.login.loginState).toEqual(LoginState.LoggedOut);
    expect(stateAfter.user.userData).toBeUndefined();
    expect(stateAfter.user.dataDeletionError).toBeUndefined();

    done();
  });
});

describe('>>> User actions - failure cases', () => {
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

  it('should tolerate fetch user data error', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect before fetching user data.
    const stateBefore = store.getState();
    expect(stateBefore.user.userData).toBeUndefined();
    expect(stateBefore.user.dataFetchError).toBeUndefined();

    await store.dispatch(actions.fetchUserData());

    // Expect after fetch.
    const stateAfter = store.getState();
    expect(stateAfter.user.userData).toBeUndefined();
    expect(stateAfter.user.dataFetchError).toBeDefined();
    expect(stateAfter.user.dataInitError).toBeUndefined(); // <- This error should not be set.

    done();
  });

  it('should tolerate user data initialization error', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Expect before initializating user data.
    const stateBefore = store.getState();
    expect(stateBefore.user.userData).toBeUndefined();
    expect(stateBefore.user.dataInitError).toBeUndefined();

    await store.dispatch(actions.initializeNewUserData());

    // Expect after initialization.
    const stateAfter = store.getState();
    expect(stateAfter.user.userData).toBeUndefined();
    expect(stateAfter.user.dataInitError).toBeDefined();
    expect(stateAfter.user.dataFetchError).toBeUndefined(); // <- This error should not be set.

    done();
  });

  it('should tolerate user deletion error', async (done) => {
    const store = configureStore();
    // Re-require actions module to update the special mock to it.
    const actions = require('../actions');

    // Set the auth state so that user is logged in and user data is fetched.
    await store.dispatch(new LoginSuccess(fakeAuth));
    await store.dispatch(new FetchUserDataSuccess(fakeUserData));

    // Expect before user deletion.
    const stateBefore = store.getState();
    expect(stateBefore.login.userAuth).toBeDefined();
    expect(stateBefore.login.loginState).toEqual(LoginState.LoggedIn);
    expect(stateBefore.user.userData).toBeDefined();

    await store.dispatch(actions.deleteUser());

    // Expect after user deletion.
    const stateAfter = store.getState();
    expect(stateAfter.login.userAuth).toBeDefined();
    expect(stateAfter.login.loginState).toEqual(LoginState.LoggedIn);
    expect(stateAfter.user.userData).toBeDefined();
    expect(stateAfter.user.dataDeletionError).toBeDefined();

    done();
  });
});
