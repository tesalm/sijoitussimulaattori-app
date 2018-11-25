import { LoginState, User, UserAuth } from '../../models';
import {
  FetchUserDataFailure,
  FetchUserDataSuccess,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  LogoutRequest,
  RestoreLoginImpossible,
  RestoreLoginSuccess,
} from '../actions';
import { authReducer, initialAuthState } from '../reducer';

describe('>>> authReducer', () => {
  it('should handle LoginRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();
    const loginAction = new LoginRequest();
    const stateAfterLoginRequest = authReducer(state, loginAction);
    expect(stateAfterLoginRequest.user).toBeUndefined();
    done();
  });

  it('should handle LoginSuccess', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username',
    };

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).not.toBeUndefined();
    // Cast to User because .user type is User | undefined
    expect((stateAfterLoginSuccess.user as User).uid).toEqual(user.uid);
    expect((stateAfterLoginSuccess.user as User).username).toEqual(
      user.username
    );
    done();
  });

  it('should handle LogoutRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username',
    };

    const loginAction = new LogoutRequest();
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).toBeUndefined();
    done();
  });

  it('should handle LogoutRequest', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
      username: 'fake-username',
    };

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(stateAfterLoginSuccess.user).toBeDefined();

    const logoutAction = new LogoutRequest();
    const stateAfterLogoutRequest = authReducer(state, logoutAction);
    expect(stateAfterLogoutRequest.user).toBeUndefined();
    done();
  });

  it('should handle LoginFailure', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();
    expect(state.loginError).toBeUndefined();
    expect(state.loginState).not.toEqual(LoginState.LoggedIn);

    const loginFailureAction = new LoginFailure(Error('fake-error'));
    const stateAfterFailedLogin = authReducer(state, loginFailureAction);
    expect(stateAfterFailedLogin.user).toBeUndefined();
    expect(stateAfterFailedLogin.loginError).toBeDefined();
    expect(stateAfterFailedLogin.loginState).not.toEqual(LoginState.LoggedIn);
    done();
  });

  it('should handle RestoreLoginSuccess', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();
    expect(state.loginState).toEqual(LoginState.CheckingPreviousLogin);

    const userAuth: UserAuth = {
      uid: 'fake-uuid',
    };

    const loginRestoreAction = new RestoreLoginSuccess(userAuth);
    const stateAfterRestore = authReducer(state, loginRestoreAction);
    expect(stateAfterRestore.user).toBeDefined();
    expect(stateAfterRestore.loginState).toEqual(LoginState.LoggedIn);
    expect(stateAfterRestore.loginError).toBeUndefined();
    done();
  });

  it('should handle RestoreLoginImpossible', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();
    expect(state.loginState).toEqual(LoginState.CheckingPreviousLogin);

    const impossibleLoginRestoreAction = new RestoreLoginImpossible();
    const stateAfterRestore = authReducer(state, impossibleLoginRestoreAction);
    expect(stateAfterRestore.user).toBeUndefined();
    expect(stateAfterRestore.loginState).toEqual(LoginState.LoggedOut);
    done();
  });

  it('should handle FetchUserDataSuccess', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
    };

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(
      stateAfterLoginSuccess.user && stateAfterLoginSuccess.user.uid
    ).toBeDefined();
    expect(
      stateAfterLoginSuccess.user && stateAfterLoginSuccess.user.username
    ).toBeUndefined();

    user.username = 'fake-username';

    const fetchUserDataAction = new FetchUserDataSuccess(user);
    const stateAfterFetchUserData = authReducer(
      stateAfterLoginSuccess,
      fetchUserDataAction
    );
    expect(
      stateAfterFetchUserData.user && stateAfterFetchUserData.user.uid
    ).toBeDefined();
    expect(
      stateAfterFetchUserData.user && stateAfterFetchUserData.user.username
    ).toBeDefined();
    expect(stateAfterFetchUserData.user).toMatchObject(user);
    done();
  });

  it('should handle FetchUserDataFailure', (done) => {
    const state = initialAuthState;
    expect(state.user).toBeUndefined();

    const user: User = {
      uid: 'fake-uuid',
    };

    const loginAction = new LoginSuccess(user);
    const stateAfterLoginSuccess = authReducer(state, loginAction);
    expect(
      stateAfterLoginSuccess.user && stateAfterLoginSuccess.user.uid
    ).toBeDefined();
    expect(
      stateAfterLoginSuccess.user && stateAfterLoginSuccess.user.username
    ).toBeUndefined();
    expect(stateAfterLoginSuccess.userDataError).toBeUndefined();

    const fetchUserDataFailedAction = new FetchUserDataFailure(
      Error('fake-error')
    );
    const stateAfterFetchUserData = authReducer(
      stateAfterLoginSuccess,
      fetchUserDataFailedAction
    );
    expect(
      stateAfterFetchUserData.user && stateAfterFetchUserData.user.uid
    ).toBeDefined();
    expect(
      stateAfterFetchUserData.user && stateAfterFetchUserData.user.username
    ).toBeUndefined();
    expect(stateAfterFetchUserData.userDataError).toBeDefined();
    done();
  });
});
